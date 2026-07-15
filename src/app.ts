import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import audit from './app/middlewares/audit';
import redis from './app/utils/redis';
import { sanitizeMiddleware } from './app/utils/sanitize';
const app: Application = express();

// Security
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'", process.env.CLIENT_URL || 'http://localhost:3000'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(sanitizeMiddleware);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests', standardHeaders: true, legacyHeaders: false }));
app.use(express.json({ limit: '10kb' }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Audit trail for all CUD operations
app.use(audit);

//api/v1/products/create-product

// Health check
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'OK', timestamp: new Date().toISOString() });
});

// Readiness check — verifies DB + Redis connectivity
app.get('/api/v1/ready', async (_req: Request, res: Response) => {
  const dbOk = mongoose.connection.readyState === 1;
  let redisOk = false;
  try {
    redisOk = (await redis.ping()) === 'PONG';
  } catch {
    redisOk = false;
  }
  const status = dbOk && redisOk ? 200 : 503;
  res.status(status).json({
    success: status === 200,
    db: dbOk,
    redis: redisOk,
    timestamp: new Date().toISOString(),
  });
});

// Application Routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

//Global err handler 
app.use(globalErrorHandler);
// Not Found
app.use(notFound);

export default app;
