import { Router } from "express"
import { TeamsController } from "./teams.controller.js"
import { cacheMiddleware } from "../../../../app/middlewares/cache.js"

const teamsRouter = Router()
const teamsController = new TeamsController()

teamsRouter.get("/", cacheMiddleware(), teamsController.getAll)
teamsRouter.get("/:teamFebId", cacheMiddleware(), teamsController.getById)

export default { router: teamsRouter, path: "/teams" }
