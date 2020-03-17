import React, {Component} from 'react';
import {NewUser} from './NewUser';
import firebase, { firestore } from 'firebase/app';
import {ProfileCard} from './ProfileCard';
export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            home: ''
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
        this.setState({home: homePlace});
    }

    submit() {
        this.setState({show: false})
        return this.props.submitHome(this.state.home);
    }

    render() {
        let zipzip = '';
        if (this.props.zip !== null) {
            console.log(this.props.zip)
            zipzip = this.props.zip.name;
        }
        return (
            <div>
                <ProfileCard 
                    email = {this.props.email} 
                    handleEdit = {this.handleEdit.bind(this)} 
                    homeName = {zipzip} />
        
                <NewUser 
                    show = {this.state.show} 
                    hide = {this.handleShow}
                    dealWithSearch = {this.handleSearch.bind(this)}
                    submit = {this.submit} />
            </div>
        )
    }
}