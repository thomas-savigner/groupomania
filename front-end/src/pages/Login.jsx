import * as React from 'react';
import { Nav, Col, Tab, Container } from 'react-bootstrap';
import SignInTabPane from '../components/SignInTabPane/index'
import SignUpTabPane from '../components/SignUpTabPane/index'



function Login() {  

  return (

    <>
  <div className='overflow-login-box'>
      <Container className="nav-display position-md-fixed top-md-position rounded color-3 d-flex justify-content-between border border-light border-2 p-3" fluid>
          <h1 className="fs-4 text-light">GroupoSpeak</h1>
      </Container>

      <Container className="" fluid>
        <div className="d-none d-md-block col-md-1 bg-dark bg-opacity-25 p-0 position-md-fixed vh-100 container-md-position left-column-md-position">
            <img src="../../images/the-blowup-17qno4cS6l0-unsplash.jpg" alt="façade de building vitré" 
                className="img-fit w-100 h-100"/>
        </div>
        <div className="d-none d-md-block col-md-10 position-md-fixed main-column-md-position px-0 vh-100 container-center-md-position">
            <img src="images/charles-forerunner-3fPXt37X6UQ-unsplash.jpg" alt="background offices shadows" 
                className="img-fit w-100 h-100"/>
        </div> 
        <div className="d-none d-md-block position-md-fixed col-md-1 bg-dark bg-opacity-25 p-0 vh-100 container-md-position right-column-md-position">
            <img src="../../images/the-blowup-17qno4cS6l0-unsplash.jpg" alt="façade de building vitré" 
                className="img-fit w-100 h-100"/>
        </div>
      </Container>

      <div className="box-position box-md-position box-lg-position">
      <Tab.Container id="signInTab" defaultActiveKey="SignIn" >
          <div>
            <Col className='d-flex flex-column align-items-center'>
                      <Nav className="w-50 px-0" variant="tabs">
                        <Nav.Item className="color-1 w-50 d-flex justify-content-center">
                          <Nav.Link eventKey="SignIn" className='text-light font-title'>Connexion</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="color-1 w-50 d-flex justify-content-center">
                          <Nav.Link eventKey="SignUp" className='text-light font-title'>Inscription</Nav.Link>
                        </Nav.Item>
                      </Nav>


                      <Tab.Content  className="w-50 px-0">
                        <Tab.Pane eventKey="SignIn" >
                          <SignInTabPane />
                        </Tab.Pane>
                        <Tab.Pane eventKey="SignUp">
                          <SignUpTabPane />
                        </Tab.Pane>
                      </Tab.Content>
            </Col>
            </div>
        </Tab.Container>

        </div>
      </div>
    </>
    
  );
}

export default Login;
