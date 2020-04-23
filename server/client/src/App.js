import React,{ useEffect } from 'react';
import './App.css';
import Broadcast from './Components/Broadcast/Broadcast';
import { Router, Route, Switch } from "react-router-dom";
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';
import InstructorSignup from './Components/AddZoomMeeting/AddZoomMeeting';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Profile from './Components/Profile/Profile';

function App() {

  const { loading ,logout } = useAuth0();
  
 
    useEffect(() => {
      return () => {
       logout()        
      }
    }, [])

   if (loading) {
      return <div className="App_loading">. . .טוען </div>;
    }

  return (
    <div className="App">
      <Router history={history} >
        <NavbarComp />
     
     <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/broadcast' component={Broadcast}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contactus' component={ContactUs}/>
        <Route exact path='/instructor-signup' component={InstructorSignup}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
     </Switch>
     
     </Router>
     <Footer />
    </div>
  );
}

export default App;
