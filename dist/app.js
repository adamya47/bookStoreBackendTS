"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ApiError_1 = require("./utilities/ApiError");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
//option for preFlight request,imp for browser to determine if cookies can be sent
exports.app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mental-health-wallah-mhw.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});
exports.app.use(express_1.default.json({
    limit: "16kb"
}));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" })); //for url payload 
//router Import
const create_route_1 = require("./routes/create.route");
const search_routes_1 = require("./routes/search.routes");
const transaction_route_1 = require("./routes/transaction.route");
const helper_routes_1 = require("./routes/helper.routes");
//route
exports.app.use("/api/v1/create", create_route_1.createRouter);
exports.app.use("/api/v1/search", search_routes_1.searchRouter);
exports.app.use("/api/v1/transaction", transaction_route_1.transactionRouter);
exports.app.use("/api/v1/helper", helper_routes_1.helperRouter);
exports.app.get("/", (req, res) => res.json({ status: "Ok Working" }));
exports.app.use((err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof Error) {
        console.error(err.message);
    }
    else {
        console.error('An unknown error occurred');
    }
    return res.status(500).json({ message: "Some internal server error" });
});
