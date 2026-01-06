import { Router } from "express"
import health from "./health/health.routes.js"

const apiRouter = Router()

apiRouter.use(health.path, health.router)

export default apiRouter
