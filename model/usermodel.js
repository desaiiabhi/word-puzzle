var mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})

module.exports = mongoose.model('user',userschema);