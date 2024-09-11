import { Request,Response,NextFunction } from "express";


export const asyncHandler=(fn:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>{

return (req:Request,res:Response,next:NextFunction)=>{

    Promise.resolve(fn).catch(next); //next helps to catch the error and pass it to the error handling e
};

};

