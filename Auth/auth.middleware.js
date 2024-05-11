const jwt = require("jsonwebtoken");
const config = require("../config");
const { respondWithError } = require("../utils/functions");

/*function authenticate(req, res, next) {
   const token = req.headers["authorization"];
        const decode = jwt.verify(token, config.JWT_SECRET);
        //console.log(decode.id);
        req.user = decode.id;    
        console.log(req.user);
        next();
        //return req.user;
}*/
function authenticate(req, res, next) {
  const token = req.headers["allow-access-token"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decode = jwt.verify(token, config.JWT_SECRET);
    req.user = decode.id;
    next();
    return req.user;
  } catch (error) {
    respondWithError(res, error);
  }
}


module.exports = { authenticate };
