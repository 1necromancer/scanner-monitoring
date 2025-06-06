import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import monitoringRoutes from './routes/monitoringRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Scanner Monitoring!");
});
app.use('/api/v1/monitoring/', monitoringRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
