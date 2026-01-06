import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/apiError.js"

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    })
    return
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}
