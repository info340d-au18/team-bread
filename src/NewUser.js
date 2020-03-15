import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar';
import {Button} from 'react-bootstrap';
// import 

export class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        };
    }

    submit() {

    }

    handleShow = () => {
        this.setState({show: false});
    }



    render() {
        

        return (
            <Modal show={this.state.show} animation={false} onHide={this.handleShow} >
                <Modal.Header closeButton>
                    <Modal.Title>Enter your home zip code!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Woohoo, you're reading this text in a modal! */}
                    <SearchBar />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Submit
                    </Button>
                </Modal.Footer>
      </Modal>
        )
    }
}