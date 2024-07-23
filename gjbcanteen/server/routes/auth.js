
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const rateLimit = require('express-rate-limit');

const secret = process.env.JWT_SECRET;

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many registration attempts from this IP, please try again later'
});

router.post('/register', registerLimiter, async (req, res) => {
  const { email, username, password } = req.body;

  // Server-side validation
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const usernameRegex = /^PES120210\d{4}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: 'Invalid username format' });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password does not meet the required criteria' });
  }

  try {
    const existingUser = await User.findOne({ email }).exec();
    const existingUsername = await User.findOne({ username }).exec();
    if (existingUser || existingUsername) {
      return res.status(400).json({ message: 'Email or username already registered' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: hashedPassword });
      await user.save();

      // Send verification email logic here (not implemented in this example)

      return res.status(201).json({ message: 'Registration success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });

    let redirectUrl;
    if (username.startsWith('PES120210')) {
      redirectUrl = '/MenuList';
    } else {
      redirectUrl = '/dashboard';
    }

    res.json({ token, redirectUrl });

    const actionsModule = await import("../../src/store/actions.mjs");
    const { setUsername, setPassword } = actionsModule;
    req.app.get('store').dispatch(setUsername(username));
    req.app.get('store').dispatch(setPassword(password));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
