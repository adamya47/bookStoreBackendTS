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
exports.totalNoOfRentedAndReturned = exports.totalRentGenrated = exports.bookReturned = exports.bookIssued = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const ApiError_1 = require("../utilities/ApiError");
const ApiResponse_1 = require("../utilities/ApiResponse");
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const transactions_model_1 = require("../models/transactions.model");
const bookIssued = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookname, username, issueDate } = req.body;
        if (!bookname || !username || !issueDate) {
            throw new ApiError_1.ApiError(400, "Input of paramters is incomplete");
        }
        const parseIssueDate = new Date(issueDate); //matlab issueDate is a string and we want it to be a Date object cause of database condition 
        if (isNaN(parseIssueDate.getTime())) { //if issueDate is invalid so this will not be a number to check that
            throw new ApiError_1.ApiError(400, "Invalid date obtained ");
        }
        const user = yield user_model_1.User.findOne({ username });
        if (!user) {
            throw new ApiError_1.ApiError(400, "Invalid user");
        }
        const book = yield book_model_1.Book.findOne({ bookname });
        if (!book) {
            throw new ApiError_1.ApiError(400, "Invalid book");
        }
        const transaction = yield transactions_model_1.Transaction.create({
            bookId: book._id, userId: user._id, issueDate: parseIssueDate, status: 'rented'
        });
        if (!transaction) {
            throw new ApiError_1.ApiError(400, "Some issue while saving the transaction");
        }
        return res.status(201).json(new ApiResponse_1.ApiResponse(201, transaction, "Book finally rented"));
    }
    catch (error) {
        next(error);
    }
}));
exports.bookIssued = bookIssued;
const bookReturned = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookname, username, returnDate } = req.body;
        if (!bookname || !username || !returnDate) {
            throw new ApiError_1.ApiError(400, "Input of paramters is incomplete");
        }
        const parseReturnDate = new Date(returnDate);
        if (isNaN(parseReturnDate.getTime())) {
            throw new ApiError_1.ApiError(400, "Invalid date obtained ");
        }
        const user = yield user_model_1.User.findOne({ username });
        if (!user) {
            throw new ApiError_1.ApiError(400, "Invalid user");
        }
        const book = yield book_model_1.Book.findOne({ bookname });
        if (!book) {
            throw new ApiError_1.ApiError(400, "Invalid book");
        }
        const rentedBookTrans = yield transactions_model_1.Transaction.findOne({
            userId: user._id, bookId: book._id, status: "rented"
        });
        if (!rentedBookTrans) {
            throw new ApiError_1.ApiError(400, "no rented book found with the given info");
        }
        rentedBookTrans.returnDate = parseReturnDate;
        rentedBookTrans.status = "returned";
        //calulating rent for book 
        const rentPerDay = book.rentPerDay;
        const issueDate = rentedBookTrans.issueDate;
        const daysRented = Math.ceil((parseReturnDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24)); //getTime() gives in millisecond 
        //Math.ceil() rounds up to neared integer
        const totalRent = daysRented * rentPerDay;
        rentedBookTrans.totalRentGenerated = totalRent;
        yield rentedBookTrans.save();
        return res.status(201).json(new ApiResponse_1.ApiResponse(201, rentedBookTrans, "Book returned"));
    }
    catch (error) {
        next(error);
    }
}));
exports.bookReturned = bookReturned;
const totalRentGenrated = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookname } = req.body;
        if (!bookname) {
            throw new ApiError_1.ApiError(400, "Give proper input");
        }
        const book = yield book_model_1.Book.findOne({ bookname });
        if (!book) {
            throw new ApiError_1.ApiError(400, "No matching book found");
        }
        const transactionData = yield transactions_model_1.Transaction.aggregate([
            { $match: { bookId: book._id } }, //in this stage ,sari books mil gayi with same id
            { $group: { _id: null, totalRentGenerated: { $sum: "$totalRentGenerated" } } } //we did sum of all the transaction have similar bookid 
        ]);
        if (!transactionData || transactionData.length === 0) {
            throw new ApiError_1.ApiError(400, "No transaction in record");
        }
        const totalRent = transactionData[0].totalRentGenerated;
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, totalRent, "Rent generated in rupees done."));
    }
    catch (error) {
        next(error);
    }
}));
exports.totalRentGenrated = totalRentGenrated;
const totalNoOfRentedAndReturned = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            throw new ApiError_1.ApiError(400, "All the Inputs not obtained");
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new ApiError_1.ApiError(400, "Inputs not valid");
        }
        const totalTransaction = yield transactions_model_1.Transaction.find({
            $or: [
                { issueDate: { $gte: start, $lte: end } },
                { returnDate: { $gte: start, $lte: end } }
            ]
        });
        if (!totalTransaction || totalTransaction.length === 0) {
            throw new ApiError_1.ApiError(400, "No transaction or not able to find any transaction");
        }
        //[] here means key is dynamic
        const dailyData = {};
        totalTransaction.forEach((trans) => {
            if (trans.status === 'rented' && trans.issueDate) {
                const issDate = trans.issueDate.toISOString().split("T")[0]; //toISOStirng for converting Date format to string in ISO format
                //split so that we obtain only date part(it will return array of two splitted parts)
                if (!dailyData[issDate]) {
                    dailyData[issDate] = { rented: 0, returned: 0 };
                }
                dailyData[issDate].rented += 1;
            }
            if ((trans === null || trans === void 0 ? void 0 : trans.returnDate) && trans.status === 'returned') {
                const retDate = trans.returnDate.toISOString().split('T')[0];
                if (!dailyData[retDate]) {
                    dailyData.retDate = { rented: 0, returned: 0 };
                }
                dailyData[retDate].returned += 1;
            }
        });
        if (!dailyData)
            throw new ApiError_1.ApiError(500, "Some issues while obtaing data");
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, dailyData));
    }
    catch (error) {
        next(error);
    }
}));
exports.totalNoOfRentedAndReturned = totalNoOfRentedAndReturned;
