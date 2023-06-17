import React from "react";
import PostItem from "../components/PostItem";
import postService from "../services/post.service";
import { HashLink } from "react-router-hash-link";
import smoothscroll from "smoothscroll-polyfill";



function PostUpStreamFlow() {

  const [items, setItems] = React.useState([]);


  smoothscroll.polyfill();

  const getAllPosts = React.useCallback( () => {

    postService.getFeeds()
        .then( ( res ) => { 
                setItems(res.data.result);
                
        })
        .catch((error)=> console.log(error))

}, [] )


React.useEffect( () => { getAllPosts() }, [getAllPosts] )


  return (

        <>
            <div>

              {

                items.map((post) =>

                  (

                    <PostItem   
                              key={post.postID}
                              tagId={post.postID}
                              postID={post.postID}
                              avatarUrl={post.userP.avatarUrl}
                              firstName={post.userP.firstName}
                              lastName={post.userP.lastName}
                              department={post.userP.department.name}
                              articleCreatedAt={post.createdAt}
                              postUpdatedAt={post.postCommentsModifiedAt}
                              topic={post.topic}
                              hashtags={post.hashtags}
                              article={post.article}
                              imageUrl={post.imageUrl}
                              readingsNbr={post.readings}
                              likesNbr={post.likes}
                              numberOfComments={post.numberOfComments}
                    />

                 )
                  
                )

             }

            


          </div>

          <div className="d-flex justify-content-center linktoppage-margin">
              <HashLink smooth to="#top" className="border border-light m-5 p-2 color-3">
                <span className="material-icons text-light">arrow_upward</span>
              </HashLink>
          </div>
          
        </>

  );

  
}

export default PostUpStreamFlow;


