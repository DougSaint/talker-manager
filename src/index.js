const express = require('express');
const talkersRoute = require('./routes/TalkerRoute');
const { generateRandomToken } = require('./utils');

const validateFields = require('./middlewares/validation');
const validTokens = require('./tokenStore');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateFields, (req, res) => {
  const TOKEN = {
      token: generateRandomToken(16),
  };

  validTokens.push({
    user: req.body.email,
    token: TOKEN,
  });
  
  return res.status(200).json(TOKEN);
});

app.use('/talker', talkersRoute);

app.use((err, _req, res, _next) => {
  const { status, message } = err;

  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log('Online');
});
