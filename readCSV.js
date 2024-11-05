const fs = require('fs');
const csv = require('csv-parser');

/**
 * Reads a CSV file and returns the data as an array of objects.
 * @param {string} path - The path to the CSV file.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects.
 */
const readCSV = (path) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = readCSV;
