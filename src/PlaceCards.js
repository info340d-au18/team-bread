import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {NavButton} from './NavButton.js';
import {Heart} from './Heart.js';
import Img from 'react-image';
// import cardPlaces from './data/cardPlaces.json';

export class PlaceCards extends React.Component {
    hello () {
        console.log(this.props.place.name);
    }
    render() {
        return (
            <Card className = 'col-xs-auto col-s-4 col-md-5 col-lg-5 col-xl-3'>
                {this.hello()}
                {/* <Card.Img variant = 'top' src = "https://info340d-au18.github.io/team-bread/img/arboretum.jpg" style = {{padding: '1rem'}}/> */}
                {/* <Card.Img variant = 'top' src = {this.props.place.source} style = {{padding: '1rem'}} alt = {this.props.place.alt} /> */}
                <Card.Img variant = 'top' src = "https://info340d-au18.github.io/team-bread/img/arboretum.jpg" style = {{padding: '1rem'}} alt = {this.props.place.alt} />
                <Card.Body>
                    {console.log(this.props.place.name)}
                    <Card.Title><h3>{this.props.place.name}</h3></Card.Title>
                    <Card.Text>{this.props.place.description}</Card.Text>
                    <div>
                        <NavButton />
                        <Heart />
                    </div>
                </Card.Body>
            </Card>
        );
    }
}