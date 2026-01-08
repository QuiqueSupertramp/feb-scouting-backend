import { round2Decimals } from "../../../../../scrap/helpers/decimals.js"
import { divideShots } from "../../helpers.js"
import type { ShotStats } from "../../stats.types.js"
import type { GameTeamStats } from "../types.js"

export const getTeamStatsPerGame = (stats: Omit<GameTeamStats, "gameFebId" | "teamFebId">, games: number) => {
  const statsEntries = Object.entries(stats)
  const statsEntriesMapped = statsEntries.map(([key, value]) => {
    if (["twoPoints", "threePoints", "fieldGoals", "freeThrows"].includes(key)) {
      return [key, divideShots(value as ShotStats, games)]
    }

    return [key, round2Decimals((value as number) / games)]
  })

  return Object.fromEntries(statsEntriesMapped) as unknown as Omit<GameTeamStats, "gameFebId" | "teamFebId">
}
