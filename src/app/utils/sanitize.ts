import { Request, Response, NextFunction } from 'express';

const MONGO_KEY_REGEX = /^\$/;
const MONGO_DOT_REGEX = /\./g;

function mongoSanitizeValue(val: unknown): unknown {
  if (Array.isArray(val)) {
    return val.map(mongoSanitizeValue);
  }
  if (val && typeof val === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const key of Object.keys(val as Record<string, unknown>)) {
      if (MONGO_KEY_REGEX.test(key) || key.includes('.')) {
        const cleanKey = key.replace(/^\$/, '_').replace(MONGO_DOT_REGEX, '_');
        sanitized[cleanKey] = mongoSanitizeValue((val as Record<string, unknown>)[key]);
      } else {
        sanitized[key] = mongoSanitizeValue((val as Record<string, unknown>)[key]);
      }
    }
    return sanitized;
  }
  return val;
}

function stripXss(val: unknown): unknown {
  if (typeof val === 'string') {
    return val
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  if (Array.isArray(val)) {
    return val.map(stripXss);
  }
  if (val && typeof val === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const key of Object.keys(val as Record<string, unknown>)) {
      sanitized[key] = stripXss((val as Record<string, unknown>)[key]);
    }
    return sanitized;
  }
  return val;
}

export function sanitizeMiddleware(req: Request, _res: Response, next: NextFunction) {
  const sources: Array<'body' | 'params' | 'query'> = ['body', 'params', 'query'];
  for (const key of sources) {
    const raw = req[key];
    if (!raw) continue;
    const noSql = mongoSanitizeValue(raw) as typeof raw;
    const clean = stripXss(noSql) as typeof raw;
    Object.defineProperty(req, key, {
      value: clean,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
  next();
}
