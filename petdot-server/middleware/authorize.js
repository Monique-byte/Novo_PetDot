const logger = require('../utils/logger'); // Ou apenas console.log se não tiver logger configurado

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    console.log(`[authorizeMiddleware] Verificando autorização para URL: ${req.originalUrl}. Roles permitidas: ${allowedRoles.join(', ')}`); // LOG AQUI

    if (!req.user || !req.user.role) {
      console.warn('[authorizeMiddleware] Usuário não autenticado ou sem role. URL:', req.originalUrl); // LOG AQUI
      return res.status(401).json({ message: 'Acesso negado: Autenticação necessária.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.warn(`[authorizeMiddleware] Acesso negado para usuário ${req.user.id} (Role: ${req.user.role}). Requer: ${allowedRoles.join(', ')}. URL: ${req.originalUrl}`); // LOG AQUI
      return res.status(403).json({ message: 'Acesso negado: Você não tem permissão para realizar esta ação.' });
    }
    console.log(`[authorizeMiddleware] Autorização concedida para usuário ${req.user.id} (Role: ${req.user.role}). URL: ${req.originalUrl}`); // LOG AQUI
    next();
  };
};