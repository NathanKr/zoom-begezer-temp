const mongoose = require('mongoose');
const ZoomMeeting = require('../models/ZoomMeetingModel');

//! Need to add valiation on the serverside

function addZoomMeeting(req,res){
console.log('reqBody',req.body);
// const { firstName, lastName , email, subject, location,phone, about } = req.body
const { whatIsNeeded, subject , email, meetingType} = req.body

        const newZoomMeeting = new ZoomMeeting({
            meetingType,
            email,
            subject,
            whatIsNeeded
        });
        //! Save newZoomMeeting
        newZoomMeeting.save()
        .then(newZoomMeeting =>res.status(201).send(newZoomMeeting))
        .catch(err=> res.status(500).send(err))   
}

// function instructorDataHelper(req,res){
//     console.log('params',req.params.phone);
//     const { phone } = req.params
//     Instructor.find({ phone : phone })
//     .then(instrauctor => res.status(200).send(instrauctor))
//     .catch(err => res.status(404).send('instrauctor not found'))
//     }


module.exports.addZoomMeeting = addZoomMeeting;
// module.exports.instructorDataHelper = instructorDataHelper;