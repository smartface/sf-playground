import Page1Design from 'generated/pages/page1';
import componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
import PageTitleLayout  from "components/PageTitleLayout";
import System = require("sf-core/device/system");

export default class Page1 extends Page1Design {
	constructor () {
        super();
        this.onLoad = () => {
            super.onLoad();
            this.headerBar.leftItemEnabled = false;
            this.headerBar.titleLayout = new PageTitleLayout();
            componentContextPatch(this.headerBar.titleLayout, "titleLayout");
            if (Device.deviceOS === "Android") {
                this.headerBar.title = "";
            }
        };
        this.btnNext.onPress = () => {
            this['router'].push("/pages/page2", { message: "Hello World!" });
        }
	}
	
}
