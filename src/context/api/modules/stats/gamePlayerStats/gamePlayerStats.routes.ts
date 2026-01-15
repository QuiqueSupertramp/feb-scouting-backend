import { Router } from "express"
import { cacheMiddleware } from "../../../../../app/middlewares/cache.js"
import { GamePlayerStatsController } from "./gamePlayerStats.controller.js"

const gamePlayerStatsRouter = Router()
const gamePlayerStatsController = new GamePlayerStatsController()

gamePlayerStatsRouter.get("/ranking", cacheMiddleware(), gamePlayerStatsController.getRanking)

export default { router: gamePlayerStatsRouter, path: "/player-stats" }
