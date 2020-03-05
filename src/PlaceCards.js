import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
// import cardPlaces from './data/cardPlaces.json';

export class NavButton extends React.Component {
    render() {
        return (
            <Button variant = 'dark' size = 'm'>Navigate</Button>
        )
    }
}

export class Heart extends React.Component {
    render() {
        // removeCard() {

        // }
        return (
            <h2 className = 'favb'>
                <FontAwesomeIcon icon = {faHeart} />
            </h2>
        )
    }
}

export class PlaceCards extends React.Component {
    hello () {
        console.log(this.props.place.name);
    }
    render() {
        return (
            <Card className = 'col-xs-auto col-s-4 col-md-5 col-lg-5 col-xl-3'>
                {this.hello()}
                {/* <Card.Img variant = 'top' src = "https://info340d-au18.github.io/team-bread/img/arboretum.jpg" style = {{padding: '1rem'}}/> */}
                <Card.Img variant = 'top' src = {this.props.place.source} style = {{padding: '1rem'}} alt = {this.props.place.alt} />
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

export class PlaceGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favPlace: []
        }
    }
    render() {
        return (
            <div className = 'row justify-content-center'>
                {this.props.place.map((place) => {
                    return <PlaceCards place={place} />
                })}
            </div>
        );
    }
}