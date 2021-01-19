import { Router } from 'express'; 
import { verifyToken } from '../lib/jwt';

const router = Router();

// Libs imports
import uploadImage from '../lib/multer'; 

// Controllers Imports
import { create_srpa_user, index , delete_srpa_user, update_srpa_user, get_one_srpa_user}  from '../controller/srpa-user.controller';



//Routes SRPA USER
router.route('/srpa-user')
    .get( verifyToken, index )
    .post( uploadImage.single('photo'), create_srpa_user );

router.route('/srpa-user/:id')
    .delete( delete_srpa_user )
    .put(uploadImage.single("photo"), update_srpa_user )
    .get( verifyToken, get_one_srpa_user );
 

export default router;