const dbConnect=require('./mongodb');

const display=async ()=>{
    let db=await dbConnect();
    let result=await db.find({}).toArray(); //using toArray() to beautify our output
    console.log(result); //console logging our findings as output.
}

module.exports=display;