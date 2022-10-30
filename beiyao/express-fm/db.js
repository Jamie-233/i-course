const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports.getDB = async () => {
    const result = await readFile('./db.json', 'utf-8');
    return JSON.parse(result)
}

module.exports.saveDB =  async (params) => {
    const data = JSON.stringify(params, null, 4);
    return await writeFile('./db.json', data);
}