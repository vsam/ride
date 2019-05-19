import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from "react-bootstrap";
import pwdIcon from "./password.png";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changePwd: false,
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
      confirmPwdError: false,
    };

    this.changePassword = this.changePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayConfirmPwdError = this.displayConfirmPwdError.bind(this);
    this.toggleFields = this.toggleFields.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name);
    let key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value });
  }

  displayConfirmPwdError() {
    if (this.state.confirmPwdError) {
      return (<div className="errorMsg">Password does not match</div>);
    }
  }

  changePassword() {
    const { newPwd, confirmPwd } = this.state;
    if (confirmPwd !== newPwd) {
      this.setState({ confirmPwdError: true });
      //this.setState({confirmPwd:'Password doesn\'t match!'});
      return;
    }

    this.clearFields();
  }

  toggleFields() {
    this.setState({ changePwd: !this.state.changePwd });
    if (this.state.changePwd) {
      this.clearFields();
    }
  }

  clearFields() {
    this.setState({ changePwd: false });
    this.setState({ oldPwd: '' });
    this.setState({ newPwd: '' });
    this.setState({ confirmPwd: '' });
    this.setState({ confirmPwdError: false });
  }

  render() {
    return (

      <div className="App-header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Profile</Navbar.Brand>
        </Navbar>
        <h1>Hey, [Nickname].</h1>

        <p>Be the boss of your account.</p>

        <h3>Email: email@ucsd.edu</h3>
        <h3>Name: FirstName LastName</h3>

        <div>

          <Button id="changePwdBtn" variant="primary" size="lg" onClick={this.toggleFields}>
            <img src={pwdIcon} alt="pwdIcon" />
            &nbsp;Change Password
                    </Button>
        </div>

        <div className="input-group">
          <input className="form-control" type="password" placeholder="Old Password"
            name="oldPwd" value={this.state.oldPwd} onChange={this.handleChange}
            style={{ visibility: this.state.changePwd ? "visible" : "hidden" }} />
          <input className="form-control" type="password" placeholder="New Password"
            name="newPwd" value={this.state.newPwd} onChange={this.handleChange}
            style={{ visibility: this.state.changePwd ? "visible" : "hidden" }} />
          <input className="form-control" type="password" placeholder="Confirm Password"
            name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange}
            style={{ visibility: this.state.changePwd ? "visible" : "hidden" }} />
          {this.displayConfirmPwdError()}
        </div>


        <div>
          <Button id="confirmBtn" variant="primary" type="submit" onClick={this.changePassword}
            style={{ visibility: this.state.changePwd ? "visible" : "hidden" }}
            disabled={!this.state.oldPwd || !this.state.newPwd || !this.state.confirmPwd}>
            Confirm Change
                    </Button>
        </div>

        <br />
        <Link to="/Home">Back</Link>
      </div>
    );
  }
}

export default Profile;