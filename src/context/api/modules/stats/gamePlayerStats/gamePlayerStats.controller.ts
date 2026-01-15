import { successResponse } from "../../../../../app/responses/index.js"
import { GamePlayerStatsService } from "./service.js"
import type { Request, Response } from "express"

export class GamePlayerStatsController {
  private gamePlayerStatsService = new GamePlayerStatsService()

  getRanking = async (req: Request, res: Response) => {
    const key = req.query.key as string
    const range = (req.query.range as string | undefined)?.split(",").map((r) => Number(r) ?? 0) as [number, number]

    const stats = await this.gamePlayerStatsService.getRanking(key, range)
    successResponse(res, stats)
  }
}
