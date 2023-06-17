
import axios from "axios";
import authHeaders from "./auth-headers";

const API_URL = "http://localhost:4039/api/auth/";


//----------        API calls for handle user data      ----------


//--- "Signup post request" ---

const signup = async (
      file, 
      firstName, 
      lastName, 
      departmentID, 
      email, 
      password, 
      passwordConfirm 
    
    ) => {
      
      try {
        
        const response = await axios.post(API_URL + "signup", {
              file,
              lastName,
              firstName,
              departmentID,
              email,
              password,
              passwordConfirm,
          }, 
          
          authHeaders.formContent()
        
        )
      

        if (response.data.token) {
     
          localStorage.setItem("Bearer token", JSON.stringify(response.data.token));
    
        }

        if (response.data.user) {
      
          localStorage.setItem("User data", JSON.stringify(response.data.user));
    
        }

      } catch (error) {

          console.log(error.toJSON());
  
      }

};


//--- "Login post request"  ---

const login = async (email, password) => {
  try {

    const response = await axios.post(API_URL + "login", {
        email,
        password,
      }
    );

    if (response.data.token) {
      
      localStorage.setItem("Bearer token", JSON.stringify(response.data.token));
    
    }

    if (response.data.user) {
    
      localStorage.setItem("User data", JSON.stringify(response.data.user));
    
    }
    } catch (error) {
    
      console.log(error.toJSON());
  
    }

}    


//--- "Logout user request" ---

const logout = async () => {

  try {

      await axios.put(API_URL + "logout", null, authHeaders.jwtToken() );
      localStorage.clear();

  } catch (error) {

    console.log(error.toJSON());

  }

};


//--- "Who's user connected request"  ---

const getCurrentUser = () => {

  return JSON.parse(localStorage.getItem("User data"));

};



const AuthService = { 
  signup,
  login,
  logout,
  getCurrentUser,
};


export default AuthService;