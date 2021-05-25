import FlexLayout from 'sf-core/ui/flexlayout';
/** 
 * Since this file wasn't created from Smartface UI Editor,
 * you should manually extend the Smartface Component yourself.
*/

export default class FlexLayout1 extends FlexLayout {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
}