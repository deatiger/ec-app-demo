import React from 'react';
import {useDispatch} from "react-redux";
// import {openImageModalAction} from "../../reducks/modal/action";

const ImagePreview = (props) => {
    const dispatch = useDispatch();

    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img alt="アイキャッチ画像" src={props.path} />
        </div>
    );
};

export default ImagePreview;