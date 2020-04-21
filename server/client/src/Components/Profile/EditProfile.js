import React from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './EditProfile.css'
import { useAuth0 } from "../../react-auth0-spa";

function EditProfile({ user, goBack, setuserData }) {
    const { getTokenSilently } = useAuth0();
    const saveInputData = (e) => instructorDetails[e.target.name] = e.target.value;


    let instructorDetails = {
        firstName: '',
        lastName: '',
        location: '',
        about: '',
        phone: '',
        knowZoom: 'יש הכרות',
        age: '',
        email: user.email,
        // phone:''
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const callApi = async () => {
            const token = await getTokenSilently();
            axios.post('/instructor', instructorDetails,
              { headers: { Authorization: `Bearer ${token}` } }
              )
                .then((res) => {
                  if (res.status === 201) {
                    setuserData(res.data)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
          }
        callApi();
        goBack()
    };


    return (
        <div className="EditProfile">
            <h2>ערוך פרטים</h2>

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
                    <Form.Group as={Col} controlId="formGridAddress">
                        <Form.Label>ישוב</Form.Label>
                        <Form.Control
                            onChange={saveInputData}
                            required
                            name="location"
                            placeholder="ישוב" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>מספר טלפון</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={saveInputData}
                            required
                            name="phone"
                            placeholder="050000000" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAge">
                        <Form.Label>גיל</Form.Label>
                        <Form.Control
                            onChange={saveInputData}
                            name="age"
                            type="number"
                            required
                            placeholder="גיל" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridKnowZoom">
                        <Form.Label> האם יש הכרות עם אפליקציית זום ? </Form.Label>
                        <Form.Control
                            onChange={saveInputData}
                            name="knowZoom"
                            as="select"
                            defaultValue="יש הכרות">
                            <option>יש הכרות</option>
                            <option> אין הכרות</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>קצת עליי</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        onChange={saveInputData}
                        required
                        name="about"
                        placeholder=" יש לי ניסיון של 5 שנים ב..."
                    />
                </Form.Group>


                <Button
                    variant="success"
                    type="submit" >
                    שמור
        </Button>
                <Button
                    onClick={goBack}
                    variant="success"
                >
                    חזרה לדף הקודם
        </Button>
            </Form>
        </div>
    )
}

export default EditProfile
