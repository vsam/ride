import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import Navbar from "react-bootstrap/Navbar";

class Profile extends React.Component {
    constructor(props){
        super(props);
        const userId = firebase.auth().currentUser.uid;
        this.state ={
            email:'',
            firstName: '',
            lastName: ''
        }

    }

    getInfo(){    
        let userId = firebase.auth().currentUser.uid;
        let that = this;

        firebase.database().ref('users/' + userId).once('value')
        .then((snapshot) => {
            that.setState({
                email: snapshot.val().email,
                firstName: snapshot.val().firstName,
                lastName: snapshot.val().lastName,
            })
        }).catch((error) => {alert(error.message)});
    }

    render() {
        //get user info
        this.getInfo();

        return (
            <div className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Profile</Navbar.Brand>
                </Navbar>
                <h1 style={styles.headerStyle}>Hey, [Nickname].</h1>

                <p>Be the boss of your account.</p>

                <h3 style={styles.headerStyle}>{this.state.email}</h3>
                <h3 style={styles.headerStyle}>{this.state.firstName}</h3>
                <h3 style={styles.headerStyle}>{this.state.lastName}</h3>
                <br/>
                <Link to="/Profile" style={styles.linkStyle}>Change Password</Link>
                <br/>
                <Link to="/Home" style={styles.linkStyle}>Back</Link>
            </div>
        );
    }
}

const styles = {
    linkStyle : {
        alignItems: 'center',
        fontSize: '10',
    },

    headerStyle: {
        marginBottom : '0',
        display: 'block',
    },

    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
};
export default Profile;