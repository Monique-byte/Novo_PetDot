const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  console.log(`[authMiddleware] Iniciando para URL: ${req.originalUrl}`); // LOG AQUI
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(`[authMiddleware] Acesso negado: Sem token ou formato inválido para URL: ${req.originalUrl}`); // LOG AQUI
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`[authMiddleware] Token decodificado. ID do usuário: ${decoded.id}`); // LOG AQUI

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        console.warn(`[authMiddleware] Usuário ID ${decoded.id} do token não encontrado no DB para URL: ${req.originalUrl}`); // LOG AQUI
        return res.status(401).json({ message: 'Acesso negado. Usuário não encontrado ou inativo.' });
    }

    req.user = user;
    console.log(`[authMiddleware] Usuário autenticado: ${req.user.email || req.user.loginId} (Role: ${req.user.role}) para URL: ${req.originalUrl}`); // LOG AQUI
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.error(`[authMiddleware] Token JWT inválido para URL ${req.originalUrl}:`, error.message);
    } else if (error.name === 'TokenExpiredError') {
      console.error(`[authMiddleware] Token JWT expirado para URL ${req.originalUrl}:`, error.message);
    } else {
      console.error(`[authMiddleware] Erro inesperado para URL ${req.originalUrl}:`, error);
    }
    res.status(401).json({ message: 'Falha na autenticação: Token inválido ou expirado.' }); // ✅ Status 401 é mais apropriado aqui
  }
};