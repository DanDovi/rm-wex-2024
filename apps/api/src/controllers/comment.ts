import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { commentService } from "../services/comment";
import { ErrorWithStatus } from "../types/error";

class commentController {
  static async updateCommentByIdVote(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await commentService.updateCommentVote({
        commentId: req.params.id,
        ...req.body,
      });
      res.json({
        status: 200,
        message: "Comment vote count updated successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { commentController };
