import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || 
                     req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded?.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Session expired, please login again"
            });
        }
        
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};

export default isAuth;