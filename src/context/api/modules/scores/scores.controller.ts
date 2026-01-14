import { successResponse } from "../../../../app/responses/index.js"
import type { Request, Response } from "express"
import { ScoresService } from "./scores.service.js"

export class ScoresController {
  private teamsService = new ScoresService()

  getByTeamId = async (req: Request, res: Response) => {
    const teamFebId = req.params.teamFebId as string
    const scores = await this.teamsService.getByTeamId(teamFebId)
    successResponse(res, scores)
  }

  getClassification = async (req: Request, res: Response) => {
    const classifications = await this.teamsService.getClassification()
    successResponse(res, classifications)
  }
}
