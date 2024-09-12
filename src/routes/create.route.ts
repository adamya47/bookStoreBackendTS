import { Router } from "express";
import {userCreate,bookCreate } from "../controllers/create.controller";




export const createRouter=Router();


createRouter.route("/userCreate").post(userCreate);
createRouter.route("/bookCreate").post(bookCreate);

