import { Router } from "express"
import { TeamsController } from "./teams.controller.js"

const teamsRouter = Router()
const teamsController = new TeamsController()

teamsRouter.get("/", teamsController.getAll)
teamsRouter.get("/:teamFebId", teamsController.getById)

export default { router: teamsRouter, path: "/teams" }
