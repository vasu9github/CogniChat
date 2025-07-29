import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/google' , passport.authenticate('google' , { scope : ['profile' , 'email']}))

router.get('/google/callback' , passport.authenticate('google' , {
    successRedirect: 'https://cogni-chat-six.vercel.app',
    failureRedirect: 'https://cogni-chat-six.vercel.app'
}));

router.get('/current_user' , ( req , res) => {
    res.send(req.user)
});

router.post('/logout' , ( req , res , next ) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.status(201).send("logged out successfully")
    })
})
export default router;