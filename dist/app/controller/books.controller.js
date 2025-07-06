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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const booksModel_1 = require("../models/booksModel");
const books_validation_1 = require("../zodValidation/books.validation");
exports.booksRouter = express_1.default.Router();
//create books routes
exports.booksRouter.post("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate request body with zod
        const booksInfo = yield books_validation_1.bookValidation.parseAsync(req.body);
        //save to mongodb
        const createBook = yield booksModel_1.Book.create(booksInfo);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createBook
        });
    }
    catch (error) {
        // Automatically handled by global error handler
        next(error);
    }
}));
// get all books
exports.booksRouter.get("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10" } = req.query;
        const query = {};
        //  Filtering by genre
        if (filter) {
            query.genre = filter;
        }
        //  Sorting order
        const sortOrder = sort === "asc" ? 1 : -1;
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder;
        //  Limit
        const resultLimit = parseInt(limit, 10) || 10;
        //  Fetch from MongoDB with filter, sort, and limit
        const books = yield booksModel_1.Book.find(query).sort(sortOptions).limit(resultLimit);
        res.status(200).json({
            success: true,
            message: "All books fetched successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
// get book by id
exports.booksRouter.get("/books/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield booksModel_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book,
        });
    }
    catch (error) {
        next(error); // pass to global error handler
    }
}));
// update book
exports.booksRouter.patch("/books/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const body = yield books_validation_1.bookValidation.parseAsync(req.body);
        const updateData = yield booksModel_1.Book.findByIdAndUpdate({ _id: bookId }, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Book data updated successfully",
            data: updateData
        });
    }
    catch (error) {
        next(error);
    }
}));
// delete book
exports.booksRouter.delete("/books/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedData = yield booksModel_1.Book.findByIdAndDelete({ _id: bookId });
        if (deletedData) {
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
