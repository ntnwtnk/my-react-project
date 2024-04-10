const { MongoClient } = require('mongodb');
const express = require('express');
const { json } = require('body-parser');
const app = express()


const uri = 'mongodb+srv://whatcanidowithmoon:HnwY2bIuibxNM28D@cluster0.s9futql.mongodb.net/?retryWrites=true&w=majority'
const database ='Details_Cars'
const client = new MongoClient(uri);
// let x = ""


async function dbConnect(){
    let results = await client.connect();
    console.log("connected")
    db = results.db(database);
    col = db.collection('users');
    let data = await col.find({}).toArray();
    // console.log(data);
    x=data
}

// module.exports=dbConnect;
// dbConnect()

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', async (req,res)=>{
    await dbConnect();
    console.log(x)
    res.send(x);
})

app.listen(8000, ()=>{
    console.log("server start port 8000")
});