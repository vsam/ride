import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';
import './SignUp.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
    this.displayPwdError = this.displayPwdError.bind(this);
  }

  componentWillUnmount() {
    //firebase.off();
  }

  login(event) {
    event.preventDefault();
    //reset error conditions
    this.setState({
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    })

    //sign in with email link - from verfication.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var emailAddress = window.localStorage.getItem('emailForSignIn');
      //user open link on a different device
      if (!emailAddress) {
        //TODO:could do provide email again for verification
        alert('Please provide your email for confirmation');
      }


      firebase.auth().signInWithEmailLink(emailAddress, window.location.href)
        .then((result) => {

          alert('success');
          window.localStorage.removeItem('emailForSignIn');
          //store the user info
          let user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).set({
            email: emailAddress,
            firstName: window.localStorage.getItem('firstName'),
            lastName: window.localStorage.getItem('lastName'),
            userName: window.localStorage.getItem('userName')
          });
          window.localStorage.removeItem('firstName');
          window.localStorage.removeItem('lastName');
          window.localStorage.removeItem('userName');
          this.props.history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      //normal sign in
      const { email, password } = this.state;
      let emailAddress = email + "@ucsd.edu"
      firebase.auth().signInWithEmailAndPassword(emailAddress, password)
        .then((result) => this.onLoginSuccess(result))
        .catch((error) => { this.onLoginFailed(error) })
    }
  }

  onLoginSuccess(result) {
    console.log(result);
    this.setState({
      email: '',
      password: '',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    })
    this.props.history.push("/");
  }

  onLoginFailed(error) {
    //TODO:
    // alert(error);
    switch (error.code) {
      case 'auth/invalid-email':
        this.setState({ emailFmtErr: true });
        break;
      case 'auth/user-not-found':
        this.setState({ emailErr: true });
        break;
      case 'auth/wrong-password':
        this.setState({ pwdErr: true });
        break;
      default:
        break;
    }
  }

  //display email related error msg
  displayEmailError() {
    if (this.state.emailFmtErr) {
      return (<div className="errorMsg">Email address is not valid</div>)
    }
    if (this.state.emailErr) {
      return (<div className="errorMsg">User not found. Need a new account?</div>)
    }
  }

  goToSignUp() {
    this.props.history.push('/SignUp')
  }

  //display pwd related error msg
  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Password does not match</div>)
    }
  }

  handleChange(event) {
    let key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  render() {
    return (

      <div className="formContainer">
        <Form>
          <div className="titleClass">
            <h2>Log in with email</h2>
          </div>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Control className="email" type="email" placeholder="UCSD Email"
              name="email" value={this.state.email} onChange={this.handleChange}
            />
            <Form.Label>@ucsd.edu</Form.Label>
          </Form.Group>
          {this.displayEmailError()}

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Control className="form-control" type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          {this.displayPwdError()}

          <div className="btnClass">
            <Button variant="outline-secondary" type="submit" onClick={this.login}>
              Log In
            </Button>
          </div>
          <div className="btnClass">
            <Button variant="outline-secondary" onClick={this.goToSignUp} >
              Need an account?
            </Button>
          </div>
        </Form>

      </div>
    );
  }
}

export default Login;