import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { searchService } from "../services/search";
import { ErrorWithStatus } from "../types/error";


class searchController {
  static async searchPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await searchService.searchPosts(req.body);
      res.json({
        status: 200,
        message: "All posts matching search fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { searchController }