import { Router } from "express";

import {
    countEachTag,
    getCommonTag,
    getUsersMoreTag,
    addTagCount
} from "../controllers/aggregation03.controller.js";


const router = Router()

router.route("/count-tag").get(countEachTag);
router.route("/common-tag").get(getCommonTag);
router.route("/more-tag").get(getUsersMoreTag);
router.route("/add-tag").get(addTagCount);


export default router;