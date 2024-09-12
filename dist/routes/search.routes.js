"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = require("express");
const search_controllers_1 = require("../controllers/search.controllers");
exports.searchRouter = (0, express_1.Router)();
exports.searchRouter.route("/byName").get(search_controllers_1.searchBooks);
exports.searchRouter.route("/byRange").get(search_controllers_1.getBooksByRentRange);
exports.searchRouter.route("/filterBooks").get(search_controllers_1.filterBooks);
