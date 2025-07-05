import express from 'express';
import cors from 'cors';
import { booksRouter } from './app/controller/books.controller';
import { errorHandler } from './app/middleware/errorHandler';


const app = express();


app.use(cors());
app.use(express.json())


app.use('/api', booksRouter)


// Global error handler
app.use(errorHandler);


export default app;