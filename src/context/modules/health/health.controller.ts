import type { Request, Response } from "express"
import { successResponse } from "../../../app/responses/index.js"

export const healthController = async (_req: Request, res: Response): Promise<void> => {
  successResponse(res, { status: "ok" })
}
