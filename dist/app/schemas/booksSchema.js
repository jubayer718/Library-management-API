"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true, versionKey: false });
// ! pre hook middleware
exports.bookSchema.pre("save", function (next) {
    console.log(`Saving book: ${this.title}, Copies: ${this.copies}`);
    next();
});
// ! post hook middleware
exports.bookSchema.post("save", function (doc, next) {
    console.log(`The title of book is "${doc.title}" is saved.`);
    next();
});
