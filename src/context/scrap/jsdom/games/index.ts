import { ApiError } from "../../../../app/errors/apiError.js"
import { removeEmptyItems } from "../../helpers/arrays.js"
import { getDocument } from "../getDocument.js"
import type { ScrapGameData } from "./types.js"
import type { GameTeamStats } from "../../../api/modules/stats/gameTeamStats/types.js"
import type { GamePlayerStats } from "../../../api/modules/stats/gamePlayerStats/types.js"

const GAMES_BASE_URL = "https://baloncestoenvivo.feb.es/partido"

export const scrapGame = async (gameFebId: string): Promise<ScrapGameData> => {
  const url = `${GAMES_BASE_URL}/${gameFebId}`
  const document = await getDocument(url)
  if (!document) throw new ApiError(400, `Impossible to scrap the game with id ${gameFebId}`)

  const marcadorLocalDiv = document.querySelector<HTMLDivElement>(".box-marcador .fila .local")
  const marcadorVisitanteDiv = document.querySelector<HTMLDivElement>(".box-marcador .fila .visitante")
  if (!marcadorLocalDiv || !marcadorVisitanteDiv)
    throw new ApiError(400, `Impossible to scrap the game with id ${gameFebId}`)

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
  if (!marcadorParcialesLocal || !marcadorParcialesVisitante)
    throw new ApiError(400, `Impossible to scrap the game with id ${gameFebId}`)
  const localQuartersScores = Array.from(marcadorParcialesLocal.querySelectorAll("span")).map(t => t.textContent.trim())
  const awayQuartersScores = Array.from(marcadorParcialesVisitante.querySelectorAll("span")).map(t =>
    t.textContent.trim()
  )

  const playerStats: Omit<GamePlayerStats, "gameFebId" | "teamFebId">[][] = Array.from(
    document.querySelectorAll<HTMLDivElement>(".responsive-scroll table tbody")
  )
    .filter(removeEmptyItems)
    .map(body => {
      const x = Array.from(body.querySelectorAll("tr"))
        .slice(2)
        .filter(r => !r.classList.contains("row-total"))
        .filter(removeEmptyItems)
        .map(row => {
          const cols = Array.from(row.querySelectorAll("td"))
          const link = cols[2]?.querySelector("a")
          const href = link?.getAttribute("href") ?? ""
          const name = link?.textContent?.trim() ?? ""
          const playerFebId = href ? new URL(href).searchParams.get("c") ?? "" : ""

          const [twoPointsMade = 0, twoPointsAttemted = 0] = ((cols[5]?.textContent.trim() || "").split(" ")[0] || "")
            .split("/")
            .map(n => Number(n) || 0)
          const [threePointsMade = 0, threePointsAttemted = 0] = (
            (cols[6]?.textContent.trim() || "").split(" ")[0] || ""
          )
            .split("/")
            .map(n => Number(n) || 0)
          const [fieldGoalsMade = 0, fieldGoalsAttemted = 0] = ((cols[7]?.textContent.trim() || "").split(" ")[0] || "")
            .split("/")
            .map(n => Number(n) || 0)
          const [freeThrowsMade = 0, freeThrowsAttemted = 0] = ((cols[8]?.textContent.trim() || "").split(" ")[0] || "")
            .split("/")
            .map(n => Number(n) || 0)

          const [m = 0, s = 0] = (cols[3]?.textContent.trim() || "00:00").split(":")
          const minutes = Number(m) || 0
          const seconds = Number(s) || 0

          const mMs = minutes * 60 * 1000
          const sMs = seconds * 1000

          const minutesMilliseconds = mMs + sMs

          return {
            playerFebId,
            name,
            minutes: minutesMilliseconds,
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

  const teamStats =
    Array.from(document.querySelectorAll<HTMLDivElement>(".responsive-scroll table tbody"))
      .filter(removeEmptyItems)
      .map(body => {
        return Array.from(body.querySelectorAll("tr"))
          .filter(removeEmptyItems)
          .filter(r => r.classList.contains("row-total"))
          .map(row => {
            const cols = Array.from(row.querySelectorAll("td"))

            const [twoPointsMade = 0, twoPointsAttemted = 0] = ((cols[5]?.textContent.trim() || "").split(" ")[0] || "")
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

            const [m = 0, s = 0] = (cols[3]?.textContent.trim() || "00:00").split(":")
            const minutes = Number(m) || 0
            const seconds = Number(s) || 0

            const mMs = minutes * 60 * 1000
            const sMs = seconds * 1000

            const minutesMilliseconds = mMs + sMs

            return {
              minutes: minutesMilliseconds,
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
    gameFebId,
    local: {
      teamFebId: localTeamFebId,
      scores: {
        total: Number(localTotalScore) || 0,
        quarters: localQuartersScores.map(q => Number(q) || 0),
      },
      teamStats: { gameFebId, teamFebId: localTeamFebId, ...teamStats[0] } as GameTeamStats,
      playerStats: playerStats[0]?.map(p => ({ gameFebId, teamFebId: localTeamFebId, ...p })) ?? [],
    },
    away: {
      teamFebId: awayTeamFebId,
      scores: {
        total: Number(awayTotalScore) || 0,
        quarters: awayQuartersScores.map(q => Number(q) || 0),
      },
      teamStats: { gameFebId, teamFebId: awayTeamFebId, ...teamStats[1] } as GameTeamStats,
      playerStats: playerStats[1]?.map(p => ({ gameFebId, teamFebId: awayTeamFebId, ...p })) ?? [],
    },
  }
}

export const scrapGames = async (gameFebIds: string[]) => {
  const promises: Promise<ScrapGameData>[] = []
  gameFebIds.filter(removeEmptyItems).forEach(id => promises.push(scrapGame(id)))
  return await Promise.all(promises)
}
