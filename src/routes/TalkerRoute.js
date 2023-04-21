const express = require('express');
const utils = require('../utils/index');
const authMiddleware = require('../middlewares/auth');

const talkerRoute = express.Router();
const validateTalker = require('../middlewares/validateTalker');

talkerRoute.get('/', async (_req, res) => {
  const talkers = await utils.readTalkers();
  return res.status(200).json(talkers);
});

talkerRoute.post('/', authMiddleware, validateTalker, async (req, res) => {
  const talkers = await utils.readTalkers();
    const user = {
      ...req.body,
      id: talkers.length + 1,
    };
    
    await utils.addTalker(user);
    return res.status(201).json(user);
});

talkerRoute.get('/:id/', async (req, res) => {
  const { id } = req.params;
  const talker = await utils.getTalker(id);
  if (talker) {
    return res.status(200).json(talker);
  } 
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

talkerRoute.put('/:id/', authMiddleware, validateTalker, async (req, res) => {
  const talkers = await utils.readTalkers();
  const { id } = req.params;
  const index = talkers.findIndex((talker) => +talker.id === +id);

  if (index !== -1) {
    talkers[index] = {
      ...req.body,
      id: +id,
    };
    await utils.writeTalkers(talkers);
    res.status(200).json(talkers[index]);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

talkerRoute.post('/login', async (_req, res) => res.status(201).json({}));

talkerRoute.put('/:id', async (req, res) => 
//  const { id } = req.params;

   res.status(200).json({}));

talkerRoute.delete('/:id', async (req, res) => 
//  const { id } = req.params;

   res.status(204).json());

module.exports = talkerRoute;
