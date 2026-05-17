var jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: "Erro no formato do token. Use 'Bearer <TOKEN>'." });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, jwt_secret);

    req.userId = decoded.id;

    next();

  } catch (error) {
    console.error("Falha na validação do JWT:", error.message);
    
    return res.status(401).json({ 
      error: "Token inválido ou expirado.",
      details: error.message 
    });
  }
}

module.exports = authMiddleware;