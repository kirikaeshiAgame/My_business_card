import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов').max(100).trim(),
  phone: z
    .string()
    .min(7, 'Введите корректный номер телефона')
    .max(20)
    .regex(/^[\d\s\-+()]+$/, 'Номер телефона содержит недопустимые символы')
    .trim(),
  email: z.string().email('Введите корректный email').max(255).trim().toLowerCase(),
  comment: z
    .string()
    .min(10, 'Сообщение должно быть не менее 10 символов')
    .max(2000)
    .trim(),
});

export const aiAssistSchema = z.object({
  userInput: z.string().min(3, 'Опишите вашу задачу').max(1000).trim(),
});

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.reduce<Record<string, string>>((acc, e) => {
          const field = e.path[0]?.toString() ?? 'field';
          acc[field] = e.message;
          return acc;
        }, {});

        res.status(400).json({ error: 'Validation failed', details: errors });
        return;
      }
      next(err);
    }
  };
}
