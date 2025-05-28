const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

module.exports = async (req, res, next) => {
  try {
    // Obter token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Adicionar usuário à requisição
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
};