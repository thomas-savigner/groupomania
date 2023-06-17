
import axios from 'axios';
import authHeaders from './auth-headers';


const API_URL = "http://localhost:4039/api/posts/";




//----------        API calls for handle Post data      ----------


//--- "create Post" ---

const createPost = ( file, userID, hashtags, topic, article, /*imageUrl,*/ isRelease ) => {

const myPost = {
    file: file,
    userID: userID,
    hashtags: hashtags,
    topic: topic,
    article: article,
    //imageUrl: imageUrl,
    isRelease: isRelease,
}

    return axios.post( API_URL, myPost, authHeaders.jwtTokenFormContent() )

}



//--- "get all posts" ---

const getFeeds = () => {

    return axios.get( `${API_URL}all`, authHeaders.jwtToken()  )

}



//--- "get one post with associated comments" ---

const focusOnPostandComments = (postID) => {

    return axios.get( `${API_URL}post/${postID}`, authHeaders.jwtToken() )

}



//---   "get all my posts"  ---
const getAllMyPosts = (userID) => {

    return axios.get(`${API_URL}${userID}`, authHeaders.jwtToken() )

}

//--- "update Post" ---

const updatePost = ( file, postID, userID, hashtags, topic, article, isRelease ) => {

    const newContent = {
        file: file,
        postID: postID,
        userID: userID,
        hashtags: hashtags,
        topic: topic,
        article: article,
        isRelease: isRelease,
    }
    
        return axios.put( `${API_URL}${newContent.postID}`, newContent, authHeaders.jwtTokenFormContent )
    
    }

//--- "update a post data"

const likePost = (postID) => {

    return axios.put( `${API_URL}like/${postID}`, null, authHeaders.jwtToken() )

}




const postService = {
    createPost,
    getFeeds,
    getAllMyPosts,
    focusOnPostandComments,
    updatePost,
    likePost,
};


export default postService