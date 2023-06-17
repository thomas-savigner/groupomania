
import React from 'react';
import PostCountersBox from "../PostCountersBox";
import MyPublicationsTableItemActionsBtns from '../MyPublicationsTableItemActionsBtns';
import { toFormatedDate } from '../../utils/formatDateFromDB';

const PostsTableItem = (props) => {
   
    const [ imageUrl, setImageUrl ] = React.useState(props.imageUrl);
    
    if (imageUrl === '') {
        setImageUrl('/icons/insert_photo.png');
      };

    
    // Format article date
    const datePostCreatedAt = toFormatedDate(props.createdAt);

    

    return (

        
            
                
           <>         
                    
                <tr className=''>      
                    <th scope="row" className="thumbnailCol" >
                        <img src={imageUrl} alt="article illustration" className='w-100 '/>
                    </th>
                    <td className='titleCol font-aside'>
                        <div>{props.title}</div>
                        <div>{datePostCreatedAt}</div>
                    </td>
                    <td className='statusAtCol'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" 
                                style={ (props.isRelease) ? 
                                    { width : 25, backgroundColor: 'orange ' } 
                                    : 
                                    { /*width : 50, backgroundColor: 'orange'*/ } }
                                aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div className="progress-bar" role="progressbar" 
                                style={ (!props.isRelease) ? 
                                    { width : 25, backgroundColor: 'green ' } 
                                    : 
                                { /*width : 50, backgroundColor: 'orange'*/ } }
                                aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div className="progress-bar" role="progressbar" 
                                style={ (props.isPublish) ? 
                                    { width : 50, backgroundColor: 'red' } 
                                    : 
                                    {  } } 
                                aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                
                        </div>
                    </td>
                 <td className='statsCol font-aside'>
                    <PostCountersBox
                        readingsNbr={props.readingsNbr}
                        likesNbr={props.likesNbr}
                        numberOfComments={props.numberOfComments} 
                    />
                    </td>
                    <td className='ctrlsCol'>
                        <MyPublicationsTableItemActionsBtns
                            postID={props.postID}
                        />
                    </td>
                </tr>  
            </>









    )


}
                
export default PostsTableItem