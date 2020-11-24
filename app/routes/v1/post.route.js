import express from 'express'
import * as post from '../../controllers/v1/post.controller'
import {check, header, validationResult} from 'express-validator';
import JsonResult from '../../utils/json.utils';
import jwtObj from "../../config/jwt";

const router = express.Router();

router.route('/write').post(
    header([jwtObj.sessionName])
        .exists()
        .withMessage('관리자 토큰이 존재하지 않습니다.'),
    check('title')
        .exists()
        .withMessage('제목 파라미터가 없습니다.'),
    check('tags')
        .exists()
        .withMessage('태그 파라미터가 없습니다.'),
    check('path')
        .exists()
        .withMessage('접근 경로파라미터가 없습니다.'),
    check('summary')
        .exists()
        .withMessage('요약 파라미터가 없습니다.'),
    check('contents')
        .exists()
        .withMessage('컨텐츠 파라미터가 없습니다.'),
    (req, res, next) => {
        chkError(req, res, next);
    },
    post.write
);
router.route('/delete').post(
    check('_id')
        .exists()
        .withMessage('id 파라미터가 없습니다.'),
    (req, res, next) => {
        chkError(req, res, next);
    },
    post.del
);
router.route('/get').get(
    check('path')
        .exists()
        .withMessage('경로 파라미터가 없습니다.'),
    (req, res, next) => {
        chkError(req, res, next);
    },
    post.get
)
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
        chkError(req, res, next);
    },
    post.list
);
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
        chkError(req, res, next);
    },
    post.listInfiniteScroll);
router.route('/listAll').get(post.listAll);

const chkError = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return JsonResult.fail(res, errors.array());
    }

    next();
}

export default router
