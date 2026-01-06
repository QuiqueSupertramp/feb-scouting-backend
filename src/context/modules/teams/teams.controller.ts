import type { Request, Response } from "express"
import { successResponse } from "../../../app/responses/index.js"
import { TeamsService } from "./teams.service.js"

export class TeamsController {
  teamsService = new TeamsService()
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamsService.getAll()
    successResponse(res, teams)
  }
}
