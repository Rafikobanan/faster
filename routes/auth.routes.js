const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');;
dotenv.config();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length is 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.json({
        message: 'Incorrect data'
      });
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.json({ message: 'This user already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({ email, password: hashedPassword, data: {} });

    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.json({
        message: 'Incorrect login data'
      });
    }

    const {email, password} = req.body;

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ message: 'Incorrect login data' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ message: 'Incorrect login data' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

		res.json({ token, data: user.data })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})


module.exports = router;