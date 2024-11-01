const dbConnect = require('./fakeDb'); 

const display = async () => {
    try {
        const db = await dbConnect();
        const result = await db.collection().find({}).toArray(); 
        if (result.length > 0) {
            console.log("Profiles:");
            console.log(result); 
        } else {
            console.log("No profiles found.");
        }
    } catch (error) {
        console.error("An error occurred while fetching profiles:", error);
    }
}

module.exports = display;
