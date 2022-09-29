import express from 'express';
import cors from 'cors';

import { connectServerToDB } from './config/db';
import router from './routes/index.routes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);
connectServerToDB();