import express from "express";
import { getAccessCode } from "../controlers/access.controler.js";
import { getAuthCode } from "../controlers/access.controler.js";
import { Signup } from "../controlers/access.controler.js";
import { Signin } from "../controlers/access.controler.js";
import { getusers } from "../controlers/access.controler.js";

const router = express.Router();
router.route('/v1/getusers').post(getusers)
router.route('/v1/getauthcode').post(getAuthCode)
router.route('/v1/access_token').post(getAccessCode)
router.route('/v1/signup').post(Signup)
router.route('/v1/signin').post(Signin)
export default router;