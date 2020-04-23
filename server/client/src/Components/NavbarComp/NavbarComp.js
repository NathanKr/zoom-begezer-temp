import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuth0 } from "../../react-auth0-spa";

import './NavbarComp.css'

function NavbarComp() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    return (
        <div className="NavbarComp">

      {!isAuthenticated && (
                  <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="/"><i className="fas fa-carrot"></i> זום בגזר </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Nav.Link href="/broadcast">לוח שידורים</Nav.Link>
                          <Nav.Link href="/about">אודות</Nav.Link>
                          {/* <Nav.Link href="#">הרשמת מדריכים</Nav.Link> */}
                          <Nav.Link href="/contactus">יצירת קשר</Nav.Link>
                      </Nav>
                      <Nav className="mr-auto sideNav">
                      <Nav.Link 
                      onClick={() => loginWithRedirect({})}>
                          הרשמת - התחברות מדריכ/ה
                          </Nav.Link>
                         </Nav>
                  </Navbar.Collapse>
              </Navbar>
      )}

      {isAuthenticated && (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><i className="fas fa-carrot"></i> זום בגזר </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/broadcast">לוח שידורים</Nav.Link>
                    <Nav.Link href="/about">אודות</Nav.Link>
                    <Nav.Link href="/profile">פרופיל</Nav.Link>
                    {/* <Nav.Link href="/instructor-signup">הוספת שיעור</Nav.Link> */}
                    <Nav.Link href="/contactus">יצירת קשר</Nav.Link>
                </Nav>
                <Nav className="mr-auto sideNav">
                <Nav.Link onClick={() => logout()}>התנתק/י</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
         )}
        </div>
    )
}

export default NavbarComp
