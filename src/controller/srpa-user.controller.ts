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

export async function create_srpa_user(req : Request, res : Response){

    //Obtaining data retrieved from DB
    let { 
        first_name, 
        last_name, 
        identification, 
        date_born, 
        address} = req.body;
    
    const photo  = req.file;
    
    first_name = typeof(first_name) == 'string' && first_name.trim().length > 0 ? first_name.trim() : false;
    last_name = typeof(last_name) == 'string' && last_name.trim().length > 0 ? last_name.trim() : false;
    identification = typeof(identification) == 'string' && identification.trim().length == 10 ? identification.trim() : false;
    date_born = typeof(date_born) == 'string' && date_born.trim().length > 0 ? date_born.trim() : false;
    address = typeof(address) == 'string' && address.trim().length > 0 ? address.trim() : false;

    let statusCode, result ;

    if(first_name && last_name && identification && date_born && address){
        
        //Find if already exists
        const srpa_users = await srpa_user_model.find({identification});

        if(srpa_users.length > 0){
        
            statusCode = 400;
            result = "El usuario SRPA ya se encuentra registrado";
        
        } else {
            
            const srpa_users_object = { first_name, last_name, identification, date_born, address , photo_path : req.file.path};
            
            const new_srpa_user = new srpa_user_model(srpa_users_object);

            try {
                await new_srpa_user.save();
                statusCode = 200;
                result = "srpa user saved"
            } catch (error) {
                statusCode = 400;
                result = error;
            }
        }
    } else {
        statusCode = 400;
        result = "Debe llenar los campos obligatorios";
    }
    
    if(statusCode == 400) await fs.unlink(path.resolve(req.file.path));

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