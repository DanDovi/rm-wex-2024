import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", topicController.allTopics);

export default router;
