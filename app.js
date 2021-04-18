
import express from 'express';
import cors from 'cors';
import UserController from './api/UserController';
import PointController from './api/PointController';
import methodOverride from 'method-override';
import admin from 'firebase-admin';

const app = express()
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/user', UserController);
app.use('/api/point', PointController);
app.use(methodOverride())
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message });
});


  

export default app;