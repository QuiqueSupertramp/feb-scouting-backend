import { Router } from "express"
import { TeamsController } from "./teams.controller.js"

const teamsRouter = Router()
const teamsController = new TeamsController()

teamsRouter.get("/", teamsController.getAll)

export default { router: teamsRouter, path: "/teams" }
