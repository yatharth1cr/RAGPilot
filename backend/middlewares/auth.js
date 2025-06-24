function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

function isAdmin(req, res, next) {
  const user = req.session.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}

module.exports = { isAuthenticated, isAdmin };
