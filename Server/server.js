import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import msgRouter from './routes/msgRoutes.js';
import { app, server } from './socket/socket.js';


const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim());

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: ${origin} not allowed`));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/msg', msgRouter);

if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.send('Server is running');
    });
}

if (process.env.NODE_ENV === 'production') {
    const clientPath = path.resolve(__dirname, '../Client/dist');
    app.use(express.static(clientPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

// MongoDB Connnection  
connectDB(); 

server.listen(port, () => console.log(`Server is running in port: http://localhost:${port}`));  