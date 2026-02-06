import { Router } from "express"
import { healthController } from "./health.controller.js"
import { asyncHandler } from "../../../app/middlewares/asyncHandler.js"

const healthRouter = Router()

healthRouter.get("/", asyncHandler(healthController))

export const healthRoutes = { router: healthRouter, path: "/healthz" }
