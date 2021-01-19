import {Request, Response } from 'express'; 
import jwt from 'jsonwebtoken';
import User from "../models/user";
import { hashPassword, comparePassword } from '../lib/helper'; 

export async function saveUser (req : Request, res : Response ){
    let statusCode , result ;

    const { email, password, role , cc_employee , id_employee } = req.body;

    if(email && password && role && cc_employee && id_employee){
        
        const user = await User.findOne({ email });

        if(!user){

            const hashedPassword = await hashPassword(password);
    
            const userObj = new User({
                email,
                password : hashedPassword,
                role,
                cc_employee : cc_employee,
                id_employee : id_employee
            });

            try {
                userObj.save();
                statusCode = 200;
                result = "Usuario registrado con exito.";
            } catch (error) {
                statusCode = 500;
                result = { message : "Error de servidor. No fue posible registrar el usuario" + email, error};
            }

        } else {
            statusCode = 400;
            result = "Lo sentimos, el email ya está ocupado por otro usuario."
        }
    } else {
        statusCode = 400;
        result = "Debe llenar todos los campos."
    }
    res.status(statusCode).json(result);
}

export async function updateUser (req : Request, res: Response ){

    let statusCode , result ;
    const { email , password , role , state} = req.body;

    if(email){

        const user = await User.findOne({ email });
        const userObj = { email, role, state};

        if(password) user.password = await hashPassword(password);
        if(role) user.role = role ;
        if(typeof(state) != 'undefined') user.state = !user.state;

        try {
            await user.save();
            statusCode = 200;
            result = "Usuario actualizado con exito";
        } catch (error) {
            statusCode  = 500;
            result = { message : "Error de serividor", error }
        }

    } else {
        statusCode = 400;
        result = "Es obligatorio el email";
    }

    res.status(statusCode).json(result);
}

export async function signin(req : Request , res : Response){
 
    let statusCode , result ;

    const { email, password , role , state } = req.body; 
    const user = await User.findOne({ email });
 
    if( user ){
        
        if(await comparePassword(password, user.password)){
            const payload = { 
                _id : user._id,
                email : user.email,
                role : user.role,
                state : user.state
            };

            statusCode = 200;
            result = { token : jwt.sign(payload, <string> process.env.SECRETKEY , { expiresIn : <string> process.env.TIME_TOKEN_EXPIRES })};
            
        } else {
            statusCode = 401;
            result = "Contraseña incorrecta¡-"
        }

    } else {
        statusCode = 400;
        result = "El correo electrónico no es válido o no existe."
    }

    res.status(statusCode).json(result);

}

export async function getUsers(req : Request, res : Response){
    let statusCode , result ;

    const users = await User.find({});
    if(users.length > 0){
        statusCode = 200;
        result = users;
    } else {
        statusCode = 400;
        result = "No hay registros"
    }

    res.status(statusCode).json(result);
}

export async function getOneUser(req : Request, res : Response){
    let statusCode , result ; 
    const user = await User.findById({ _id : req.params.id});
    if(user){
        statusCode = 200;
        result = user;
    } else {
        statusCode = 400;
        result = "Usuario no existe";
    }
    res.status(statusCode).json(result);
}

export async function deleteUser(req : Request, res : Response){
    let statusCode , result ;
    const user = await User.findById({ _id : req.params.id });
    if(user){
        try {
            user.remove();
            statusCode = 200;
            result = "Usuario eliminado";
        } catch (error) {
            statusCode = 500;
            result = { message : "Error de servidor", error };
        }
    } else {
        statusCode = 400;
        result = "Usuario no existe";
    }
    res.status(statusCode).json(result);
}

export async function getUsersActive(req : Request , res : Response){
    let statusCode , result ;

    let state : boolean | string = req.params.state;

    state = typeof(state) == 'string' && state == 'true' ? true : false;
    

    try {
        const users_active = await User.find({ state });
        if(users_active.length > 0){
            statusCode = 200;
            result = users_active;
        } else {
            statusCode = 400;
            result = "No hay usuarios activos";
        }
    } catch (error) {
        statusCode = 500;
        result = { message : "Error inesperado", error }
    }
    res.status(statusCode).json(result);
}