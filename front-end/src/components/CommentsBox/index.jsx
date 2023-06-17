import React from 'react';
import CommentsItem from '../CommentsItem';
import CommentsFormAddComment from '../CommentsFormAddComment';

const CommentsBox = ( props ) => {

    return (

                <>
                    {
                        props.articleComments.map((comment) => (
                            
                            <CommentsItem 
                                            key={comment.commentID}
                                            tagId={comment.commentID}
                                            userAvatar={comment.userC.avatarUrl}
                                            userFirstName={comment.userC.firstName}
                                            userLastName={comment.userC.lastName}
                                            timestamp={comment.createdAt}
                                            content={comment.content}
                            />
                            
                        ))
                        
                    }
                        <CommentsFormAddComment
                                                    articleUpdatedAt={props.articleUpdatedAt}
                                                    setArticleUpdatedAt={props.setArticleUpdatedAt}
                                                    numberOfComments={props.numberOfComments}
                                                    setNumberOfComments={props.setNumberOfComments}
                                                    articleComments={props.articleComments}
                                                    setArticleComments={props.setArticleComments}
                        />

                </>
        
        )

}

export default CommentsBox;