import PgCryptoDesign from 'generated/pages/pgCrypto';
import { Route, Router } from '@smartface/router';
import Crypto from '@smartface/native/global/crypto';
import Data from '@smartface/native/global/data';
import System from '@smartface/native/device/system';
import { withDismissAndBackButton } from '@smartface/mixins';

const ENCRYPT_KEY_SIZE = 1024;
const ENCRYPT_CIPHER_TYPE = 'RSA/ECB/PKCS1Padding';
const PUBLIC_KEY_DEVICE_KEY = 'publicKey'; //The key to save to the device database
const PRIVATE_KEY_DEVICE_KEY = 'privateKey'; //The key to save to the device database

type KeyPairType = { publicKey: string; privateKey: string };

export default class PgCrypto extends withDismissAndBackButton(PgCryptoDesign) {
  keyPair: KeyPairType;
  aesKey: string;
  iv: string;
  private encryptedText = '';
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnEncryptRSA.on('press', () => {
      this.encryptedText = this.encryptRSA(this.tbRSA.text || '', this.keyPair.publicKey);
      this.lblRsaOutput.text = this.encryptedText;
    });
    this.btnDecryptRSA.on('press', () => {
      const decryptedObjectText = this.decryptRSA(this.encryptedText, this.keyPair.privateKey);
      const decrpytedObject = JSON.parse(decryptedObjectText);
      this.lblRsaOutput.text = decrpytedObject.secretText;
    });
    this.btnEncryptAES.on('press', async () => {
      const encryptedText = await this.encryptAES(this.tbRSA.text || '');
      this.encryptedText = encryptedText;
      this.lblAesOutput.text = this.encryptedText;
    });
    this.btnDecryptAES.on('press', async () => {
      const decryptedText = await this.decryptAES(this.encryptedText);
      this.lblAesOutput.text = decryptedText;
    });
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

  encryptAES(text: string): Promise<string> {
    this.aesKey = Crypto.AES.generateKey(32);
    return new Promise((resolve, reject) =>
      Crypto.AES.encryptGCMAsync({
        plainText: text,
        ivSize: 12,
        key: this.aesKey,
        onComplete: (encryptedText: string, iv: string) => {
          this.iv = iv;
          resolve(encryptedText);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        }
      })
    );
  }

  decryptAES(text: string): Promise<string> {
    return new Promise((resolve, reject) =>
      Crypto.AES.decryptGCMAsync({
        encryptedText: text,
        iv: this.iv,
        key: this.aesKey,
        onComplete: (decryptedText) => {
          resolve(decryptedText);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        }
      })
    );
  }

  encryptRSA(text: string, key: string): string {
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

  decryptRSA(encryptedText: string, key: string): string {
    return Crypto.RSA.decrypt({
      encryptedText: encryptedText,
      key,
      // @ts-ignore
      cipherType: ENCRYPT_CIPHER_TYPE
    });
  }

  onShow() {
    super.onShow();
    this.keyPair = this.generateKeyPair();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
