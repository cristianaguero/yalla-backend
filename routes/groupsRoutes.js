import { Router } from 'express';
import { getAllGroups } from '../controllers/groupsController.js';

const router = Router();

router.get('/', getAllGroups);

export default router;