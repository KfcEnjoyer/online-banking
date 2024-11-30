const jwt = require("jsonwebtoken");
const secret_key = "importantSecret"; // Use environment variable in production

const authenticatedUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticatedUser;
