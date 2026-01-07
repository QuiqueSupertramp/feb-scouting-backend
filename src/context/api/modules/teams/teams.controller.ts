import type { Request, Response } from "express"
import { successResponse } from "../../../../app/responses/index.js"
import { TeamsService } from "./teams.service.js"
import { scrapGame } from "../../../scrap/games/index.js"

export class TeamsController {
  teamsService = new TeamsService()
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    // const teams = await this.teamsService.getAll()
    // successResponse(res, teams)

    const x = await scrapGame("2484047")
    successResponse(res, x)
  }
}
