const {MongoClient}=require('mongodb'); //imporing mongodb-client module.
const url='mongodb://127.0.0.1:27017'; //specifying the url isnside variable for connection purpose.
const client=new MongoClient(url); //invoking new client to connect with db.

//heavy transaction thus, async await.
const dbConnect=async ()=>{
    let result=await client.connect(); //connecting our client with mongodb
    let db=result.db('profile'); //once connection is established we are connecting with required db.
    return db.collection('details'); //targeting and returning the collection inside our db in order to run queries on that
}

module.exports=dbConnect; //exporting the dbconnect() to use.