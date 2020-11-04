import { connect} from 'mongoose'

//IF in staging mode
if(process.env.NODE_ENV != 'production'){ 
    require('dotenv').config(); 
}

export async function DBConnection(){
    try {
        await connect(<string>process.env.DATABASE_URI, { 
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useFindAndModify : false
        });
        console.log("Database Connected");
    } catch (error) {
        console.log('Error :', error);
    }    
} 