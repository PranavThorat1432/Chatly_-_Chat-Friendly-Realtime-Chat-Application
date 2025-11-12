import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import msgRouter from './routes/msgRoutes.js';
import { app, server } from './socket/socket.js';


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/msg', msgRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// MongoDB Connnection  
connectDB(); 

server.listen(port, () => console.log(`Server is running in port: http://localhost:${port}`));  