import express, { Request, Response } from 'express';
import { createBorrowIntoDB, getBorrowedBooks } from '../services/borrow.services';
export const borrowRoutes = express.Router();



 const createBorrow = async (req: Request, res: Response) => {
  const borrowData = req.body;
  const result = await createBorrowIntoDB(borrowData);
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
};


const getBorrow = async(req:Request, res:Response) => {
  const result = await getBorrowedBooks();

  res.status(201).json({
    success: true,
    message: "Borrowed book retrieve successfully",
    data: result,

  })
}

borrowRoutes.post('/borrow', createBorrow);
borrowRoutes.get('/borrow',getBorrow)