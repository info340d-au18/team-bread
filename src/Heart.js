import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

export class Heart extends React.Component {
    render() {
        return (
            <h2 className = 'favb'>
                <FontAwesomeIcon icon = {faHeart} />
            </h2>
        )
    }
}