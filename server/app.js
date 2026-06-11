import express from 'express';
import cors from 'cors';
import passport from 'passport';
import  session  from 'express-session';
import mongoose from 'mongoose';

const app = express();
import 'dotenv/config';


import './src/configs/passport.js';

// -------------------------------------------- IMPORT ROUTES   -----------------------------------------
import authRoute from './src/routes/auth.route.js';
import noteRoute from './src/routes/note.route.js';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI)
        .then( () => console.log("connected to DB....") )
        .catch(err => console.log(err))
}

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());



// ---------------------------------------------   USE ROUTES   ---------------------------------------------
app.use("/auth", authRoute);
app.use('/notes', noteRoute);
        
app.get("/api/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(req.user);
});

app.get('/', (req, res) => {
    res.send("Test API is working...")
})

app.get('/coffee', (req, res) => {
    res.status(418).json( {
        message: "We cannot brew coffee because we are a teapot",
        statusCode: 418,
    })
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    })
}

export default app;
