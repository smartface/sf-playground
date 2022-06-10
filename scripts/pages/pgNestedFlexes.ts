import PgNestedFlexesDesign from 'generated/pages/pgNestedFlexes';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgNestedFlexes extends withDismissAndBackButton(PgNestedFlexesDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();

        setTimeout(() => {
            this.flexLayout1.dispatch({ type: 'updateUserStyle', userStyle: { height: 150 } })
            this.label1.dispatch({ type: 'updateUserStyle', userStyle: { height: 200 } })

            // this.flexLayout2.nativeObject.setNeedsLayout()

            this.layout.nativeObject.setNeedsLayout()

            console.log('');

        }, 1500);
    }
}
