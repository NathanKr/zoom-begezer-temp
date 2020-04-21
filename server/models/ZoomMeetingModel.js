  
const mongoose = require('mongoose');

const ZoomMeetingSchema = new mongoose.Schema({
//    firstName: {
//             type:String,
//             required:true
//         },
//    lastName: {
//             type:String,
//             required:true
//         },
    // location: {
    //         type:String,
    //         required:true
    //     },
    subject:{
            type:String,
            required:true
        },
    whatIsNeeded: {
            type:String,
            required:true
        },
    email: {
            type:String,
            required:true
        },
    meetingType: {
            type:String,
            required:true
        },
    date: {
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('ZoomMeeting', ZoomMeetingSchema)