import { database } from "../../../../app/database/index.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { ScoresService } from "../scores/scores.service.js"
import { GamePlayerStatsService } from "../stats/gamePlayerStats/service.js"
import { GameTeamStatsService } from "../stats/gameTeamStats/service.js"
import { mapTeamDataFromSupabase } from "./teams.mappers.js"

export class TeamsService {
  private readonly teamStatsService = new GameTeamStatsService()
  private readonly playerStatsService = new GamePlayerStatsService()
  private readonly scoresService = new ScoresService()

  getAll = async () => {
    const { data, error, status, statusText } = await database.from("teams").select("*").order("team_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data.map(mapTeamDataFromSupabase)
  }

  getAllIds = async () => {
    const { data, error, status, statusText } = await database.from("teams").select("team_feb_id")
    if (error || !data) throw new ApiError(status, statusText, error.code)
    return data.map((team) => team.team_feb_id)
  }

  getById = async (teamFebId: string) => {
    const { data, error, status, statusText } = await database
      .from("teams")
      .select("*")
      .eq("team_feb_id", teamFebId)
      .limit(1)
      .maybeSingle()

    if (error) throw new ApiError(status, statusText, error.code)
    if (!data) return null

    const [teamStats, playerStats, scores] = await Promise.all([
      this.teamStatsService.getByTeamId(teamFebId),
      this.playerStatsService.getByTeamId(teamFebId),
      this.scoresService.getByTeamId(teamFebId),
    ])

    return {
      teamFebId: data.team_feb_id,
      name: data.name,
      prettyName: data.pretty_name,
      leagueId: data.league_id,
      teamStats: teamStats.stats,
      scores,
      playerStats,
    }
  }
}
