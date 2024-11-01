const dbConnect = require('./fakeDb'); // Use the fake database
const prompt = require('prompt-sync')();

const deletes = async () => {
    const data = prompt("Enter Profile-Name to Delete: ");
    try {
        const db = await dbConnect();
        const result = await db.collection().deleteOne({ name: data });

        if (result.acknowledged) {
            if (result.deletedCount > 0) {
                console.log("\n....Data Deleted Successfully!!!");
            } else {
                console.log("\n....No Profile Found with that Name.");
            }
        } else {
            console.log("\n....Operation Failed!!!");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

module.exports = deletes;
