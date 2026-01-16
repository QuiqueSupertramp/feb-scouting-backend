import { successResponse } from "../../../../app/responses/index.js"
import type { Request, Response } from "express"
import { ScoresService } from "./scores.service.js"

export class ScoresController {
  private scoresService = new ScoresService()

  getByTeamId = async (req: Request, res: Response) => {
    const teamFebId = req.params.teamFebId as string
    const scores = await this.scoresService.getByTeamId(teamFebId)
    successResponse(res, scores)
  }

  getClassification = async (_req: Request, res: Response) => {
    const classifications = await this.scoresService.getClassification()
    successResponse(res, classifications)
  }
}
