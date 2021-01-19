import {Request, Response } from 'express';  
import Employee from "../models/employee"; 

import { IEmployee } from '../interfaces/employee.interface';



export async function index(req : Request, res : Response){

    let statusCode, result;
    const data = await Employee.find({});

    if (data.length > 0){
        statusCode = 200;
        result = data;
    } else {
        statusCode = 400;
        result = "No hay registros";
    }

    return res.status(statusCode).json(result);

}

export async function getOneEmployee( req : Request, res : Response){

    let statusCode, result;

    const id = req.params.id;

    if(id){
        try {
            const employee = await Employee.findById(id);
        if(employee){
            statusCode = 200;
            result = employee;
        } else {
            statusCode = 400;
            result = "Funcionario no encontrado";
        }
        } catch (error) {
            statusCode = 500;
            result = "ID no válido";   
        }
    } else {
        statusCode = 400;
        result = "ID no válido";
    }

    return res.status(statusCode).json(result);
}

export async function newEmployee(req : Request, res : Response){

    let statusCode, result;

    let { 
        identification, 
        first_name, 
        last_name,
        date_born,
        phone_number,
        email,
        address,
        charge 
        } = req.body;

    identification = typeof(identification) == "string" && identification.trim().length >= 8 && identification.trim().length <= 10 ? identification : false;
    first_name = typeof(first_name) == "string" && first_name.trim().length > 0 ? first_name : false;
    last_name = typeof(last_name) == "string" && last_name.trim().length > 0 ? last_name : false;
    date_born = typeof(date_born) == "string" && date_born.trim().length > 0 ? date_born : false;
    phone_number = typeof(phone_number) == "string" && phone_number.trim().length == 10 ? phone_number : false;
    email = typeof(email) == "string" && email.trim().length > 0 ? email : false;
    address = typeof(address) == "string" && address.trim().length > 0 ? address : false;
    charge = typeof(charge) == "string" && charge.trim().length > 0 ? charge : false; 
    
    if(identification && first_name && last_name && date_born && phone_number && email && address && charge){

        //Finding duplicates with identification
        const employees = await Employee.find({identification});

        if(employees.length > 0){
            statusCode = 500;
            result = "El número de identiticación ya existe";
        } else {

            const employeeObj = new Employee(req.body);

            try {
                const newEmployee = await employeeObj.save();
                statusCode = 200;
                result = newEmployee;
            } catch (error) {
                statusCode = 500;
                result = "Error en el servidor al guardar el nuevo funcionario."
            }
        }
    } else {
        statusCode = 400;
        result = "Debe llenar los campos obligatorios";
    }

    return res.status(statusCode).json(result);
}

export async function updateEmployee(req : Request, res : Response){
    
    let statusCode, result;

    const id = req.params.id;

    if(id){

        const employee = await Employee.findById(id);

        if(employee){

            const { 
                identification, 
                first_name, 
                last_name,
                date_born,
                phone_number,
                email,
                address,
                charge 
                } = req.body;
            
            if(identification) employee.identification = identification;
            if(first_name) employee.first_name = first_name;
            if(last_name) employee.last_name = last_name;
            if(date_born) employee.date_born = date_born;
            if(phone_number) employee.phone_number = phone_number;
            if(email) employee.email = email;
            if(address) employee.address = address;
            if(charge) employee.charge = charge;

            try {
                await employee.save();
                statusCode = 200;
                result = "Datos actualizados."
            } catch (error) {
                statusCode = 500; 
                result = "Error del servidor al actualizar datos del funcionario."
            }

        } else {
            statusCode = 400;
            result = "No existe el funcionario en la base de datos."
        }

    } else {
        statusCode = 400;
        result = "No se ha seleccionado ningún funcionario"
    }
    
    return res.status(statusCode).json(result);
}

export async function deleteEmployee(req : Request, res: Response){

    const id = req.params.id;

    let statusCode, result;
    if(id){

        try {
            await Employee.findByIdAndDelete(id);
            statusCode = 200;
            result = "Funcionario eliminado de la base de datos"
        } catch (err) {
            statusCode = 400;
            result = "Error al eliminar funcionario de la base de datos: ID no válido";
        }
    } else {
        statusCode = 400;
        result = "Id de funcionario no seleccionado";
    }
    
    return res.status(statusCode).json(result);
}


