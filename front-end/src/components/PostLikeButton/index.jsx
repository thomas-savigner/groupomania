import React from 'react';
import { useParams } from 'react-router-dom';
import postService from '../../services/post.service'


 const PostLikeButton = ( { heartColor, setHeartColor, likesNbr, setLikesNbr } ) => {

    const { postID } = useParams();


    const apiCallToLike = React.useCallback( () => {
                
            postService.likePost(postID)
                .then( ( response ) => {

                    setLikesNbr( response.data.likesNbr )
                    
                    heartColor ?  (
                        setHeartColor(false)
                    ) : (
                        setHeartColor(true)
                    )
                    
                })
        
    }, [ heartColor, postID, setHeartColor, setLikesNbr ] )
  

    return (

        <>

            <button type="button" onClick={apiCallToLike} className="text-light px-3 py-1 border border-light rounded color-3 m-1">
                {
                    heartColor ?  (
                        <span className="material-icons text-danger pt-1">favorite</span>
                    ) : (
                        <span className="material-icons text-light pt-1">favorite_border</span>
                    )
                }  
                <span className="font-aside mx-2 align-text-bottom "><b>J'aime</b></span>
            </button> 
            
        </>

    )

}

export default PostLikeButton;