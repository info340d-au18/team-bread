import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

export class PlaceCards extends React.Component {
    handleClick(event) {
        this.props.dealWithPlace(this.props.place.lat, this.props.place.long, this.props.place.name);
    }

    removeCard(event) {
        this.props.handleDelete(this.props.placeKey);
    }

    render() {
        return (
            <Card className = 'col-xs-auto col-s-4 col-md-5 col-lg-5 col-xl-3'>
                <Card.Img variant = 'top' src = {require("./img/walking.jpg")} style = {{padding: '1rem'}} />
                <Card.Body>
                    <Card.Title><h3>{this.props.place.name}</h3></Card.Title>
                    <Card.Text>{this.props.place.description}</Card.Text>
                    <div>
                        <Button variant = 'dark' size = 'm'
                            onClick = {this.handleClick.bind(this)} >
                            Navigate
                        </Button>
                        <h2 className = 'favb' onClick = {this.removeCard.bind(this)}>
                            <FontAwesomeIcon icon = {faHeart} />
                        </h2>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}