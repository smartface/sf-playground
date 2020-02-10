import { PageBase } from "./page-base";
import Page from "sf-core/ui/page";

//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------

// const extend = require('js-base/core/extend');
// const PageBase = require('sf-core/ui/page');
// const Page = extend(PageBase);
// const pageContextPatch = require('@smartface/contx/lib/smartface/pageContextPatch');
// const Label = extend(require('sf-core/ui/label'));
// const Button = extend(require('sf-core/ui/button'));

// Constructor
class $Page2 extends PageBase {
    // Initalizes super class for this page scope
    constructor(props){
        super(Object.assign(
			{},
			{
				onLoad: onLoad.bind(this),
				orientation: Orientation.PORTRAIT
			},
			props || {}
		));
	);
	this.ios && (this.ios.safeAreaLayoutMode = true);
	this.children = {};
	this.children['statusBar'] = this.statusBar || {};
	this.children['headerBar'] = this.headerBar;
	addChild.call(this, 'lbl', $Lbl_, this);
	addChild.call(this, 'btnSayHello', $BtnSayHello_, this);
	pageContextPatch(this, 'page2');
    }
	
$Page2.$$styleContext = {
	classNames: '.sf-page',
	defaultClassNames: ' .default_page',
	userProps: {
		flexProps: { justifyContent: 'SPACE_AROUND' },
		paddingBottom: 20,
		paddingLeft: 16,
		paddingRight: 16
	},
	statusBar: {
		classNames: '.sf-statusBar',
		defaultClassNames: ' .default_statusBar',
		userProps: { visible: true }
	},
	headerBar: {
		classNames: '.sf-headerBar',
		defaultClassNames: ' .default_headerBar',
		userProps: { visible: true }
	}
};
const $Page2_ = Page($Page2);
function $Lbl(_super, pageInstance) {
	_super(this, { text: 'Page2' });

	pageInstance.lbl = this;
}
$Lbl.$$styleContext = {
	classNames: '.sf-label',
	defaultClassNames: '.default_common .default_label',
	userProps: {
		backgroundColor: 'rgba( 255, 255, 255, 0 )',
		flexProps: { alignSelf: 'STRETCH', flexGrow: 1 },
		font: {
			size: 32,
			bold: false,
			italic: false,
			family: 'SFProText',
			style: 'Regular'
		},
		height: 90,
		left: 0,
		multiline: true,
		textAlignment: 'MIDCENTER',
		textColor: 'rgba( 210, 210, 210, 1 )',
		top: 0,
		width: null
	}
};
const $Lbl_ = Label($Lbl);

function $BtnSayHello(_super, pageInstance) {
	_super(this, { text: 'Say Hello' });

	pageInstance.btnSayHello = this;
}
$BtnSayHello.$$styleContext = {
	classNames: '.sf-button',
	defaultClassNames: '.default_common .default_button',
	userProps: {
		flexProps: { alignSelf: 'AUTO', positionType: 'RELATIVE' },
		left: 0,
		top: 0,
		width: null
	}
};
const $BtnSayHello_ = Button($BtnSayHello);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
	this.headerBar.title = 'jhkhjjkgkjhkjhkj';
}

module.exports = $Page2_;
