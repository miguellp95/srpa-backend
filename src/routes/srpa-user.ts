import { Router } from 'express';

const router = Router();

// Libs imports
import multer from '../lib/multer';

// Controllers Imports
import { create_srpa_user, index , delete_srpa_user, update_srpa_user, get_one_srpa_user}  from '../controller/srpa-user.controller';



//Routes Employee
router.route('/srpa-user')
    .get( index )
    .post( multer.single('photo'), create_srpa_user );

router.route('/srpa-user/:id')
    .delete( delete_srpa_user )
    .put(multer.single("photo"), update_srpa_user )
    .get( get_one_srpa_user );

export default router;