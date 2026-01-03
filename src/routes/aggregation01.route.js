import { Router } from "express";
import { getActiveUsers, registeredBeforeSixteen } from "../controllers/aggregation01.controller.js";


const router = Router();

router.route("/active-users").get(getActiveUsers);
router.route("/registered-before").get(registeredBeforeSixteen);

export default router;