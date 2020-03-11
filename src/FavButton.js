import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';

// add to favorites button
export class FavButton extends React.Component {
    render() {
        return (
            <div className='favbut'>
                <Button variant = 'dark' size = 'lg' className = 'addFav'>
                    <FontAwesomeIcon icon = {faHeart} />
                     Favorite
                </Button>
            </div>
        );
    }
}