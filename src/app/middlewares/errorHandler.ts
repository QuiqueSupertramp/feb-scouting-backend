import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/apiError.js"

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
      details: err.details,
    })
    return
  }

  res.status(500).json({
    success: false,
    status: 500,
    message: "Internal server error",
  })
}
