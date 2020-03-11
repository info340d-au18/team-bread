import React, {Component} from 'react';
import {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import {FavButton} from './FavButton.js';
import './index.css';

export class CarouselPlace extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }
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
                                        <FavButton />
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