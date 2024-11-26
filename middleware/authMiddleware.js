const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization; // Token is expected in the Authorization header
    if (!token) {
        return res.status(401).json({ message: "User is not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
        req.user = decoded.id; // Attach the user's ID from the token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: "User is not logged in" });
    }
};

module.exports = authMiddleware;
