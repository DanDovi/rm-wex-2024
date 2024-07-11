import { Router } from "express";

import { commentController } from "../controllers/comment";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/:id/vote",
  authMiddleware,
  commentController.updateCommentByIdVote,
);

export default router;
