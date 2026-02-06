import type { Request, Response } from "express"
import { successResponse } from "../../../app/responses/index.js"

export const healthController = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log("ℹ️ Health ok")
    successResponse(res, { status: "ok" })
  } catch (error) {
    console.log("❌ Health Error")
    console.log("error:", error)
  }
}
