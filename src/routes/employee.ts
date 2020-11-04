import { Router } from 'express';

const router = Router();
 

// Controllers Imports
import { index, getOneEmployee, newEmployee, updateEmployee, deleteEmployee}  from '../controller/employee.controller';



//Routes SRPA-USER
router.route('/employee')
    .get( index )
    .post( newEmployee );

router.route('/employee/:id')
    .delete( deleteEmployee )
    .put( updateEmployee )
    .get( getOneEmployee );

export default router;