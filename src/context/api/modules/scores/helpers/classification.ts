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

interface Classification extends StandingRow {
  teamFebId: string
}
interface Classifications {
  total: Classification[]
  local: Classification[]
  away: Classification[]
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
      awayStanding.away.wins++
      localStanding.local.losses++
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
    } as StandingRow,
  }))

  return {
    total: teamsTable
      .map((t) => ({ teamFebId: t.teamFebId, ...t.total }))
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins
        if (b.losses !== a.losses) return a.losses - b.losses
        return b.points - b.pointsAgainst - (a.points - a.pointsAgainst)
      }),
    local: teamsTable
      .map((t) => ({ teamFebId: t.teamFebId, ...t.local }))
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins
        if (b.losses !== a.losses) return a.losses - b.losses
        return b.points - b.pointsAgainst - (a.points - a.pointsAgainst)
      }),
    away: teamsTable
      .map((t) => ({ teamFebId: t.teamFebId, ...t.away }))
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins
        if (b.losses !== a.losses) return a.losses - b.losses
        return b.points - b.pointsAgainst - (a.points - a.pointsAgainst)
      }),
  }
}
