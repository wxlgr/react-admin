
import React, { Component } from 'react'

//封装的标题面板
export default function (props) {
    return (
        <div style={{padding:"10px"}}>
            <h3>{props.title}</h3>
            {props.children}
        </div>
    )
}
