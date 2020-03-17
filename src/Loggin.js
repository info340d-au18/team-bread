import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Card} from 'react-bootstrap';

export default function Loggin(props) {
    return (
        <div id = 'profileBack'>
            <div id = 'profile'>
                <Card>
                    <h3>Please sign-in:</h3>
                    <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.fbAuth()} />
                </Card>
            </div>
        </div>
    );
}