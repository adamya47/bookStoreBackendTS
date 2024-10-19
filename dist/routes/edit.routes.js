"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRouter = void 0;
const express_1 = require("express");
const edit_controller_1 = require("../controllers/edit.controller");
exports.editRouter = (0, express_1.Router)();
exports.editRouter.route("/bookname").patch(edit_controller_1.editBookName);
exports.editRouter.route("/category").patch(edit_controller_1.editBookCategory);
