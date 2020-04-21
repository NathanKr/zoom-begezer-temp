const mongoose = require('mongoose');
const Instructor = require('../models/InstructorsModel');

//! Need to add valiation on the serverside

function addInstructor(req,res){
console.log('reqBody Instractur',req.body);
// const { firstName, lastName , email, subject, location,phone, about } = req.body
const { firstName, lastName , email, about, location, phone,knowZoom ,age} = req.body

        const newInstructor = new Instructor({
            firstName,
            lastName,
            location,
            about,
            phone,
            knowZoom,
            age,
            email
        });
        //! Save newInstructor
        newInstructor.save()
        .then(newInstructor =>res.status(201).send(newInstructor))
        .catch(err=> res.status(500).send(err))   
}

function getInstructor(req,res) {
    const {email} = req.params;
console.log(email);

    Instructor.findOne({email:email})
    .then(instructor => {
      if (!instructor) {
          return res.status(404).send('That email is not registered')
      }else{
        return res.status(200).send(instructor)
      }
    });
}

module.exports.addInstructor = addInstructor;
module.exports.getInstructor = getInstructor;