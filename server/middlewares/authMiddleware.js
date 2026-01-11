import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    // Middleware logic to authenticate user
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Support either raw token or "Bearer <token>"
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.id || decoded?._id || decoded?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Token payload missing user id" });
        }
        req.user = { id: userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
export default protect;

