import React from 'react'
import { Form ,Col, Button} from 'react-bootstrap';
import axios from 'axios';

import './InstructorSignup.css'

function InstructorSignup() {

let instructorDetails = { 
  firstName:'',
  lastName:'',
  location:'', 
  about:'', 
  subject:'', 
  email:'', 
  phone:''
  }

  const saveInputData = (e) => instructorDetails[e.target.name] = e.target.value;

  const onFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/instructor-signup', instructorDetails )
        .then((res)=> {
          if (res.status === 201) {   
           console.log(res.data);
          }
        })
        .catch((error)=> {
          console.log(error);
        });
  };
  

    return (
        <div className="InstructorSignup">
            <h1>הרשמת מדריכים</h1>

        <Form onSubmit={onFormSubmit} >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control 
            type="text" 
            name="firstName" 
            onChange={saveInputData}
            required
            placeholder="שם פרטי" />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control 
            type="text"
            onChange={saveInputData}
            required
            name="lastName"
            placeholder="שם משפחה" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>דוא"ל</Form.Label>
            <Form.Control 
            type="email"
            onChange={saveInputData}
            required
            name="email"
            placeholder="example@ex.com"
              />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>מספר טלפון</Form.Label>
            <Form.Control 
            type="text"
            onChange={saveInputData}
            required
            name="phone"
            placeholder="050000000" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress2">
        <Form.Label>מה תחום העניין אותו תרצה להעביר במפגש זום?</Form.Label>
        {/* <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control> */}
            <Form.Control 
            type="text"
            onChange={saveInputData}
            required
            name="subject"
            placeholder="נושא" />
        </Form.Group>

        <Form.Group controlId="formGridAbout">
          <Form.Label>ספר/י על עצמך ?</Form.Label>
          <Form.Control
          type="text"
          onChange={saveInputData}
          required
          name="about" 
          placeholder="אני בעל  ניסיון של  ..."
           />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>ישוב</Form.Label>
          <Form.Control
          onChange={saveInputData}
          required
          name="location" 
          placeholder="ישוב" />
        </Form.Group>
      
        <Button 
        variant="success"
        type="submit" >
          שלח
        </Button>
      </Form>
      </div>
    )
}

export default InstructorSignup
