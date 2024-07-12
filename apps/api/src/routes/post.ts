import { Router } from "express";

import { commentController } from "../controllers/comments";
import { postController } from "../controllers/post";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, postController.allPosts);
router.get("/:id", postController.postById);
router.get("/", authMiddleware, commentController.allComments);
router.get("/:id", commentController.commentById);

export default router;