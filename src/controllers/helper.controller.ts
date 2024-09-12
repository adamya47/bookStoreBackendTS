import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";


const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const users = await User.find().select('-password'); 
  
      
      if (!users || users.length === 0) {
        throw new ApiError(404, 'No users found');
      }
      res.status(200).json(new ApiResponse(200, users, 'Users fetched successfully'));
    } catch (error) {
      next(error);
    }
  });

const getAllBooks=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
 
    try {
        const books=await Book.find();

        if(!books || books.length===0){
            throw new ApiError(404,"No Books found")
        }
        res.status(200).json(new ApiResponse(200,books,"Books Fetched!"))
        
    } catch (error) {
        next(error);
    }

})


export {getAllBooks,getAllUsers}
  