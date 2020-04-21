  
const mongoose = require('mongoose');

const InstructorsSchema = new mongoose.Schema({
    firstName: {
            type:String,
            required:true
        },
    lastName: {
            type:String,
            required:true
        },
    location: {
            type:String,
            required:true
        },
    phone:{
            type:String,
            required:true
        },
    age: {
            type:String,
            required:true
        },
    email: {
            type:String,
            required:true
        },
    knowZoom: {
            type:String,
            required:true
        },
    about: {
            type:String,
            required:true
        },
    date: {
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Instructors', InstructorsSchema)
