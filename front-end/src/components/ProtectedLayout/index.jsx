import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Navbar from "../Navbar/index"
import UserMenu from "../UserMenu/index"
import FirstFooter from "../FirstFooter"


const ProtectedLayout = () => {
    const outlet = useOutlet();

    if (!localStorage.getItem("Bearer token")) {
        return <Navigate to="/" />;
    }

    return (
    <div>
        
        <Container className="nav-display position-sticky header-position rounded color-3 d-flex align-items-start border border-light border-2" fluid> 
          <div className='header-content-position'>
            <img src="/logos-brand/white-logo.png" className="logo-header" alt="logo"/>
            <h1 className="fs-4 text-light mx-2">GroupoSpeak</h1>
            <Navbar />
          </div>
        </Container>
        <Container fluid >
            <div className="d-none d-md-block col-md-1 bg-dark p-0 position-md-fixed vh-100 container-md-position left-column-md-position">
                <img src="../../images/the-blowup-17qno4cS6l0-unsplash.jpg" alt="façade de building vitré" 
                    className="img-fit w-100 h-100"/>
            </div>
            <div className="d-none d-md-block col-md-10 position-md-fixed main-column-md-position px-0 vh-100 container-center-md-position">
                <img src="../../images/aurelien-thomas-NgNAa1fNUb8-unsplash.jpg" alt="background offices shadows" 
                    className="img-fit w-100 h-100"/>
            </div> 
            <div className="d-none d-md-block position-md-fixed col-md-1 bg-dark bg-opacity-25 p-0 vh-100 container-md-position right-column-md-position">
                <img src="../../images/the-blowup-17qno4cS6l0-unsplash.jpg" alt="façade de building vitré" 
                    className="img-fit w-100 h-100"/>
            </div>
            <FirstFooter className="d-none d-md-block"/>
        </Container>
        
            {outlet}
        <UserMenu />
        
                
    </div>
    );
};

export default ProtectedLayout