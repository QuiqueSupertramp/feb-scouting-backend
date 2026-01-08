import { successResponse } from "../../../../app/responses/index.js"
import { TeamsService } from "./teams.service.js"
import type { Request, Response } from "express"

export class TeamsController {
  teamsService = new TeamsService()
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamsService.getAll()
    successResponse(res, teams)
  }
}
