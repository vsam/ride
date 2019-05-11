import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';
import './SignUp.css';
import ReactDOM from 'react-dom';

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
      url: 'http://localhost:3000/LogIn',
      handleCodeInApp: true,
    };
    //send verification
    let user = firebase.auth().currentUser;
    let that = this;
    user.sendEmailVerification(actionCodeSettings)
      .then(() => {

        //insert log in msg
        let loginMsg = React.createElement("div", {id:'msg'}, "Sign up successfully! Please check your email for validation");
        ReactDOM.render(loginMsg, document.getElementById("formBasicConfirmPassword"));
        //alert("Sign up successfully! Please check your email for validation");
        //set user info
        firebase.database().ref('users/' + user.uid).set({
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

        setInterval(() => {
          that.props.history.push('/Login');
        }, 500);
        

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
      return (<div className="errorMsg">Email is already registered</div>)
    }
    if (this.state.emailNotUcsd) {
      return (<div className="errorMsg">Please enter ucsd email</div>)
    }
  }

  displayPwdError() {
    if (this.state.pwdErr) {
      return (<div className="errorMsg">Password should contain at least special character, one capital letter and of length 8-16</div>)
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
            <h3>Create an Account</h3>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className="email" type="text" placeholder="UCSD Email"
              name="email" value={this.state.email} onChange={this.handleChange}
            />
            <Form.Label>@ucsd.edu</Form.Label>
          </Form.Group>
          {this.displayEmailError()}

          <Form.Group controlId="formBasicFirstName">
            {/*<Form.Label>First Name</Form.Label>*/}
            <Form.Control type="text" placeholder="First Name"
              name="firstName" value={this.state.firstName} onChange={this.handleChange}
            />
          </Form.Group>
          {this.displayFirstNameError()}

          <Form.Group controlId="formBasicLastName">
            {/*<Form.Label>Last Name</Form.Label>*/}
            <Form.Control type="text" placeholder="Last Name"
              name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </Form.Group>
          {this.displayLastNameError()}

          <Form.Group controlId="formBasicUserName">
            {/*<Form.Label>Last Name</Form.Label>*/}
            <Form.Control type="text" placeholder="User Name"
              name="userName" value={this.state.userName} onChange={this.handleChange} />
          </Form.Group>
          {this.displayUserNameError()}

          <Form.Group controlId="formBasicPassword">
            {/*<Form.Label>Password</Form.Label>*/}
            <Form.Control type="password" placeholder="Password"
              name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          {this.displayPwdError()}

          <Form.Group controlId="formBasicConfirmPassword">
            {/*<Form.Label>Confirm Password</Form.Label>*/}
            <Form.Control type="password" placeholder="Confirm Password"
              name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange} />
          </Form.Group>
          {this.displayConfirmPwdError()}

          <div className="submitBtn">
            <Button 
              variant="outline-secondary" 
              type="submit" 
              disabled={this.state.loading}
              onClick={this.signUp}>
            {!this.state.loading? "Sign Up": "Loading..."}
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
