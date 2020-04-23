import React from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './EditProfile.css'
import { useAuth0 } from "../../react-auth0-spa";

function EditProfile({ user, setedit, setuserData ,userData}) {
    const { getTokenSilently } = useAuth0();
    const saveInputData = (e) => instructorDetails[e.target.name] = e.target.value;
    function inputDefaultValue (key) {
        return userData[key] ? userData[key] : '' 
     }

    let instructorDetails = {
        firstName: inputDefaultValue('firstName'),
        lastName:  inputDefaultValue('lastName'),
        location:  inputDefaultValue('location'),
        about:  inputDefaultValue('about'),
        phone:  inputDefaultValue('phone'),
        knowZoom: inputDefaultValue('knowZoom') || 'יש הכרות',
        age:  inputDefaultValue('age'),
        email: user.email,
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const addNewInstructor = async () => {
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
        const updateInstructorData = async () => {
            const token = await getTokenSilently();
            axios.put(`/instructor/${userData._id}`, instructorDetails,
              { headers: { Authorization: `Bearer ${token}` } }
              )
                .then((res) => {
                  if (res.status === 200) {
                    setuserData(res.data)
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
          }

          //! if userData exsist then we use Update else Add
          if (userData.firstName) {
              updateInstructorData();
          }else{
              addNewInstructor();
          }
       setedit(false)
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
                            defaultValue={inputDefaultValue('firstName')}
                            placeholder="שם פרטי" />
                            
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>שם משפחה</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={saveInputData}
                            required
                            name="lastName"
                            defaultValue={inputDefaultValue('lastName')}
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
                            defaultValue={inputDefaultValue('location')}
                            placeholder="ישוב" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>מספר טלפון</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={saveInputData}
                            required
                            name="phone"
                            defaultValue={inputDefaultValue('phone')}
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
                            defaultValue={inputDefaultValue('age')}
                            required
                            placeholder="גיל" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridKnowZoom">
                        <Form.Label> האם יש הכרות עם אפליקציית זום ? </Form.Label>
                        <Form.Control
                            onChange={saveInputData}
                            name="knowZoom"
                            as="select"
                            defaultValue={inputDefaultValue('knowZoom')||"יש הכרות"} 
                            >
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
                        onClick={(e) => console.log(e.target.value,instructorDetails.about)
                        }
                        required
                        name="about"
                        wrap="hard"
                        defaultValue={inputDefaultValue('about')}
                        placeholder=" יש לי ניסיון של 5 שנים ב..."
                    />
                </Form.Group>


                <Button
                    variant="success"
                    type="submit" >
                    שמור
        </Button>
                <Button
                    onClick={()=>setedit(false)}
                    variant="success"
                >
                    חזרה לדף הקודם
        </Button>
            </Form>
        </div>
    )
}

export default EditProfile
