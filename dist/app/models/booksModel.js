"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booksSchema_1 = require("../schemas/booksSchema");
exports.Book = mongoose_1.default.model("Book", booksSchema_1.bookSchema);
