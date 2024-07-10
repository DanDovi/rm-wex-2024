import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, topicController.allTopics);

export default router;
