import React, { Component } from 'react';
import firebase from 'firebase';
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
      firstNameErr: false,
      lasttNameErr: false,
      userNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
      loading: false,
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

    //reset error state and laoding status
    this.setState({
      firstNameErr: false,
      lastNameErr: false,
      userNameErr: false,
      emailInUse: false,
      emailFmtErr: false,
      emailNotUcsd: false,
      pwdErr: false,
      pwdNotMatch: false,
      loading: true
    });

    const { firstName, lastName, userName, email, password, confirmPwd } = this.state;
    //email validation
    if (email.length === 0) {
      this.setState({ emailFmtErr: true, loading: false});
      return;
    }
    //firstname lastname validation
    if (firstName.length === 0 || firstName.length > 50) {
      this.setState({ firstNameErr: true, loading: false});
      return;
    }

    if (lastName.length === 0 || lastName.length > 50) {
      this.setState({ lastNameErr: true, loading: false});
      return;
    }

    if (userName.length === 0 || userName.length > 50) {
      this.setState({ userNameErr: true, loading: false});
      return;
    }
    //password check
    //one special character, one uppper, 8-16 length
    let reg = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,16})/;
    if(!reg.test(password)){
      this.setState({pwdErr: true, loading: false});
      return;
    }

    if (password !== confirmPwd) {
      this.setState({ pwdNotMatch: true, loading: false});
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
      url: 'https://ride-f1e96.firebaseapp.com/LogIn',
      handleCodeInApp: true,
    };
    //send verification
    let user = firebase.auth().currentUser;
    let that = this;
    user.sendEmailVerification(actionCodeSettings)
      .then(() => {
        //set user info
        const db = firebase.firestore();
        db.collection("users").doc(user.uid).set({
          email: emailAddress,
          firstName: that.state.firstName,
          lastName: that.state.lastName,
          userName: that.state.userName
        });

        //reset state
        that.setstate = {
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          firstNameErr: false,
          lasttNameErr: false,
          userNameErr: false,
          emailInUse: false,
          emailFmtErr: false,
          emailNotUcsd: false,
          pwdErr: false,
          pwdNotMatch: false,
          loading: false
        };

          this.props.history.push('/WelcomeScreen');

      })
      .catch((error) => {
        alert(error.message);
      });
  }

  onSignUpFailed(error) {
    console.log(error);
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
    this.setState({
      loading: false
    })
  }

  displayFirstNameError() {
    if (this.state.firstNameErr) {
      return (<div className="errorMsg">Please enter a valid firstname.</div>)
    }
  }

  displayLastNameError() {
    if (this.state.lastNameErr) {
      return (<div className="errorMsg">Please enter a valid lastname.</div>)
    }
  }

  displayUserNameError() {
    if (this.state.userNameErr) {
      return (<div className="errorMsg">Please enter a valid lastname.</div>)
    }
  }

  displayEmailError() {
    if (this.state.emailFmtErr) {
      return (<div className="errorMsg">The email address is not valid.</div>)
    }
    if (this.state.emailInUse) {
      return (<div className="errorMsg">The email address is already registered.</div>)
    }
  }

  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">The password should contain at least one special character, one capital letter and shoule be of length 8-16.</div>)
    }
  }

  displayConfirmPwdError() {
    if (this.state.pwdNotMatch) {
      return (<div className="errorMsg">The password does not match.</div>)
    }
  }

  handleChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value });
  }

  disableBtn(){
    if(this.state.email !=='' && this.state.firstName !== '' && this.state.lastName !== '' &&
      this.state.userName !== '' && this.state.password !== ''&& this.state.confirmPwd !== ''){
      return false;
    }
    return true
  }
  render() {
    return (
      !this.state.loading?
      (<div className="container">
        <form >
          <div className="title">
            <h2>Create an Account</h2>
          </div>
          <div className="inputGroup" id="email">
            <input id="emailInput" type="text" placeholder="UCSD Email"
              name="email" value={this.state.email} onChange={this.handleChange}
            />
            <label>@ucsd.edu</label>
          </div>
          {this.displayEmailError()}

          <div className="inputGroup" id="firstName">
            <input type="text" placeholder="First Name"
              name="firstName" value={this.state.firstName} onChange={this.handleChange}
            />
          </div>
          {this.displayFirstNameError()}

          <div className="inputGroup" id="lastName">
            <input type="text" placeholder="Last Name"
              name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </div>
          {this.displayLastNameError()}

          <div className="inputGroup" id="userName">
            <input type="text" placeholder="User Name"
              name="userName" value={this.state.userName} onChange={this.handleChange} />
          </div>
          {this.displayUserNameError()}

          <div className="inputGroup" id="pwd">
            <input type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          {this.displayPwdError()}

          <div className="inputGroup" id="confirmPwd">
            <input type="password" placeholder="Confirm Password"
              name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange} />
          </div>
          {this.displayConfirmPwdError()}

          <div className="btnGroup" id="submit">
            <button
              id="submitBtn"
              disabled={this.disableBtn()}
              onClick={this.signUp}>
              Sign Up
            </button>
          </div>

          <div className="btnGroup" id="logIn">
            <button id="logInBtn" onClick={this.goToLogIn}>
              Already have an account?
            </button>
          </div>
        </form>
      </div>)
      :(
        <div className="placeholder">
          <div className="loader" />
        </div>
      )
    )
  }
}

export default SignUp;
