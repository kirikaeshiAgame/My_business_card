import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { validate, contactSchema } from '../middleware/validation';
import { sendContactEmails } from '../services/email.service';
import type { ContactPayload } from '../types';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Слишком много запросов. Попробуйте позже.' },
});

const router = Router();

router.post(
  '/',
  limiter,
  validate(contactSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body as ContactPayload;
      await sendContactEmails(payload);
      res.status(200).json({ success: true, message: 'Сообщение отправлено' });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
