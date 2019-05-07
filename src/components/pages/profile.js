import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";

class Profile extends React.Component {


    render() {
        return (
            <div className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Profile</Navbar.Brand>
                </Navbar>
                <h1 style={styles.headerStyle}>Hey, [Nickname].</h1>

                <p>Be the boss of your account.</p>

                <h3 style={styles.headerStyle}>Email: email@ucsd.edu</h3>
                <h3 style={styles.headerStyle}>Name: FirstName LastName</h3>
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