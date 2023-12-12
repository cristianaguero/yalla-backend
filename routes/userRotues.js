import { Router } from 'express';
import checkAuth from '../middlewares/authMiddleware.js';

import { authenticateUser, createUser, updateProfile, profile, deleteUser, getAllUsers } from '../controllers/userController.js';



const router = Router();

router.get('/login', authenticateUser);
router.post('/register', createUser);
router.get('/profile', checkAuth, profile);
router.put('/profile/:id', checkAuth, updateProfile);
router.delete('/delete', deleteUser);

router.get('/', getAllUsers)


export default router;