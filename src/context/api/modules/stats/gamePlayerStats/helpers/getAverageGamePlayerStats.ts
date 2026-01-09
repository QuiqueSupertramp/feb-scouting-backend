/** biome-ignore-all lint/suspicious/noExplicitAny: <any> */
import type { ShotStats } from "../../stats.types.js"
import type { GamePlayerStats, PlayerStatsSummary } from "../types.js"
import { getPlayerStatsPerGame } from "./getPlayersStatsPerGame.js"

export const getAverageGamePlayerStats = (items: GamePlayerStats[]): PlayerStatsSummary => {
  const teamFebId = items[0]?.teamFebId ?? ""
  const playerFebId = items[0]?.playerFebId ?? ""
  const name = items[0]?.name ?? ""
  const games = items.map(i => i.gameFebId)

  const stats = {} as Omit<GamePlayerStats, "teamFebId" | "playerFebId" | "name" | "gameFebId">
  const base = items[0] as Omit<GamePlayerStats, "teamFebId" | "playerFebId" | "name" | "gameFebId">

  for (const key of Object.keys(base) as (keyof typeof base)[]) {
    const value = base[key]

    if (typeof value === "number") {
      stats[key] = items.reduce((sum, i) => sum + (i[key] as number), 0) as any
      continue
    }

    if (typeof value === "object" && value !== null && "made" in value && "attempted" in value) {
      stats[key] = {
        made: items.reduce((sum, i) => sum + (i[key] as ShotStats).made, 0),
        attempted: items.reduce((sum, i) => sum + (i[key] as ShotStats).attempted, 0),
      } as any
    }
  }

  return {
    teamFebId,
    playerFebId,
    name,
    games,
    stats: getPlayerStatsPerGame(stats, items.length),
  }
}
