import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';

// Helper function to generate token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Helper function to set cookie
const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Input validation
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        // Generate token and set cookie
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        // Remove sensitive data before sending response
        user.password = undefined;

        return res.status(201).json({
            success: true,
            user,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            message: `Signup Internal server error: ${error}` 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token and set cookie
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        // Remove sensitive data before sending response
        user.password = undefined;

        return res.status(200).json({
            success: true,
            user,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: `Login Internal server error: ${error}`
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        // Generate new token
        const newToken = generateToken(user._id);
        setTokenCookie(res, newToken);

        return res.status(200).json({
            success: true,
            message: 'Token refreshed successfully'
        });

    } catch (error) {
        console.error('Refresh token error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session expired, please login again'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            message: `Logout Internal server error: ${error}`
        });
    }
};