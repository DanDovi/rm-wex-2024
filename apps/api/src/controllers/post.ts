import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { postService } from "../services/post";
import { ErrorWithStatus } from "../types/error";

class postController {
  static async allPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.allPosts();
      res.json({
        status: 200,
        message: "All posts fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { postController };
