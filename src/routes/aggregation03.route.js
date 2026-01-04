import { Router } from "express";

import {
    countEachTag,
    getCommonTag,
} from "../controllers/aggregation03.controller.js";


const router = Router()

router.route("/count-tag").get(countEachTag);
router.route("/common-tag").get(getCommonTag);


export default router;