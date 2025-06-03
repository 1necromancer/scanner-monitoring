import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello to Dashboard!");
});

router.get('/users', async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const data = req.body;
        const ref = await db.collection('users').add(data);
        res.status(201).json({ id: ref.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
