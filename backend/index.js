import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import './lib/passport.js'
import { connectDB } from './lib/db.js';
import chatRoutes from './routes/chatRoutes.js'
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import session from 'express-session';

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge : 1000*60*60*24*7
    }
}));

app.use(passport.initialize())
app.use(passport.session());
app.use('/auth', authRoutes)

app.use('/api/chats', chatRoutes)

app.listen(PORT , () => {
    console.log(`Server is running on the PORT ${PORT}`)
    connectDB();
})