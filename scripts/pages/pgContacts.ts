import PgContactsDesign from 'generated/pages/pgContacts';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { getPermission } from '@smartface/extension-utils/lib/permission';
import Contacts from '@smartface/native/device/contacts';
import Application from '@smartface/native/application';

export default class PgContacts extends withDismissAndBackButton(PgContactsDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  getAllContacts() {
    //@ts-ignore
    getPermission({ permissionText: 'READ_CONTACTS', androidPermission: Application.Android.Permissions.READ_CONTACTS, permissionTitle: 'contacts permission' }).then(() =>
      Contacts.fetchAll({
        onSuccess: (contacts) => console.info(contacts),
        onFailure: (error) => console.error('fetchAll Failed', error)
      })
    );
  }

  pickContact() {
    //@ts-ignore
    getPermission({ permissionText: 'READ_CONTACTS', androidPermission: Application.Android.Permissions.READ_CONTACTS, permissionTitle: 'contacts permission' }).then(() =>
      Contacts.pickContact(this, {
        onSuccess: (contact) => console.info(contact),
        onFailure: () => console.error('pickContact Failed')
      })
    );
  }

  addContact() {
    //@ts-ignore
    getPermission({ permissionText: 'WRITE_CONTACTS', androidPermission: Application.Android.Permissions.WRITE_CONTACTS, permissionTitle: 'contacts permission' }).then(() =>
      Contacts.add({
        contact: new Contacts.Contact({ firstName: 'Smartface', lastName: 'Mobile', phoneNumbers: ['0000'] }),
        onSuccess: () => console.info('add Success'),
        onFailure: () => console.error('add Failed')
      })
    );
  }

  initializeButtons() {
    this.btnFetchAll.on('press', () => this.getAllContacts());
    this.btnPickContact.on('press', () => this.pickContact());
    this.btnAdd.on('press', () => this.addContact());
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initializeButtons();
  }

  onLoad() {
    super.onLoad();
  }
}
