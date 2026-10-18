import { Router, Request, Response } from 'express';
import { db } from '../db/drizzle'; // Need to create this
import { farms } from '../db/schema';
import { eq } from 'drizzle-orm';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  // const user = (req as any).user;
  // const results = await db.select().from(farms);
  // res.json(results);
  res.status(501).json({ error: 'Not yet implemented' });
});

router.post('/', authenticate, async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not yet implemented' });
});

router.put('/:id', authenticate, async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not yet implemented' });
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not yet implemented' });
});

export default router;
