import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {Button} from 'react-bootstrap';

export class CarouselItemP extends React.Component {
    render() {
        return (
            <Carousel.Item>
                <img className="d-block w-100" src = "https://info340d-au18.github.io/team-bread/img/arboretum.jpg" alt = 'first'></img>
                <div className = 'place-des'>
                    <h3>Hello</h3>
                    <h4>Description</h4>
                    <div className = 'favbut'>
                        <Button variant = 'dark' size = 'm'>
                            <FontAwesomeIcon icon = {faHeart} />
                            Favorite
                        </Button>
                    </div>
                </div>
                {/* <PlaceHover /> */}
            </Carousel.Item>
        )
    }
}