
import axios from 'axios';
import authHeaders from './auth-headers';

const API_URL = "http://localhost:4039/api/comments/";



//----------        API calls for handle Comment data      ----------


//--- "Create a comment" ---

const createComment = ( myComment ) => {

    return axios.post( `${API_URL}postID`, { myComment }, authHeaders.jwtToken() )

}



const commentService = {
    createComment
}


export default commentService