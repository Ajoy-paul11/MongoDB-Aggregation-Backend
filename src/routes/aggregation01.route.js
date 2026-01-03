import { Router } from "express";
import {
    getActiveUsers,
    registeredBeforeSixteen,
    ageBucket,
    filterUsers,
    tagUsers
} from "../controllers/aggregation01.controller.js";


const router = Router();

router.route("/active-users").get(getActiveUsers);
router.route("/registered-before").get(registeredBeforeSixteen);
router.route("/find-age").get(ageBucket);
router.route("/filter-user").get(filterUsers);
router.route("/more-tags").get(tagUsers);

export default router;