import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { validate, aiAssistSchema } from '../middleware/validation';
import { generateAiMessage, diagnoseFreeModels } from '../services/ai.service';
import type { AiAssistPayload } from '../types';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Слишком много AI-запросов. Подождите минуту.' },
});

const router = Router();

router.post(
  '/assist',
  limiter,
  validate(aiAssistSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userInput } = req.body as AiAssistPayload;
      const message = await generateAiMessage(userInput);
      res.json({ success: true, message });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/diagnose',
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'OPENROUTER_API_KEY not set' });
        return;
      }
      const result = await diagnoseFreeModels(apiKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
