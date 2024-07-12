import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { commentService } from "../services/comments";
import { ErrorWithStatus } from "../types/error";

class commentController {
  static async allComments(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await commentService.allComments();
      res.json({
        status: 200,
        message: "All comments fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }

  static async commentById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await commentService.commentById({ id: req.params["id"] });
      res.json({
        status: 200,
        message: "Comments by ID fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { commentController };
