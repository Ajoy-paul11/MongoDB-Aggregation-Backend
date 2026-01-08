import { Router } from "express";
import {
    addisYoung,
    userAgeCategory,
    addCompanyRegion,
    companyEmailDomain
} from "../controllers/aggregation05.controller.js";


const router = Router();


router.route("/isyoung").get(addisYoung);
router.route("/age-category").get(userAgeCategory);
router.route("/company-region").get(addCompanyRegion);
router.route("/check-email-domain").get(companyEmailDomain);

export default router;