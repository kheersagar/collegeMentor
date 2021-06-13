import React from 'react'

function Button(props) {
    return (
        <button type={props.type} className={props.class} {...props} >{props.value} </button>
    )
}

export default Button;
