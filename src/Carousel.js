import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import './index.css';

export class CarouselPlace extends React.Component {
    
    handleClick(event) {
        this.props.addToGroup(this.props.carPlace);
    }

    render() {              
        return (
            <div className = 'wrap-item'>
                <img className = 'd-block w-100'
                    src = {require('./img/arboretum.jpg')}
                    alt = {this.props.carPlace.alt} />
                <div className = 'place-des'>
                    <h3>{this.props.carPlace.name}</h3>
                    <p> {this.props.carPlace.description} </p>
                    <div className = 'favbut'>
                        <Button variant = 'dark'
                                size = 'lg'
                                className = 'addFav'
                                onClick = {this.handleClick.bind(this)}>
                                <FontAwesomeIcon icon = {faHeart} />
                                Favorite    
                        </Button>
                    </div>
                </div> 
            </div>
        )

    }
}