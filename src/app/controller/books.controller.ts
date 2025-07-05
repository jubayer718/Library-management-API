import express, { Request, Response } from 'express';
import { Book } from '../models/booksModel';
import { bookValidation } from '../zodValidation/books.validation';


export const booksRouter = express.Router();

booksRouter.post("/books", async (req: Request, res: Response) => {
  try {
    const booksInfo = await bookValidation.parseAsync(req.body)
  const book = await Book.create(booksInfo);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    book
  })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid books",
      error
    }) 
 }
})