const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            res.status(401).json({message: "Нет авторизации"})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()

    } catch (error) {
        res.status(401).json({message: "Нет авторизации"})
    }
}