import express, { Router, Request } from 'express';
import admin from 'firebase-admin';
import crypto from 'crypto'
import { body, param, validationResult } from 'express-validator'

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const router = Router()

router.post('/', 
    body('email').isEmail(), 
    body('name').not().isEmpty().trim().escape(), 
    body('password').not().isEmpty().trim().escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        if  (password) password = crypto.createHash('md5').update(password).digest("hex");
        
        const data = { name, email, password };
        const ref = await db.collection('users').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch(e) {
        console.error(e)
        res.status(500).json(e.message)

    }
});

router.put('/:id', 
    param('id').not().isEmpty().trim().escape(),
    body('email').isEmail(), 
    body('name').not().isEmpty().trim().escape(), 
    body('password').not().isEmpty().trim().escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let id = req.params.id;
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        if  (password) password = crypto.createHash('md5').update(password).digest("hex");
        const data = { name, email, password };
        const ref = await db.collection('users').doc(id).set(data, { merge: true });
        res.json({
            id,
            data
        });
    } catch(e) {
        res.status(500).json(e.message)
    }
});

router.delete('/:id',
    param('id').not().isEmpty().trim().escape(), async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        await db.collection('users').doc(id).delete();
        res.json({
            id
        });
    } catch(e) {
        res.status(500).json(e.message)
    }
});

export default router;