import React from 'react';

export default function Input(props) {
    return (
        <div className="pure-control-group">
            <label htmlFor="nome">{props.label}</label> 
            <input id={props.id} type={props.type} name={props.name} value={props.value} onChange={props.onChange} />
        </div>
    );
}
