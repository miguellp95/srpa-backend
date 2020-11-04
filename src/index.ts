import app from './app';

import { DBConnection } from './database';


async function main(){
    try {

        DBConnection();
        
        await app.listen(app.get('port'));
        console.log('Server on port ', app.get('port'));
        
    } catch (error) {
        console.log("error : " , error);
    }
}

main();