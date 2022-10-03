import Font from '@smartface/native/ui/font';
import { FontStyle } from '@smartface/native/ui/font/font';
import FlCustomHeaderbarDesign from 'generated/my-components/FlCustomHeaderbar';

export default class FlCustomHeaderbar extends FlCustomHeaderbarDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get searchViewVisible(): boolean {
        return this._searchViewIsActive;
    }
    set searchViewVisible(value: boolean) {
        this.searchViewMain.style.apply({ visible: value });
    }
    set labelText(value: string) {
        this.lblSearchIcon.text = value;
    }
    get labelText(): string {
        return this.lblSearchIcon.text;
    }

}
