import express from 'express'
import * as auth from '../../controllers/v1/auth.controller';

const router = express.Router();

router.route('/login').post(auth.login);

export default router
