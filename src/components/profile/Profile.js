import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import NavBar from '../common/NavBar'

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
            userName: '',
            dataFetched: false,
        };

        this.inputStyle={visibility:'hidden'};

        this.changePassword = this.changePassword.bind(this);
        this.onChangePwdSuccess = this.onChangePwdSuccess.bind(this);
        this.onChangePwdFailure = this.onChangePwdFailure.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayPwdError = this.displayPwdError.bind(this);
        //this.displayConfirmPwdError = this.displayConfirmPwdError.bind(this);
        this.toggleFields = this.toggleFields.bind(this);
        this.clearFields = this.clearFields.bind(this);
        //this.enableBtn = this.enableBtn.bind(this);
    }

    handleChange(event) {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
        
    }

    disableBtn(){
        if(this.state.oldPwd !=='' && this.state.newPwd !== '' && this.state.confirmPwd !== ''){
            return false;
        }
        return true;
    }

    displayPwdError() {
        if (this.state.confirmPwdError) {
            return (<div className="errorMsg">Password does not match</div>);
        }
        if (this.state.pwdErr) {
            return (<div className="errorMsg">Wrong password</div>)
        }
    }

    changePassword() {
        const { newPwd, confirmPwd } = this.state;
        if (confirmPwd !== newPwd) {
            this.setState({ confirmPwdError: true });
            return;
        }
        this.setState({ confirmPwdError: false });
        let user = firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            this.state.oldPwd
        );

        user.reauthenticateWithCredential(credential)
        .then((result) => this.onChangePwdSuccess(result))
        .catch((error) => this.onChangePwdFailure(error));
    }

    onChangePwdSuccess(result) {
        let user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPwd)
        .then(()=>{
            this.props.history.push("/Login")}
        )
        .catch((error) => {
            this.onChangePwdFailure(error)
        });
    }

    onChangePwdFailure(error) {
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
                this.setState({ pwdErr: true });
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

    toggleFields() { 
        if(this.state.changePwd){
            this.inputStyle={visibility:'hidden'};
        } else{
            this.inputStyle={visibility:'visible'};
        }
        this.setState({ changePwd: !this.state.changePwd });
    }


    clearFields() {
        this.setState({ 
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            pwdErr: false,
            confirmPwdError: false,
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
        });
    }

    getUserInfo() {
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
                            dataFetched: true
                        })
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                this.props.history.push('/Login');
            }
        });
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            this.state.dataFetched ? (
                <div>
                    <input className="menustate" type="checkbox" id="menustate" />
                    <NavBar> Profile </NavBar>
                    <div className="container">
                        <div className="welcomeDiv">
                            Hey, {this.state.userName}.
                        </div>
                        <div className="bossDiv">
                            Be the boss of your account.
                        </div>
                        <hr className="line" />

                        <div className="infoDiv">
                            <span className="inputLabel-email">Email</span>
                            <span>{this.state.email}</span>
                        </div>

                        <div className="infoDiv">
                            <span className="inputLabel-name">Name</span>
                            <span>{this.state.firstName} {this.state.lastName}</span>
                        </div>

                        
                        <button id="changePwdBtn" onClick={this.toggleFields}>
                            <img id="pwdImg" src={pwdIcon} alt="pwdIcon" />
                            <span>Change Password</span>
                        </button>
                       

                        <div className="pwdGroup" 
                            style={this.inputStyle}
                        >
                            <div className="inputGroup" id="pwd">
                                <input type="password" placeholder="Old Password"
                                    name="oldPwd" value={this.state.oldPwd} onChange={this.handleChange} />
                            </div>
                            <div className="inputGroup" id="pwd">
                                <input type="password" placeholder="New Password"
                                    name="newPwd" value={this.state.newPwd} onChange={this.handleChange} />
                            </div>
                            <div className="inputGroup" id="confirmPwd">
                                <input type="password" placeholder="Confirm Password"
                                    name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange} />
                            </div>

                             <button
                                id="confirmBtn"
                                disabled={this.disableBtn()}
                                onClick={this.changePassword}>
                                Confirm Change
                            </button>
                            {this.displayPwdError()}
                        </div>
                    </div>
                </div>)
                : (
                    <div>
                        <input type="checkbox" id="menustate" className="menustate" />
                        <NavBar> Profile </NavBar>
                        <div className="placeholder">
                            <div className="loader" />
                        </div>
                    </div>
                )
        );
    }
}

export default Profile;