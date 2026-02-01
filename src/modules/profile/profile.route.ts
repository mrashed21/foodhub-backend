import authMiddleWare from "@/middleware/auth-middleware";
import express from "express";
import { profileController } from "./profile.controller";

const router = express.Router();

router.patch(
  "/",
  authMiddleWare(),
  profileController.updateMyProfile,
);

export const profileRouter = router;
