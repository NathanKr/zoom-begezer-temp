  
const mongoose = require('mongoose');

const ZoomEventSchema = new mongoose.Schema({
    presentorEmail: {
            type:String,
            required:true
        },
    startTime: {
            type:String,
            required:true
        },
    presentor:{
            type:String,
            required:true
        },
    ages: {
            type:String,
            required:true
        },
    subject: {
            type:String,
            required:true
        },
    activity: {
            type:String,
            required:true
        },
    requierments: {
            type:String,
            required:true
        },
    isBrodcast: {
            type:Boolean,
            required:true
        },
    date: {
        type:Date,
        default: new Date().toDateString()
    }
}, { timestamps: true });

module.exports = mongoose.model('Events', ZoomEventSchema)

// {"id":5,
// "date":"Sat Apr 11 2020",
// "startTime":"09:00",
// "presentor":"אופק",
// "subject":"Angular",
// "activity":"עיצוב",
// "ages":"15-45",
// "requierments":"vsc",
// "link":"zoom.com"
// }