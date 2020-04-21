// src/components/Profile.js

import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import useToggle from '../../hooks/useTogggleState';
import axios from 'axios';

import './Profile.css'
import EditProfile from "./EditProfile";

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [userData, setuserData] = useState({});
  const [edit, setedit] = useToggle(false)


  useEffect(() => {

    const callApi = async () => {
      const token = await getTokenSilently();
      axios.get(`/instructor/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          if (res.status === 200) {
            // console.log('instructode data',res.data);
            setuserData(res.data)
          }
        })
        .catch((error) => {
          console.log(error);
          setedit()
        });
    }
    callApi();
    return () => {
    }

  }, [user.email , getTokenSilently])



  if (loading || !user) {
    return <div>Loading...</div>;
  }  

  if (edit) {
    return <EditProfile user={user} goBack={setedit} setuserData={setuserData}/>
  }

  // Checks if there is User data
  if (Object.keys(userData).length) {
    return (
      <div className="Profile">
        <div>
          <img src={user.picture} alt="Profile" />
        </div>

        <button onClick={setedit}>ערוך פרטים</button>
    <div className="Profile_details">
        <h2>שם: {userData.firstName} {userData.lastName}</h2>
        <h2>גיל: {userData.age}</h2>
        <h2>טלפון: {userData.phone}</h2>
        <h2>ישוב: {userData.location}</h2>
        <h2>דוא"ל: {userData.email}</h2>
        <h2>סוג המשתמש: {user["https://zoom-begezer.co.il/role"]}</h2>
        <h3>קצת עליי: {userData.about}</h3>
      </div>
    </div>
    )
  }
  else {
    return (
      <div className="Profile">

        <div>
          <img src={user.picture} alt="Profile" />
        </div>

        <button onClick={setedit}>עדכן פרטים</button>

        <h2>User id: {user.sub}</h2>
        <h3>Email: {user.email}</h3>
      </div>
    );
  }
};

export default Profile;