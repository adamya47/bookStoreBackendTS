import { Router } from "express";
import { getAllUsers,getAllBooks, getTransactions } from "../controllers/helper.controller";

export const helperRouter=Router();

helperRouter.route("/allUsers").get(getAllUsers)
helperRouter.route("/allBooks").get(getAllBooks)
helperRouter.route("/allTransactions").get(getTransactions)
