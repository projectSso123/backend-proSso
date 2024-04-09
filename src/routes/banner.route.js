import { upload } from "../middleware/multer.middleware.js";
import express from 'express'
import { addBanner } from "../controlers/banner.controller.js";
const router = express.Router();
router.route("/v1/broadcast/addbanner").post(upload.single('banner'),addBanner)
export default router