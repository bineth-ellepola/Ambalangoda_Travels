const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const sameText = (a, b) => {
  const hashA = crypto.createHash("sha256").update(String(a)).digest();
  const hashB = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
};

const login = (req, res) => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Admin login is not configured on the server" });
  }

  const { username = "", password = "" } = req.body || {};

  const validUser = sameText(username, ADMIN_USERNAME);
  const validPassword = sameText(password, ADMIN_PASSWORD);

  if (!validUser || !validPassword) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "12h" });

  res.json({ token, username });
};

module.exports = { login };
