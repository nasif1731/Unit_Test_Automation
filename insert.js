const dbConnect = require('./fakeDb'); // Use the fake database
const prompt = require('prompt-sync')();

const insert = async () => {
    try {
        let data = [
            prompt("Enter Profile-Name: "),
            parseInt(prompt("Enter Profile-Age: "), 10), // Parse age as an integer
            prompt("Enter Profile-Contact: ")
        ]; // Collecting data

        // Check if age is not a number
        if (isNaN(data[1])) {
            console.log("Invalid age. Please enter a number.");
            return;
        }

        let db = await dbConnect(); // Connect to the fake database
        let result = await db.collection().insertOne({
            name: data[0],
            age: data[1],
            contact: data[2]
        }); // Insert the new profile

        if (result.acknowledged) {
            console.log("\n....Data Inserted Successfully!!!");
        } else {
            console.log("\n....Operation Failed!!!");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

module.exports = insert;
