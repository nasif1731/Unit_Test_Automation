const deletes = require('./delete');
const dbConnect = require('./fakeDb');

// Mock dbConnect and its methods
jest.mock('./fakeDb', () => {
    const deleteOne = jest.fn();
    return jest.fn(() => ({
        collection: jest.fn(() => ({ deleteOne })),
    }));
});

// Mock prompt-sync for user input
jest.mock('prompt-sync', () => {
    return jest.fn().mockReturnValue(() => "Sample Profile");
});

describe('delete.js - Deletes Profile', () => {
    let consoleLogSpy, consoleErrorSpy;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        jest.clearAllMocks();
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('should delete a profile successfully', async () => {
        dbConnect().collection().deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 1 });

        await deletes();

        expect(dbConnect().collection().deleteOne).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith("\n....Data Deleted Successfully!!!");
    });

    test('should handle case where profile does not exist', async () => {
        dbConnect().collection().deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 0 });

        await deletes();

        expect(dbConnect().collection().deleteOne).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith("\n....No Profile Found with that Name.");
    });

    test('should log error if deletion fails', async () => {
        dbConnect().collection().deleteOne.mockResolvedValue({ acknowledged: false });

        await deletes();

        expect(dbConnect().collection().deleteOne).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith("\n....Operation Failed!!!");
    });

    test('should handle errors thrown by database connection', async () => {
        dbConnect().collection().deleteOne.mockRejectedValue(new Error("Database Error"));

        await deletes();

        expect(consoleErrorSpy).toHaveBeenCalledWith("An error occurred:", expect.any(Error));
    });
});
