import PgCustomHeaderDesign from 'generated/pages/pgCustomHeader';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';

const isAndroid = System.OS === System.OSType.ANDROID;

export default class PgCustomHeader extends withDismissAndBackButton(PgCustomHeaderDesign) {
    searchIsActive: boolean = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.flCustomHeaderbar.lblSearchIcon.on('touch', () => {
            this.searchIsActive = !this.searchIsActive;
            this.flCustomHeaderbar.searchViewVisible = this.searchIsActive;
            if(this.searchIsActive){
                this.flCustomHeaderbar.labelText = 'Cancel'
            }else{
                this.flCustomHeaderbar.labelText = 'search'
            }
        })

    }
    initSearchView(): void {
        this.flCustomHeaderbar.searchViewMain.hint = 'Search';
        this.flCustomHeaderbar.searchViewVisible = this.searchIsActive;
        this.flCustomHeaderbar.searchViewMain.cursorColor = Color.BLACK;
        if (isAndroid) {
            this.flCustomHeaderbar.searchViewMain.textFieldBackgroundColor = Color.create(199, 199, 199);
        }
        this.flCustomHeaderbar.searchViewMain.on('searchBegin', () => {
            console.log('SearchView searchBegin');
        });
        this.flCustomHeaderbar.searchViewMain.on('searchEnd', () => {
            console.log('SearchView searchEnd');
        });
        this.flCustomHeaderbar.searchViewMain.on('textChanged', (text) => {
            console.log('SearchView textChanged: ', text);

        });
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
        this.initSearchView();
    }
}
