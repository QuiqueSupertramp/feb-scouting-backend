// src/middlewares/cache.middleware.ts
import type { Request, Response, NextFunction } from "express"
import { lru } from "../cache/lru.js"

type CacheOptions = {
  ttl?: number
  key?: (req: Request) => string
}

export const cacheMiddleware =
  ({ ttl, key }: CacheOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = key ? key(req) : `${req.method}:${req.originalUrl}`

    const cached = lru.get(cacheKey)
    if (cached) {
      return res.json(cached)
    }

    const originalJson = res.json.bind(res)

    res.json = (body) => {
      lru.set(cacheKey, body, { ttl })
      return originalJson(body)
    }

    next()
  }
