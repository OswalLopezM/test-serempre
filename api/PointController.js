import express, { Router, Request } from 'express';
import admin from 'firebase-admin';
import crypto from 'crypto'
import { body, param, validationResult } from 'express-validator'


const db = admin.firestore();
const router = Router()

router.post('/', 
    body('idUser').not().isEmpty().trim().escape(), 
    body('quatity').not().isEmpty().trim().escape(), 
    body('reason').not().isEmpty().trim().escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let quatity = req.body.quatity;
        let reason = req.body.reason;
        let idUser = req.body.idUser;
        const data = { quatity, reason };
        const ref = await db.collection('users').doc(idUser).collection('point').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch(e) {
        res.status(500).json(e.message)

    }
});

router.put('/:id', 
    param('id').not().isEmpty().trim().escape(),
    body('idUser').not().isEmpty().trim().escape(), 
    body('quantity').not().isEmpty().trim().escape(), 
    body('reason').not().isEmpty().trim().escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let id = req.params.id;
        let quantity = req.body.quantity;
        let reason = req.body.reason;
        let idUser = req.body.idUser;
        if (!id) throw new Error('id is blank');
        const data = { quantity, reason };
        const ref = await db.collection('users').doc(idUser).collection('point').doc(id).set(data, { merge: true });
        res.json({
            id,
            data
        });
    } catch(e) {
        res.status(500).json(e.message)
    }
});

router.delete('/:userId/:pointId', 
    param('userId').not().isEmpty().trim().escape(),
    param('pointId').not().isEmpty().trim().escape(),async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.params.userId;
        const pointId = req.params.pointId;
        await db.collection('users').doc(userId).collection('point').doc(pointId).delete();
        res.json({
            pointId
        });
    } catch(e) {
        res.status(500).json(e.message)
    }
});

export default router;