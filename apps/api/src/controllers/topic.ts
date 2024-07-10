import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { topicService } from "../services/topic";
import { ErrorWithStatus } from "../types/error";

class topicController {
  static async allTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await topicService.allTopics();
      res.json({
        status: 200,
        message: "All topics fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { topicController };
