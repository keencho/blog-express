import express from 'express'
import * as sidebar from '../../controllers/v1/sidebar.controller';

const router = express.Router();

router.route('/getData').get(sidebar.getData);

export default router
