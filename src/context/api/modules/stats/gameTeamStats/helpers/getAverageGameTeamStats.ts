import { getTeamStatsPerGame } from "./getTeamStatsPerGame.js"
import type { ShotStats } from "../../stats.types.js"
import type { GameTeamStats, TeamStatsSummary } from "../types.js"

export const getAverageGameTeamStats = (items: GameTeamStats[]): TeamStatsSummary => {
  const teamFebId = items[0]?.teamFebId ?? ""
  const games = items.map(i => i.gameFebId)

  const stats = {} as Omit<GameTeamStats, "gameFebId" | "teamFebId">
  const base = items[0] as Omit<GameTeamStats, "gameFebId" | "teamFebId">

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
    games,
    stats: getTeamStatsPerGame(stats, items.length),
  }
}
