import express, { Request, Response } from 'express';
import cors from 'cors';
import { booksRouter } from './app/controller/books.controller';
import { errorHandler } from './app/middleware/errorHandler';
import { borrowRoutes } from './app/controller/borrow.controller';
import { notFound } from './app/middleware/notFound';


const app = express();


app.use(cors());
app.use(express.json())


app.use('/api', booksRouter)
app.use('/api', borrowRoutes)

app.use("/", (req: Request, res: Response) => {
  res.send("Library management api running")
})

// not found handler
app.use(notFound)


// Global error handler
app.use(errorHandler);



export default app;