const express = require('express')
const router = express.Router();
const Quote = require('inspirational-quotes')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const app = express()

const uri = 'mongodb+srv://whatcanidowithmoon:HnwY2bIuibxNM28D@cluster0.s9futql.mongodb.net/Detail_Cars?retryWrites=true&w=majority'

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected MongDB");
    }catch (error){
        console.error(error)
    }
}
connect();
// require("./models/Schemas")
// const User = mongoose.model("userSchema");

app.get('/addUsers', async (req,res)=>{
    try{
        const allUsers = await User.find({})
        res.send({status: "ok",data: allUsers});
    }catch(err){
        console.log("User not added");
    }
});


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req,res)=>{
    const data = Quote.getQuote();
    console.log(data)
    res.send(data);
})

app.listen(8000, ()=>{
    console.log("server start port 8000")
});