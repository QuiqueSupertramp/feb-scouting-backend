import { Router } from "express"
import { ScoresController } from "./scores.controller.js"

const scoresRouter = Router()
const scoresController = new ScoresController()

scoresRouter.get("/:teamFebId", scoresController.getByTeamId)

export default { router: scoresRouter, path: "/scores" }
