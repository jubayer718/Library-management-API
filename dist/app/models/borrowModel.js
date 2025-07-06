"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema_1 = require("../schemas/borrowSchema");
exports.Borrow = mongoose_1.default.model("Borrow", borrowSchema_1.BorrowSchema);
