"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); //next helps to catch the error and pass it to the error handling e
    };
};
exports.asyncHandler = asyncHandler;
