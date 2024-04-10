const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/addUsers', async (req,res)=>{
    // const user = [
    //     {
    //         "name" : "นันทนัช วัฒนากูล",
    //         "plate" : "ยบ-4826"            
    //     },
    //     {
    //         "name" : "ณพวีร์ ตุ้มหิรัญ",
    //         "plate" : "ฎฑ-9154"            
    //     }

    // ]
    const user = {"name":"นันทนัช วัฒนากูล","plate":"ยบ-4826"};
    // res.end(JSON.stringify(str));
    const newUser = new Schemas.Users(user);
    
    try{
        await newUser.save(async (err, newUserResult));
        console.log("New user created!");
        res.end(JSON.stringify(str));
    }catch(err){
        console.log("User not added");
    }
});

router.post('/addUsers',(req,res)=>{
    res.end('NA');
});

module.exports = router;