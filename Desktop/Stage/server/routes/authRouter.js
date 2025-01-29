import express from 'express';
import bcrypt from 'bcrypt';
import { register, Login, logout } from '../Controllers/authController.js';
import { userAuth } from '../middleware/userAuth.js'; 
import User from '../models/Usermodel.js'; 

const authRouter = express.Router();

// Register route
authRouter.post('/register', register);

// Login route
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // Return user role and token (or other data) to the frontend
      const token = generateToken(user); // Implement a function to generate JWT
      res.status(200).json({ message: 'Login successful', role: user.role, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Logout route
authRouter.post('/logout', logout);

export default authRouter;