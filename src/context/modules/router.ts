import { Router } from "express"
import health from "./health/health.routes.js"
import teams from "./teams/teams.routes.js"

const apiRouter = Router()

apiRouter.use(health.path, health.router)
apiRouter.use(teams.path, teams.router)

export default apiRouter
