import express from "express";
import { providerController } from "./provider.controller";

const router = express.Router();

//! get  review for homepage
router.get("/home", providerController.getProviderForHome);

// ! get single provider details
router.get("/:id", providerController.getSingleProvider);

export const providerRouter = router;
