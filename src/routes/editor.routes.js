import express from "express";
import { verifyToken } from "../middleware/jwt.verify.js";

import { Addnews ,Addnotification,Getnews,Getapplication } from "../controlers/editor.control.js";
import { addeditor } from "../controlers/access.controler.js";
const router = express.Router()
router.route('/v1/client/addnews').post(verifyToken,Addnews)
router.route('/v1/client/addnotification').post(verifyToken,Addnotification)
router.route('/v1/client/getnews').post(verifyToken,Getnews)
router.route('/v1/client/getnotification').post(verifyToken,Getapplication)
router.route('/v1/addeditor').post(addeditor)
export default router;