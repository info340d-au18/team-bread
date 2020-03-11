import React, {Component} from 'react';
import {PlaceGroup} from './PlaceCardGroup.js';
import {CarouselPlace} from './Carousel.js';
import cardPlaces from './data/cardPlaces.json';
import caroPlaces from './data/carouselPlaces.json';

export class Place extends React.Component {
    render() {
        return (
            <div>
                <CarouselPlace carPlace = {caroPlaces}/>
                <PlaceGroup place = {cardPlaces} />
            </div>
        )
    }
}