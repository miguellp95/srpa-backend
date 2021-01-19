import Employee from '../models/employee';
import User from '../models/user';
import { Response, Request } from 'express';

export async function findUsersToCreate(req : Request, res : Response){
    const employees = await Employee.find();
    const users = await User.find();
    for(const user of users){
        try {
            const toDelete = employees.find( employee => employee.identification == user.cc_employee );
            if(toDelete){
                const index = employees.indexOf(toDelete, 0)
                employees.splice(index, 1);
            } else {
                console.log("no se encontro")
            }
            
        } catch (error) {
            console.log("error " , error);
        }
    }
    res.status(200).json(employees);
} 