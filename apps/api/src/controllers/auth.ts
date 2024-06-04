import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import { authService } from "../services/auth";
import { ErrorWithStatus } from "../types/error";

class authController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.registerUser(req.body);
      res.json({
        status: 200,
        message: "User registered successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.loginUser(req.body);
      res.json({
        status: 200,
        message: "User logged in successfully",
        data: result,
      });
    } catch (e) {
      next(createHttpError(401, "Login failed"));
    }
  }

  static async allUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.allUsers();
      res.json({
        status: 200,
        message: "All users fetched successfully",
        data: result,
      });
    } catch (e) {
      const error = e as ErrorWithStatus;
      next(createHttpError(error.status, error.message));
    }
  }
}

export { authController };
