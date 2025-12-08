import express from 'express';
import { login, logout, signup, refreshToken } from '../controllers/authController.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/signup', signup);
authRouter.post('/login', login);

// Protected routes
authRouter.get('/refresh-token', refreshToken);
authRouter.get('/logout', logout);

export default authRouter;