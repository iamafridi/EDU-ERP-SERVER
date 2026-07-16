import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
});

redis.on('error', (err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Redis connection unavailable — running without cache');
  }
});

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function setCache(key: string, data: unknown, ttlSeconds: number): Promise<void> {
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
  } catch {
    // Silently fail — cache miss is acceptable
  }
}

export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch {
    // Silently fail
  }
}

export async function invalidatePattern(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(...keys);
    }
  } catch {
    // Silently fail
  }
}

export async function acquireLock(
  key: string,
  ttlSeconds: number,
): Promise<boolean> {
  try {
    const result = await redis.set(key, '1', 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  } catch {
    return false;
  }
}

export async function releaseLock(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch {
    // Silently fail
  }
}

export default redis;
