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
      const result = await postService.createPost({
        topicId: req.params.topicId,
        ...req.body,
      });
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

  static async commentsByPost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.commentsByPost({ id: req.params.id });
      res.json({
        status: 200,
        message: "Comments by Post fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }

  static async updatePostByIdVote(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await postService.updatePostVote({
        postId: req.params.postId,
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

  static async newComment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postService.newComment({
        postId: req.params.postId,
        ...req.body,
      });
      res.json({
        status: 200,
        message: "Comment created successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { postController };
