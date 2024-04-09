import express from 'express'
import { addNotification } from '../controlers/super.admin.js';
import { getNotifications } from '../controlers/super.admin.js';
import { addnotification } from '../controlers/news.controller.js';
import { getnotification } from '../controlers/news.controller.js';
const router = express.Router();
router.route('/v1/broadcast/addnotification').post(addNotification)
router.route('/v1/broadcast/getnotification').post(getNotifications)
router.route('/v1/getnotification').post(addnotification)
router.route('/v1/getnotification').post(getnotification)
export default router;