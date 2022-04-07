import PgLoginDesign from "generated/pages/pgLogin";
import ActionKeyType from "@smartface/native/ui/shared/android/actionkeytype";
import KeyboardType from "@smartface/native/ui/shared/keyboardtype";
import TextAlignment from "@smartface/native/ui/shared/textalignment";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";


export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnLogin.onPress = () => this.login();
  }

  initMaterialTextBoxes() {
    this.mtbEmail.options = {
      hint: "Email",
    };
    this.mtbEmail.materialTextBox.textAlignment = TextAlignment.MIDCENTER;
    this.mtbEmail.materialTextBox.keyboardType = KeyboardType.EMAILADDRESS;
    this.mtbEmail.materialTextBox.actionKeyType = ActionKeyType.NEXT;
    this.mtbEmail.materialTextBox.onActionButtonPress = () => {
      this.mtbPassword.materialTextBox.requestFocus();
    };

    this.mtbPassword.options = {
      hint: "Password",
    };
    this.mtbPassword.materialTextBox.textAlignment = TextAlignment.MIDCENTER;
    this.mtbPassword.materialTextBox.isPassword = true;
    this.mtbPassword.materialTextBox.actionKeyType = ActionKeyType.GO;
    this.mtbPassword.materialTextBox.onActionButtonPress = () => {
      this.btnLogin.onPress();
    };
  }

  login() {
    if (!(this.mtbEmail.materialTextBox.text.length && this.mtbPassword.materialTextBox.text.length)) {
      return;
    }
    this.router.push("profile", {
      email: this.mtbEmail.materialTextBox.text,
      password: this.mtbEmail.materialTextBox.text,
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
