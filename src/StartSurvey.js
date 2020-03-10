import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';
import {NavBar} from './NavBar.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';



export class StartSurvey extends React.Component {
    render() {
        return (
            
            <div>
                {/* <NavBar /> */}
                <div id="beginWrap">
                    <div id="begin" className="d-flex">
                        <Card className="bg-light border-light text-center p-1">
                            <Card.Body>
                                <Card.Title className="text-center">Let's Take a Walk...</Card.Title>
                                <Link to="/findroute">
                                    <Button variant="primary" className="shadow" id="BEGINNN">Begin</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}