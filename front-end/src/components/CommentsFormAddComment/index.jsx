
import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useParams } from "react-router-dom";
import commentService from "../../services/comment.service"



const CommentsFormAddComment = ( 
    {   
        articleComments,
        articleUpdatedAt,
        setArticleUpdatedAt, 
        numberOfComments, 
        setArticleComments, 
        setNumberOfComments 
    } 
        
    ) => {

        const { postID } = useParams();

        const avatarStore = JSON.parse(localStorage.getItem("User data")).avatar;
        const userFirstName = JSON.parse(localStorage.getItem("User data")).firstName;
        const userLastName = JSON.parse(localStorage.getItem("User data")).lastName;
        
        
        const formik = useFormik(
            {
                initialValues: {
                    usercomment: '',
                },
                validationSchema: 
                    object().shape({
                        usercomment: string()
                                    .min(5, "Veuillez écrire au moins un mot de 5 lettres")
                                    .required("Vous ne pouvez pas publier un commentaire vide")
                    })
                ,
                onSubmit: React.useCallback( ( values, { resetForm } ) => { 

                    const postIDInserted = JSON.parse(postID);
                    const dataStored = JSON.parse(localStorage.getItem("User data"));
                    const userID = dataStored.userID;

                    const myComment = {
                        postID: postIDInserted,
                        userID: userID,
                        content: values.usercomment,
                    }
                    
                    commentService.createComment( myComment )
                        .then( (response) => {
            
                            const arrayCommentItem = {
                                commentID: response.data.commentID,
                                userID: response.data.userID,
                                postID: response.data.postID,
                                content: response.data.content,
                                createdAt: response.data.createdAt,
                                userC: {
                                    firstName: userFirstName,
                                    lastName: userLastName,
                                    avatarUrl: avatarStore,
                                }
                            }

                            setArticleUpdatedAt( response.data.createdAt );

                            setArticleComments( articleComments => [...articleComments, arrayCommentItem ] );

                            setNumberOfComments( articleComments.length )

                            resetForm( { values: '' } );

                        })
                        .catch( (err) => { console.log(err) } )
                
                    }, [ articleComments.length, avatarStore, postID, setArticleComments, setArticleUpdatedAt, setNumberOfComments, userFirstName, userLastName ] )
                
                }

        )
            

        return (

            <>
            
                <form onSubmit={formik.handleSubmit} className="color-4 d-flex">
                    <div className="col-2 color-3">
                        <img className="img-fluid rounded-circle" src={avatarStore} alt="" />
                    </div>
                    <fieldset className="col-10">    
                        <div className="form-group">
                                <textarea 
                                    id="usercommentarea"
                                    name="usercomment"
                                    placeholder="Ajoutez ici votre commentaire"
                                    onChange={formik.handleChange}
                                    value={formik.values.usercomment}
                                    className="form-control"
                                >
                                </textarea>
                                { formik.errors.usercomment && formik.touched.usercomment && (
                                    <p className="text-danger font-aside my-1">{formik.errors.usercomment}</p> 
                                )} 
                                <input 
                                    id="submitbutton"
                                    name="submitbutton" 
                                    type="submit" 
                                    value="Partager"
                                    className="color-3  m-2 text-light border border-dark"
                                />
                        </div>  	
                    </fieldset>

                </form>

            </>

        )

}

export default CommentsFormAddComment;