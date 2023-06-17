
import React from "react";
import { useParams } from "react-router-dom";
import postService from "../services/post.service";
import PostFocusBox from "../components/PostFocusBox";
import CommentsBox from "../components/CommentsBox";
import { HashLink as Link} from "react-router-hash-link";



const FocusOnPost= () => {

  const { postID } = useParams();

  const [ articleContent, setArticleContent ] = React.useState([]);
  const [ articleComments, setArticleComments ] = React.useState([]);
  const [ articleUpdatedAt, setArticleUpdatedAt ] = React.useState();
  const [ heartColor, setHeartColor ] = React.useState()
  const [ readingsNbr, setReadingsNbr ] = React.useState();
  const [ likesNbr, setLikesNbr ] = React.useState();
  const [ numberOfComments,setNumberOfComments ] = React.useState();
  


  const callingPost = React.useCallback( () => {
   
    postService.focusOnPostandComments(postID)
      .then( (response) => {
          
          let body = [];

          body.push(response.data.postComments);
          
          setArticleContent(body);
          

          let commentsArray = response.data.postComments.pstComments;
          
          let comments = [];
          
          for (let u = 0; u < commentsArray.length; u++) {
            comments.push(response.data.postComments.pstComments[u]);
          }


          setArticleUpdatedAt(response.data.postComments.postCommentsModifiedAt);

          setArticleComments(comments);

          setHeartColor(response.data.heartHasColor);

          setReadingsNbr(response.data.readingsNbr);

          setLikesNbr(response.data.likesNbr);

          setNumberOfComments(response.data.postComments.numberOfComments);

      })
      .catch( (error) =>  { console.log(error) } )
 
  }, [ postID ]);


  React.useEffect(()=> { callingPost() }, [ callingPost ] )


  return (
          
          <>

              <Link to={`/app/upstreamflow#${postID}`} >
                <span className="material-icons">first_page</span>
              </Link>

              {

                articleContent.map((post) => (
            
                  <PostFocusBox 
                                  key={post.postID}
                                  avatarUrl={post.userP.avatarUrl}
                                  firstName={post.userP.firstName}
                                  lastName={post.userP.lastName}
                                  department={post.userP.department.name}
                                  articleCreatedAt={post.createdAt}
                                  postCommentsModifiedAt={articleUpdatedAt}
                                  topic={post.topic}
                                  hashtags={post.hashtags}
                                  article={post.article}
                                  imageUrl={post.imageUrl}
                                  readingsNbr={readingsNbr}
                                  setReadingsNbr={setReadingsNbr}
                                  heartColor={heartColor}
                                  setHeartColor={setHeartColor}
                                  likesNbr={likesNbr}
                                  setLikesNbr={setLikesNbr}
                                  numberOfComments={articleComments.length}
                                  setNumberOfComments={setNumberOfComments}
                  />

                ))

              }

              <div className="commentsbox-position">

                <CommentsBox
                                articleUpdatedAt={articleUpdatedAt}
                                setArticleUpdatedAt={setArticleUpdatedAt}
                                numberOfComments={numberOfComments}
                                setNumberOfComments={setNumberOfComments}
                                articleComments={articleComments}
                                setArticleComments={setArticleComments}
                />
        
            </div>

          </>

  );

}

export default FocusOnPost;
