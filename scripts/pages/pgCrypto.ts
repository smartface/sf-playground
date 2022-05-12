import PgCryptoDesign from 'generated/pages/pgCrypto';
import { Route, Router } from '@smartface/router';
import Crypto from '@smartface/native/global/crypto';
import Data from '@smartface/native/global/data';
import System from '@smartface/native/device/system';
import Label from '@smartface/native/ui/label';
import Button from '@smartface/native/ui/button';
import TextBox from '@smartface/native/ui/textbox';
import { styleableComponentMixin, styleableContainerComponentMixin } from '@smartface/styling-context';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { withDismissAndBackButton } from '@smartface/mixins';

class StyleableButton extends styleableComponentMixin(Button) {}
class StyleableTextBox extends styleableComponentMixin(TextBox) {}
class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

const ENCRYPT_KEY_SIZE = 1024;
const ENCRYPT_CIPHER_TYPE = 'RSA/ECB/PKCS1Padding';
const PUBLIC_KEY_DEVICE_KEY = 'publicKey'; //The key to save to the device database
const PRIVATE_KEY_DEVICE_KEY = 'privateKey'; //The key to save to the device database

type KeyPairType = { publicKey: string; privateKey: string };

//You should create new Page from UI-Editor and extend with it.
export default class PgCrypto extends withDismissAndBackButton(PgCryptoDesign) {
  myLabel: StyleableLabel;
  encryptButton: StyleableButton;
  decryptButton: StyleableButton;
  tbEncrypt: StyleableTextBox;
  keyPair: KeyPairType;
  private encryptedText = '';
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.myLabel = new StyleableLabel();
    this.encryptButton = new StyleableButton();
    this.decryptButton = new StyleableButton();
    this.tbEncrypt = new StyleableTextBox();
  }

  generateKeyPair(): KeyPairType {
    let privateKey = Data.getStringVariable(PRIVATE_KEY_DEVICE_KEY);
    let publicKey = Data.getStringVariable(PUBLIC_KEY_DEVICE_KEY);
    if (!privateKey || !publicKey) {
      const didGenerate = Crypto.RSA.generateKeyPair({
        keySize: ENCRYPT_KEY_SIZE
      });
      if (!didGenerate) {
        throw new Error('Could not generate keypair');
      }
      privateKey = didGenerate.privateKey;
      publicKey = didGenerate.publicKey;
      Data.setStringVariable(PUBLIC_KEY_DEVICE_KEY, publicKey); // Public key doesn't need to be stored securely
      Data.setStringVariable(PRIVATE_KEY_DEVICE_KEY, privateKey); // Consider using secure data
    }
    return {
      privateKey: privateKey,
      publicKey: System.OS === System.OSType.IOS ? Crypto.RSA.ios.getExportedPublicKey(publicKey) : publicKey
    };
  }

  encrypt(text: string, key: string): string {
    const keyBody = {
      text: 'Smartface Inc.',
      secretText: text
    };
    return Crypto.RSA.encrypt({
      key,
      plainText: JSON.stringify(keyBody),
      // @ts-ignore
      cipherType: ENCRYPT_CIPHER_TYPE
    });
  }

  decrypt(encryptedText: string, key: string): string {
    return Crypto.RSA.decrypt({
      encryptedText: encryptedText,
      key,
      // @ts-ignore
      cipherType: ENCRYPT_CIPHER_TYPE
    });
  }

  initLabel() {
    this.myLabel.text = 'Decrpyted text will go here';
    this.addChild(this.myLabel, 'myLabel', '.sf-label');
  }

  initButtons() {
    this.keyPair = this.generateKeyPair();
    const buttonWrapper = new StyleableFlexLayout();
    this.addChild(buttonWrapper, 'buttonWrapper', '.sf-flexlayout', {
      heigth: 120
    });
    this.encryptButton.text = 'Encrypt';
    this.encryptButton.onPress = () => {
      this.encryptedText = this.encrypt(this.tbEncrypt.text || '', this.keyPair.publicKey);
      this.myLabel.text = this.encryptedText;
    };
    this.decryptButton.text = 'Decrypt';
    this.decryptButton.onPress = () => {
      const decryptedObjectText = this.decrypt(this.encryptedText, this.keyPair.privateKey);
      const decrpytedObject = JSON.parse(decryptedObjectText);
      this.myLabel.text = decrpytedObject.secretText;
    };
    buttonWrapper.addChild(this.encryptButton, 'encryptButton', '.sf-button');
    buttonWrapper.addChild(this.decryptButton, 'decryptButton', '.sf-button');
  }

  initTextBox() {
    this.tbEncrypt.hint = 'Enter text to encrypt';
    this.addChild(this.tbEncrypt, 'tbEncrypt', '.sf-textbox');
  }

  // The page design has been made from the code for better
  // showcase purposes. As a best practice, remove this and
  // use WYSIWYG editor to style your pages.
  centerizeTheChildrenLayout() {
    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          flexDirection: 'ROW',
          justifyContent: 'CENTER',
          alignItems: 'CENTER',
          flexWrap: 'WRAP'
        }
      }
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.centerizeTheChildrenLayout();

    this.initTextBox();
    this.initLabel();
    this.initButtons();
    this.layout.applyLayout();
  }
}
