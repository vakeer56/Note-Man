import express from 'express';
import cors from 'cors';
import passport from 'passport';
import  session  from 'express-session';
import mongoose from 'mongoose';

const app = express();
import 'dotenv/config';


import authRoute from './src/routes/auth.route.js';
import './src/configs/passport.js';

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then( () => console.log("connected to DB....") )
    .catch(err => console.log(err))

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);

app.get("/api/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(req.user);
});

app.get('/', (req, res) => {
    res.send("Test API is working...")
})

app.get('/dashboard', (req, res) => {
  res.send("welcome user")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})
