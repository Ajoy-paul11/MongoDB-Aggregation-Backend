import { Router } from "express";
import {
    usersStatusType,
    avgAgePerGender,
    usersPerCountry,
    getTopUsers,
    usersInfo
} from "../controllers/aggregation02.controller.js";

const router = Router();

router.route("/status-type").get(usersStatusType);
router.route("/avg-age").get(avgAgePerGender);
router.route("/per-country").get(usersPerCountry);
router.route("/get-top").get(getTopUsers);
router.route("/age-info").get(usersInfo);


export default router;