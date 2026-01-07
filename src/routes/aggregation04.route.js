import { Router } from "express";
import {
    getUsersbyYear,
    getUsersPerCountry,
    usersRegisteredInQuarter,
    getUserByDate
} from "../controllers/aggregation04.controller.js";


const router = Router()


router.route("/userinyear").get(getUsersbyYear);
router.route("/dateandcountry").get(getUsersPerCountry);
router.route("/quarteruser").get(usersRegisteredInQuarter);
router.route("/getuserbydate").get(getUserByDate);


export default router;