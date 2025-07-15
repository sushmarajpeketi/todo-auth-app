import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import josn from 'jsonwebtoken';
import User from '../modules/User.js';
import authMiddleware from '../middleware/aauthMiddleware.js';

import { config } from 'dotenv';
config();

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("invalid email")
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = josn.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
