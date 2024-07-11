import { Router } from "express";

import { postController } from "../controllers/post";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, postController.allPosts);
router.get("/:id", postController.postById);

export default router;
