import PgLabelFlexShrinkDesign from 'generated/pages/pgLabelFlexShrink';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgLabelFlexShrink extends withDismissAndBackButton(PgLabelFlexShrinkDesign) {
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

        let i = 0;
        this.btnSetLargerText.on("press", () => {

            if (i === 0) {
                this.lblLorem.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus aliquet dignissim. Nam quam mi, blandit vel lectus at, sodales mattis magna. Donec placerat vehicula eros, eu pharetra dolor hendrerit non. Phasellus porta viverra odio. Praesent elementum elit et magna placerat dictum. Praesent non nulla eleifend, posuere augue condimentum, elementum elit. Vivamus quis mi condimentum, mollis nunc eu, sodales magna. Maecenas feugiat turpis nunc, ac maximus enim aliquet eget. Aliquam vitae tempor mauris. Quisque vel dui leo. Aliquam in viverra tellus."
                i = 1;
            } else {
                this.lblLorem.text = "Hellow Word!";
                i = 0;
            }
        });
    }
}
