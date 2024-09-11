import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { app } from './app';

;(
 async()=>{
   try {
   
    const res=  await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`);
     console.log("DB CONNECTED TO DB HOST :",res.connection.host);
     app.listen(process.env.PORT || 3000,()=>console.log("APP IS LISTENING TO PORT",process.env.PORT || 3000));



   } catch (error) {
    console.log("DB CONNECTION FAILED=>",error)
    process.exit(1);
   }
  



 }

)()