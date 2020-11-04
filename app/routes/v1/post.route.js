import express from 'express'
import * as post from '../../controllers/v1/post.controller'

const router = express.Router();

router.route('/create').post(post.create);
router.route('/list').get(post.list);
router.route('/listAll').get(post.listAll);

export default router
