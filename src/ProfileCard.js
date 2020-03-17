import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './index.css';

export class ProfileCard extends React.Component {
    render() {
        return (
                <div id = 'profileBack'>
                    <div id = 'profile'>
                        <Card>
                            <Card.Title>
                                <h2>
                                    {this.props.email}
                                </h2>
                            </Card.Title>
                            <Card.Text>
                                <p> 
                                    Home Zipcode: {this.props.homeName} 
                                </p>
                                <Button variant="outline-primary"
                                        onClick = {this.props.handleEdit} size = 'lg'>
                                        Edit Zipcode
                                </Button>
                            </Card.Text>
                        </Card>
                    </div>
                </div>
        )
    }
}