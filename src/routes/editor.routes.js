import express from "express";
import { verifyToken } from "../middleware/jwt.verify.js";

import { Addnews ,Addnotification } from "../controlers/editor.control.js";
const router = express.Router()
router.route('/v1/client/addnews').post(verifyToken,Addnews)
router.route('/v1/client/addnotification').post(verifyToken,Addnotification)
export default router;