import * as cheerio from "cheerio"
import type { CheerioAPI } from "cheerio"
import { LOGGER } from "../../../app/logger.js"

interface ScrapeOptions {
  timeout?: number
  retries?: number
  retryDelay?: number
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const getDocument = async (url: string, options: ScrapeOptions = {}): Promise<CheerioAPI | undefined> => {
  const { timeout = 5000, retries = 3, retryDelay = 1500 } = options

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "es-ES,es;q=0.9",
          "Cache-Control": "no-cache",
        },
      })

      if (!res.ok) {
        if ([400, 401, 403, 404, 410].includes(res.status)) {
          LOGGER.error([`url: ${url}`, `status: ${res.status}`, `message: ❌ Fallo obteniendo el documento`])
          return undefined
        }
        throw new Error(`HTTP ${res.status}`)
      }

      const html = await res.text()
      if (!html) return undefined

      const $ = cheerio.load(html)
      $("script, style, iframe, noscript, svg, meta, link").remove()

      return $
    } catch (error) {
      if (attempt === retries) {
        const reason = (error as Error).name === "AbortError" ? "Timeout" : (error as Error).message
        const message = `❌ Fallo obteniendo el documento tras ${retries} intentos`

        LOGGER.error([`url: ${url}`, `reason: ${reason}`, `message: ${message}`])
        return undefined
      }

      await wait(retryDelay * attempt)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return undefined
}
