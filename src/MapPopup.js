import React, {Component, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
// import {render} from 'react-dom';

export class MapPopup extends React.Component {
    render() {
        // const position = [this.state.lat, this.state.lng]
        const pos = [51.505, -0.09]
        // let [show, setShow] = useState(false);
        // let handleClose = () => setShow(false);
        // let handleShow = () => setShow(true);

        return (
            <Modal show = {this.props.cur} onHide = {this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter a Start Location!</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <SearchBar />
                        <div id = 'mapContainer'>
                            <Map center={pos} zoom={13}>
                                <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={pos}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                                </Marker>
                            </Map>
                        </div>
                    </Modal.Body>
            </Modal>
        )
    }
}