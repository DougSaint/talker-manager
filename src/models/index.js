const fs = require('fs').promises;
const { join } = require('path');

class TalkerModel {
    async readTalkers() {
        const path = '../talker.json';
        try {
            const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
            return JSON.parse(contentFile);
        } catch (error) {
            return null;
        }
    }

    async getTalker(id) {
        const talkers = await this.readTalkers();
        const talker = talkers.find((t) => +t.id === +id);
        return talker;
    }

    async writeTalkers(talkers) {
        const path = '../talker.json';
        try {
            await fs.writeFile(join(__dirname, path), JSON.stringify(talkers, null, 2));
        } catch (error) {
            console.error('Error writing to talker.json:', error);
        }
    }

    async addTalker(newTalker) {
        const talkers = await this.readTalkers();
        talkers.push(newTalker);
        const path = '../talker.json';
        try {
            await fs.writeFile(join(__dirname, path), JSON.stringify(talkers, null, 2));
        } catch (error) {
            console.error('Error writing to talker.json:', error);
        }
    }

    
}

module.exports = TalkerModel;
