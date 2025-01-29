import jwt from "jsonwebtoken";
import { generateToken } from '../Controllers/authController.js';

const userAuth = async (req, res, next) => { // Add 'next' as a parameter
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' }); // 401 Unauthorized
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            next(); // Call next() to pass control to the next middleware/route
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' }); // 401 Unauthorized
        }
    } catch (error) {
        console.error("Token verification error:", error); // Log the error
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' }); // 401 Unauthorized
    }
};

export { userAuth };