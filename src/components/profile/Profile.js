import React, { Component } from 'react';
import firebase from 'firebase';
import NavBar from '../common/NavBar'

import pwdIcon from "./password_blue.png";

import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changePwd: false,
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            pwdErr: false,
            pwdFmt: false,
            confirmPwdError: false,
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            edited_username:'',
            dataFetched: false,
            loading:false,
            edit:false,
        };

        this.inputStyle={visibility:'hidden'};

        this.changePassword = this.changePassword.bind(this);
        this.onChangePwdSuccess = this.onChangePwdSuccess.bind(this);
        this.onChangePwdFailure = this.onChangePwdFailure.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFields = this.toggleFields.bind(this);
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
        if (this.state.pwdErr) {
            return (<div className="errorMsg">Incorrect password.</div>)
        }
        if (this.state.confirmPwdError) {
            return (<div className="errorMsg">The password does not match.</div>);
        }
        if (this.state.pwdFmt) {
            return (<div className="errorMsg">The password should contain at least one special character, one capital letter and shoule be of length 8-16.</div>);
        }
       
    }

    changePassword() {
        this.setState({loading:true})
        const { newPwd, confirmPwd } = this.state;
        if (confirmPwd !== newPwd) {
            this.setState({ confirmPwdError: true, loading: false});
            return;
        }
        let reg = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,16})/;
        if(!reg.test(confirmPwd)){
          this.setState({pwdFmt:true, loading: false});
          return;
        }
    
        this.setState({ confirmPwdError: false, pwdFmt: false });
        let user = firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            this.state.oldPwd
        );

        user.reauthenticateWithCredential(credential)
        .then((result) => this.onChangePwdSuccess(result))
        .catch((error) => this.onChangePwdFailure(error));
        this.setState({loading:false})
    }

    onChangePwdSuccess(result) {
        let user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPwd)
        .then(()=>{
            firebase.auth().signOut().then(() =>{
                this.props.history.push("/Login")
              });
        }).catch((error) => {
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
                            edited_username: doc.data().userName,
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

    onEditClicked(){
        if(this.state.edit){
            if(this.state.edited_username !== this.state.userName){
                this.setState({
                    userName: this.state.edited_username,
                    edit:!this.state.edit
                })
                let user = firebase.auth().currentUser;
                let docRef = firebase.firestore().collection('users').doc(user.uid);
                docRef.update({userName:this.state.edited_username})
                .then(()=>console.log('succeess'))
                .catch((error) => console.log(error))
            }
            
        }else{
            this.setState({
                edit:!this.state.edit
            })
        }  
    }

    renderUsername(){
        if(this.state.edit){
            return(
                <div className="infoDiv" id="userNameDiv">
                    <span className="inputLabel-name"> Username</span>
                    <input type="text" placeholder="user name" id="userNameInput"
                            name="edited_username" value={this.state.edited_username} onChange={this.handleChange} />
                    <div className="editBtnDiv">
                        <button id="editBtn" onClick={this.onEditClicked}>Edit</button>
                </div>
            </div>
            )
        }else{
            return(
                <div className="infoDiv">             
                    <span className="inputLabel-name"> Username</span>
                    <span>{this.state.userName}</span>
                    <div className="editBtnDiv">
                        <button id="editBtn" onClick={this.onEditClicked}>Edit</button>
                    </div>
                </div>)
        }

    }

    render() {
        return (
            this.state.dataFetched && !this.state.loading? (
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
                        
                        {this.renderUsername()}
                       

                        
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