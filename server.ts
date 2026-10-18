import 'dotenv/config';
import { app } from './server/index';
import { createServer as createViteServer } from 'vite';
import authRoutes from './server/routes/auth';

const effectivePort = '3000';

app.use('/api/auth', authRoutes);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(Number(effectivePort), '0.0.0.0', () => {
    console.log(`Server listening on port ${effectivePort}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
