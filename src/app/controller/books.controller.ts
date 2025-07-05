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


// get all books
booksRouter.get("/books", async (req: Request, res: Response, next) => {
  try {
    const { filter, sortBy = "createdAt", sort = "desc", limit = "10" } = req.query;

    const query: any = {};

    //  Filtering by genre
    if (filter) {
      query.genre = filter;
    }

    //  Sorting order
    const sortOrder: any = sort === "asc" ? 1 : -1;
    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder;

    //  Limit
    const resultLimit = parseInt(limit as string, 10) || 10;

    //  Fetch from MongoDB with filter, sort, and limit
    const books = await Book.find(query).sort(sortOptions).limit(resultLimit);

    res.status(200).json({
      success: true,
      message: "All books fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// get book by id
booksRouter.get("/books/:bookId", async (req: Request, res: Response, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error); // pass to global error handler
  }
});

// update book

booksRouter.patch("/books/:bookId", async (req: Request, res: Response, next) => {
  try {
    const { bookId } = req.params;
    const body = await bookValidation.parseAsync(req.body);
    const updateData = await Book.findOneAndUpdate({ _id: bookId }, body, { new: true });
    res.status(200).json({
      success: true,
      message:"Book data updated successfully",
      data:updateData
    })
  } catch (error) {
    next(error)
  }

})
