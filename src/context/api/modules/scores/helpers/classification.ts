import type { Score } from "../scores.types.js"

interface StandingRow {
  teamFebId: string
  played: number
  wins: number
  losses: number
  pointsFor: number
  pointsAgainst: number
}

export const getClassification = (scores: Score[]): StandingRow[] => {
  const table = new Map<string, StandingRow>()

  const getOrCreate = (teamFebId: string): StandingRow => {
    let row = table.get(teamFebId)
    if (!row) {
      row = {
        teamFebId,
        played: 0,
        wins: 0,
        losses: 0,
        pointsFor: 0,
        pointsAgainst: 0,
      }
      table.set(teamFebId, row)
    }
    return row
  }

  for (const game of scores) {
    const local = getOrCreate(game.localTeamFebId)
    const away = getOrCreate(game.awayTeamFebId)

    local.played++
    away.played++

    local.pointsFor += game.localScore
    local.pointsAgainst += game.awayScore

    away.pointsFor += game.awayScore
    away.pointsAgainst += game.localScore

    if (game.localScore > game.awayScore) {
      local.wins++
      away.losses++
    } else {
      away.wins++
      local.losses++
    }
  }

  return Array.from(table.values()).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins
    return b.pointsFor - b.pointsAgainst - (a.pointsFor - a.pointsAgainst)
  })
}
