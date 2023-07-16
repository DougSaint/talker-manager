

const readTalkers = async () => {
    const path = '../talker.json';
    try {
      const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
      return JSON.parse(contentFile);
    } catch (error) {
      return null;
    }
  };

const getTalker = async (id) => {
    const talkers = await readTalkers();
    const talker = talkers.find((t) => +t.id === +id);
    return talker;
};

const writeTalkers = async (talkers) => {
  const path = '../talker.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(talkers, null, 2));
  } catch (error) {
    console.error('Error writing to talker.json:', error);
  }
};

const addTalker = async (newTalker) => {
  const talkers = await readTalkers();
  talkers.push(newTalker);
  const path = '../talker.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(talkers, null, 2));
  } catch (error) {
    console.error('Error writing to talker.json:', error);
  }
};

function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
  
module.exports = {
    readTalkers,
    getTalker,
    generateRandomToken,
    addTalker,
    writeTalkers,
};