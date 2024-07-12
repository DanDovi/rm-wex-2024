import { Router } from "express";

import { searchController } from "../controllers/search";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, searchController.searchPosts);

export default router;