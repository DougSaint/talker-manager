const express = require('express');

const authMiddleware = require('../middlewares/auth');

const talkerRoute = express.Router();
const validateTalker = require('../middlewares/validateTalker');
const TalkerModel = require('../models');

const Talker = new TalkerModel();

talkerRoute.get('/', async (_req, res) => {
  const talkers = await Talker.readTalkers();
  return res.status(200).json(talkers);
});

talkerRoute.post('/', authMiddleware, validateTalker, async (req, res) => {
  const talkers = await Talker.readTalkers();
    const user = {
      ...req.body,
      id: talkers.length + 1,
    };
    
    await Talker.addTalker(user);
    return res.status(201).json(user);
});

talkerRoute.get('/:id/', async (req, res) => {
  const { id } = req.params;
  const talker = await Talker.getTalker(id);
  if (talker) {
    return res.status(200).json(talker);
  } 
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

talkerRoute.put('/:id/', authMiddleware, validateTalker, async (req, res) => {
  const talkers = await Talker.readTalkers();
  const { id } = req.params;
  const index = talkers.findIndex((talker) => +talker.id === +id);

  if (index !== -1) {
    talkers[index] = {
      ...req.body,
      id: +id,
    };
    await Talker.writeTalkers(talkers);
    res.status(200).json(talkers[index]);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

talkerRoute.put('/:id', async (req, res) => 
//  const { id } = req.params;

   res.status(200).json({}));

talkerRoute.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const talkers = await Talker.readTalkers();
  const deleteTalker = talkers.filter((talker) => +talker.id !== +id);
  await Talker.writeTalkers(deleteTalker);
  res.status(204).json();
});

module.exports = talkerRoute;
