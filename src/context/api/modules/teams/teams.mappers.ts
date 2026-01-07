import type { Team, TeamSupabase } from "./teams.types.js"

export const mapTeamDataToSupabase = (team: Team): TeamSupabase => ({
  team_feb_id: team.febId,
  name: team.name,
  pretty_name: team.prettyName,
  league_id: team.leagueId,
})

export const mapTeamDataFromSupabase = (team: TeamSupabase): Team => ({
  febId: team.team_feb_id,
  name: team.name,
  prettyName: team.pretty_name,
  leagueId: team.league_id,
})
