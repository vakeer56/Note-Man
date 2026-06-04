import express from 'express';
import cors from 'cors';
import passport from 'passport';
import  session  from 'express-session';

const app = express();
import 'dotenv/config';


import authRoute from './src/routes/auth.route.js';

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})
