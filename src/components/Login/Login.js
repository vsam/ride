import React, { Component } from 'react';
import firebase from 'firebase';
//import SignUp from './SignUp';
import { Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
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

  login(event){
    //reset error conditions
    this.setState({
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    })

    event.preventDefault();
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(this.onLoginSuccess)
      .catch((error) => {this.onLoginFailed(error)})
      
  }

  onLoginSuccess(){
    console.log('login');
    this.setState({
      email:'',
      password:'',
      emailFmtErr: false,
      emailErr: false,
      pwdErr: false
    })
  } 

  onLoginFailed(error){
    switch(error.code){
      case 'auth/invalid-email':
        this.setState({emailFmtErr: true});
        break;
      case 'auth/user-not-found':
        this.setState({emailErr: true});
        break;
      case 'auth/wrong-password':
        this.setState({pwdErr: true});
        break;
      default: 
        break;
    }
  } 

  //display email related error msg
  displayEmailError(){
    if(this.state.emailFmtErr){
      return(<div style={styles.errorMsgStyle}>Email address is not valid</div>)
    }
    if(this.state.emailErr){
      return(<div style={styles.errorMsgStyle}>User not found</div>)
    }
  }

  //display pwd related error msg
  displayPwdError(){
    if(this.state.pwdErr){
      return(<div style={styles.errorMsgStyle}>Password does not match</div>)
    }
  }

  handleChange(event){
    let key = event.target.name;
    console.log(event.target.value);
    this.setState({[key]: event.target.value});
  }

  render() {
    return (
      <div style={styles.containerStyle}>
        <form onSubmit={this.login}>
          <label>
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <br />
          {this.displayEmailError()}
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
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