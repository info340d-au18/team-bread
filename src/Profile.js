import React, {Component} from 'react';
import {Card} from 'react-bootstrap';

export class Profile extends React.Component {
    render() {
        return(
            // <div id = 'begin'>
                <Card style={{ width: '28rem'}}>
                    <Card.Title>
                    Bob Bob
                    </Card.Title>
                    <div>
                    <Card.Text>
                    Home Town: Seattle, Washington (98105)
                    </Card.Text>
                    {/* <SearchBar /> */}
                    </div>
                </Card>
            // </div>
        )
    }
}