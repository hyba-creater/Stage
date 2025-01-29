import jwt from "jsonwebtoken";

const userAuth = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { userAuth };
