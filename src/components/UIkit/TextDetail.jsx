import React from 'react';

interface Detail {
    label: string;
    value: string;
}

const TextDetail = (props: Detail) => {
    return (
        <div className="p-grid__detail">
            <div>{props.label}</div>
            <div>{props.value}</div>
        </div>
    );
};

export default TextDetail;