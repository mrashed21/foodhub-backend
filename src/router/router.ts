import { categoryRouter } from "@/modules/category/category.route";
import { menuRouter } from "@/modules/menu/menu.route";
import { userRouter } from "@/modules/user/user.route";
import { Router } from "express";

const router = Router();

// category route
router.use("/category", categoryRouter);

// user route
router.use("/user", userRouter);

// menu route
router.use("/menu", menuRouter);
export default router;
