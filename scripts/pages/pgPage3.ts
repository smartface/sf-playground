import PgPage3Design from 'generated/pages/pgPage3';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import TextView from '@smartface/native/ui/textview';
import Color from '@smartface/native/ui/color';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { ThemeService } from '@smartface/styling-context';

export default class PgPage3 extends withDismissAndBackButton(PgPage3Design) {
    private disposeables: (() => void)[] = [];
    i = 0
    innerFl: FlexLayout
    customLayout: FlexLayout

    constructor(private router?: Router, private route?: Route) {
        super({});


        this.adım2.on('press', () => {
            try {
                this.i++
                // this.innerFl.height = this.i * 10
                this.innerFl.backgroundColor = Color.RED
                this.innerFl.borderWidth = 20
                this.innerFl.borderColor = Color.DARKGRAY



                // const startTime = Date.now()


                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()
                // this.innerFl.applyLayout()

                // const endTime = Date.now()

                // console.log('Measurement Time: ', (endTime - startTime) / 1000);



            } catch (error) {
                console.log('errrrr:', error.toString());

            }
        })

        this.parentChild.on('press', () => {
            this.flexLayout3.dirty()
            this.flexLayout1.dirty()

            const innerLayout = new FlexLayout({
                backgroundColor: Color.YELLOW,
                width: 100,
                height: 100,
            });

            this.customLayout = innerLayout
            this.flexLayout1.addChild(innerLayout)


            this.layout.dirty()
            this.customLayout.dirty()

            this.customLayout.applyLayout();
            // this.layout.applyLayout()

            // this.flexLayout3.applyLayout()
        })

        this.updateParentChild.on('press', () => {
            this.customLayout.height = 300
            this.customLayout.width = 300

            // Parent
            // this.flexLayout1.applyLayout()

            // Kendisi
            this.flexLayout3.dirty()
            this.flexLayout1.dirty()
            this.layout.dirty()

            this.customLayout.dirty()
            this.customLayout.applyLayout()

            // this.layout.applyLayout()
            // this.flexLayout3.applyLayout()

            // Page
            // this.layout.applyLayout();
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

    dispose(): void {
        this.disposeables.forEach((item) => item());
    }
}
