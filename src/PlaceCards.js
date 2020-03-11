import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {NavButton} from './NavButton.js';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
// import Img from 'react-image';
// import cardPlaces from './data/cardPlaces.json';

export class PlaceCards extends React.Component {
    handleClick(event) {
        this.props.dealWithPlace(this.props.place.lat, this.props.place.long, this.props.place.name);
    }

    removeCard(event) {
        this.props.handleDelete(this.props.place.name);
    }

    render() {
        return (
            <Card className = 'col-xs-auto col-s-4 col-md-5 col-lg-5 col-xl-3'>
                {/* <Card.Img variant = 'top' src = "https://info340d-au18.github.io/team-bread/img/arboretum.jpg" style = {{padding: '1rem'}}/> */}
                {/* <Card.Img variant = 'top' src = {this.props.place.source} style = {{padding: '1rem'}} alt = {this.props.place.alt} /> */}
                <Card.Img variant = 'top' src = "https://raw.githubusercontent.com/info340d-au18/team-bread/master/src/img/GasWorksPark3.jpg?token=AJBI46OW2HJHNZIECT3UV3C6OATSE" style = {{padding: '1rem'}} alt = {this.props.place.alt} />
                <Card.Body>
                    {/* {console.log(this.props.place.name)} */}
                    <Card.Title><h3>{this.props.place.name}</h3></Card.Title>
                    <Card.Text>{this.props.place.description}</Card.Text>
                    <div>
                        <Button variant = 'dark' size = 'm'
                            onClick = {this.handleClick.bind(this)} >
                            Navigate
                        </Button>
                        {/* <Heart onClick = {this.removeCard.bind(this)}/> */}
                        <h2 className = 'favb' onClick = {this.removeCard.bind(this)}>
                            <FontAwesomeIcon icon = {faHeart} />
                        </h2>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}