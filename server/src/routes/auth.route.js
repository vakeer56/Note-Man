import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {scope: ["profile", "email"]})
);

router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect: "/"}),
    (req, res) => {
        res.redirect("/api/profile");
    }
);

router.get(
    "/logout",
    (req, res) => {
        req.logOut( (err) => {
            if (err) {
                return res.status(500).json( {error: err} );
            }
            res.redirect("/")
        } );
    }
);

export default router;