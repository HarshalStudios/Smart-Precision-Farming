import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

export default router;
