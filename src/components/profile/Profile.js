import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import pwdIcon from "./password_blue.png";

import "./Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changePwd: false,
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            pwdErr: false,
            confirmPwdError: false,
            firstName: '',
            lastName: '',
            email: '',
            userName: ''
        };
        
        this.changePassword = this.changePassword.bind(this);
        this.onChangePwdSuccess = this.onChangePwdSuccess.bind(this);
        this.onChangePwdFailure = this.onChangePwdFailure.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayPwdError = this.displayPwdError.bind(this);
        this.displayConfirmPwdError = this.displayConfirmPwdError.bind(this);
        this.toggleFields = this.toggleFields.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name);
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value});
    }

    displayPwdError() {
        if (this.state.pwdErr) {
            return (<div className="errorMsg">Wrong password</div>)
        }
    }

    displayConfirmPwdError() {
        if(this.state.confirmPwdError) {
            return (<div className="errorMsg">Password does not match</div>);
        }
    }

    changePassword(){

        const { newPwd, confirmPwd } = this.state;
        if(confirmPwd !== newPwd){
            this.setState({confirmPwdError: true});
            return;
        }
        this.setState({confirmPwdError: false});

        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            this.state.oldPwd
        );
        user.reauthenticateWithCredential(credential).then( (result) =>
            this.onChangePwdSuccess(result)).catch((error) => {
            this.onChangePwdFailure(error)
        });
        //this.clearFields();
    }

    onChangePwdSuccess(result) {
        console.log(result);
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPwd).catch((error) => {
                this.onChangePwdFailure(error)
            });
        this.clearFields();
    }

    onChangePwdFailure(error) {
        console.log(error);

        switch (error.code) {
            case 'auth/weak-password':
                break;
            case 'auth/requires-recent-login':
                break;
            case 'auth/user-mismatch':
                console.log('auth/user-mismatch');
                break;
            case 'auth/user-not-found':
                console.log('auth/user-not-found');
                break;
            case 'auth/invalid-credential':
                console.log('auth/invalid-credential');
                break;
            case 'auth/invalid-email':
                console.log('auth/invalid-email');
                break;
            case 'auth/wrong-password':
                console.log('auth/wrong-password');
                this.setState({pwdErr: true});
                break;
            case 'auth/invalid-verification-code':
                console.log('auth/invalid-verification-code');
                break;
            case 'auth/invalid-verification-id':
                console.log('auth/invalid-verification-id');
                break;
            default:
                break;
        }
    }

    toggleFields(){
        this.setState({changePwd: !this.state.changePwd});
        if(this.state.changePwd){
            this.clearFields();
        }
    }

    clearFields() {
        this.setState({changePwd: false});
        this.setState({oldPwd: ''});
        this.setState({newPwd: ''});
        this.setState({confirmPwd: ''});
        this.setState({pwdErr: false});
        this.setState({confirmPwdError: false});
    }

    getUserInfo(){
        firebase.auth().onAuthStateChanged((currUser) => {
            if (currUser) {
                const user = currUser;    
                var docRef = firebase.firestore().collection('users').doc(user.uid);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        this.setState({
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            userName: doc.data().userName,
                            email: doc.data().email,
                        })
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error)=>{
                console.log("Error getting document:", error);
                });
            }else{
                this.props.history.push('/Login');
            }
        });
    }

    render() {
        this.getUserInfo();

        return (

            <div className="App-header">
                <h1>Hey, {this.state.userName}.</h1>

                <p>Be the boss of your account.</p>

                <h3>Email: {this.state.email}</h3>
                <h3>Name: {this.state.firstName} {this.state.lastName}</h3>

                <div className="pwd-form">
                    <button  id="changePwdBtn" variant="primary" size="lg"  onClick={this.toggleFields}>
                        <img src={pwdIcon} alt="pwdIcon" />
                        &nbsp;Change Password
                    </button>
                </div>

                <div className="pwd-form">
                    <input type="password" placeholder="Old Password"
                           name="oldPwd" value={this.state.oldPwd} onChange={this.handleChange}
                           style={{visibility: this.state.changePwd ? "visible" : "hidden"}}/>
                    {this.displayPwdError()}
                </div>
                <div className="pwd-form">
                    <input type="password" placeholder="New Password"
                           name="newPwd" value={this.state.newPwd} onChange={this.handleChange}
                           style={{visibility: this.state.changePwd ? "visible" : "hidden"}}/>
                </div>
                <div className="pwd-form">
                    <input type="password" placeholder="Confirm Password"
                           name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange}
                           style={{visibility: this.state.changePwd ? "visible" : "hidden"}}/>
                    {this.displayConfirmPwdError()}
                </div>


                <div className="pwd-form">
                    <button id="confirmBtn" variant="primary" type="submit" onClick={this.changePassword}
                            style={{visibility: this.state.changePwd ? "visible" : "hidden"}}
                            disabled={!this.state.oldPwd || !this.state.newPwd || !this.state.confirmPwd}>
                        Confirm Change
                    </button>
                </div>

            </div>
        );
    }
}

export default Profile;