const readCSV = require('./readCSV'); // Make sure the path is correct
const insert = require('./insert'); // Importing required methods
const update = require('./update');
const deletes = require('./delete');
const display = require('./display');

// Mock implementations
jest.mock('./insert', () => jest.fn());
jest.mock('./update', () => jest.fn());
jest.mock('./delete', () => jest.fn());
jest.mock('./display', () => jest.fn());

describe('Profile Management Tests', () => {
    let profiles;

    beforeAll(async () => {
        // Simulate reading profiles from CSV
        profiles = [
            { name: 'John', age: 30, contact: 'john@example.com' },
            // Add more mock profiles if needed
        ];
        for (const profile of profiles) {
            insert.mockImplementation(() => Promise.resolve()); // Mock insert
            await insert(profile);
        }
    });

    test('should successfully update a profile field', async () => {
        const updateData = { name: 'John', field: 'age', value: 31 };
        update.mockImplementation(() => Promise.resolve('Profile updated successfully')); // Mock update
        const result = await update(updateData);

        expect(result).toBe('Profile updated successfully');

        display.mockImplementation(() => Promise.resolve({ name: 'John', age: 31 })); // Mock display
        const updatedProfile = await display('John');
        expect(updatedProfile.age).toBe(31);
    });

    test('should not update if field is invalid', async () => {
        const updateData = { name: 'John', field: 'invalidField', value: 'value' };
        update.mockImplementation(() => Promise.resolve('Error: Invalid field specified.'));
        const result = await update(updateData);
        expect(result).toBe('Error: Invalid field specified.');
    });

    test('should not update if age is not a number', async () => {
        const updateData = { name: 'John', field: 'age', value: 'notANumber' };
        update.mockImplementation(() => Promise.resolve('Error: Age must be a number.'));
        const result = await update(updateData);
        expect(result).toBe('Error: Age must be a number.');
    });

    test('should show no profile found if no match is found', async () => {
        const updateData = { name: 'NonExistentProfile', field: 'name', value: 'New Name' };
        update.mockImplementation(() => Promise.resolve('Error: Profile not found.'));
        const result = await update(updateData);
        expect(result).toBe('Error: Profile not found.');
    });

    test('should log operation failure if update is not acknowledged', async () => {
        const updateData = { name: 'John', field: 'contact', value: 'newcontact@example.com' };
        update.mockImplementation(() => Promise.resolve('Error: Update operation failed.'));
        const result = await update(updateData);
        expect(result).toBe('Error: Update operation failed.');
    });

    afterAll(async () => {
        for (const profile of profiles) {
            deletes.mockImplementation(() => Promise.resolve()); // Mock delete
            await deletes(profile.name);
        }
    });
});
