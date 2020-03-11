import React, {Component} from 'react';
import {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import './index.css';

export class CarouselPlace extends React.Component {
    
    handleClick(event) {
        this.props.addToGroups(this.props.place)
    }

    render() {
        return (
            <div className = 'container d-flex justify-content-center'>
                <Carousel style = {{padding: '2rem'}} className = "col-12 col-md-12 col-lg-10 col-xl-9">
                    {this.props.carPlace.map((carPlace) => {
                        // let ig = require(carPlace.source);
                        // console.log(ig);
                        return (
                            <Carousel.Item>
                                <div className = 'wrap-item'>
                                    <img
                                    className="d-block w-100"
                                    src = {require('./img/burke.jpg')}
                                    // src = {require(carPlace.source)}
                                    // src = {require(`${carPlace.source}`)}
                                    alt = {carPlace.alt} />
                                    <div className = 'place-des'>
                                        <h3>{carPlace.name}</h3>
                                        <p>{carPlace.description}</p>
                                        <div className='favbut'>
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
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        );

    }
}