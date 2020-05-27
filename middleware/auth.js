const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    // validate
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication toekn. Access Denied." });
    }

    // verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed. Access Denied." });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = auth;
