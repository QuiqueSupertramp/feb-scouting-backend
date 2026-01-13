import { Router } from "express"
import { ScoresController } from "./scores.controller.js"
import { cacheMiddleware } from "../../../../app/middlewares/cache.js"

const scoresRouter = Router()
const scoresController = new ScoresController()

scoresRouter.get("/classification", cacheMiddleware(), scoresController.getClassification)
scoresRouter.get("/:teamFebId", cacheMiddleware(), scoresController.getByTeamId)

export default { router: scoresRouter, path: "/scores" }
