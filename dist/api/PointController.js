'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _firebaseAdmin = require('firebase-admin');var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);
var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _expressValidator = require('express-validator');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const db = _firebaseAdmin2.default.firestore();
const router = (0, _express.Router)();

router.post('/',
(0, _expressValidator.body)('idUser').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('quatity').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('reason').not().isEmpty().trim().escape(), (() => {var _ref = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let quatity = req.body.quatity;
            let reason = req.body.reason;
            let idUser = req.body.idUser;
            const data = { quatity, reason };
            const ref = yield db.collection('users').doc(idUser).collection('point').add(data);
            res.json({
                id: ref.id,
                data });

        } catch (e) {
            res.status(500).json(e.message);

        }
    });return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};})());

router.put('/:id',
(0, _expressValidator.param)('id').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('idUser').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('quantity').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('reason').not().isEmpty().trim().escape(), (() => {var _ref2 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let id = req.params.id;
            let quantity = req.body.quantity;
            let reason = req.body.reason;
            let idUser = req.body.idUser;
            if (!id) throw new Error('id is blank');
            const data = { quantity, reason };
            const ref = yield db.collection('users').doc(idUser).collection('point').doc(id).set(data, { merge: true });
            res.json({
                id,
                data });

        } catch (e) {
            res.status(500).json(e.message);
        }
    });return function (_x4, _x5, _x6) {return _ref2.apply(this, arguments);};})());

router.delete('/:userId/:pointId',
(0, _expressValidator.param)('userId').not().isEmpty().trim().escape(),
(0, _expressValidator.param)('pointId').not().isEmpty().trim().escape(), (() => {var _ref3 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = req.params.userId;
            const pointId = req.params.pointId;
            yield db.collection('users').doc(userId).collection('point').doc(pointId).delete();
            res.json({
                pointId });

        } catch (e) {
            res.status(500).json(e.message);
        }
    });return function (_x7, _x8, _x9) {return _ref3.apply(this, arguments);};})());exports.default =

router;