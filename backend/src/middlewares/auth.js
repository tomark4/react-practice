const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .send({ ok: false, message: "Unauthorized", headers: req.headers });
  }

  // TODO: parse token and set user in request
  next();
};

module.exports = { isAuthenticated };
