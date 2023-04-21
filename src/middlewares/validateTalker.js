function validateName(name, next) {
  if (!name) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return next({
      status: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
}

function validateAge(age, next) {
  if (!age) {
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return next({
      status: 400,
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
}

function validateWatchedAt(watchedAt, next) {
  const regexDate = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!watchedAt) {
    return next({ status: 400, message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexDate.test(watchedAt)) {
    return next({
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
}

function validateRate(rate, next) {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return next({
      status: 400,
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
}

function validateTalk(talk, next) {
  if (!talk) {
    return next({ status: 400, message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.rate && talk.rate !== 0) {
    return next({ status: 400, message: 'O campo "rate" é obrigatório' });
  }
  validateWatchedAt(talk.watchedAt, next);
  validateRate(talk.rate, next);
}

function validateTalker(req, _res, next) {
  const { name, age, talk } = req.body;

  validateName(name, next);
  validateAge(age, next);
  validateTalk(talk, next);

  next();
}

module.exports = validateTalker;
