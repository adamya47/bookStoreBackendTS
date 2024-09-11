import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { User } from "../models/user.model";

const userCreate=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{


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


export {userCreate}