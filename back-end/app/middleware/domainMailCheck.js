module.exports = (req, res, next) => {
    
    const userEmail = req.body.email;
    
    if (userEmail.includes("@groupomania.fr")) {
        next()        
    } else {
        return res.status(403).json("Access denied: you must use your professional email")        
    }
}