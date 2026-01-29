import { categoryRouter } from "@/modules/category/category.route";
import { userRouter } from "@/modules/user/user.route";
import { Router } from "express";

const router = Router();

// category route
router.use("/category", categoryRouter);

// user route
router.use("/user", userRouter);
export default router;
