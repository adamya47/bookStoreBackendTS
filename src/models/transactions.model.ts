import mongoose,{Document,Model,Schema} from "mongoose";

interface ITransaction extends Document{

    bookId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    issueData:Date;
    returnData ?:Date;
    status:'rented'|'returned'

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
    }


})

const Transaction:Model<ITransaction>=mongoose.model<ITransaction>("Transaction",transactionSchema)


export {Transaction,ITransaction}