import { Router } from "express"
import health from "./health/health.routes.js"
import teams from "./modules/teams/teams.routes.js"
import scores from "./modules/scores/scores.routes.js"

const apiRouter = Router()

apiRouter.use(health.path, health.router)
apiRouter.use(teams.path, teams.router)
apiRouter.use(scores.path, scores.router)

export default apiRouter
