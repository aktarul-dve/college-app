// controllers/eventController.js
import Event from '../models/admission_models.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventsByLevel = async (req, res) => {
  const level = req.params.level;
  try {
    const events = await Event.find({ educationLevel: level });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, nature, educationLevel, session, endDate, actionUrl } = req.body;
  try {
    const newEvent = new Event({ title, nature, educationLevel, session, endDate, actionUrl });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
