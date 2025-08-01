export const protect = ( req , res , next ) => {
    if ( req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "User not authenticated" })
}