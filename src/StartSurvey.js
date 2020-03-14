import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

export class StartSurvey extends React.Component {
    render() {
        console.log(this.props.home);
        return (
            this.props.home ?
                <div id="bgImg">
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
            :
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
        );
    }
}