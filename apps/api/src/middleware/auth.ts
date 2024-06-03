import { verifyAccessToken } from "../utils/jwt";
import createHttpError from "http-errors";

import { NextFunction, Request, Response } from "express";

type RequestWithPayload = Request & { payload?: unknown };

const authMiddleware = async (
  req: RequestWithPayload,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    return next(createHttpError.Unauthorized("Unauthorized"));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(createHttpError.Unauthorized("Unauthorized"));
  }

  try {
    const payload = await verifyAccessToken(token);
    req.payload = payload;
    next();
  } catch (e) {
    next(createHttpError.Unauthorized("Unauthorized"));
  }
};

export { authMiddleware };
