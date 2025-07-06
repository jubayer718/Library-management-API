"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooks = exports.createBorrowIntoDB = void 0;
const booksModel_1 = require("../models/booksModel");
const borrowModel_1 = require("../models/borrowModel");
const createBorrowIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // static method implementation
    const book = yield booksModel_1.Book.findById(payload.book);
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.copies < payload.quantity) {
        throw new Error("Insufficient book stock");
    }
    book.copies -= payload.quantity;
    if (book.copies === 0) {
        book.available = false;
    }
    // instance method implementation
    yield book.save();
    // static method implementation
    const result = yield borrowModel_1.Borrow.create(payload);
    return result;
});
exports.createBorrowIntoDB = createBorrowIntoDB;
const getBorrowedBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrowModel_1.Borrow.aggregate([
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
    return result;
});
exports.getBorrowedBooks = getBorrowedBooks;
