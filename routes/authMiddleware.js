import dotenv from 'dotenv';
dotenv.config();

export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next(); // Proceed if the key is valid
};
