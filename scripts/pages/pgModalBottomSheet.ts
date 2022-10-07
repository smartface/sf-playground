import PgModalBottomSheetDesign from 'generated/pages/pgModalBottomSheet';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import { OSType } from '@smartface/native/device/system/system';
import BottomSheet from '@smartface/native/ui/bottomsheet';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Color from '@smartface/native/ui/color';

import FlBottomSheet from '../components/FlBottomSheet';
import { styleableContainerComponentMixin } from '@smartface/styling-context';
import { themeService } from 'theme';

const isIOS = System.OS == OSType.IOS;
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) { }
const themeTest = themeService.getStyle('.flBottomSheet-flWrapper');


export default class PgModalBottomSheet extends withDismissAndBackButton(PgModalBottomSheetDesign) {
    myBottomSheet: BottomSheet;
    myFlexLayout: StyleableFlexLayout;

    constructor(private router?: Router, private route?: Route) {
        super({});
        this.myFlexLayout = new FlBottomSheet();
        themeService.addGlobalComponent(this.myFlexLayout, 'flBottomSheet');
    }

    initButton() {
        if (isIOS) {
            this.btnOpen.on('press', () => {
                this.router.push('bottomSheet');
            });
        } else {
            this.btnOpen.on('press', () => {
                this.showBottomSheet();
            })
        }
    }

    initBottomSheetForAndroid() {
        this.myBottomSheet = new BottomSheet({
            detents: ['medium'],
            borderRadius: 16,
            view: this.myFlexLayout
        })
    }
    showBottomSheet() {
        this.myBottomSheet.show();
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
        this.initButton();
        if (!isIOS) {
            this.initBottomSheetForAndroid();
        }
    }
}
