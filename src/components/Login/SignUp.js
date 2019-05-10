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
      userName: '',
      email: '',
      password: '',
      confirmPwd: '',
      firestNameErr: false,
      lasttNameErr: false,
      userNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
    }

    this.signUp = this.signUp.bind(this);
    this.goToLogIn = this.goToLogIn.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignUpFailed = this.onSignUpFailed.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
    this.displayPwdError = this.displayPwdError.bind(this);
    this.displayFirstNameError = this.displayFirstNameError.bind(this);
    this.displayLastNameError = this.displayLastNameError.bind(this);
    this.displayUserNameError = this.displayUserNameError.bind(this);
    this.displayConfirmPwdError = this.displayConfirmPwdError.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    //this.firebaseRef.off();
  }

  signUp(event) {
    event.preventDefault();

    //reset error state
    this.setState({
      firestNameErr: false,
      lastNameErr: false,
      userNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
    });

    const { firstName, lastName, userName, email, password, confirmPwd } = this.state;
    //email validation
    if (email.length === 0) {
      this.setState({ emailFmtErr: true });
      return;
    }
    //firstname lastname validation
    if (firstName.length === 0 || firstName.length > 50) {
      this.setState({ firestNameErr: true });
      return;
    }

    if (lastName.length === 0 || lastName.length > 50) {
      this.setState({ lastNameErr: true });
      return;
    }

    if (userName.length === 0 || userName.length > 50) {
      this.setState({ userNameErr: true });
      return;
    }
    //password check
    if (password !== confirmPwd) {
      this.setState({ pwdNotMatch: true });
      return;
    }

    let emailAddress = email + '@ucsd.edu'
    //create user
    firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
      .then(() => this.onSignUpSuccess(emailAddress))
      .catch((error) => this.onSignUpFailed(error));
  }

  //navigate to the login page
  goToLogIn() {
    console.log(this.props.history);
    return this.props.history.push('/Login');
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
      .then(() => {
        alert("Sign up successfully! Please check your email for validation");
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', emailAddress);
        window.localStorage.setItem('firstName', that.state.firstName);
        window.localStorage.setItem('lastName', that.state.lastName);
        window.localStorage.setItem('userName', that.state.userName);
        window.localStorage.setItem('password', that.state.password);

        //reset state
        that.setstate = {
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          firestNameErr: false,
          lasttNameErr: false,
          userNameErr: false,
          emailInUse: false,
          emailFmtErr: false,
          emailNotUcsd: false,
          pwdErr: false,
          pwdNotMatch: false
        };
      })
      .catch((error) => {
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

  displayFirstNameError() {
    if (this.state.firestNameErr) {
      return (<div className="errorMsg">Please enter a valid firstname</div>)
    }
  }

  displayLastNameError() {
    if (this.state.lastNameErr) {
      return (<div className="errorMsg">Please enter a valid lastname</div>)
    }
  }

  displayUserNameError() {
    if (this.state.userNameErr) {
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
    if (this.state.emailNotUcsd) {
      return (<div className="errorMsg">Please enter ucsd email</div>)
    }
  }

  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Password is too weak</div>)
    }
  }

  displayConfirmPwdError() {
    if (this.state.pwdNotMatch) {
      return (<div className="errorMsg">Password does not match</div>)
    }
  }

  handleChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div className="formContainer">
        <Form >
          <div className="titleClass">
            <h2>Create an account</h2>
          </div>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Control className="email" type="email" placeholder="UCSD Email"
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
              name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </Form.Group>
          {this.displayLastNameError()}

          <Form.Group className="form-group" controlId="formBasicUserName">
            {/*<Form.Label>Last Name</Form.Label>*/}
            <Form.Control className="form-control" type="text" placeholder="User Name"
              name="userName" value={this.state.userName} onChange={this.handleChange} />
          </Form.Group>
          {this.displayUserNameError()}

          <Form.Group className="form-group" controlId="formBasicPassword">
            {/*<Form.Label>Password</Form.Label>*/}
            <Form.Control className="form-control" type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          {this.displayPwdError()}

          <Form.Group className="form-group" controlId="formBasicConfirmPassword">
            {/*<Form.Label>Confirm Password</Form.Label>*/}
            <Form.Control className="form-control" type="password" placeholder="Confirm Password"
              name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange} />
          </Form.Group>
          {this.displayConfirmPwdError()}

          <div className="btnClass">
            <Button variant="outline-secondary" type="submit" onClick={this.signUp}>
              Sign Up
            </Button>
          </div>
          <div className="btnClass">
            <Button variant="outline-secondary" onClick={this.goToLogIn}>
              Already have an account?
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default SignUp;
