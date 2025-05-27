// routes/eventRoutes.js
import express from 'express';
import {
  getAllEvents,
  getEventsByLevel,
  createEvent
} from '../controller/eventController.js';

const router = express.Router();

router.get('/', getAllEvents); // All Events
router.get('/level/:level', getEventsByLevel); // Filtered by educationLevel
router.post('/', createEvent); // Admin panel will use this

export default router;
