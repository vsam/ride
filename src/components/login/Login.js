import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
      forgetPwd:false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  login(event) {
    event.preventDefault();
    //reset error conditions
    this.setState({
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false,
      loading: true,
      forgetPwd:false,
    });

    const { email, password } = this.state;
    if(email.length === 0){
      this.setState({emailFmtErr: true})
      return;
    }
    
    let emailAddress = email + "@ucsd.edu";
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      })
      .then((result) => this.onLoginSuccess(result))
      .catch((error) => {
        this.onLoginFailed(error)
      });
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

    //store info in the local storage
    let curr = firebase.auth().currentUser;
    localStorage.setItem('uid',curr.uid);
    localStorage.setItem('email', curr.email);
    let docRef = firebase.firestore().collection('users').doc(curr.uid);
      docRef.get().then((doc) => {
        localStorage.setItem('firstName', doc.data().firstName);
        localStorage.setItem('lastName', doc.data().lastName);
        localStorage.setItem('userName', doc.data().userName);
      });
        
    this.setState({
      email: '',
      password: '',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false,
      loading: false,
      forgetPwd:false,
    })

    this.props.history.push("/Home");
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
    this.props.history.push('/SignUp');
  }

  disableBtn(){
    if(this.state.email !== '' && this.state.password !== ''){
      return false;
    }
    return true
  }

  //display email related error msg
  displayEmailError() {
    if (this.state.emailFmtErr) {
      return (<div className="errorMsg">The email address you entered is not valid.</div>)
    }
    if (this.state.emailErr) {
      return (<div className="errorMsg">The email address you entered cannot be identified.</div>)
    }
  }

  //display pwd related error msg
  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Incorrect email or password.</div>)
    }
  }

  //display verification error msg
  displayVerifyError(){
    if (this.state.verifyErr) {
      return (<div className="errorMsg">The account has not been verified.</div>)
    }
  }

  handleChange(event) {
    let key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  render() {
    return (
      !this.state.loading?(
      <div className="container">
        <form>
          <div className="title">
            <h2>Log In with Email</h2>
          </div>

          <div className="inputGroup" id="email">
            <input id="emailInput" type="text" placeholder="UCSD Email"
              name="email" value={this.state.email} onChange={this.handleChange}
            />
            <label>@ucsd.edu</label>
          </div>
          {this.displayEmailError()}

          <div className="inputGroup" id="pwd">
            <input type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          {this.displayPwdError()}
          {this.displayVerifyError()}

          <div className="btnGroup" id="submit">
            <button
              id="submitBtn"
              disabled={this.disableBtn()}
              onClick={this.login}>
              Log In
            </button>
          </div>
         
          <div className="btnGroup" id="signup">
            <button id="signUpBtn" onClick={this.goToSignUp} >
              Need an account?
            </button>
          </div>
        </form>
      </div>)
      :(
        <div className="placeholder">
        <div className="loader" />
      </div>
      )
    );
  }
}

export default Login;