const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('AUTH HEADER RECIBIDO ===>', authHeader); // 👈 Agregamos este log

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];  // 👈 🚀 Esta es la línea CLAVE

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId and role
    next();
  } catch (err) {
    console.error('ERROR VERIFICANDO TOKEN ===>', err);
    res.status(401).json({ message: 'Invalid token.' });
  }
};