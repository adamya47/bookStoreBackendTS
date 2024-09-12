import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";

import { Book } from "../models/book.model";





const searchBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
try {
    
        const {term} = req.query;  
        if (!term) {
          throw new ApiError(400,"term is required");
        }
      
    
          const books = await Book.find({ bookname: { $regex: term, $options: 'i' } });
      
          if (!books || books.length===0) {
            throw new ApiError(404, "No books found with the given term");
          }
          res.status(200).json(new ApiResponse(200, books, "Books found successfully"));
} catch (error) {
    next(error)
}
     
  });


  const getBooksByRentRange = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const { minRent, maxRent } = req.query;
        if (!minRent || !maxRent) {
          throw new ApiError(400, 'Please provide both minRent and maxRent parameters.');
        }
    
        const min = parseFloat(minRent as string);
        const max = parseFloat(maxRent as string);
    
        if (isNaN(min) || isNaN(max)) {
          throw new ApiError(400, 'Invalid range.');
        }
    
        if (min > max) {
          throw new ApiError(400, 'Min rent price cant be greater.');
        }
    
        const books = await Book.find({
          rentPerDay: { $gte: min, $lte: max }
        });
    
        if (books.length === 0) {
          throw new ApiError(404, 'No books found.');
        }
    
        res.status(200).json(new ApiResponse(200, books, 'Books retrieved successfully.'));
      } catch (error) {
        next(error);
      }

    
  };



const filterBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, term, minRent, maxRent } = req.query;
    const minRentValue= minRent ? parseFloat(minRent as string) : undefined;
    const maxRentValue = maxRent ? parseFloat(maxRent as string) : undefined;

    const query:any = {};

    if (category) {
      query.category = { $regex:category as string, $options:'i' };
    }

    if (term) {
      query.bookname = { $regex: term as string, $options: 'i' }; 
    }

    if (minRentValue && maxRentValue) {
      query.rentPerDay = { $gte: minRentValue, $lte: maxRentValue };
    } else if (minRentValue) {
      query.rentPerDay = { $gte: minRentValue };
    } else if (maxRentValue) {
      query.rentPerDay = { $lte: maxRentValue };
    }

    
    const books = await Book.find(query);

    
    res.status(200).json(new ApiResponse(200, books, 'Books successfully obtained.'));
  } catch (error) {
    next(error);
  }
});




  export {searchBooks,getBooksByRentRange,filterBooks}