import React from 'react';

export default function Input(props) {
    return (
        <div className="pure-control-group">
            <label htmlFor="nome">{props.label}</label> 
            <input {...props} />
        </div>
    );
}
