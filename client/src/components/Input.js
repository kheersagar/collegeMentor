import React from 'react'

function Input(props) {
    return (
       <input type={props.type} placeholder={props.placeholder} value={props.value} style={props.style} {...props} />
    )
}

export default Input;
