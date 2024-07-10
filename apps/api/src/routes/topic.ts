import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, topicController.allTopics);
router.post("/:id/posts", authMiddleware, topicController.createPost);
router.get("/:id", authMiddleware, topicController.topicById);
router.get("/:id/posts", authMiddleware, topicController.postsByTopicId);

export default router;
