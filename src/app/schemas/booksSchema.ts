import mongoose from "mongoose";
import { IBook } from "../interfaces/books.interface";


export const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be a non-negative integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey:false }
);