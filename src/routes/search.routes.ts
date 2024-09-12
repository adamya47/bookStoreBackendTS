import { Router } from "express"
import {searchBooks,getBooksByRentRange,filterBooks} from "../controllers/search.controllers"


export const searchRouter=Router();

searchRouter.route("/byName").get(searchBooks)
searchRouter.route("/byRange").get(getBooksByRentRange)
searchRouter.route("/filterBooks").get(filterBooks)