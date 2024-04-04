import express from 'express'

import { registerclient } from '../controlers/client.controler.js   ';

const router = express.Router();
router.route("/v1/registerclient").post(registerclient)
export default router