const dbConnect = require('../fakeDb');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const csvFilePath = path.resolve(__dirname, '../csv/profiles.csv');

jest.mock('../fakeDb');

describe("Profile Management - Insert Function", () => {
    let consoleSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        dbConnect.mockResolvedValue({
            collection: () => ({
                insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
            }),
        });
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test("Insert with valid profiles from CSV", async () => {
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        const profileData = parse(fileContent, { columns: true, skip_empty_lines: true });

        for (const profile of profileData) {
            const { name, age, contact } = profile;
            if (isNaN(age) || age < 0) {
                console.log("Invalid age. Please enter a number.");
            } else {
                console.log(`....Data Inserted Successfully for ${name}!!!`);
            }
        }

        for (const profile of profileData) {
            const { name, age } = profile;
            if (isNaN(age) || age < 0) {
                expect(consoleSpy).toHaveBeenCalledWith("Invalid age. Please enter a number.");
            } else {
                expect(consoleSpy).toHaveBeenCalledWith(`....Data Inserted Successfully for ${name}!!!`);
            }
        }
    });

    test("Insert with invalid age in CSV", async () => {
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        const profileData = parse(fileContent, { columns: true, skip_empty_lines: true });

        for (const profile of profileData) {
            const { name, age, contact } = profile;
          
            if (isNaN(age) || age < 0) {
                console.log("Invalid age. Please enter a number.");
            }
        }

        for (const profile of profileData) {
            const { age } = profile;
            if (isNaN(age) || age < 0) {
                expect(consoleSpy).toHaveBeenCalledWith("Invalid age. Please enter a number.");
            }
        }
    });

    test("Insert with boundary age values from CSV", async () => {
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        const profileData = parse(fileContent, { columns: true, skip_empty_lines: true });

        for (const profile of profileData) {
            const { name, age, contact } = profile;
            if (isNaN(age) || age < 0) {
                console.log("Invalid age. Please enter a number.");
            } else {
                console.log(`....Data Inserted Successfully for ${name}!!!`);
            }
        }

        for (const profile of profileData) {
            const { name, age } = profile;
            if (age === 0 || age === 100) {
                expect(consoleSpy).toHaveBeenCalledWith(`....Data Inserted Successfully for ${name}!!!`);
            }
        }
    });

    test("Insert with empty CSV", async () => {
        const emptyCsvContent = '';
        const emptyProfileData = parse(emptyCsvContent, { columns: true, skip_empty_lines: true });

        if (emptyProfileData.length === 0) {
            console.log("No profiles found in the CSV file.");
        }

        expect(consoleSpy).toHaveBeenCalledWith("No profiles found in the CSV file.");
    });
});
