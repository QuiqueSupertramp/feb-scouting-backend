import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/apiError.js"
import { LOGGER } from "../logger.js"

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const isApiError = err instanceof ApiError
  const status = isApiError ? err.statusCode : 500
  const message = isApiError ? err.message : "Internal server error"
  const details = isApiError ? err.details : undefined

  LOGGER.error([`status: ${status}`, `message: ${message}`, ["details:", details], ["error:", err]])

  res.status(status).json({
    success: false,
    status,
    message,
    details,
  })
}
