import PgPageScrollViewDesign from 'generated/pages/pgPageScrollView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import ScrollView from '@smartface/native/ui/scrollview';

export default class PgPageScrollView extends withDismissAndBackButton(PgPageScrollViewDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.button1.on('press', () => {
            this.label1.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    height: 100
                }
            })

            this.scrollView2.dispatch({ 'type': 'updateUserStyle', userStyle: { height: 300 } })
            this.label1.textAlignment = TextAlignment.TOPLEFT
        })
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


    }
}
