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
exports.editBookCategory = exports.editBookName = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const ApiError_1 = require("../utilities/ApiError");
const ApiResponse_1 = require("../utilities/ApiResponse");
const book_model_1 = require("../models/book.model");
const editBookName = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, newName } = req.body;
        if (!name || !newName) {
            throw new ApiError_1.ApiError(400, "Name not obtained");
        }
        const check = yield book_model_1.Book.findOne({ bookname: name });
        if (!check) {
            throw new ApiError_1.ApiError(400, "No matching book");
        }
        check.bookname = newName;
        const updatedBook = yield check.save();
        if (!updatedBook) {
            throw new ApiError_1.ApiError(500, "Some error while updating book");
        }
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, updatedBook, "Book updated Successfully"));
    }
    catch (error) {
        next(error);
    }
}));
exports.editBookName = editBookName;
const editBookCategory = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, newCat } = req.body;
        if (!name || !newCat) {
            throw new ApiError_1.ApiError(400, "Name not obtained");
        }
        const check = yield book_model_1.Book.findOne({ bookname: name });
        if (!check) {
            throw new ApiError_1.ApiError(400, "No matching book");
        }
        check.category = newCat;
        const updatedBook = yield check.save();
        if (!updatedBook) {
            throw new ApiError_1.ApiError(500, "Some error while updating book category");
        }
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, updatedBook, "Book updated Successfully"));
    }
    catch (error) {
        next(error);
    }
}));
exports.editBookCategory = editBookCategory;
