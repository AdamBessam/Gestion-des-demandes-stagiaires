const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

  
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

const checkRole = roles => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};

module.exports = { auth, checkRole };
