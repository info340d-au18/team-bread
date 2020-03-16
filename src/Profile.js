import React, {Component} from 'react';
import {NewUser} from './NewUser';
import firebase, { firestore } from 'firebase/app';
import {ProfileCard} from './ProfileCard';
import 'firebase/auth';
import 'firebase/database';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            home: '',
            zip: this.props.zipcode
            // BB: '',

        };
        this.handleSearch = this.handleSearch.bind(this);
        this.submit = this.submit.bind(this);
        this.homeRef = firebase.database().ref('home');
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit = () => {
        this.setState({show: true});
    }

    handleShow = () => {
        this.setState({show: false});
    }

    handleSearch(homePlace) {
        // let bb = this.calculateBB(homePlace.lat, homePlace.long, 10);
        // let places = 'http://overpass-api.de/'

        this.setState({home: homePlace});
        

    }

    submit(event) {
        let userRef = this.homeRef.child(firebase.auth().currentUser.uid);
        userRef.set(this.state.home)
        this.setState({show: false})
    }

    render() {
        return(
            <div>
                <ProfileCard 
                    email = {this.props.email} 
                    handleEdit = {this.handleEdit.bind(this)} 
                    homeName = {this.state.home.name} />
        
                <NewUser 
                    show = {this.state.show} 
                    hide = {this.handleShow}
                    dealWithSearch = {this.handleSearch.bind(this)}
                    submit = {this.submit} />
            </div>
        )
    }
}