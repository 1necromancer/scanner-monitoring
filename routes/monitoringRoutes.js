import express from 'express';
import { db } from '../firebase.js';
import { verifyApiKey } from "./authMiddleware.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("Hello to Dashboard!");
});

// POST route to save monitoring data
router.post("/upload", verifyApiKey, async (req, res) => {
    const payload = req.body;

    if (!Array.isArray(payload)) {
        return res.status(400).json({ message: "Payload must be an array" });
    }

    try {
        const batch = db.batch();
        const collectionRef = db.collection("test");

        payload.forEach((item) => {
            const docRef = collectionRef.doc(); // auto-generate ID
            batch.set(docRef, item);
        });

        await batch.commit();
        res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.get("/data", verifyApiKey, async (req, res) => {
    try {
        const snapshot = await db.collection("test").get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching monitoring data:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

export default router;
