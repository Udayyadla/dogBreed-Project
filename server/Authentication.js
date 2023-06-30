const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth = function AuthenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
  //verify token
  jwt.verify(token,process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      res.status(403).json({ err: "failed to authenticate token" });
    } else {
      req.user = decodedToken;
      next();
    }
  });
};
module.exports = Auth;
