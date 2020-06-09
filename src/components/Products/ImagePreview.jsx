import React from 'react';

const ImagePreview = (props) => {

    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img alt="アイキャッチ画像" src={props.path} />
        </div>
    );
};

export default ImagePreview;