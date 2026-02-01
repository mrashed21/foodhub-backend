import { categoryRouter } from "@/modules/category/category.route";
import { menuRouter } from "@/modules/menu/menu.route";
import { orderRouter } from "@/modules/order/order.route";
import { profileRouter } from "@/modules/profile/profile.route";
import { providerRouter } from "@/modules/provider/provider.route";
import { reviewRouter } from "@/modules/review/review.route";
import { userRouter } from "@/modules/user/user.route";
import { Router } from "express";

const router = Router();

// category route
router.use("/category", categoryRouter);

// user route
router.use("/user", userRouter);

// menu route
router.use("/menu", menuRouter);

// order route
router.use("/order", orderRouter);

// review router
router.use("/review", reviewRouter);

// provider router
router.use("/provider", providerRouter);

// profile router
router.use("/profile", profileRouter);

export default router;
