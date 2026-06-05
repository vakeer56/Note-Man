import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import authService from '../services/auth.service.js';


passport.use (
    new GoogleStrategy(
    {   
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        
        try {
            let user = await authService.loginWithGoogle(profile);
            
            return done(null, user);
        }
        catch(err) {
            return done(err);
        }
    }
    )
    
);

passport.serializeUser( (user, done) => {
    done(null, user.id)
} );

passport.deserializeUser( async (id, done) => {
    try {
        
        const user = await authService.getUserById(id);
        done(null, user);
    }
    catch(err) {
         done(err);
    }
} );