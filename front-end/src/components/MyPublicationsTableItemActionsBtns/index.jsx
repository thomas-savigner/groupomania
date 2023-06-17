import { Link, useNavigate } from "react-router-dom";



const MyPublicationsTableItemActionsBtns = (props) => {

    const navigate = useNavigate();

    const accessToEditPostForm = (event) => {
        
        event.preventDefault()

        let UserPostDetails = {
            status: true,
            postID: props.postID,
          }
      
          const data = JSON.stringify( UserPostDetails );
            
          localStorage.setItem( 'UserPostDetails', data );
      
          navigate('/app/editpost');
    }

    return (

        <>
        
            <div className="d-flex my-2 py-1">
                <div className="mx-1 px-1 color-3">
                    <Link to={`/app/${props.postID}`}>
                        <span className="material-icons text-light py-1">visibility</span>
                    </Link>
                </div>
                <div className="mx-1 px-1 color-3">
                    <Link to="/app/editpost" onClick={accessToEditPostForm} >
                        <span className="material-icons text-light py-1">update</span>
                    </Link>
                </div>
                <div className="mx-1 px-1 color-3">
                    <div>
                        <span className="material-icons text-light py-1">delete</span>
                   </div>
                </div>
            </div>

        </>

    )


}

export default MyPublicationsTableItemActionsBtns;