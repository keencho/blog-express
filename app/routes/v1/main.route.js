import express from 'express'
import * as main from '../../controllers/v1/main.controller'

const router = express.Router();

router.route('/listMain').get(main.listMain);

export default router
