const fs = require('fs');
const path = require('path');

const loadMockData = (fileName) => {
    try {
        const filePath = path.join(__dirname, '../data', `${fileName}.json`);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading mock data for ${fileName}:`, error);
        return [];
    }
};

module.exports = { loadMockData };
