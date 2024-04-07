import express from 'express'

import { registerclient } from '../controlers/client.controler.js   ';
import { getkeyandsecret } from '../controlers/client.controler.js';
import { verifyclient } from '../controlers/client.controler.js';
const router = express.Router();
router.route("/v1/registerclient").post(registerclient)
router.route("/v1/getkey").post(getkeyandsecret)
router.route("/v1/verfiyclient").post(verifyclient)
export default router