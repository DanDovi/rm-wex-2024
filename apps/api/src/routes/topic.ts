import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", topicController.allTopics);
router.get("/:id", topicController.topicById);
router.get("/:id/posts", topicController.postsByTopicId);

export default router;
