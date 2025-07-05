import express from 'express';
import cors from 'cors';
import { booksRouter } from './app/controller/books.controller';
const app = express();


app.use(cors());
app.use(express.json())


app.use('/api', booksRouter)


export default app;