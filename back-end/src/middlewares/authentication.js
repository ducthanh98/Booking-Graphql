import jwt from 'jsonwebtoken';
const checkAuth = (req, res, next) => {
    try {
        const header = req.get('Authorization');
        const token = header.split(' ')[1];
        if (!header | !token || token === '') {
            throw new Error('Forbidden');
        }
        const decodedToken = jwt.verify(token, 'secret');
        if (!decodedToken) {
            throw new Error('Forbidden');
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        req.isAuth = false;
        return next();
    }

}

export default checkAuth;