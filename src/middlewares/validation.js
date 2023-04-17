function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validateFields(req, res, next) {
    const { email, password } = req.body;
  
    if (!email) {
      return next({ status: 400, message: 'O campo "email" é obrigatório' });
    }
  
    if (!isValidEmail(email)) {
      return next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
    }
  
    if (!password) {
      return next({ status: 400, message: 'O campo "password" é obrigatório' });
    }
  
    if (password.length < 6) {
      return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  
    next();
  }
  
  module.exports = validateFields;
  