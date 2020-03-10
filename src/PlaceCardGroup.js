import React, {Component} from 'react';
import {PlaceCards} from './PlaceCards.js';

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
                    return <PlaceCards place = {place} />
                })}
            </div>
        )
    }
}