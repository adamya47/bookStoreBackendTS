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
exports.bookCreate = exports.userCreate = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const ApiError_1 = require("../utilities/ApiError");
const ApiResponse_1 = require("../utilities/ApiResponse");
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const userCreate = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reached");
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ApiError_1.ApiError(400, "User credentials required");
        }
        const existedUser = yield user_model_1.User.findOne({ username });
        if (existedUser) {
            throw new ApiError_1.ApiError(400, "Another User with same username already exists");
        }
        const user = yield user_model_1.User.create({
            username, password
        });
        const userReturned = yield user_model_1.User.findById(user._id).select("-password");
        if (!userReturned) {
            throw new ApiError_1.ApiError(500, "some issue while saving user Data");
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, userReturned, "Successfully created user"));
    }
    catch (error) {
        console.error(error);
        throw new ApiError_1.ApiError(400, "Some issue happend while creating user");
    }
}));
exports.userCreate = userCreate;
const bookCreate = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookname, category, rentPerDay } = req.body;
    if (!bookname || !category || !rentPerDay) {
        throw new ApiError_1.ApiError(400, "Enter all information about the book");
    }
    const book = yield book_model_1.Book.create({
        bookname, category, rentPerDay
    });
    if (!book) {
        throw new ApiError_1.ApiError(500, "Some issue while saving book info");
    }
    return res.status(201).json(new ApiResponse_1.ApiResponse(201, book, "Successfully entered data"));
}));
exports.bookCreate = bookCreate;
