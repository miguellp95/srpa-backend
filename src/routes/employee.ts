import { Router } from 'express'; 

const router = Router();
 

// Controllers Imports
import { index, getOneEmployee, newEmployee, updateEmployee, deleteEmployee , signin}  from '../controller/employee.controller';
import { verifyToken } from '../lib/jwt';



//Routes SRPA-USER
router.route('/employee')
    .get( verifyToken, index )
    .post( newEmployee );

router.route('/employee/:id')
    .delete( deleteEmployee )
    .put( updateEmployee )
    .get( verifyToken, getOneEmployee );

router.route('/signin')
    .post( signin );

export default router;