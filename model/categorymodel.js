var mongoose = require('mongoose');

const categoryschema = new mongoose.Schema({
    cat_name:{type:String},
    cat_image:{type:String}
})

module.exports = mongoose.model('category',categoryschema);