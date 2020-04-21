const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000 || process.env.PORT;
const ZoomMeeting = require('./Helpers/ZoomMeetingHelper');
const Instructor = require('./Helpers/InstructorHelper');
const ZoomEvent = require('./Helpers/ZoomEventHelper');
const MongoURI = 'mongodb://localhost:27017/zoombegezer';
const utils = require('./production_utils')

// const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

app.use(express.json());

mongoose.connect(MongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('MongoDb is Connected'))
        .catch((err) => console.log(err));


// Accept cross-origin requests from the frontend app
// app.use(cors({ origin: 'http://localhost:3000' }));

const authConfig = {
        domain: "zoom-begezer.eu.auth0.com",
        audience: "https://zoom-begezer.co.il/"
};
// Define middleware that validates incoming bearer tokens
// using JWKS from dev-3yr8u6u0.auth0.com
const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
        }),
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
        res.send({
                msg: "Your Access Token was successfully validated!"
        });
});


//! Instructor adds Zoom  meeting
app.post('/zoom-meeting',checkJwt, (req, res) => {
        ZoomMeeting.addZoomMeeting(req, res)
});

//! Instructor adds Personal Detailes
app.post('/instructor',checkJwt, (req, res) => {
        Instructor.addInstructor(req,res)
});
//! Instructor profile page Retrives Personal Detailes
app.get('/instructor/:email',checkJwt, (req, res) => {
        Instructor.getInstructor(req,res)
});

// //! Add New Zoom Event  ****need to add token 
// app.post('/zoom-event',(req, res) => {
//         ZoomEvent.addZoomEvent(req,res)
// });
//! Add ### Array of Zoom Events ##  ****need to add token 
app.post('/zoom-event',(req, res) => {
        ZoomEvent.addZoomEventArray(req,res)
});
//! Retrive all Zoom Event ****need to add token
app.get('/zoom-event',(req, res) => {
        ZoomEvent.getZoomEvent(req,res)
});
//! delete zoom event by id ****need to add token
app.delete('/zoom-event/:id',(req, res) => {
        ZoomEvent.deleteZoomEvent(req,res)
});

console.log('app is loading...');

// --- must be last before listen because it handle non served route
utils.handleProduction(express,app);

app.listen(port, () => console.log('app is listening on port ' + port));