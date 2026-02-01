import { ScoresService } from "../../api/modules/scores/scores.service.js"
import { TeamsService } from "../../api/modules/teams/teams.service.js"
import { scrapScores, type ScrapScore } from "../../scrap/cheerio/score/index.js"
import { filterExistingScores, removeDuplicateScores } from "../../scrap/helpers/arrays.js"

const teamsService = new TeamsService()
const scoresService = new ScoresService()

export const getScoresToSave = async () => {
  // Coger todos los teamsIds
  const teamsIds = await teamsService.getAllIds()

  // Scrapear todos los scores y eliminar duplicados
  const scoresPromises: Promise<ScrapScore[] | undefined>[] = []
  teamsIds.forEach((id) => scoresPromises.push(scrapScores(id)))
  const scores = (await Promise.all(scoresPromises)).flat().filter((p) => p !== undefined)
  const allScores = removeDuplicateScores(scores)

  // Coger todos los scores
  const existingScoresIds = await scoresService.getAllIds()

  // Eliminar duplicados entre scores de supabase y los scrapeados
  return filterExistingScores(allScores, existingScoresIds)
}
