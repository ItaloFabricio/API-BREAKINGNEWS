import express from 'express';
import cors from 'cors';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const app = express();

connectDatabase();
app.use(express.json());
app.use(cors());
app.use(router);

export default app;