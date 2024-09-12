import mongoose,{Document,Model,Schema} from "mongoose";

interface ITransaction extends Document{

    bookId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    issueDate:Date;
    returnDate ?:Date;
    status:'rented'|'returned';
    totalRentGenerated ?:number

}


const transactionSchema :Schema=new Schema({

    bookId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Book"
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User' 
    },
    issueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['rented', 'returned'],
      required: true
    },
    totalRentGenerated:{
      type:Number,
      default:0
    }


})

const Transaction:Model<ITransaction>=mongoose.model<ITransaction>("Transaction",transactionSchema)


export {Transaction,ITransaction}