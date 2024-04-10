const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String,required: true},
    plate: {type: String, required: true}
});

// const tweetSchema = new Schema({
//     tweet: {type: String,required: true},
//     user: {type: Schema.Types.ObjectId, ref:'DetailCars'}
// });

const Users = mongoose.model('users',userSchema,'users')
const mySchemas = {'Users':Users}

module.exports = mySchemas;