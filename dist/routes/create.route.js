"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const create_controller_1 = require("../controllers/create.controller");
exports.createRouter = (0, express_1.Router)();
exports.createRouter.route("/userCreate").post(create_controller_1.userCreate);
exports.createRouter.route("/bookCreate").post(create_controller_1.bookCreate);
