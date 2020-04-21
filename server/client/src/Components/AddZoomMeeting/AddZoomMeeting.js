import React from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from "../../react-auth0-spa";
import history from '../../utils/history'

import './AddZoomMeeting.css'

function AddZoomMeeting() {
  const { user ,getTokenSilently} = useAuth0();

  let meetingDetails = {
    meetingType: 'מפגש חד פעמי',
    subject: '',
    whatIsNeeded: '',
    email: user.email,
  }

  const saveInputData = (e) => meetingDetails[e.target.name] = e.target.value;

  const onFormSubmit = (e) => {
    e.preventDefault();

    const callApi = async () => {
      const token = await getTokenSilently();
      axios.post('/zoom-meeting', meetingDetails,
        { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  callApi();
  history.push('/profile')
  };


  return (
    <div className="AddZoomMeeting">
      <h1>הוספת שיעורר</h1>

      <Form onSubmit={onFormSubmit} >
        {/* <Form.Row>
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
        </Form.Row>  */}

        {/* <Form.Row>
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
        </Form.Row> */}

        <Form.Group controlId="formGridAddress2">
          <Form.Label>באיזה תחום המפגש ?</Form.Label>
          <Form.Control
            type="text"
            onChange={saveInputData}
            required
            name="subject"
            placeholder="נושא" />
        </Form.Group>

        <Form.Group controlId="formGridwhatIsNeeded">
          <Form.Label>מה צריך למפגש ?</Form.Label>
          <Form.Control
            type="text"
            onChange={saveInputData}
            required
            name="whatIsNeeded"
            placeholder="למפגש צריכם להגיע עם כלי כתיבה"
          />
        </Form.Group>
        <Form.Group controlId="formGridAddress2">

          <Form.Label>? מפגש חד פעמי או סדרת מפגשים</Form.Label>
          <Form.Control
            name="meetingType"
            onChange={saveInputData}
            as="select"
            defaultValue="מפגש חד פעמי">
            <option>מפגש חד פעמי</option>
            <option> סדרת מפגשים</option>
          </Form.Control>
          {/* <Form.Control 
            type="text"
            onChange={saveInputData}
            required
            name="subject"
            placeholder="נושא" /> */}
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

export default AddZoomMeeting
