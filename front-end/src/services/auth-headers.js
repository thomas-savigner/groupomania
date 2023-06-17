


//-----   Headers for axios requests   -----


const token = JSON.parse(localStorage.getItem('Bearer token'));



const jwtToken = () => {
    
    if (token) {
      return { 
        'headers' : {
         'Authorization': 'Bearer ' + token 
        } 
      }         
    } else {                                              
      return ( alert('No token store') );
    }
  
};



const formContent = () => {

    return { 'headers': { 'Content-Type': 'multipart/form-data'} }

};



const jwtTokenFormContent = () => {
  
  if (token) {

    return { 
      'headers': { 
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'multipart/form-data'}
                
    }         
  } else {                                              
    return {};
  }

}



const authHeaders = {
  jwtToken,
  formContent,
  jwtTokenFormContent,
};

export default authHeaders