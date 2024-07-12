import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, topicController.allTopics);
router.get("/:id", authMiddleware, topicController.topicById);
router.post("/:topicId/posts", authMiddleware, topicController.postsByTopicId);
router.post("/create", authMiddleware, topicController.createTopic);

export default router;
