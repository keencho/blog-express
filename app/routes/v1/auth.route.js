import express from 'express'
import * as auth from '../../controllers/v1/auth.controller';
import {check, validationResult} from 'express-validator';
import JsonResult from '../../utils/json.utils';

const router = express.Router();

router.route('/login').post(
    check('adminId')
        .exists()
        .withMessage('admin id가 없습니다.'),
    check('adminPw')
        .exists()
        .withMessage('admin pw가 없습니다.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return JsonResult.fail(res, errors.array());
        }

        next();
    },
    auth.login
);

export default router
