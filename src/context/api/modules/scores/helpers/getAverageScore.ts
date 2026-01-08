import { round2Decimals } from "../../../../scrap/helpers/decimals.js"
import type { Score, TeamScoreAverage } from "../scores.types.js"

export const getAverageScore = (scores: Score[], teamFebId: string): TeamScoreAverage => {
  let totalPoints = 0
  const quartersSum: number[] = []
  const quartersCount: number[] = []

  for (const game of scores) {
    let gamePoints: number | null = null
    let gameQuarters: number[] | null = null

    if (game.localTeamFebId === teamFebId) {
      gamePoints = game.localScore
      gameQuarters = game.localQuarters
    } else if (game.awayTeamFebId === teamFebId) {
      gamePoints = game.awayScore
      gameQuarters = game.awayQuarters
    }

    if (gamePoints === null || gameQuarters === null) continue

    totalPoints += gamePoints

    gameQuarters.forEach((points, index) => {
      quartersSum[index] = (quartersSum[index] ?? 0) + points
      quartersCount[index] = (quartersCount[index] ?? 0) + 1
    })
  }

  return {
    teamFebId,
    avgPoints: scores.length > 0 ? round2Decimals(totalPoints / scores.length) : 0,
    avgQuarters: quartersSum.map((sum, index) => round2Decimals(sum / (quartersCount[index] || 1))),
  }
}
