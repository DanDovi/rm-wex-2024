import { Router } from "express";

import { postController } from "../controllers/post";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, postController.allPosts);
router.get("/:id", authMiddleware, postController.postById);
router.post("/:postId/vote", authMiddleware, postController.updatePostByIdVote);
router.post("/:postId/comments", authMiddleware, postController.newComment);

export default router;
