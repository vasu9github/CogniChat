import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import './lib/passport.js';
import { connectDB } from './lib/db.js';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// This tells Express it's behind a proxy (like Render) and to trust it.
// This is necessary for secure cookies to work.
app.set('trust proxy', 1);

app.use(cors({
  // FIX: Removed the trailing slash for better compatibility.
  origin: 'https://cogni-chat-six.vercel.app', 
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: true,   // Ensures cookie is only sent over HTTPS
    sameSite: 'none' // Allows cookie to be sent from a different domain
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/chats', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
