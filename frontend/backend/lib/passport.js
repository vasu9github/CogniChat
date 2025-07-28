import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/userModel.js";
import dotenv from 'dotenv' 

dotenv.config();

passport.serializeUser(( user , done ) => {
    done(null, user.id)
})

passport.deserializeUser( async (id , done) => {
    try {
        const user = await User.findById(id);
        done(null , user)
    } catch (error) {
        done(err)
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async ( accessToken , refreshToken , profile , done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null , user)
        } else{
            const newUser = new User({
                googleId : profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value
            });
            await newUser.save();
            return done(null, newUser)
        }

    } catch (error) {
        return done(error)
    }
}
))
