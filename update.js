const dbConnect=require('./mongodb');
const prompt=require('prompt-sync')();
const query=require('querystring'); //as $set{data:"value"}, in this data can't be replaced by array object thus using qs to overcome this situation.

const update=async ()=>{
    let data=[prompt("Enter Profile-Name: "),prompt("Enter field to update(name,age or contact): "),prompt("Enter New-Value: ")];
    let qs=query.parse(`${data[1]}=${data[2]}`); //taking the required data from array and passing it in qs.parse to convert it into JSON format in order to use it.
    let db=await dbConnect();
    let result=await db.updateOne(
        {name:data[0]},{$set:qs} //passing qs.
    );
    if(result.acknowledged){
        console.log("\n....Data Updated Successfully!!!");
    }else{
        console.log("\n....Operation Failed!!!");
    }
}

module.exports=update;