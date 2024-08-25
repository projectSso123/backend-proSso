import { upload } from "../middleware/multer.middleware.js";
import express from 'express'
import { addBanner,getBanners,deletebanner } from "../controlers/banner.controller.js";
const router = express.Router();
router.route("/v1/broadcast/addbanner").post(upload.single('banner'),addBanner)
router.route("/v1/broadcast/getbanner").post(getBanners)
router.route("/v1/broadcast/deletebanner").post(deletebanner)
export default router