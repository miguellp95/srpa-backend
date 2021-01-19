import { Router } from 'express'; 

const router = Router();
 

// Controllers Imports
import { 
    saveUser,
    updateUser,
    deleteUser,
    getUsers,
    getOneUser,
    signin,
    getUsersActive
     }  from '../controller/user.controller';

import { findUsersToCreate } from '../lib/usersInactive';

import { verifyToken } from '../lib/jwt';

//Routes User
router.route('/user')
    .get( getUsers )
    .post( saveUser );

router.route('/user/:id')
    .delete( deleteUser )
    .put( updateUser )
    .get( verifyToken, getOneUser );

router.route('/signin').post( signin);
router.route('/user/actives/:state').get( getUsersActive );
router.route('/user/employees/inactive').get( findUsersToCreate );

export default router;