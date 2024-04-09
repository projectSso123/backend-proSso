import express from 'express'
import { addNotification } from '../controlers/super.admin.js';
import { getNotifications } from '../controlers/super.admin.js';

const router = express.Router();
router.route('/v1/broadcast/addnotification').post(addNotification)
router.route('/v1/broadcast/getnotification').post(getNotifications)
export default router;