import { Request, Response, NextFunction } from 'express';
import { auth } from '../services/firebaseAdmin';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!auth) {
    return res.status(503).json({ error: 'Service Unavailable: Authentication not configured' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};
