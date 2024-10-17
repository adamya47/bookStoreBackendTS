import express, {Request,Response, NextFunction } from "express";
import cors from "cors";
import { ApiError } from "./utilities/ApiError";

export const app=express();



app.use(cors())



//option for preFlight request,imp for browser to determine if cookies can be sent

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin','https://mental-health-wallah-mhw.vercel.app');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH,OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200); 
});




app.use(express.json({          //to make incoming data available in req.body
    limit:"16kb"
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" })) ; //for url payload 



//router Import
import { createRouter } from "./routes/create.route";
import { searchRouter } from "./routes/search.routes";
import { transactionRouter } from "./routes/transaction.route";
import { helperRouter } from "./routes/helper.routes";
import { editRouter } from "./routes/edit.routes";

//route

app.use("/api/v1/create",createRouter)
app.use("/api/v1/search",searchRouter)
app.use("/api/v1/transaction",transactionRouter)
app.use("/api/v1/helper",helperRouter)
app.use("/api/v1/edit",editRouter)




app.get("/",(req:Request,res:Response)=>res.json({status:"Ok Working"}))

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

