import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function Loggin(props) {
    return (
        <div style={{margin: "20px", marginTop:"50px"}}>
            {/* <h1>My App</h1> */}
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.fbAuth()} />
        </div>
    );
    // ss
}