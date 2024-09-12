"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helperRouter = void 0;
const express_1 = require("express");
const helper_controller_1 = require("../controllers/helper.controller");
exports.helperRouter = (0, express_1.Router)();
exports.helperRouter.route("/allUsers").get(helper_controller_1.getAllUsers);
exports.helperRouter.route("/allBooks").get(helper_controller_1.getAllBooks);
