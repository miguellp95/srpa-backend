import bcrypt, { hash } from 'bcrypt';

    
export async function hashPassword(pass:string){
    return await bcrypt.hash(pass, 10);
}

export async function comparePassword(pass:string, hashedPass:string){ 
    return await bcrypt.compare(pass, hashedPass);
}
