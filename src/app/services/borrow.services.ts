import { TBorrow } from '../interfaces/borrow.interface';
import { Book } from '../models/booksModel';
import { Borrow } from '../models/borrowModel';


export const createBorrowIntoDB = async (payload: TBorrow) => {
  // static method implementation
  const book = await Book.findById(payload.book);
  if (!book) {
    throw new Error ("Book not found")
  }
  if (book.copies < payload.quantity) {
    throw new Error ("Insufficient book stock")
  }
  book.copies -= payload.quantity;
  if (book.copies === 0) {
    book.available = false
  }

  // instance method implementation
  await book.save();

  // static method implementation
  const result = await Borrow.create(payload);
  return result;

}

export const getBorrowedBooks = async () => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },

    {
      $unwind: "$bookDetails",
    },

    {
      $project: {
        _id: 0,
        book: "$_id",
        totalQuantity: 1,
        bookDetails: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
      },
    },
  ]);
  return result
}


