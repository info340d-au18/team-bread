import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';
import {NavBar} from './NavBar.js';


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
                                <Button variant="primary" className="shadow" id="BEGINNN" href="/findroute">Begin</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}