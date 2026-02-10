import type { GameScore } from "../../../api/modules/scores/scores.types.js"
import type { GamePlayerStats } from "../../../api/modules/stats/gamePlayerStats/types.js"
import type { GameTeamStats } from "../../../api/modules/stats/gameTeamStats/types.js"
import { formatPlayerName, fromStatsToShoot } from "../../helpers/stats.js"
import { getMillisecondsFromTime } from "../../helpers/time.js"

const mapTeamFromFeb = (team: string[] = []): Omit<GameTeamStats, "teamFebId" | "gameFebId" | "local" | "win"> => ({
  minutes: getMillisecondsFromTime(team[3]),
  points: Number(team[4] ?? 0),
  twoPoints: fromStatsToShoot(team[5]),
  threePoints: fromStatsToShoot(team[6]),
  fieldGoals: fromStatsToShoot(team[7]),
  freeThrows: fromStatsToShoot(team[8]),
  offensiveRebounds: Number(team[9] ?? 0),
  defensiveRebounds: Number(team[10] ?? 0),
  totalRebounds: Number(team[11] ?? 0),
  assists: Number(team[12] ?? 0),
  steals: Number(team[13] ?? 0),
  turnovers: Number(team[14] ?? 0),
  foulsCommitted: Number(team[18] ?? 0),
  foulsDrawn: Number(team[19] ?? 0),
  pir: Number(team[20] ?? 0),
})

const mapPlayerFromFeb = (
  player: string[] = [],
): Omit<GamePlayerStats, "teamFebId" | "gameFebId" | "local" | "win"> => ({
  playerFebId: player[3] ?? "noFebId",
  starterFive: !!player[0]?.length,
  jerseyNumber: player[1] ?? "noNumber",
  name: formatPlayerName(player[2]),
  minutes: getMillisecondsFromTime(player[4]),
  points: Number(player[5] ?? 0),
  twoPoints: fromStatsToShoot(player[6]),
  threePoints: fromStatsToShoot(player[7]),
  fieldGoals: fromStatsToShoot(player[8]),
  freeThrows: fromStatsToShoot(player[9]),
  offensiveRebounds: Number(player[10] ?? 0),
  defensiveRebounds: Number(player[12] ?? 0),
  totalRebounds: Number(player[12] ?? 0),
  assists: Number(player[13] ?? 0),
  steals: Number(player[14] ?? 0),
  turnovers: Number(player[15] ?? 0),
  foulsCommitted: Number(player[19] ?? 0),
  foulsDrawn: Number(player[20] ?? 0),
  pir: Number(player[21] ?? 0),
})

export const mapGamesPlayersStats = ({
  gameFebId,
  score,
  playersStats,
}: {
  gameFebId: string
  score: GameScore
  playersStats: [string[][], string[][]]
}): [GamePlayerStats[], GamePlayerStats[]] => {
  const localTeamFebId = score.localTeamFebId
  const awayTeamFebId = score.awayTeamFebId
  const localWin = score.localScore > score.awayScore
  const awayWin = score.awayScore > score.localScore

  return [
    playersStats[0].map((player) => ({
      gameFebId,
      teamFebId: localTeamFebId,
      local: true,
      win: localWin,
      ...mapPlayerFromFeb(player),
    })),
    playersStats[1].map((player) => ({
      gameFebId,
      teamFebId: awayTeamFebId,
      local: false,
      win: awayWin,
      ...mapPlayerFromFeb(player),
    })),
  ]
}

export const mapGamesTeamsStats = ({
  gameFebId,
  score,
  teamsStats,
}: {
  gameFebId: string
  score: GameScore
  teamsStats: [string[], string[]]
}): [GameTeamStats, GameTeamStats] => {
  const localTeamFebId = score.localTeamFebId
  const awayTeamFebId = score.awayTeamFebId
  const localWin = score.localScore > score.awayScore
  const awayWin = score.awayScore > score.localScore

  return [
    {
      gameFebId,
      teamFebId: localTeamFebId,
      local: true,
      win: localWin,
      ...mapTeamFromFeb(teamsStats[0]),
    },
    {
      gameFebId,
      teamFebId: awayTeamFebId,
      local: false,
      win: awayWin,
      ...mapTeamFromFeb(teamsStats[1]),
    },
  ]
}
