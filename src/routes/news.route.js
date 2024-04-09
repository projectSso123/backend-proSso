import express from 'express'
import { addNews } from '../controlers/super.admin.js';

const router = express.Router();
router.route('/v1/broadcast/addnews').post(addNews)
export default router;