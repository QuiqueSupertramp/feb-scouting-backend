import { successResponse } from "../../../../app/responses/index.js"
import { TeamsService } from "./teams.service.js"
import type { Request, Response } from "express"

export class TeamsController {
  private teamsService = new TeamsService()

  getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAll()
    successResponse(res, teams)
  }

  getById = async (req: Request, res: Response) => {
    const teamFebId = req.params.teamFebId as string
    const team = await this.teamsService.getById(teamFebId)
    successResponse(res, team)
  }
}
