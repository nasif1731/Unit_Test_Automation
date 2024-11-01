const dbConnect = require('./fakeDb'); // Use the fake database
const prompt = require('prompt-sync')();

const update = async () => {
    try {
        const name = prompt("Enter Profile-Name: ").trim();
        const field = prompt("Enter field to update (name, age, or contact): ").trim();
        let newValue = prompt("Enter New-Value: ").trim();

        // Validate the field
        if (!['name', 'age', 'contact'].includes(field)) {
            console.log("Invalid field. Please enter 'name', 'age', or 'contact'.");
            return;
        }

        // Convert age to a number if the field is 'age'
        if (field === 'age') {
            newValue = parseInt(newValue, 10);
            if (isNaN(newValue)) {
                console.log("Invalid age. Please enter a number.");
                return;
            }
        }

        let db = await dbConnect();
        let result = await db.collection().updateOne(
            { name: name }, // Match the existing name
            { $set: { [field]: newValue } } // Using dynamic key for the field to update
        );

        if (result.acknowledged) {
            if (result.matchedCount > 0) {
                console.log("\n....Data Updated Successfully!!!");
            } else {
                console.log("\n....No Profile Found with that Name.");
            }
        } else {
            console.log("\n....Operation Failed!!!");
        }
    } catch (error) {
        console.error("An error occurred while updating the profile:", error);
    }
}

module.exports = update;
