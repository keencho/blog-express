import express from 'express'
import * as auth from '../../controllers/v1/auth.controller';
import {check, header, validationResult} from 'express-validator';
import JsonResult from '../../utils/json.utils';
import jwtObj from "../../config/jwt";

const router = express.Router();

router.route('/login').post(
    check('adminId')
        .exists()
        .withMessage('admin id가 없습니다.'),
    check('adminPw')
        .exists()
        .withMessage('admin pw가 없습니다.'),
    (req, res, next) => {
        chkError(req, res, next);
    },
    auth.login
);

router.route('/authentication').post(
    header([jwtObj.sessionName])
        .exists()
        .withMessage('헤더에 토근값이 존재하지 않습니다.'),
    (req, res, next) => {
        chkError(req, res, next);
    },
    auth.authentication
);

const chkError = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return JsonResult.fail(res, errors.array());
    }

    next();
}

export default router
