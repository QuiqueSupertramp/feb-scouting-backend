import type { Score } from "../scores.types.js"

type Quarters = [number, number, number, number]

interface Points {
  points: number
  pointsAgainst: number
  quarters: Quarters
  quartersAgainst: Quarters
}

export interface PointsStats {
  total: Points
  local: Points
  away: Points
}

export const getPointsStats = (teamFebId: string, scores: Score[]) => {
  const localScores: Score[] = []
  const awayScores: Score[] = []

  scores.forEach((s) => (s.localTeamFebId === teamFebId ? localScores.push(s) : awayScores.push(s)))

  const quartersAsLocal = getQuarters(localScores, "localQuarters")
  const quartersAgainstAsLocal = getQuarters(localScores, "awayQuarters")
  const quartersAsAway = getQuarters(awayScores, "localQuarters")
  const quartersAgainstAsAway = getQuarters(awayScores, "awayQuarters")

  const totalQuarters = [
    quartersAsLocal[0] + quartersAsAway[0],
    quartersAsLocal[1] + quartersAsAway[1],
    quartersAsLocal[2] + quartersAsAway[2],
    quartersAsLocal[3] + quartersAsAway[3],
  ] as Quarters
  const totalQuartersAgainst = [
    quartersAgainstAsLocal[0] + quartersAgainstAsAway[0],
    quartersAgainstAsLocal[1] + quartersAgainstAsAway[1],
    quartersAgainstAsLocal[2] + quartersAgainstAsAway[2],
    quartersAgainstAsLocal[3] + quartersAgainstAsAway[3],
  ] as Quarters

  const pointsAsLocal = localScores.reduce((acc, curr) => acc + curr.localScore, 0)
  const pointsAgainstAsLocal = localScores.reduce((acc, curr) => acc + curr.awayScore, 0)
  const pointsAsAway = awayScores.reduce((acc, curr) => acc + curr.awayScore, 0)
  const pointsAgainstAsAway = awayScores.reduce((acc, curr) => acc + curr.localScore, 0)

  return {
    total: {
      points: Math.round((pointsAsLocal + pointsAsAway) / scores.length),
      pointsAgainst: Math.round((pointsAgainstAsLocal + pointsAgainstAsAway) / scores.length),
      quarters: totalQuarters.map((q) => Math.round(q / scores.length)) as Quarters,
      quartersAgainst: totalQuartersAgainst.map((q) => Math.round(q / scores.length)) as Quarters,
    },
    local: {
      points: Math.round(pointsAsLocal / localScores.length),
      pointsAgainst: Math.round(pointsAgainstAsLocal / localScores.length),
      quarters: quartersAsLocal.map((q) => Math.round(q / localScores.length)) as Quarters,
      quartersAgainst: quartersAgainstAsLocal.map((q) => Math.round(q / localScores.length)) as Quarters,
    },
    away: {
      points: Math.round(pointsAsAway / awayScores.length),
      pointsAgainst: Math.round(pointsAgainstAsAway / awayScores.length),
      quarters: quartersAsAway.map((q) => Math.round(q / awayScores.length)) as Quarters,
      quartersAgainst: quartersAgainstAsAway.map((q) => Math.round(q / awayScores.length)) as Quarters,
    },
  } as PointsStats
}

const getQuarters = (scores: Score[], key: keyof Score) => {
  return scores.reduce(
    (acc, curr) => {
      const q = curr[key] as Quarters
      acc[0] += q[0]
      acc[1] += q[1]
      acc[2] += q[2]
      acc[3] += q[3]
      return acc
    },
    [0, 0, 0, 0] as Quarters,
  )
}
