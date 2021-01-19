import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken( req : Request | any, res : Response, next : NextFunction){
    let statusCode , result;
    
    if(!req.headers.authorization){
        statusCode = 401;
        result = "Acceso no autorizado";
        res.status(statusCode).json(result);
    } else {
        
        const token = req.headers.authorization.split(' ')[1];

        if(token === "null"){
            statusCode = 401;
            result = "Acceso no autorizado";
            res.status(statusCode).json(result);
        } else {
            try {
                const payload:any = jwt.verify(token ,<string> process.env.SECRETKEY);
                req.userLogged = payload;
                next();

            } catch (error) {
                res.status(403).json("El token ha expirado"); 
            }
        }
        
        
    }
}
