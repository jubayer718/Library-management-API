import mongoose, { Schema } from "mongoose";
import { TBorrow } from "../interfaces/borrow.interface";

export const BorrowSchema = new mongoose.Schema<TBorrow>({
  book: { type: Schema.Types.ObjectId, ref:"Book", required: true },
  quantity: { type: Number, required: true, min:1 },
  dueDate: { type: Date, required: true }
},
  { timestamps: true }
)