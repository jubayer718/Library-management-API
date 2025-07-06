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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_services_1 = require("../services/borrow.services");
exports.borrowRoutes = express_1.default.Router();
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowData = req.body;
    const result = yield (0, borrow_services_1.createBorrowIntoDB)(borrowData);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: result,
    });
});
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, borrow_services_1.getBorrowedBooks)();
    res.status(201).json({
        success: true,
        message: "Borrowed book retrieve successfully",
        data: result,
    });
});
exports.borrowRoutes.post('/borrow', createBorrow);
exports.borrowRoutes.get('/borrow', getBorrow);
