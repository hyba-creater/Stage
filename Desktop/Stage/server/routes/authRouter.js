import express from 'express';
import { register, login, logout } from '../Controllers/authController.js'; // Correct import
import { userAuth } from '../middleware/userAuth.js'; 
//import User from '../models/Usermodel.js';  // Remove this import

const authRouter = express.Router();

// Register route
authRouter.post('/register', register);

// Login route (use the one from authController.js - no changes needed here)
authRouter.post('/login', login); // This now uses the correct login function

// Logout route
authRouter.post('/logout', logout);

export default authRouter;