import type { Score } from "../scores.types.js"

interface StandingRow {
  games: number
  wins: number
  losses: number
  points: number
  pointsAgainst: number
}

interface Standings {
  teamFebId: string
  total: StandingRow
  local: StandingRow
  away: StandingRow
}
interface Classifications {
  total: Standings[]
  local: Standings[]
  away: Standings[]
}

export const getClassifications = (scores: Score[]): Classifications => {
  const table = new Map<string, Standings>()

  const getOrCreate = (teamFebId: string): Standings => {
    let row = table.get(teamFebId)
    if (!row) {
      row = {
        teamFebId,
        total: {
          games: 0,
          wins: 0,
          losses: 0,
          points: 0,
          pointsAgainst: 0,
        },
        local: {
          games: 0,
          wins: 0,
          losses: 0,
          points: 0,
          pointsAgainst: 0,
        },
        away: {
          games: 0,
          wins: 0,
          losses: 0,
          points: 0,
          pointsAgainst: 0,
        },
      }
      table.set(teamFebId, row)
    }
    return row
  }

  for (const game of scores) {
    const localStanding = getOrCreate(game.localTeamFebId)
    const awayStanding = getOrCreate(game.awayTeamFebId)

    localStanding.local.games++
    awayStanding.away.games++

    localStanding.local.points += game.localScore
    localStanding.local.pointsAgainst += game.awayScore
    awayStanding.away.points += game.awayScore
    awayStanding.away.pointsAgainst += game.localScore

    if (game.localScore > game.awayScore) {
      localStanding.local.wins++
      awayStanding.away.losses++
    } else {
      awayStanding.local.wins++
      localStanding.away.losses++
    }
  }

  const teamsTable = Array.from(table.values()).map((team) => ({
    ...team,
    total: {
      games: team.local.games + team.away.games,
      wins: team.local.wins + team.away.wins,
      losses: team.local.losses + team.away.losses,
      points: team.local.points + team.away.points,
      pointsAgainst: team.local.pointsAgainst + team.away.pointsAgainst,
    },
  }))

  return {
    total: teamsTable.sort((a, b) => {
      if (b.total.wins !== a.total.wins) return b.total.wins - a.total.wins
      return b.total.points - b.total.pointsAgainst - (a.total.points - a.total.pointsAgainst)
    }),
    local: teamsTable.sort((a, b) => {
      if (b.local.wins !== a.local.wins) return b.local.wins - a.local.wins
      return b.local.points - b.local.pointsAgainst - (a.local.points - a.local.pointsAgainst)
    }),
    away: teamsTable.sort((a, b) => {
      if (b.away.wins !== a.away.wins) return b.away.wins - a.away.wins
      return b.away.points - b.away.pointsAgainst - (a.away.points - a.away.pointsAgainst)
    }),
  }
}
