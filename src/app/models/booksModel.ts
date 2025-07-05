import mongoose from "mongoose";
import { bookSchema } from "../schemas/booksSchema";
import { IBook } from "../interfaces/books.interface";

export const Book = mongoose.model<IBook>("Book", bookSchema);