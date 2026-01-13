import { LRUCache } from "lru-cache"

export const apiCache = new LRUCache<string, Record<string, unknown>>({
  max: 500,
  ttl: 1000 * 60 * 60 * 24,
})
