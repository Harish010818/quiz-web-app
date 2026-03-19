import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    }
    catch {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
//# sourceMappingURL=isAuth.js.map