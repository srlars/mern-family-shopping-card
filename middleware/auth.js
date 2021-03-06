import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token. Authorization denied!' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid!' });
  }
};
