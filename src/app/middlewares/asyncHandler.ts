import type { Request, Response, NextFunction } from "express"

export type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const asyncHandler =
  (fn: AsyncController) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
