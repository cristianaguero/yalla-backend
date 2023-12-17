import { Router } from 'express';
import checkAuth from '../middlewares/authMiddleware.js';

import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventsController.js';

const router = Router();

router.post('/create', checkAuth, createEvent);
router.get('/', checkAuth, getAllEvents);
router.get('/:id', checkAuth, getEventById);
router.put('/:id', checkAuth, updateEvent);
router.delete('/:id', checkAuth, deleteEvent);

export default router;