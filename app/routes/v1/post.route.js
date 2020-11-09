import express from 'express'
import * as post from '../../controllers/v1/post.controller'
import {check, validationResult} from 'express-validator';
import JsonResult from '../../utils/json.utils';

const router = express.Router();

router.route('/create').post(post.create);
router.route('/list').get(
    check('start')
        .exists()
        .withMessage('start 파라미터가 없습니다.')
        .isNumeric()
        .withMessage('start 파라미터는 숫자형 이어야 합니다.'),
    check('limit')
        .exists()
        .withMessage('limit 파라미터가 없습니다.')
        .isNumeric()
        .withMessage('limit 파라미터는 숫자형 이어야 합니다.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return JsonResult.fail(res, errors.array());
        }

        next();
    },
    post.list);
router.route('/listInfiniteScroll').get(
    check('start')
        .exists()
        .withMessage('start 파라미터가 없습니다.')
        .isNumeric()
        .withMessage('start 파라미터는 숫자형 이어야 합니다.'),
    check('limit')
        .exists()
        .withMessage('limit 파라미터가 없습니다.')
        .isNumeric()
        .withMessage('limit 파라미터는 숫자형 이어야 합니다.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return JsonResult.fail(res, errors.array());
        }

        next();
    },
    post.listInfiniteScroll);
router.route('/listAll').get(post.listAll);

export default router
