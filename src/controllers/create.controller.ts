import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";

const userCreate=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

console.log("reached");
try {
    const{username,password}=req.body;
    if(!username || !password){
        throw new ApiError(400,"User credentials required")
    }


    const existedUser=await User.findOne({username})
 
    if(existedUser){
        throw new ApiError(400,"Another User with same username already exists")
    }


    const user=await User.create({
        username,password
    })


const userReturned=await User.findById(user._id).select("-password");

if(!userReturned){
    throw new ApiError(500,"some issue while saving user Data");
}
    res.status(200).json(new ApiResponse(200,userReturned,"Successfully created user"))
    
} catch (error) {
    console.error(error)
    throw new ApiError(400,"Some issue happend while creating user")
}

})

const bookCreate=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

   
        const { bookname, category, rentPerDay } = req.body;
        
        if(!bookname || !category || !rentPerDay ){
            throw new ApiError(400,"Enter all information about the book");
        }

        const book=await Book.create({
            bookname,category,rentPerDay
        })

        if(!book){
            throw new ApiError(500,"Some issue while saving book info")
        }

        return res.status(201).json(new ApiResponse(201,book,"Successfully entered data"))
        
    

})

export {userCreate,bookCreate}