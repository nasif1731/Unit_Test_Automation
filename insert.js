const dbConnect=require('./mongodb'); //importing dbConnect() to connect with mongodb and return targeted collection of db
const prompt=require('prompt-sync')();

//heavy transaction thus using async await, as we need to wait for response from db side before going forward.
const insert=async ()=>{
    let data=[prompt("Enter Profile-Name: "),prompt("Enter Profile-Age: "),prompt("Enter Profile-Contact: ")]; // storing required data for operation inside an array which can later accessed by the function.
    let db=await dbConnect(); //waiting for connection to establish
    let result=await db.insertOne(
        {name:data[0],age:data[1],contact:data[2]}
    ); //running the operation and waiting for it to finish
    if(result.acknowledged){
        console.log("\n....Data inserted Successfully!!!");
    }else{
        console.log("\n....Operation Failed!!!")
    } //if acknowledged is true means success.
}

module.exports=insert; //exporting the module to use in main function.
