const dbConnect=require('./mongodb');
const prompt=require('prompt-sync')();

const deletes=async ()=>{
    let data=prompt("Enter Profile-Name: ");
    let db=await dbConnect();
    let result=await db.deleteOne(
        {name:data}
    );
    if(result.acknowledged){
        console.log("\n....Data Deleted Successfully!!!");
    }else{
        console.log("\n....Operation Failed!!!")
    }
}

module.exports=deletes;