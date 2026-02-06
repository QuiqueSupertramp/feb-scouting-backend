import { Router } from "express"
import { scoreRoutes } from "./modules/scores/scores.routes.js"
import { gamePlayerStatsRoutes } from "./modules/stats/gamePlayerStats/gamePlayerStats.routes.js"
import { healthRoutes } from "./health/health.routes.js"
import { teamsRoutes } from "./modules/teams/teams.routes.js"
import { gameTeamStatsRoutes } from "./modules/stats/gameTeamStats/gameTeamStats.routes.js"

const apiRouter = Router()

apiRouter.use(healthRoutes.path, healthRoutes.router)
apiRouter.use(teamsRoutes.path, teamsRoutes.router)
apiRouter.use(scoreRoutes.path, scoreRoutes.router)
apiRouter.use(gameTeamStatsRoutes.path, gameTeamStatsRoutes.router)
apiRouter.use(gamePlayerStatsRoutes.path, gamePlayerStatsRoutes.router)

export default apiRouter
