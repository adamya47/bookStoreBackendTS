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
exports.deleteBook = exports.getTransactions = exports.getAllUsers = exports.getAllBooks = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const ApiError_1 = require("../utilities/ApiError");
const ApiResponse_1 = require("../utilities/ApiResponse");
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const transactions_model_1 = require("../models/transactions.model");
const getAllUsers = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select('-password');
        if (!users || users.length === 0) {
            throw new ApiError_1.ApiError(404, 'No users found');
        }
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, users, 'Users fetched successfully'));
    }
    catch (error) {
        next(error);
    }
}));
exports.getAllUsers = getAllUsers;
const getAllBooks = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.Book.find();
        if (!books || books.length === 0) {
            throw new ApiError_1.ApiError(404, "No Books found");
        }
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, books, "Books Fetched!"));
    }
    catch (error) {
        next(error);
    }
}));
exports.getAllBooks = getAllBooks;
const getTransactions = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTrans = yield transactions_model_1.Transaction.find();
        if (!allTrans || allTrans.length === 0)
            throw new ApiError_1.ApiError(400, "no transactions found");
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, allTrans, "All transactions obtained"));
    }
    catch (error) {
        next(error);
    }
}));
exports.getTransactions = getTransactions;
const deleteBook = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookname } = req.body;
        if (!bookname) {
            throw new ApiError_1.ApiError(400, "Please give the bookname ,to be deleted");
        }
        const deletedBook = yield book_model_1.Book.findOneAndDelete({ bookname });
        if (!deletedBook) {
            throw new ApiError_1.ApiError(400, "No book found or unable to delete the book");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, deleteBook, "Book deleted !"));
    }
    catch (error) {
        next(error);
    }
}));
exports.deleteBook = deleteBook;
