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

            // console.log('sc2 instance parent: ', this.scrollView2.getParent().constructor.name);
            // console.log('sc2 layout instance parent: ', this.scrollView2.layout.getParent().constructor.name);

            // console.log('sc2 layout instance second parent: ', this.scrollView2.layout.getParent().getParent().constructor.name);

            // console.log('sc2 layout instance thrid parent: ', this.scrollView2.layout.getParent().getParent().getParent().constructor.name);

            // console.log('sc2 layout instance thrid parent: ', this.scrollView2.layout.getParent().getParent().getParent().getParent().constructor.name);

            // console.log('last element: ', this.scrollView2.layout.getParent().getParent().getParent().getParent().getParent());
            // console.log('sc2 layout instance thrid parent: ', this.scrollView2.layout.getParent().getParent().getParent().getParent().getParent().constructor.name);



            this.scrollView2.dispatch({ 'type': 'updateUserStyle', userStyle: { height: 300 } })


            this.label1.textAlignment = TextAlignment.TOPLEFT

            // console.log('is sc instance: ', this.scrollView1 instanceof ScrollView);


            // @ts-ignore

            // this.layout.nativeObject.setNeedsLayout()


            /* SC > SC > Label TEST */
            // this.scrollView2.layout.applyLayout()
            // this.scrollView1.layout.applyLayout()


            /* SC > Label TEST */
            // this.label1.applyLayout()

            // this.scrollView1.layout.applyLayout()

            // this.scrollView1.height = 500
            // this.layout.applyLayout()



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
