import { Router } from "express";
import { bookIssued,bookReturned,totalRentGenrated } from "../controllers/transaction.controller";


export const transactionRouter=Router();

transactionRouter.route("/rented").post(bookIssued)
transactionRouter.route("/returned").post(bookReturned)
transactionRouter.route("/totalRent").get(totalRentGenrated)
