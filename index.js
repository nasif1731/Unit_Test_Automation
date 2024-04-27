//starting point of our code
const prompt=require('prompt-sync')(); //node.js needs to import prompt-sync module to use prompt.
const insert=require('./insert'); //importing required methods.
const update=require('./update');
const deletes=require('./delete');
const display=require('./display');
console.log('\t----Profile Management System---')

// we are dealing with db transactions which takes timethus we are using async await function
// switch case need not to be closed until hit exit thus, using while(true)
const main=async ()=>{
    while(true){
        console.log("\n----Options----")
        console.log('1.Insert\n2.Update\n3.Delete\n4.Display\n5.exit\n');
        let choice=+prompt("Enter your choice: ");
        switch(choice){
            case 1:await insert();
            break;
            case 2:await update();
            break;
            case 3:await deletes();
            break;
            case 4:console.log("\t---Output---")
                await display();
            break;
            case 5: return -1;
            default: console.log("\nIncorrect choice! please enter one of the given options.");
            break;
        }
    }
}

main(); //calling our main function