import { chromium } from "playwright"
import type { ScrapScore } from "./types.js"

export const scrapScores = async (teamFebId: string): Promise<ScrapScore[]> => {
  const gamesURL = `https://baloncestoenvivo.feb.es/racha/${teamFebId}`

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  page.setDefaultTimeout(20000)
  page.setDefaultNavigationTimeout(30000)

  try {
    await page.goto(gamesURL, { waitUntil: "domcontentloaded" })

    await Promise.race([
      page.waitForSelector("#loader-data", { state: "attached" }),
      page.waitForLoadState("networkidle"),
    ])

    return await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll<HTMLDivElement>("table tbody tr"))
      rows.shift()
      return rows
        .map(row => {
          const tds = Array.from(row.querySelectorAll("td"))
          const [roundTd, teams, score, dateTd, timeTd] = tds
          const round = roundTd?.textContent?.trim()
          const date = dateTd?.textContent?.trim()
          const time = timeTd?.textContent?.trim()

          if (!round || !date || !time || !teams || !score) return null

          const a = score.querySelector("a")
          const url = a?.getAttribute("href") ?? ""
          const gameFebId = new URL(url).searchParams.get("p") || "0"

          const [day, month, year] = date.split("/")

          return {
            gameFebId,
            round: Number(round),
            date: `${year}-${month}-${day}`,
            time,
          }
        })
        .filter(x => !!x)
    })
  } finally {
    await browser.close()
  }
}
