import { Router } from "express";
import { editBookCategory,editBookName } from "../controllers/edit.controller";

export const editRouter=Router();

editRouter.route("/bookname").post(editBookName)
editRouter.route("/category").patch(editBookCategory)
