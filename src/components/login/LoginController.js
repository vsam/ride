class LoginController {
    constructor(model) {
        this.model = model;
        this.model.setController(this);
    }

    login(event) {
        this.model.state.emailFmtErr = false;
        this.model.state.emailErr = false;
        this.model.pwdErr = false;
        this.model.loading = true;
        this.model.forgetPwd = false;
        // this.model.setState({
        //     emailFmtErr: false,
        //     emailErr: false,
        //     pwdErr: false,
        //     loading: true,
        //     forgetPwd: false
        // });
    }

    setEmailFmtErr() {
        //this.model.setState({emailFmtErr: true});
        this.model.state.emailFmtErr = true;
    }

    reset() {
        this.model.state.email = '';
        this.model.state.password = '';
        this.model.state.emailFmtErr = false;
        this.model.state.emailErr = false;
        this.model.pwdErr = false;
        this.model.loading = false;
        this.model.forgetPwd = false;
        // this.model.setState({
        //     email: '',
        //     password: '',
        //     emailFmtErr: false,
        //     emailErr: false,
        //     pwdErr: false,
        //     loading: false,
        //     forgetPwd: false
        // });
    }
}

export default LoginController;