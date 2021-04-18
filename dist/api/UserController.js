'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _firebaseAdmin = require('firebase-admin');var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);
var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _expressValidator = require('express-validator');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_firebaseAdmin2.default.initializeApp({
    credential: _firebaseAdmin2.default.credential.applicationDefault() });


const db = _firebaseAdmin2.default.firestore();

const router = (0, _express.Router)();

router.post('/',
(0, _expressValidator.body)('email').isEmail(),
(0, _expressValidator.body)('name').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('password').not().isEmpty().trim().escape(), (() => {var _ref = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            if (password) password = _crypto2.default.createHash('md5').update(password).digest("hex");

            const data = { name, email, password };
            const ref = yield db.collection('users').add(data);
            res.json({
                id: ref.id,
                data });

        } catch (e) {
            console.error(e);
            res.status(500).json(e.message);

        }
    });return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};})());

router.put('/:id',
(0, _expressValidator.param)('id').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('email').isEmail(),
(0, _expressValidator.body)('name').not().isEmpty().trim().escape(),
(0, _expressValidator.body)('password').not().isEmpty().trim().escape(), (() => {var _ref2 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let id = req.params.id;
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            if (password) password = _crypto2.default.createHash('md5').update(password).digest("hex");
            const data = { name, email, password };
            const ref = yield db.collection('users').doc(id).set(data, { merge: true });
            res.json({
                id,
                data });

        } catch (e) {
            res.status(500).json(e.message);
        }
    });return function (_x4, _x5, _x6) {return _ref2.apply(this, arguments);};})());

router.delete('/:id',
(0, _expressValidator.param)('id').not().isEmpty().trim().escape(), (() => {var _ref3 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        try {
            const errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const id = req.params.id;
            if (!id) throw new Error('id is blank');
            yield db.collection('users').doc(id).delete();
            res.json({
                id });

        } catch (e) {
            res.status(500).json(e.message);
        }
    });return function (_x7, _x8, _x9) {return _ref3.apply(this, arguments);};})());exports.default =

router;