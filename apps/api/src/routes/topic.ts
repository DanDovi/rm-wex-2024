import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", topicController.allTopics);
router.post("/:id/posts", topicController.createPost);

export default router;
