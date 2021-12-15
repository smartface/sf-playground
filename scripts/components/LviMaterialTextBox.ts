import LviMaterialTextBoxDesign from 'generated/my-components/LviMaterialTextBox';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

export default class LviMaterialTextBox extends LviMaterialTextBoxDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}

    static getHeight() {
        return getCombinedStyle('.materialTextBox-wrapper').height || 60;
    }
}
