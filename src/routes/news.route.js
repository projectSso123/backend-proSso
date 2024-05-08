import express from 'express'
import { addNews } from '../controlers/super.admin.js';
import { getNews ,updateNews} from '../controlers/super.admin.js';
import { addnews } from '../controlers/news.controller.js';
import { getnews  } from '../controlers/news.controller.js';
const router = express.Router();
router.route('/v1/broadcast/addnews').post(addNews)
router.route('/v1/broadcast/getnews').post(getNews)
router.route('/v1/broadcast/updatenews').post(updateNews)
router.route('/v1/addnews').post(addnews)
router.route('/v1/getnews').post(getnews)
export default router;