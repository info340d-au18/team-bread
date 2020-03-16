import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export class ProfileCard extends React.Component {
    render() {
        return (
            <Card style = {{width: '28rem'}}>
                <Card.Title>
                    <h3>
                        {this.props.email}
                        <Button variant="outline-primary" style = {{float: 'right'}}
                                onClick = {this.props.handleEdit}>
                                Edit
                        </Button>
                    </h3>
                </Card.Title>
                <Card.Text>
                    <p> Home Zipcode: {this.props.homeName} </p>
                    
                </Card.Text>
            </Card>
        )
    }
}