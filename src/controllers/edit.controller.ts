import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { Request,Response,NextFunction } from "express";
import { Book } from "../models/book.model";


const editBookName=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,newName}=req.body;

        if(!name || !newName){
            throw new ApiError(400,"Name not obtained")

        }

        const check=await Book.findOne({bookname:name});

        if(!check){
        throw new ApiError(400,"No matching book")

        }
       
        check.bookname=newName;

        const updatedBook=await check.save();
        
        if(!updatedBook){
            throw new ApiError(500,"Some error while updating book")
        }

        return res.status(200).json(new ApiResponse(200,updatedBook,"Book updated Successfully"))

        
    } catch (error) {
        next(error);
    }


});

const editBookCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,newCat}=req.body;

        if(!name || !newCat){
            throw new ApiError(400,"Name not obtained")

        }

        const check=await Book.findOne({bookname:name});

        if(!check){
        throw new ApiError(400,"No matching book")

        }
       
        check.category=newCat;

        const updatedBook=await check.save();
        
        if(!updatedBook){
            throw new ApiError(500,"Some error while updating book category")
        }

        return res.status(200).json(new ApiResponse(200,updatedBook,"Book updated Successfully"))

        
    } catch (error) {
        next(error);
    }


});

export {editBookName,editBookCategory}
