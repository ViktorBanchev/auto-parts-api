import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import { types } from 'pg';

dotenv.config();

types.setTypeParser(1700, function(val) {
    return parseFloat(val);
})

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Typescript API for car parts works"})
})

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
})