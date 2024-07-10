import { Router } from "express";

import { topicController } from "../controllers/topic";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", topicController.allTopics);
router.get("/:id", topicController.topicById);

export default router;
