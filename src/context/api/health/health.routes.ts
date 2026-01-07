import { Router } from "express"
import { healthController } from "./health.controller.js"
import { asyncHandler } from "../../../app/middlewares/asyncHandler.js"

const healthRouter = Router()

healthRouter.get("/", asyncHandler(healthController))

export default { router: healthRouter, path: "/healthz" }
