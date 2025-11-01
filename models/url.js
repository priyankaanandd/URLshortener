const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },  
    redirectURL :{
        type: String,
        required: true
    },
        //orginal url
    visitHistory : [{timestamp : {type : Number}}],
    //array jisme time hoga kb click kia
},{ timestamps: true})

const URL = mongoose.model('url', urlSchema)

module.exports = URL;