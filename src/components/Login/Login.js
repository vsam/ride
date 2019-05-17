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
      pwdErr: false,
      verifyErr: false,
      loading: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.resetPwd = this.resetPwd.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
    this.displayPwdError = this.displayPwdError.bind(this);
    this.displayVerifyError = this.displayVerifyError.bind(this);
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
      pwdErr: false,
      loading: true
    })

    const { email, password } = this.state;
    let emailAddress = email + "@ucsd.edu"
    firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      .then((result) => this.onLoginSuccess(result))
      .catch((error) => {
        this.onLoginFailed(error)
      })

  }

  onLoginSuccess(result) {
    //user not verify email
    if(!firebase.auth().currentUser.emailVerified){
      this.setState({
        verifyErr: true, 
        loading: false
      })
      return;
    }

    console.log(result);
    this.setState({
      email: '',
      password: '',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false,
      loading: false
    })
    setInterval(() => {
      this.props.history.push("/");
    }, 500);
  }

  onLoginFailed(error) {
    // alert(error);
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        this.setState({ emailFmtErr: true, loading: false});
        break;
      case 'auth/user-not-found':
        this.setState({ emailErr: true, loading: false});
        break;
      case 'auth/wrong-password':
        this.setState({ pwdErr: true, loading: false});
        break;
      default:
        break;
    }
  }

  goToSignUp() {

    this.props.history.push('/SignUp')
  }

  resetPwd(){

  }

  //display email related error msg
  displayEmailError() {
    if (this.state.emailFmtErr) {
      return (<div className="errorMsg">Email address is not valid</div>)
    }
    if (this.state.emailErr) {
      return (<div className="errorMsg">User not found. Need a account?</div>)
    }
  }

  //display pwd related error msg
  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Password does not match</div>)
    }
  }

  //display verification error msg
  displayVerifyError(){
    if (this.state.verifyErr) {
      return (<div className="errorMsg">Account not verify, please check email</div>)
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
            <h3>Log In with Email</h3>
          </div>

          <Form.Group controlId="formBasicEmail">
            <Form.Control className="email" type="text" placeholder="UCSD Email"
              name="email" value={this.state.email} onChange={this.handleChange}
            />
            <Form.Label>@ucsd.edu</Form.Label>
          </Form.Group>
          {this.displayEmailError()}

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          {this.displayPwdError()}
          {this.displayVerifyError()}

          <div className="submitBtn">
            <Button 
              variant="outline-secondary" 
              type="submit" 
              disabled={this.state.loading}
              onClick={this.login}>
              {this.state.loading? "Loading":"Log In"}
            </Button>
          </div>
          <div className="btnClass">
            <Button variant="outline-secondary" onClick={this.resetPwd} >
              Forget Password
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