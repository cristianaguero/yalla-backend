import express from 'express';
import { 
    authenticateUser,
    createUser,
    updateProfile,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', authenticateUser);
router.post('/register', createUser);
router.put('/profile', updateProfile);
router.delete('/delete', deleteUser);


export default router;