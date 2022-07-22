import PgContactsDesign from 'generated/pages/pgContacts';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Permission from '@smartface/native/device/permission';
import Contacts from '@smartface/native/device/contacts';
import Application from '@smartface/native/application';
import { PermissionResult, Permissions } from '@smartface/native/device/permission/permission';

export default class PgContacts extends withDismissAndBackButton(PgContactsDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  getAllContacts() {
    Permission.android.requestPermissions(Permissions.ANDROID.READ_CONTACTS).then((e) => {
      Contacts.fetchAll({
        onSuccess: (contacts) => console.info(contacts.map((contact) => Object.keys(contact))),
        onFailure: (error) => console.error('fetchAll Failed', error)
      });
    });
  }

  pickContact() {
    Permission.android.requestPermissions(Permissions.ANDROID.READ_CONTACTS).then((e) => {
      Contacts.pickContact(this, {
        onSuccess: (contact) => console.info(contact),
        onFailure: () => console.error('pickContact Failed')
      });
    });
  }

  async addContact() {
    try {
      await Permission.android.requestPermissions(Permissions.ANDROID.WRITE_CONTACTS);
      Contacts.add({
        contact: new Contacts.Contact({ firstName: 'Smartface', lastName: 'Mobile', phoneNumbers: ['0000'] }),
        onSuccess: () => console.info('add Success'),
        onFailure: () => console.error('add Failed')
      });
    } catch (e) {
      console.error(e.message, { stack: e.stack });
    }
  }

  initializeButtons() {
    this.btnFetchAll.on('press', () => this.getAllContacts());
    this.btnPickContact.on('press', () => this.pickContact());
    this.btnAdd.on('press', () => this.addContact());
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initializeButtons();
  }
}
