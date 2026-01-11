import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('QuickResume Server is running');
});

import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});