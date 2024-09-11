

import { ModuleSource } from 'module';
import mongoose, { Document, Schema, Model } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  transactions: mongoose.Types.ObjectId[];  
}


const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true, 
  },

  password: {
    type: String,
    required: true,
  },
  transactions: [{
    type: mongoose.Types.ObjectId,
    ref: 'Transaction',
  }],
 
});


const User:Model<IUser>= mongoose.model<IUser>('User', userSchema);
export { User, IUser };
