//Dependencies
import { model, Schema, Document} from 'mongoose'

//Schema usuarioSRPA
const schema = new Schema({
    first_name : { type : String },
    last_name : { type : String },
    identification : { type : String , minlength:8, maxlength:10 },
    date_born : { type : String },
    address : { type : String },
    photo_path : { type : String }
});

interface ISRPA_User extends Document{
    first_name : string,
    last_name : string,
    identification : string,
    date_born : string,
    address : string,
    photo_path : string
}

//Creating and exporting the model
export default model<ISRPA_User>('usuarioSRPA', schema);