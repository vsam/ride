import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPwd:'',
      firestNameErr: false,
      lasttNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
    }

    this.signUp = this.signUp.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignUpFailed = this.onSignUpFailed.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
    this.displayPwdError = this.displayPwdError.bind(this);
    this.displayFirstNameError = this.displayFirstNameError.bind(this);
    this.displayLastNameError = this.displayLastNameError.bind(this);
    this.displayConfirmPwdError = this.displayConfirmPwdError.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    //this.firebaseRef.off();
  }

  signUp(event) {
    event.preventDefault();
    console.log('signup');
    
    //reset error state
    this.setState({
      firestNameErr: false,
      lasttNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
    });

    const { firstName, lastName, email, password, confirmPwd } = this.state;
     //email validation
    if( email.length === 0 ){
      this.setState({emailFmtErr:true});
      return;
    }
    //firstname lastname validation
    if(firstName.length  === 0 || firstName.length > 50){
      this.setState({firestNameErr: true});
      return;
    }
    if(lastName.length === 0 || lastName.length > 50){
      this.setState({lastNameErr: true});
      return;
    }
    //password check
    if(password !== confirmPwd){
      this.setState({ pwdNotMatch: true});
      return;
    }

    let emailAddress = email + '@ucsd.edu'
    //create user
    firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
      .then(() => this.onSignUpSuccess(emailAddress))
      .catch((error) => this.onSignUpFailed(error));
  }

  onSignUpSuccess(emailAddress) {
    //reset state
    let actionCodeSettings = {
      url: 'http://localhost:3000/LogIn',
      handleCodeInApp: true,
    };
    //send verification
    var that = this;
    firebase.auth().sendSignInLinkToEmail(emailAddress, actionCodeSettings)
      .then(function() {
        alert("Sign up successfully! Please check your email for validation");
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log(emailAddress);
      window.localStorage.setItem('emailForSignIn', emailAddress);
      window.localStorage.setItem('firstName', that.state.firstName);
      window.localStorage.setItem('lastName', that.state.lastName);
      window.localStorage.setItem('password', that.state.password);

      //reset state
      that.setstate = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firestNameErr: false,
        lasttNameErr: false,
        emailInUse: false,
        emailFmtErr: false,
        emailNotUcsd: false,
        pwdErr: false,
        pwdNotMatch: false
      };
    })
    .catch(function(error) {
      alert(error.message);
    });
  }

  onSignUpFailed(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.setState({ emailInUse: true });
        break;
      case 'auth/invalid-email':
        this.setState({ emailFmtErr: true });
        break;
      case 'auth/weak-password':
        this.setState({ pwdErr: true });
        break;
      default:
        break;
    }
  }

  displayFirstNameError(){
    if(this.state.firestNameErr){
      return (<div className="errorMsg">Please enter a valid firstname</div>)
    }
  }

  displayLastNameError(){
    if(this.state.lastNameErr){
      return (<div className="errorMsg">Please enter a valid lastname</div>)
    }
  }

  displayEmailError() {
    if (this.state.emailFmtErr) {
      return (<div className="errorMsg">Email address is not valid</div>)
    }
    if (this.state.emailInUse) {
      return (<div className="errorMsg">Email is in user</div>)
    }
    if(this.state.emailNotUcsd) {
      return (<div className="errorMsg">Please enter ucsd email</div>)
    }
  }

  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Password is too weak</div>)
    }
  }
  
  displayConfirmPwdError(){
    if (this.state.pwdNotMatch) {
      return (<div className="errorMsg">Password does not match</div>)
    }
  }

  handleChange(event) {
    console.log(event.target.name);
    let key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value});
  }

  render() {
    return (
      <div className="formContainer">
      <Form >
        <h2>Create and Account</h2>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Control className="form-control" type="email" placeholder="UCSD Email" 
            name="email" value={this.state.email} onChange={this.handleChange}
          />
          <Form.Label>@ucsd.edu</Form.Label>
        </Form.Group>
        {this.displayEmailError()}

        <Form.Group className="form-group" controlId="formBasicFirstName">
          {/*<Form.Label>First Name</Form.Label>*/}
          <Form.Control className="form-control" type="text" placeholder="First Name" 
            name="firstName" value={this.state.firstName} onChange={this.handleChange}
          />
        </Form.Group>
        {this.displayFirstNameError()}

        <Form.Group className="form-group" controlId="formBasicLastName">
          {/*<Form.Label>Last Name</Form.Label>*/}
          <Form.Control className="form-control" type="text" placeholder="Last Name" 
            name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
        </Form.Group>
        {this.displayLastNameError()}

        

        <Form.Group className="form-group" controlId="formBasicPassword">
          {/*<Form.Label>Password</Form.Label>*/}
          <Form.Control className="form-control" type="password" placeholder="Password" 
          name="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Group>
        {this.displayPwdError()}

        <Form.Group className="form-group" controlId="formBasicConfirmPassword">
         {/*<Form.Label>Confirm Password</Form.Label>*/}
          <Form.Control className="form-control" type="password" placeholder="Confirm Password" 
          name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange}/>
        </Form.Group>
        {this.displayConfirmPwdError()}

        <Button variant="primary" type="submit" onClick={this.signUp}>
          Sign Up
        </Button>
      </Form>
      </div>
    )
  }
}

export default SignUp;
