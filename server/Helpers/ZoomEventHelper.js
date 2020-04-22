const mongoose = require('mongoose');
const ZoomEvent = require('../models/ZoomEventModel');

//! Need to add valiation on the serverside

function addZoomEvent(req,res){
// console.log('reqBody Instractur',req.body);
// const { firstName, lastName , email, subject, location,phone, about } = req.body
const { 
    presentorEmail, 
    startTime , 
    presentor, 
    ages, 
    subject, 
    activity,
    requierments,
    isBrodcast,
    date
 } = req.body

        const newZoomEvent = new ZoomEvent({
            presentorEmail, 
            startTime , 
            presentor, 
            ages, 
            subject, 
            activity,
            requierments ,
            isBrodcast ,
            date
        });
        //! Save newZoomEvent
        newZoomEvent.save()
        .then(newZoomEvent => res.status(201).send(newZoomEvent))
        .catch(err=> res.status(500).send(err))   
}

function addZoomEventArray(req,res){
console.log('ZoomEventArray',req.body);
const ZoomEventArray =  req.body

ZoomEvent.collection.insertMany(ZoomEventArray)
.then(ZoomEvents => res.status(201).send(ZoomEvents) )
.catch(err=> res.status(500).send(err))   
}

function deleteZoomEvent(req,res){
const {id} = req.params

ZoomEvent.findByIdAndDelete(id)
.then(ZoomEvent => res.status(200).send(ZoomEvent))
.catch(err=> res.status(500).send(err))   
}


function getZoomEvent(req,res) {
    ZoomEvent.find({})
    .then(ZoomEvents => {
      if (!ZoomEvent) {
          return res.status(404).send('There are No Events');
      }else{
        return res.status(200).send(ZoomEvents)
      }
    });
}

module.exports.addZoomEvent = addZoomEvent;
module.exports.getZoomEvent = getZoomEvent;
module.exports.deleteZoomEvent = deleteZoomEvent;
module.exports.addZoomEventArray = addZoomEventArray;