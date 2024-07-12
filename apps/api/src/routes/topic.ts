import { Router } from "express";

import { postController } from "../controllers/post";
import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, topicController.allTopics);
router.get("/:id", authMiddleware, topicController.topicById);
router.get("/:topicId/posts", authMiddleware, topicController.postsByTopicId);
router.post("/create", authMiddleware, topicController.createTopic);
router.post("/:topicId/posts", authMiddleware, postController.createPost);

export default router;
