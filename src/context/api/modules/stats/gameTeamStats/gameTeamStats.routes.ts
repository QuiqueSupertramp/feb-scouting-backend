import { Router } from "express"
import { GameTeamStatsController } from "./gameTeamStats.controller.js"

const gameTeamStatsRouter = Router()
const gameTeamStatsController = new GameTeamStatsController()

gameTeamStatsRouter.get("/:teamFebId", gameTeamStatsController.getById)

export default { router: gameTeamStatsRouter, path: "/team-stats" }
