"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
exports.transactionRouter = (0, express_1.Router)();
exports.transactionRouter.route("/rented").post(transaction_controller_1.bookIssued);
exports.transactionRouter.route("/returned").post(transaction_controller_1.bookReturned);
exports.transactionRouter.route("/totalRent").get(transaction_controller_1.totalRentGenrated);
