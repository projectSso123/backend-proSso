import express from "express";
import jwt  from "jsonwebtoken"
import { getAccessCode } from "../controlers/access.controler.js";
import { getAuthCode } from "../controlers/access.controler.js";

const router = express.Router();

router.route('/v1/login').post(getAuthCode)
router.route('/v1/access_token').post(getAccessCode)
export default router;