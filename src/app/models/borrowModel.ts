import mongoose from "mongoose";
import { TBorrow } from "../interfaces/borrow.interface";
import { BorrowSchema } from "../schemas/borrowSchema";

export const Borrow = mongoose.model<TBorrow>("Borrow", BorrowSchema) 