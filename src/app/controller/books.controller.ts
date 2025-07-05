import express, { Request, Response } from 'express';
import { Book } from '../models/booksModel';
import { bookValidation } from '../zodValidation/books.validation';


export const booksRouter = express.Router();

//create books routes

booksRouter.post("/books", async (req: Request, res: Response, next) => {
  try {
    //validate request body with zod
    const booksInfo = await bookValidation.parseAsync(req.body)
    //save to mongodb
  const createBook = await Book.create(booksInfo);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data:createBook
  })
  } catch (error:any) {
   // Automatically handled by global error handler
   next(error);
 }
})