import mongoose,{Document,Model,Schema} from "mongoose";

interface IBook extends Document{
    bookname:string,
    category:string,
    rentPerDay:number
}


const bookSchema:Schema=new Schema({
    bookname:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true,
    }
})


const Book:Model<IBook>=mongoose.model<IBook>("Book",bookSchema)


export {Book,IBook}