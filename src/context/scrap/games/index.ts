import { chromium } from "playwright"
import type { ScrapGameData, ScrapPlayerStats, ScrapTeamStats } from "./types.js"

export const scrapGame = async (gameFebId: string): Promise<ScrapGameData | null> => {
  const gamesURL = `https://baloncestoenvivo.feb.es/partido/${gameFebId}`

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

    const gameData = await page.evaluate(() => {
      const marcadorLocalDiv = document.querySelector<HTMLDivElement>(".box-marcador .fila .local")
      const marcadorVisitanteDiv = document.querySelector<HTMLDivElement>(".box-marcador .fila .visitante")
      if (!marcadorLocalDiv || !marcadorVisitanteDiv) return null

      const marcadorLocalNombreLink = marcadorLocalDiv.querySelector<HTMLAnchorElement>(".nombre a")
      const localTeamFebId = marcadorLocalNombreLink
        ? new URL(marcadorLocalNombreLink.href).searchParams.get("i") ?? ""
        : ""
      const localTotalScore = marcadorLocalDiv.querySelector<HTMLSpanElement>(".resultado")?.textContent.trim()

      const marcadorVisitanteNombreLink = marcadorVisitanteDiv.querySelector<HTMLAnchorElement>(".nombre a")
      const awayTeamFebId = marcadorVisitanteNombreLink
        ? new URL(marcadorVisitanteNombreLink?.href ?? "").searchParams.get("i") ?? ""
        : ""
      const awayTotalScore = marcadorVisitanteDiv.querySelector<HTMLSpanElement>(".resultado")?.textContent.trim()

      const marcadorParcialesLocal = document.querySelector<HTMLDivElement>(".box-marcador .parciales .local")
      const marcadorParcialesVisitante = document.querySelector<HTMLDivElement>(".box-marcador .parciales .visitante")
      if (!marcadorParcialesLocal || !marcadorParcialesVisitante) return null
      const localQuartersScores = Array.from(marcadorParcialesLocal.querySelectorAll("span")).map(t =>
        t.textContent.trim()
      )
      const awayQuartersScores = Array.from(marcadorParcialesVisitante.querySelectorAll("span")).map(t =>
        t.textContent.trim()
      )

      const playerStats: Omit<ScrapPlayerStats, "gameFebId" | "teamFebId">[][] = Array.from(
        document.querySelectorAll<HTMLDivElement>(".responsive-scroll table tbody")
      )
        .filter(x => !!x)
        .map(body => {
          const x = Array.from(body.querySelectorAll("tr"))
            .slice(2)
            .filter(r => !r.classList.contains("row-total"))
            .filter(x => !!x)
            .map(row => {
              const cols = Array.from(row.querySelectorAll("td"))
              const link = cols[2]?.querySelector("a")
              const href = link?.getAttribute("href") ?? ""
              const name = link?.textContent?.trim() ?? ""
              const playerFebId = href ? new URL(href).searchParams.get("c") ?? "" : ""

              const [twoPointsMade = 0, twoPointsAttemted = 0] = (
                (cols[5]?.textContent.trim() || "").split(" ")[0] || ""
              )
                .split("/")
                .map(n => Number(n) || 0)
              const [threePointsMade = 0, threePointsAttemted = 0] = (
                (cols[6]?.textContent.trim() || "").split(" ")[0] || ""
              )
                .split("/")
                .map(n => Number(n) || 0)
              const [fieldGoalsMade = 0, fieldGoalsAttemted = 0] = (
                (cols[7]?.textContent.trim() || "").split(" ")[0] || ""
              )
                .split("/")
                .map(n => Number(n) || 0)
              const [freeThrowsMade = 0, freeThrowsAttemted = 0] = (
                (cols[8]?.textContent.trim() || "").split(" ")[0] || ""
              )
                .split("/")
                .map(n => Number(n) || 0)

              return {
                playerFebId,
                name,
                minutes: cols[3]?.textContent.trim() || "00:00",
                points: Number(cols[4]?.textContent ?? 0),
                twoPoints: { made: twoPointsMade, attempted: twoPointsAttemted },
                threePoints: { made: threePointsMade, attempted: threePointsAttemted },
                fieldGoals: { made: fieldGoalsMade, attempted: fieldGoalsAttemted },
                freeThrows: { made: freeThrowsMade, attempted: freeThrowsAttemted },
                offensiveRebounds: Number(cols[9]?.textContent ?? 0),
                defensiveRebounds: Number(cols[10]?.textContent ?? 0),
                totalRebounds: Number(cols[11]?.textContent ?? 0),
                assists: Number(cols[12]?.textContent ?? 0),
                steals: Number(cols[13]?.textContent ?? 0),
                turnovers: Number(cols[14]?.textContent ?? 0),
                foulsCommitted: Number(cols[18]?.textContent ?? 0),
                foulsDrawn: Number(cols[19]?.textContent ?? 0),
                pir: Number(cols[20]?.textContent ?? 0),
              }
            })

          return x
        })

      const teamStats: Omit<ScrapTeamStats, "gameFebId" | "teamFebId">[] =
        Array.from(document.querySelectorAll<HTMLDivElement>(".responsive-scroll table tbody"))
          .filter(x => !!x)
          .map(body => {
            return Array.from(body.querySelectorAll("tr"))
              .filter(x => !!x)
              .filter(r => r.classList.contains("row-total"))
              .map(row => {
                const cols = Array.from(row.querySelectorAll("td"))

                // const getShotStats = (value?: HTMLTableCellElement) => {
                //   const [made = "0", attempted = "0"] = ((value?.textContent.trim() ?? "").split(" ")[0] || "").split(
                //     "/"
                //   )
                //   return [Number(made), Number(attempted)]
                // }

                // const [twoPointsMade = 0, twoPointsAttemted = 0] = getShotStats(cols[5])

                const [twoPointsMade = 0, twoPointsAttemted = 0] = (
                  (cols[5]?.textContent.trim() || "").split(" ")[0] || ""
                )
                  .split("/")
                  .map(n => Number(n) || 0)
                const [threePointsMade = 0, threePointsAttemted = 0] = (
                  (cols[6]?.textContent.trim() || "").split(" ")[0] || ""
                )
                  .split("/")
                  .map(n => Number(n) || 0)
                const [fieldGoalsMade = 0, fieldGoalsAttemted = 0] = (
                  (cols[7]?.textContent.trim() || "").split(" ")[0] || ""
                )
                  .split("/")
                  .map(n => Number(n) || 0)
                const [freeThrowsMade = 0, freeThrowsAttemted = 0] = (
                  (cols[8]?.textContent.trim() || "").split(" ")[0] || ""
                )
                  .split("/")
                  .map(n => Number(n) || 0)

                return {
                  minutes: cols[3]?.textContent.trim() || "00:00",
                  points: Number(cols[4]?.textContent ?? 0),
                  twoPoints: { made: twoPointsMade, attempted: twoPointsAttemted },
                  threePoints: { made: threePointsMade, attempted: threePointsAttemted },
                  fieldGoals: { made: fieldGoalsMade, attempted: fieldGoalsAttemted },
                  freeThrows: { made: freeThrowsMade, attempted: freeThrowsAttemted },
                  offensiveRebounds: Number(cols[9]?.textContent ?? 0),
                  defensiveRebounds: Number(cols[10]?.textContent ?? 0),
                  totalRebounds: Number(cols[11]?.textContent ?? 0),
                  assists: Number(cols[12]?.textContent ?? 0),
                  steals: Number(cols[13]?.textContent ?? 0),
                  turnovers: Number(cols[14]?.textContent ?? 0),
                  foulsCommitted: Number(cols[18]?.textContent ?? 0),
                  foulsDrawn: Number(cols[19]?.textContent ?? 0),
                  pir: Number(cols[20]?.textContent ?? 0),
                }
              })
          })
          .flat() ?? []

      return {
        local: {
          teamFebId: localTeamFebId,
          scores: {
            total: Number(localTotalScore) || 0,
            quarters: awayQuartersScores.map(q => Number(q) || 0),
          },
          teamStats: teamStats[0] as Omit<ScrapTeamStats, "gameFebId" | "teamFebId">,
          playerStats: playerStats[0],
        },
        away: {
          teamFebId: awayTeamFebId,
          scores: {
            total: Number(awayTotalScore) || 0,
            quarters: awayQuartersScores.map(q => Number(q) || 0),
          },
          teamStats: teamStats[1] as Omit<ScrapTeamStats, "gameFebId" | "teamFebId">,
          playerStats: playerStats[1],
        },
      }
    })
    if (!gameData) return null
    return {
      gameFebId,
      local: {
        ...gameData.local,
        teamStats: { ...gameData.local.teamStats, gameFebId, teamFebId: gameData.local.teamFebId },
        playerStats:
          gameData.local.playerStats?.map(p => ({ gameFebId, teamFebId: gameData.local.teamFebId, ...p })) ?? [],
      },
      away: {
        ...gameData.away,
        teamStats: { ...gameData.away.teamStats, gameFebId, teamFebId: gameData.away.teamFebId },
        playerStats:
          gameData.away.playerStats?.map(p => ({ gameFebId, teamFebId: gameData.away.teamFebId, ...p })) ?? [],
      },
    }
  } finally {
    await browser.close()
  }
}

export const scrapGames = async (gameFebIds: string[]) => {
  const promises: Promise<ScrapGameData | null>[] = []
  gameFebIds.forEach(id => promises.push(scrapGame(id)))

  const x = await Promise.all(promises)
  return x.filter(p => !!p)
}
