const mongoose = require("mongoose");
mongoose.set("debug",true)
mongoose.Promise=Promise
require('dotenv').config();

mongoose.connect(
    `mongodb://localhost:27017/kanhasoft_db`,{
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useCreateIndex:true       
    }

).then(()=>{
    console.log("connection successfull")
})

exports.User = require('../models/userModel')
exports.Category = require('../models/categorymodel')