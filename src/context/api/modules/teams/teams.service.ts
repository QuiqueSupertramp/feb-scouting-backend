import { database } from "../../../../app/database/index.js"
import { ApiError } from "../../../../app/errors/apiError.js"
import { getAverageGameTeamStats } from "../stats/gameTeamStats/helpers/getAverageGameTeamStats.js"
import { mapGameTeamStatsFromSupabase } from "../stats/gameTeamStats/mappers.js"
import { mapTeamDataFromSupabase } from "./teams.mappers.js"

export class TeamsService {
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
      .select(`*,game_team_stats (*)`)
      .eq("team_feb_id", teamFebId)
      .limit(1)
      .maybeSingle()

    if (error) throw new ApiError(status, statusText, error.code)
    if (!data) return null

    const avg = getAverageGameTeamStats(data.game_team_stats.map(mapGameTeamStatsFromSupabase))

    return {
      teamFebId: data.team_feb_id,
      name: data.name,
      pretty_name: data.pretty_name,
      league_id: data.league_id,
      games: avg.games,
      stats: avg.stats,
    }
  }
}
