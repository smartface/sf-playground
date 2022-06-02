import PgRelatedFlexLayoutsDesign from 'generated/pages/pgRelatedFlexLayouts';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import FlexLayout from '@smartface/native/ui/flexlayout';

export default class PgRelatedFlexLayouts extends withDismissAndBackButton(PgRelatedFlexLayoutsDesign) {
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
            this.label1.dispatch({ type: 'updateUserStyle', userStyle: { height: 300 } })
            this.flexLayout3.dispatch({ type: 'updateUserStyle', userStyle: { paddingLeft: 20 } })

            this.layout.nativeObject.setNeedsLayout()

            // this.label1.applyLayout()
            // this.flexLayout3.applyLayout();
            // this.flexLayout2.applyLayout()
            // this.flexLayout1.applyLayout()

            // this.flexLayout3.applyLayout();
            // this.flexLayout2.applyLayout()

            /* Flex3 height yok ve applyLayout yapmak kendini büyütmüyor */
            // this.flexLayout3.applyLayout()
            // this.flexLayout2.applyLayout()

            // this.flexLayout1.applyLayout()


            // this.layout.applyLayout()



        }, 1500);


    }
}
