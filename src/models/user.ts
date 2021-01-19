//Dependencies
import { model, Schema, Document, Types} from 'mongoose'

//Schema User
const schema = new Schema({
    id_employee : { type : Types.ObjectId },
    cc_employee :  { type : String },
    email : { type : String }, 
    password : { type : String },
    role : { type : String },
    state : { type : Boolean, default : true }, 
}, { timestamps : true });

interface IUser extends Document{
    id_employee ? : string,
    cc_employee : string,
    email : string,
    password : string,
    role : string,
    state : boolean
}

//Creating and exporting the model
export default model<IUser>('User', schema);