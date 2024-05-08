import express from 'express'

import { registerclient } from '../controlers/client.controler.js   ';
import { getkeyandsecret } from '../controlers/client.controler.js';
import { verifyclient } from '../controlers/client.controler.js';
import { getApplications,getapplication ,getemployees} from '../controlers/client.controler.js';
const router = express.Router();
router.route("/v1/registerclient").post(registerclient)
router.route("/v1/getkey").post(getkeyandsecret)
router.route("/v1/verfiyclient").post(verifyclient)
router.route("/v1/getapplications").post(getApplications)
router.route("/v1/getapplication").post(getapplication)
router.route("/v1/getemployees").post(getemployees)
export default router