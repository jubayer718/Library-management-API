"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_controller_1 = require("./app/controller/books.controller");
const errorHandler_1 = require("./app/middleware/errorHandler");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const notFound_1 = require("./app/middleware/notFound");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', books_controller_1.booksRouter);
app.use('/api', borrow_controller_1.borrowRoutes);
app.use("/", (req, res) => {
    res.send("Library management api running");
});
// not found handler
app.use(notFound_1.notFound);
// Global error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
