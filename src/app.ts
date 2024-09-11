import express, {Request,Response, NextFunction } from "express";
import cors from "cors";
import { ApiError } from "./utilities/ApiError";

export const app=express();

app.use(cors());

app.use(express.json({          //to make incoming data available in req.body
    limit:"16kb"
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" })) ; //for url payload 



//routes
















app.use((err:unknown,req:Request,res:Response,next:NextFunction)=>{
   
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({message:err.message})
    }

    if (err instanceof Error) {
        
        console.error(err.message);
        
      } else {
        
        console.error('An unknown error occurred');
      }
    

    return res.status(500).json({message:"Some internal server error"})

})

