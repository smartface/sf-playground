import PgLoginDesign from 'generated/pages/pgLogin';
import ActionKeyType from '@smartface/native/ui/actionkeytype';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import TextAlignment from '@smartface/native/ui/textalignment';

export default class PgLogin extends PgLoginDesign {
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogin.onPress = () => this.login();
    }

    initMaterialTextBoxes() {
        this.mtbEmail.options = {
            hint: 'Email'
        }
        this.mtbEmail.materialTextBox.textAlignment = TextAlignment.MIDCENTER;
        this.mtbEmail.materialTextBox.keyboardType = KeyboardType.EMAILADDRESS;
        this.mtbEmail.materialTextBox.actionKeyType = ActionKeyType.NEXT;
        this.mtbEmail.materialTextBox.onActionButtonPress = () => {
            this.mtbPassword.materialTextBox.requestFocus();
        }

        this.mtbPassword.options = {
            hint: 'Password'
        }
        this.mtbPassword.materialTextBox.textAlignment = TextAlignment.MIDCENTER;
        this.mtbPassword.materialTextBox.isPassword = true;
        this.mtbPassword.materialTextBox.actionKeyType = ActionKeyType.GO;
        this.mtbPassword.materialTextBox.onActionButtonPress = () => {
            this.btnLogin.onPress();
        }
    }

    login() {
        if (!(this.mtbEmail.materialTextBox.text.length && this.mtbPassword.materialTextBox.text.length)) {
            return;
        }
        this.router.push('profile', {
            email: this.mtbEmail.materialTextBox.text,
            password: this.mtbEmail.materialTextBox.text
        });
    }
}

function onShow(this: PgLogin, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgLogin, superOnLoad: () => void) {
    superOnLoad();
}