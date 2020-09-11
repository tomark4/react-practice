import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .send({ ok: false, message: "Unauthorized", headers: req.headers });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
    next();
  });
};

module.exports = { isAuthenticated };
