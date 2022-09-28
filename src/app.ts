import express from 'express';
import cors from 'cors';

import { connectServerToDB } from './config/db';

export const app = express();

app.use(express.json());
app.use(cors());

connectServerToDB();