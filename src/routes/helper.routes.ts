import { Router } from "express";
import { getAllUsers,getAllBooks } from "../controllers/helper.controller";

export const helperRouter=Router();

helperRouter.route("/allUsers").get(getAllUsers)
helperRouter.route("/allBooks").get(getAllBooks)
