import mongoose from "mongoose";
import { IBook } from "../interfaces/books.interface";

export const bookSchema = new mongoose.Schema<IBook>(
  {
    title: { type: String, trim:true, required: [true, "title is required"] },
    author: { type: String, required: [true, "author is required"] },
    genre: { type: String, required: [true, "genre is required"] },
    isbn: { type: String, required: [true, "isbn is required"] },
    description: { type: String},
    copies: { type: Number, required: [true, "copies is required"] },
    available: {
      type: Boolean,
      required: [true, "available value is required"],
    },
  },
  { timestamps: true }

)