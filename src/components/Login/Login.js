import React, { Component } from 'react';
import firebase from 'firebase';
//import SignUp from './SignUp';
import { Link } from 'react-router-dom'

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
    //this.signUp = this.signUp.bind(this);
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
        .then((result) =>{
          alert('success');
          window.localStorage.removeItem('emailForSignIn');
          //store the user info
          let user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).set({
            email: emailAddress,
            firstName: window.localStorage.getItem('firstName'),
            lastName: window.localStorage.getItem('lastName')
          });
          window.localStorage.removeItem('firstName');
          window.localStorage.removeItem('firstName');
        })
        .catch((error) => {
          console.log(error);
          console.log(window.location.href);
          alert(error.message);
        });
    } else {
      //normal sign in
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess())
        .catch((error) => { this.onLoginFailed(error) })
    }
  }

  onLoginSuccess() {
    console.log('login');
    this.setState({
      email: '',
      password: '',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    })
  }

  onLoginFailed(error) {
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
      return (<div style={styles.errorMsgStyle}>Email address is not valid</div>)
    }
    if (this.state.emailErr) {
      return (<div style={styles.errorMsgStyle}>User not found</div>)
    }
  }

  //display pwd related error msg
  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div style={styles.errorMsgStyle}>Password does not match</div>)
    }
  }

  handleChange(event) {
    let key = event.target.name;
    console.log(event.target.value);
    this.setState({ [key]: event.target.value });
  }

  render() {
    return (
      <div style={styles.containerStyle}>
        <form onSubmit={this.login}>
          <label>
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <br />
          {this.displayEmailError()}
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          {this.displayPwdError()}
          <input type="submit" value="Sign In"></input>
        </form>
        <Link to="/SignUp">Sign Up</Link>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 20,
    marginRight: 20
  },
  errorMsgStyle: {
    color: 'red'
  }
};
export default Login;