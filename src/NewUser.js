import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar';
import {Button} from 'react-bootstrap';
// import 
import firebase, { firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            home: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.submit = this.submit.bind(this);
        this.homeRef = firebase.database().ref('home');
    }

    submit(event) {
        let userRef = this.homeRef.child(firebase.auth().currentUser.uid)
        userRef.set(
            this.state.home
        )
    }

    handleShow = () => {
        this.setState({show: false});
    }

    handleSearch(homePlace) {
        this.setState({home: homePlace})
    }

    handleIt(place) {
        console.log(place)
        this.props.dealWithSearch(place)
    }


    render() {
        return (
            <Modal show = {this.props.show} animation = {false} onHide = {this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your home zip code!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SearchBar startResult = {this.handleIt.bind(this)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = 'primary' onClick = {this.props.submit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}