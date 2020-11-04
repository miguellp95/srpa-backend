//Dependencies
import { model, Schema, Document} from 'mongoose'

//Schema Employee
const schema = new Schema({
    id_employee : { type : String },
    identification : { type : String , minlength:8, maxlength:10 },
    first_name : { type : String },
    last_name : { type : String },
    date_born : { type : String , maxlength : 10 },
    phone_number : { type : String , minlength : 10,  maxlength : 10 },
    email : { type : String },
    address : { type : String , maxlength : 50 },
    charge : { type : String },
    state : { type : Boolean, default : true }, 
    password : { type : String }
});

interface IEmployee extends Document{
    id_employee : string,
    identification : string,
    first_name : string,
    last_name : string,
    date_born : string,
    phone_number : string,
    email : string,
    address : string,
    charge : string,
    state : boolean, 
    password :string
}

//Creating and exporting the model
export default model<IEmployee>('employee', schema);