import React from 'react';
import noImage from 'assets/img/no_image.png'

const ImageArea = (props) => {
    return (
        <div className="p-input__image">
            <img src={noImage}
                 id={props.id + "-thumb"} onClick={() => props.upload(props.id)} alt={"A thumbnail of the question"} />
            <input id={props.id} type="file" data-name="" onChange={e => props.preview(props.id, e)}/>
            <button onClick={() => props.delete(props.id)}>&times;</button>
        </div>
    )
};

export default ImageArea