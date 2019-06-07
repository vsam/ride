import React, { Component } from 'react';
import firebase from 'firebase';
import './SignUp.css'
import LoginModel from "./LoginModel";
import LoginController from "./LoginController";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      login: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.onForgetBtnClicked = this.onForgetBtnClicked.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);

    this.model = new LoginModel();
    this.controller = new LoginController(this.model);
  }

  componentWillUnmount() {
    //firebase.off();
  }

  login(event) {
    event.preventDefault();

    this.controller.login(event);

    if(this.state.email.length === 0){
      this.model.setState({emailFmtErr: true});
      return;
    }

    this.model.login(this.state.email, this.state.password, this.onLoginSuccess, this.onLoginFailed);
  }

  onLoginSuccess() {
    this.props.history.push("/Home");
  }

  onLoginFailed(error) {
    this.setState({login: !this.state.login});
    console.log(error);
  }

  onForgetBtnClicked(e){
    e.preventDefault();

    if(this.state.email.length === 0){
      this.model.setState({emailFmtErr: true});
      return;
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
    if (this.model.state.emailFmtErr) {
      return (<div className="errorMsg">The email address you entered is not valid.</div>)
    }
    if (this.model.state.emailErr) {
      return (<div className="errorMsg">The email address you entered cannot be identified.</div>)
    }
  }

  //display pwd related error msg
  displayPwdError() {
    console.log("view: displayPwdErr");
    if (this.model.queryPwdErr()) {
      return (<div className="errorMsg">Incorrect email or password.</div>)
    }
  }

  //display verification error msg
  displayVerifyError(){
    if (this.model.state.verifyErr) {
      return (<div className="errorMsg">The account has not been verified.</div>)
    }
  }

  displayForgetPwd(){
    if (this.model.state.forgetPwd) {
      return (<div className="errorMsg">The reset password email has been sent to your email</div>)
    }
  }


  handleChange(event) {
    let key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  render() {
    return (
      !this.model.queryLoading()?(
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
          {this.displayForgetPwd()}

          <div className="btnGroup" id="submit">
            <button
              id="submitBtn"
              disabled={this.disableBtn()}
              onClick={this.login}>
              Log In
            </button>
          </div>

          {/* <div className="btnGroup" id="forget">
            <button id="forgetBtn" onClick={this.onForgetBtnClicked} >
              Forget Password
            </button>
          </div> */}
         
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