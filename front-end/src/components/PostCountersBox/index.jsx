import * as React from 'react';

export default function PostCountersBox( props ) {

    
    return (

        <>
            <div className="d-flex m-2 p-1 border rounded color-1 text-light">
                <div className="d-flex px-1">
                    <span className="material-icons mx-1">visibility</span>
                    <span>{props.readingsNbr}</span>
                </div>
                <div className="d-flex px-1">
                    <span className="material-icons mx-1">favorite_border</span>
                    <span>{props.likesNbr}</span>
                </div>
                <div className="d-flex px-1">
                    <span className="material-icons mx-1">forum</span>
                    <span>{props.numberOfComments}</span>
                </div>
            </div>
        </>

    )

}