import { Request, Response } from "express"; 

import path from 'path';
import fs from 'fs-extra'

//Models
import srpa_user_model from '../models/srpa-user'; 

export async function index(req: Request, res : Response){
    //Search for srpa users on DB
    const SRPA_users = await srpa_user_model.find({});
    return res.status(200).json(SRPA_users);
}

export async function create_srpa_user(req: Request, res: Response) {
    let statusCode, result;

    //Obtaining data retrieved from DB

    const photo = req.file;

    //Find if already exists
    const srpa_users = await srpa_user_model.find({
        identification: req.body.identification,
    });

    if (srpa_users.length > 0) {
        statusCode = 400;
        result = "El usuario SRPA ya se encuentra registrado";
    } else {
        const srpa_users_object = req.body;
        console.log(req.body)
        srpa_users_object.photo_path = req.file.path;

        const new_srpa_user = new srpa_user_model(srpa_users_object);

        try {
            await new_srpa_user.save();
            statusCode = 200;
            result = "srpa user saved";
        } catch (error) {
            statusCode = 400;
            result = error;
        }
    }

    if (statusCode == 400) await fs.unlink(path.resolve(req.file.path));

    res.status(statusCode).json(result);
}

export async function delete_srpa_user(req : Request, res : Response){
    let id: string | boolean = req.params.id;
    let statusCode, message;

    id = typeof(id) == 'string' && id.trim().length > 23 ? id : false;

    if(id){

        try {
            const result = await srpa_user_model.findByIdAndDelete(id);
            if(result){
                await fs.unlink(path.resolve(result.photo_path));
                statusCode = 200;
                message = "Usuario SRPA eliminado.";
            } else {
                statusCode = 400;
                message = "Usuario SRPA no existe."
            }
        } catch (error) {
            statusCode = 500;
            message = 'Error eliminado al usuario SRPA  << >> ' +error;
        }
        
    } else {
        statusCode = 400;
        message = "El id no es válido.";
    }
    res.status(statusCode).json(message);

};

export async function update_srpa_user(req  : Request, res : Response){
    
    let { id } = req.params;

    let statusCode, message = null;

    if(id){

        const SRPA_users = await srpa_user_model.findById(id);
        
        if(SRPA_users){
        
            const payload = req.body; 
            const photo_to_remove = SRPA_users.photo_path;

            if(payload.first_name)
                SRPA_users.first_name = payload.first_name;
            
            if(payload.last_name)
            SRPA_users.last_name = payload.last_name;

            if(payload.date_born)
                SRPA_users.date_born = payload.date_born;
            
            if(payload.address)
                SRPA_users.address = payload.address;
        
            if(req.file){
                SRPA_users.photo_path = req.file.path;
                await fs.unlink(path.resolve(photo_to_remove));
            }

            try {
                await SRPA_users.save();
                
                statusCode = 200;
                message = "Actualización exitosa."
                
            } catch (error) {
                statusCode = 500;
                message = "Error de Servidor || Actualización fallida."
            }

        } else {
            statusCode = 400;
            message = "No se puede actualizar. Usuario SRPA no registrado.";
        } 
    } else {
        statusCode = 400;
        message = "La identificación no existe o es inválida";
    }
    
    if(statusCode == 400 || statusCode == 500) await fs.unlink(path.resolve(req.file.path));
    res.status(statusCode).json(message);
};

export async function get_one_srpa_user(req : Request, res : Response){
    let id : string | boolean = req.params.id;
    let statusCode, message = null;

    id = typeof(id) == 'string' && id.trim().length > 20 ? id.trim() : false;

    if(id){

        const SRPA_users = await srpa_user_model.findOne({_id : id});

        if(SRPA_users){
            statusCode = 200;
            message = SRPA_users;
        } else {
            statusCode = 400;
            message = "No se encontraron resultados."
        }
    } else {
        statusCode = 400;
        message = "El id no es válido";    
    }
    
    res.status(statusCode).json(message);
};