import { Router } from "express";

import { postController } from "../controllers/post";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, postController.allPosts);
router.get("/:id", postController.postById);
router.post("/:topicId/posts", authMiddleware, postController.createPost);

export default router;
