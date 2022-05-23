import PgLoginDesign from 'generated/pages/pgLogin';
import ActionKeyType from '@smartface/native/ui/shared/android/actionkeytype';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router } from '@smartface/router';

export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnLogin.onPress = () => this.login();
  }

  initMaterialTextBoxes() {
    this.mtbEmail.hint = 'Email';
    this.mtbEmail.textAlignment = TextAlignment.MIDLEFT;
    this.mtbEmail.keyboardType = KeyboardType.EMAILADDRESS;
    this.mtbEmail.actionKeyType = ActionKeyType.NEXT;
    this.mtbEmail.onActionButtonPress = () => {
      this.mtbPassword.requestFocus();
    };
    this.mtbPassword.hint = 'Password';
    this.mtbPassword.textAlignment = TextAlignment.MIDLEFT;
    this.mtbPassword.isPassword = true;
    this.mtbPassword.actionKeyType = ActionKeyType.GO;
    this.mtbPassword.onActionButtonPress = () => {
      this.btnLogin.onPress();
    };
  }

  login() {
    if (!(this.mtbEmail.text.length && this.mtbPassword.text.length)) {
      return;
    }
    this.router.push('profile', {
      email: this.mtbEmail.text,
      password: this.mtbEmail.text
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initMaterialTextBoxes();
  }
}
