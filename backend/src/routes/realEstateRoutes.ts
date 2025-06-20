import { Router } from "express";
import { createRealEstateVideo } from "../controllers/realEstateController";

const router = Router();
router.post("/", createRealEstateVideo);

export default router;
