//Dependencies
import { model, Schema, Document} from 'mongoose'

//Schema usuarioSRPA
const schema = new Schema({
    first_name : { type : String , require },
    last_name : { type : String , require },
    identification : { type : String , minlength:8, maxlength:10 , require},
    date_born : { type : String , require },
    age : { type : Number },
    gender : { type : String , default : 'No definido'},
    scholar : { type : String, defualt : 'Ninguno'},
    occupation : { type : String , default : 'Ninguno'},
    address : { type : String , default : 'Ninguno'},
    phone_number : { type : String , minlength:8, maxlength:10, default : '00000000'},
    parent_1 : { type : String , default : 'No aplica'},
    parent_2 : { type : String , default : 'No aplica'},
    health : { type : String , default : 'Normal'},
    attention_mode : { type : String , default : "No aplica"},
    photo_path : { type : String }
});

interface ISRPA_User extends Document{
    first_name : string,
    last_name : string,
    identification : string,
    date_born : string,
    age : Number,
    gender : string,
    scholar : string,
    occupation : string,
    address : string,
    phone_number : string,
    parent_1 : string,
    parent_2 : string,
    health : string,
    attention_mode : { type : string },
    photo_path : string
}

//Creating and exporting the model
export default model<ISRPA_User>('usuarioSRPA', schema);