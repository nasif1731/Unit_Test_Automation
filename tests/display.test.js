const dbConnect = require('../fakeDb'); 
const display = require('../display');

describe("Profile Management - Display Function", () => {
    
    beforeEach(async () => {
        const db = await dbConnect();
        const profiles = await db.collection().find({}).toArray();
        profiles.length = 0;
    });
    
    test("Display with no profiles available", async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await display();
        expect(consoleSpy).toHaveBeenCalledWith("No profiles found.");
        consoleSpy.mockRestore();
    });

    test("Display with profiles available", async () => {
        const db = await dbConnect();
        await db.collection().insertOne({ name: "Emaan", age: 20, contact: "12345" });
        
        const consoleSpy = jest.spyOn(console, 'log');
        await display();
        expect(consoleSpy).toHaveBeenCalledWith("Profiles:");
        expect(consoleSpy).toHaveBeenCalledWith([{ name: "Emaan", age: 20, contact: "12345" }]);
        consoleSpy.mockRestore();
    });

    test("Display immediately after inserting a profile", async () => {
        const db = await dbConnect();
        await db.collection().insertOne({ name: "Emaan", age: 20, contact: "12345" });
        
        const consoleSpy = jest.spyOn(console, 'log');
        await display();
        expect(consoleSpy).toHaveBeenCalledWith("Profiles:");
        expect(consoleSpy).toHaveBeenCalledWith([{ name: "Emaan", age: 20, contact: "12345" }]);
        consoleSpy.mockRestore();
    });
//Parameterized Test
    // describe('Display Profile Tests', () => {
    //     test.each([
    //         ["DA", 36, "12345", true],
    //         ["John", 25, "98765", true],
    //         ["Alice", 28, "54321", false]
    //     ])('should display profile for name %s correctly', async (name, age, contact, shouldDisplay) => {
    //         const db = dbConnect();

    //         if (shouldDisplay) {
    //             await db.collection().insertOne({
    //                 name: name,
    //                 age: age,
    //                 contact: contact
    //             });
    //         }

    //         const result = await db.collection().find().toArray();
    //         const profile = result.find(p => p.name === name);

    //         if (shouldDisplay) {
    //             expect(profile).toBeDefined();
    //             expect(profile.name).toBe(name);
    //             expect(profile.age).toBe(age);
    //         } else {
    //             expect(profile).toBeUndefined();
    //         }
    //     });
    // });
});

