import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../models/user.model';


passport.use (
    new GoogleStrategy(
    {   
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }
    ),
    async (accessToken, refreshToken, profile, done) => {

        try {
            let user = await User.findOne( {googleId: profile.id} );

            if (user) {
                return done(null, user);
            }

            user = await User.create( {
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.given_name || profile.displayName,
                lastName: profile.name.family_name || "",
                provider: "google"
            } );

            return done(null, user);
        }
        catch(err) {
            return done(err);
        }
    }
    
);

passport.serializeUser( (user, done) => {
    done(null, user.id)
} );

passport.deserializeUser( (id, done) => {
    try {
        
        const user = await User.findById(id);
        done(null, user);
    }
    catch(err) {
         done(err);
    }
} );