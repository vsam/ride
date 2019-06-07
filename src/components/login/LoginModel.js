import firebase from 'firebase';


class LoginModel {
    constructor(){
        this.state = {
            email: '',
            password: '',
            emailFmtErr: false,
            emailErr: false,
            pwdErr: false,
            verifyErr: false,
            loading: false,
            forgetPwd:false,
            loginSuccess: false,
        }

        this.updateLogin = this.updateLogin.bind(this);
        this.login = this.login.bind(this);
    }

    updateLogin() {
        this.state.emailFmtErr = false;
        this.state.emailErr = false;
        this.state.pwdErr = false;
        this.state.loading = true;
        this.forgetPwd = false;
    }

    clearStates() {
        this.state.email = ''
        this.state.password = '';
        this.state.emailFmtErr = false;
        this.state.emailErr = false;
        this.state.pwdErr = false;
        this.state.loading = false;
        this.forgetPwd = false;
    }

    login(email, password, success, failed) {

        let emailAddress = email + "@ucsd.edu";
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            })
            .then((result) => this.onLoginSuccess(result, success))
            .catch((error) => {
                this.onLoginFailed(error, failed)
            });
    }

    onLoginSuccess(result, success) {
        console.log("model: success");
        //user not verify email
        if(!firebase.auth().currentUser.emailVerified){
            this.state.verifyErr = true;
            this.state.loading = false;
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

        this.clearStates();
        this.state.loginSuccess = true;
        success && success();
    }

    onLoginFailed(error, failed) {
        console.log("model: login failed");

        switch (error.code) {
            case 'auth/invalid-email':
                this.state.emailFmtErr = true;
                this.state.loading = false;
                break;
            case 'auth/user-not-found':
                this.state.emailErr = true;
                this.state.loading = false;
                break;
            case 'auth/wrong-password':
                this.state.pwdErr = true;
                this.state.loading = false;
                break;
            default:
                break;
        }

        this.state.loginSuccess = false;
        failed && failed(error);
    }

    forgetPwd() {
        let auth = firebase.auth();
        let emailAddress = this.state.email + "@ucsd.edu";
        let actionCodeSettings = {
            url: 'https://localhost:3000/Login',
            handleCodeInApp: true,
        };
        auth.sendPasswordResetEmail(emailAddress, actionCodeSettings).then(()=>{
            this.state.forgetPwd = true;
            this.state.emailFmtErr = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    queryPwdErr() {
        console.log("model: queryPwdErr");
        return this.state.pwdErr;
    }

    queryLoading() {

        return this.state.loading;
    }

}

export default LoginModel;