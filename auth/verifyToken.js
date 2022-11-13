const jwt = require("jsonwebtoken");
const verifyController = (req, res, next) => {

    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];
        jwt.verify(accessToken, "secretKey", (err, user) => {
            if (err) {
                // 403 is forbidden
                return res.status(403).json("Token is not valid")
            }
            next();
        });
    } else {
        return res.status(401).json("not authenticated");
    }
}
module.exports = { verifyController };
