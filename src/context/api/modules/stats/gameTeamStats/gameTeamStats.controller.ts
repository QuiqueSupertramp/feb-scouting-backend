import { successResponse } from "../../../../../app/responses/index.js"
import { GameTeamStatsService } from "./service.js"
import type { Request, Response } from "express"

export class GameTeamStatsController {
  private gameTeamStatsService = new GameTeamStatsService()

  getById = async (req: Request, res: Response) => {
    const teamFebId = req.params.teamFebId as string
    const team = await this.gameTeamStatsService.getByTeamId(teamFebId)
    successResponse(res, team)
  }
}
