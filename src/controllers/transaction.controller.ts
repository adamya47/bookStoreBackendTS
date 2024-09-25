import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { Transaction } from "../models/transactions.model";

const bookIssued=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

try {
    const{bookname,username,issueDate}=req.body

    if(!bookname|| !username || !issueDate){
        throw new ApiError(400,"Input of paramters is incomplete")
    }

    const parseIssueDate=new Date(issueDate);//matlab issueDate is a string and we want it to be a Date object cause of database condition 

    if(isNaN(parseIssueDate.getTime())){ //if issueDate is invalid so this will not be a number to check that
        throw new ApiError(400,"Invalid date obtained ")
    }

    const user=await User.findOne({username});
    if(!user){
        throw new ApiError(400,"Invalid user")
    }
   


    
    const book=await Book.findOne({bookname});
    if(!book){
        throw new ApiError(400,"Invalid book")
    }
    

const transaction=await Transaction.create({
    bookId:book._id,userId:user._id,issueDate:parseIssueDate,status:'rented'
})

if(!transaction){
    throw new ApiError(400,"Some issue while saving the transaction")
}

return res.status(201).json(new ApiResponse(201,transaction,"Book finally rented"))

    
} catch (error) {
    next(error);
}

})

const bookReturned=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const{bookname,username,returnDate}=req.body
    
        if(!bookname|| !username || !returnDate){
            throw new ApiError(400,"Input of paramters is incomplete")
        }
    
        const parseReturnDate=new Date(returnDate);
    
        if(isNaN(parseReturnDate.getTime())){ 
            throw new ApiError(400,"Invalid date obtained ")
        }
    
        const user=await User.findOne({username});
    
        if(!user){
            throw new ApiError(400,"Invalid user")
        }
       
    
    
        
        const book=await Book.findOne({bookname});
        if(!book){
            throw new ApiError(400,"Invalid book")
        }
        
        const rentedBookTrans =await Transaction.findOne({
            userId:user._id,bookId:book._id,status:"rented"
        })
        
    
    
    
    if(!rentedBookTrans){
        throw new ApiError(400,"no rented book found with the given info")
    }
     
    rentedBookTrans.returnDate=parseReturnDate;
    rentedBookTrans.status="returned";


    //calulating rent for book 
    const rentPerDay=book.rentPerDay;
    const issueDate=rentedBookTrans.issueDate
    const daysRented = Math.ceil((parseReturnDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24)); //getTime() gives in millisecond 
                                                                                                             //Math.ceil() rounds up to neared integer
    const totalRent = daysRented * rentPerDay;
    
    rentedBookTrans.totalRentGenerated=totalRent;

    await rentedBookTrans.save();

    return res.status(201).json(new ApiResponse(201,rentedBookTrans,"Book returned"))
    
        
    } catch (error) {
        next(error);
    }
    
    })

const totalRentGenrated=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const{bookname}=req.body;

        if(!bookname){
            throw new ApiError(400,"Give proper input");
        }

        const book=await Book.findOne({bookname})

     if(!book){
        throw new ApiError(400,"No matching book found");
     }
     
     const transactionData=await Transaction.aggregate([
         {$match:{bookId:book._id}},//in this stage ,sari books mil gayi with same id
         {$group:{_id:null,totalRentGenerated:{$sum:"$totalRentGenerated"}}} //we did sum of all the transaction have similar bookid 
     ])

     if(!transactionData || transactionData.length===0){
        throw new ApiError(400,"No transaction in record");
     }
     
     const totalRent = transactionData[0].totalRentGenerated;

     return res.status(200).json(new ApiResponse(200,totalRent,"Rent generated in rupees done.")) 

    } catch (error) {
        next(error)
    }
})

const totalNoOfRentedAndReturned=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const{startDate,endDate}=req.query;

        if(!startDate || !endDate){
            throw new ApiError(400,"All the Inputs not obtained");
        }
        const start=new Date(startDate as string);
        const end=new Date(endDate as string)

        if(isNaN(start.getTime()) || isNaN(end.getTime())){
            throw new ApiError(400,"Inputs not valid");
        }

        const totalTransaction=await Transaction.find({

            $or:[
                {issueDate:{$gte:start ,$lte:end}},
                {returnDate:{$gte:start,$lte:end}}
            ]

        });

        if(!totalTransaction  || totalTransaction.length===0){
            throw new ApiError(400,"No transaction or not able to find any transaction")
        }

       const totalRentedBooks=totalTransaction.filter((val)=>val.status ==="rented" && val.issueDate>=start && val.issueDate<=end).length;
       const totalReturnedBooks=totalTransaction.filter((val)=>val.status==="returned").length
  
       if(!totalRentedBooks && !totalReturnedBooks){
        throw new ApiError(500,"Some issue from server side")
       }

       return res.status(200).json(new ApiResponse(200,{total_num_of_Rented:totalRentedBooks,
                                                 total_num_of_returned:totalReturnedBooks })) ;

 
    } catch (error) {
        next(error);
    }




})


export{bookIssued,bookReturned,totalRentGenrated,totalNoOfRentedAndReturned}