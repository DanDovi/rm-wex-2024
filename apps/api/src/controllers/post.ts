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
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.createPost(req.body);
      res.json({
        status: 200,
        message: "Post created successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
  static async postsByTopicId(req: Request, res: Response, next: NextFunction) {
    console.log(req.params["topicId"])
    try {
      const result = await postService.postsByTopicId({topicId: req.params["topicId"]});
      res.json({
        status: 200,
        message: "Posts by ID fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }

  static async postById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.postById({ id: req.params["id"] });
      res.json({
        status: 200,
        message: "Posts by ID fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { postController };
