import { Router } from "express";
import { createSuplimaxContent } from "../controllers/suplimaxControllers";

const router = Router();

router.post("/", createSuplimaxContent);

export default router;
