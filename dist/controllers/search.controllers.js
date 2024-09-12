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
exports.filterBooks = exports.getBooksByRentRange = exports.searchBooks = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const ApiError_1 = require("../utilities/ApiError");
const ApiResponse_1 = require("../utilities/ApiResponse");
const book_model_1 = require("../models/book.model");
const searchBooks = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term } = req.query;
        if (!term) {
            throw new ApiError_1.ApiError(400, "term is required");
        }
        const books = yield book_model_1.Book.find({ bookname: { $regex: term, $options: 'i' } });
        if (!books || books.length === 0) {
            throw new ApiError_1.ApiError(404, "No books found with the given term");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, books, "Books found successfully"));
    }
    catch (error) {
        next(error);
    }
}));
exports.searchBooks = searchBooks;
const getBooksByRentRange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minRent, maxRent } = req.query;
        if (!minRent || !maxRent) {
            throw new ApiError_1.ApiError(400, 'Please provide both minRent and maxRent parameters.');
        }
        const min = parseFloat(minRent);
        const max = parseFloat(maxRent);
        if (isNaN(min) || isNaN(max)) {
            throw new ApiError_1.ApiError(400, 'Invalid range.');
        }
        if (min > max) {
            throw new ApiError_1.ApiError(400, 'Min rent price cant be greater.');
        }
        const books = yield book_model_1.Book.find({
            rentPerDay: { $gte: min, $lte: max }
        });
        if (books.length === 0) {
            throw new ApiError_1.ApiError(404, 'No books found.');
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, books, 'Books retrieved successfully.'));
    }
    catch (error) {
        next(error);
    }
});
exports.getBooksByRentRange = getBooksByRentRange;
const filterBooks = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, term, minRent, maxRent } = req.query;
        const minRentValue = minRent ? parseFloat(minRent) : undefined;
        const maxRentValue = maxRent ? parseFloat(maxRent) : undefined;
        const query = {};
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }
        if (term) {
            query.bookname = { $regex: term, $options: 'i' };
        }
        if (minRentValue && maxRentValue) {
            query.rentPerDay = { $gte: minRentValue, $lte: maxRentValue };
        }
        else if (minRentValue) {
            query.rentPerDay = { $gte: minRentValue };
        }
        else if (maxRentValue) {
            query.rentPerDay = { $lte: maxRentValue };
        }
        const books = yield book_model_1.Book.find(query);
        res.status(200).json(new ApiResponse_1.ApiResponse(200, books, 'Books successfully obtained.'));
    }
    catch (error) {
        next(error);
    }
}));
exports.filterBooks = filterBooks;
