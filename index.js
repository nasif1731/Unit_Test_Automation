// starting point of our code
const prompt = require('prompt-sync')(); // Import prompt-sync module
const insert = require('./insert'); // Importing required methods
const update = require('./update');
const deletes = require('./delete');
const display = require('./display');

console.log('\t----Profile Management System---')

// Main function for managing user interaction
const main = async () => {
    while (true) {
        console.log("\n----Options----");
        console.log('1. Insert\n2. Update\n3. Delete\n4. Display\n5. Exit\n');
        let choice = +prompt("Enter your choice: ");

        if (isNaN(choice) || choice < 1 || choice > 5) {
            console.log("\nIncorrect choice! Please enter a number between 1 and 5.");
            continue; // Continue the loop for valid input
        }

        switch (choice) {
            case 1: 
                await insert();
                break;
            case 2: 
                await update();
                break;
            case 3: 
                await deletes();
                break;
            case 4: 
                console.log("\t---Output---");
                await display();
                break;
            case 5: 
                console.log("Exiting the Profile Management System. Goodbye!");
                return; // Exit the loop
        }
    }
}

main(); // Calling our main function
