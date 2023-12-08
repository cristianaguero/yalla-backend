import express from 'express';
import { getAllGroups } from '../controllers/groupsController.js';

const router = express.Router();

router.get('/', getAllGroups);

export default router;