function validateTalker(req, res, next) {
  const { name, age, talk } = req.body;

  const regexDate = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!name) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return next({
      status: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  if (!age ) {
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }


  if (!Number.isInteger(age) || age < 18) {
    return next({
      status: 400,
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  

  if (!talk) {
    return next({
      status: 400,
      message: 'O campo "talk" é obrigatório',
    });
  }

  if (!talk.watchedAt) {
    return next({
      status: 400,
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!regexDate.test(talk.watchedAt)) {
    return next({
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!talk.hasOwnProperty("rate")) {
    return next({
      status: 400,
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return next({
      status: 400,
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
}

module.exports = validateTalker;
