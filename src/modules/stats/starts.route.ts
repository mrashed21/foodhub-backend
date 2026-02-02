import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import express from "express";
import { statsController } from "./starts.controller";
const router = express.Router();

//! get all stats for provider
router.get(
  "/provider",
  authMiddleWare(UserRole.provider),
  statsController.getStatsForProvider,
);

// ! get all stats for admin
router.get("/admin", authMiddleWare(UserRole.admin), statsController.getStats);

export const statsRouter = router;
