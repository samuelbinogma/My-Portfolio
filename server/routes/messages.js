import { Router } from 'express';
import Message from '../models/Message.js';
import { sendContactEmail } from '../config/mailer.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  try {
    const saved = await Message.create({ name, email, subject, message });
    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (mailErr) {
      console.error(`Failed to email contact message: ${mailErr.message}`);
      return res
        .status(502)
        .json({ message: 'Message saved, but the email could not be sent.' });
    }
    res.status(201).json({
      message: 'Message received — thank you!',
      id: saved._id,
      emailed: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/read', async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;