import { categoryRouter } from "@/modules/category/category.route";
import { Router } from "express";

const router = Router();

// category route
router.use("/category", categoryRouter);

export default router;
