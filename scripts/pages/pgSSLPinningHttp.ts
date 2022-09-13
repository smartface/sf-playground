import PgSSLPinningHttpDesign from 'generated/pages/pgSSLPinningHttp';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { Http } from '@smartface/native/net';

export default class PgSSLPinningHttp extends withDismissAndBackButton(PgSSLPinningHttpDesign) {
    myHttp = new Http();
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }

    
    onLoad() {
        super.onLoad();
        this.myHttp.request({
            method: 'GET',
            url: 'https://ssl-pinning.smartface.io',
            onLoad: (e): void => {
              alert(`method: 'GET by sslPinning' SUCCESSFUL, ${e}`)
            },
            onError: (e) => {
              console.error(`method: 'GET by sslPinning' FAILURE`, e);
            }
          });
    }
}
