import { Router } from "express"
import { GameTeamStatsController } from "./gameTeamStats.controller.js"
import { cacheMiddleware } from "../../../../../app/middlewares/cache.js"

const gameTeamStatsRouter = Router()
const gameTeamStatsController = new GameTeamStatsController()

gameTeamStatsRouter.get("/", cacheMiddleware(), gameTeamStatsController.getAll)
gameTeamStatsRouter.get("/:teamFebId", cacheMiddleware(), gameTeamStatsController.getById)

export default { router: gameTeamStatsRouter, path: "/team-stats" }
