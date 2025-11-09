import genToken from "../config/token.js";
import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    try {
        const {userName, email, password} = req?.body;

        const checKUserByUsername = await User.findOne({userName});
        if(checKUserByUsername) {
            return res.status(400).json({
                message: 'Username already exists'
            })
        };

        const checKUserByEmail = await User.findOne({email});
        if(checKUserByEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        };

        if(password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters'
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName, email, password: hashPass
        });

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,   // -> 7 days
            sameSite: 'Strict',
            secure: false
        });

        return res.status(201).json({user});

    } catch (error) {
        return res.status(500).json({
            message: `Signup Internal server error: ${error}`
        });
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: 'User does not exists'
            })
        };

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({
                message: 'Incorrect Password'
            })
        }

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,   // -> 7 days
            sameSite: 'Strict',
            secure: false
        });

        return res.status(200).json({user});

    } catch (error) {
        return res.status(500).json({
            message: `Login Internal server error: ${error}`
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            message: 'Logout Successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Logout Internal server error: ${error}`
        });
    }
}