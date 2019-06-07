class LoginController {
    constructor(model) {
        this.login = this.login.bind(this);

        this.model = model;
    }

    login() {
        this.model.updateLogin();
    }
}

export default LoginController;