const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id; // NOTE: must match `id` used in jwt.sign
    next();
  } catch (err) {
    console.error('Token validation failed', err);
    res.sendStatus(401);
  }
};

