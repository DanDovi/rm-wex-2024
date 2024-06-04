import express, { Request, Response } from "express";
import createError from "http-errors";

import prisma from "../prisma";
import authRoutes from "./auth";

type ErrorWithStatus = Error & { status: number };

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users.map((user) => ({ username: user.email })));
});

router.use(async (req, res, next) => {
  next(createError.NotFound("Route not found."));
});

router.use(
  async (err: ErrorWithStatus, req: Request, res: Response): Promise<void> => {
    console.error("handling error");
    res.status(err.status || 500);
    res.json({
      status: err.status || 500,
      message: err.message,
    });
  },
);

export default router;
