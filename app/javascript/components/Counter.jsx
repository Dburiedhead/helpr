import React from 'react'


export default function Counter(props) {
    const count = props.requests.filter((ur) => ur.fulfilled === false).length;
    return (
        <p>{count}</p>
    )
}