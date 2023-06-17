import * as React from 'react';
import { Dropdown} from "react-bootstrap";
import AuthService from '../../services/auth.service';
import { useNavigate, useLocation } from 'react-router-dom';


export default function UserMenu() {

    const navigate = useNavigate();
    const location = useLocation();

    const userData = JSON.parse(localStorage.getItem("User data"))
    const avatarUrl = userData.avatar;
    

    const unLogUser = () => {
       AuthService.logout()
            .then(()=> {
                const origin = location.state?.from?.pathname || '/';
                navigate(origin, {replace: true});
            })
    }  

    return (
        <>
            <Dropdown className="d-flex flex-column justify-content-center button-usermenu-position">
                 <Dropdown.Toggle className="btn btn-sm text-light color-1 d-flex flex-column justify-content-center 
                            align-items-center rounded-circle"
                         id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="rounded-circle mt-1 avatar-dropdown-container">
                        <img alt="user account icon" src={avatarUrl} className="avatar-dropdown rounded-circle"/>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="color-1 rounded font-title" aria-labelledby="settingsDropdown">
                    <Dropdown.Item  href="profile"  className="text-light">
                        <div className="d-flex justify-content-start">
                            <span className="material-icons">manage_accounts</span>
                            <span className="mx-3">Profil</span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="mypublications" className="text-light">
                        <div className="d-flex justify-content-start">
                            <span className="material-icons">publish</span>
                            <span className="mx-3">Mes Posts</span>
                        </div>     
                    </Dropdown.Item>
                    <Dropdown.Item as="button" className="text-light">
                    
                        <div onClick={unLogUser}  className="d-flex justify-content-start" >
                            <span className="material-icons">logout</span>
                            <span className="mx-3">Se déconnecter</span>
                        </div>  
                           
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

}