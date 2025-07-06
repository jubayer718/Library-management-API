"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowValidation = void 0;
const zod_1 = require("zod");
exports.borrowValidation = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number().min(1, "Minimum 1 copy must be borrowed"),
    dueDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
});
