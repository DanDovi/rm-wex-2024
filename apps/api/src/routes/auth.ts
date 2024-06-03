import { Router, Request, Response, NextFunction } from "express";
import { authController } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/users", authMiddleware, authController.allUsers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Necessary for express error handling
router.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = err as { status: number; message: string };

  res.status(error.status || 500);
  res.json({
    status: error.status || 500,
    message: error.message,
  });
});

export default router;
