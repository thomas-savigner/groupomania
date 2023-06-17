import React from 'react';
import { Link } from 'react-router-dom'
import { toFormatedDate } from '../../utils/formatDateFromDB';
import PostCountersBox from '../PostCountersBox/index';


const PostItem= (props) => {

  const [ readingsNbr ] = React.useState(props.readingsNbr);
  const [ likesNbr ] = React.useState(props.likesNbr);
  const [ numberOfComments ] = React.useState(props.numberOfComments);
  const [ imageUrl, setImageUrl ] = React.useState(props.imageUrl);

  if (imageUrl === '') {
    setImageUrl('/images/outline_insert_photo_black_48dp.png')
  }

  // Format timestamp to date-time
  let dateArticleCreatedAt = toFormatedDate(props.articleCreatedAt)
	let datePostUpdatedAt = toFormatedDate(props.postUpdatedAt)

  return (
            <>
            
              <section id={props.tagId} className="card-position border border-dark mx-auto mt-1 color-4  text-decoration-none">
               
                  <Link to={"/app/" + props.postID} style={{textDecoration: 'none'}}>
                
                    <header className="d-flex p-1 color-2 card-header">
                        
                        <img alt="user account icon" src={props.avatarUrl} className="rounded-circle avatar-width" />
                        
                        <div className="mx-2 text-dark d-flex  flex-wrap w-100">
                          <h2 className="my-0 font-title fs-5 w-100">{props.firstName} {props.lastName}</h2>
                          <p className="my-0 font-text fs-6 w-50">{props.department}</p>   
                          <p className="mb-1 w-50 text-end">article posté le {dateArticleCreatedAt}</p>
                          <p className="mb-1 w-50 text-end">Contenu mis à jour le {datePostUpdatedAt}</p>
                        </div>

                      </header>

                      <main className="p-0">

                        <div className="px-1 color-4 px-2 text-dark">
                          <h3 className="font-title mb-0 fs-5">{props.topic}</h3>
                          <div className="d-md-flex">
                            <div className="cardblock-md-position">
                              <p className="font-text fs-6 pt-2">{props.hashtags}</p>
                              <p className="text-article font-text fs-6">{props.article}</p>
                            </div>  
                            <div className="color-4 my-1 mx-auto imgcontainer-position text-center">
                              <img src={imageUrl} alt="article's illustration" className="img-fluid border-dark imgphoto-position p-0" />
                            </div>
                          </div>
                        </div>

                      </main>

                      <footer className="color-2 d-flex justify-content-end pt-1 border border-dark text-dark">

                        <div className="">
                        
                          <PostCountersBox
                                            readingsNbr={readingsNbr}
                                            likesNbr={likesNbr}
                                            numberOfComments={numberOfComments}
                          />

                        </div>

                      </footer>
                    
                    </Link>

                </section>
                
              </>
    
    )

}
export default PostItem;