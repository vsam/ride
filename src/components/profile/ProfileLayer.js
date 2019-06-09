import firebase from 'firebase/app';
import 'firebase/auth';

class ProfileLayer {
  //presentation layer
  static passwordForm(confirmPwd, newPwd){
    if (confirmPwd !== newPwd) {
      return "confirmPwdError";
    }

    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=..*[0-9])(?=.*[!@#$%^&+=]).{8,16}$");
    if (!reg.test(confirmPwd)) {
      return "pwdFmt";
    }
    return "";
  }

  //bussiness layer, get credential from the firebase
  static passwordDispatch(email, oldPwd){
    let credential = firebase.auth.EmailAuthProvider.credential(email,oldPwd);
    return credential;
  }

  //data access, change the password in the datebase
  static passwordDb(user, credential, newPwd, onSuccess=null, onFailure=null){
    user.reauthenticateWithCredential(credential)
    .then((result) => {
      user.updatePassword(newPwd)
        .then(onSuccess)
        .catch((error) => onFailure(error));
    })
    .catch(onFailure);
  }
}

export default ProfileLayer;