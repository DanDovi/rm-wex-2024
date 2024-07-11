import { Router } from "express";

import { postController } from "../controllers/post";
import { authMiddleware } from "../middleware/auth";
import { postService } from "../services/post";

const router = Router();

router.get("/", authMiddleware, postController.allPosts);
router.get("/:id", authMiddleware, postController.postById);
router.post("/:topicId/posts", authMiddleware, postController.createPost);
router.post("/:id/vote", authMiddleware, postService.updatePostVote);

export default router;
