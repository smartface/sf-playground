import Label from "sf-core/ui/label";
import Button from "sf-core/ui/button";
import Page from "sf-core/ui/page";
import { ComponentStyleContext } from "./component-style-context";
import { StyledPage } from "./styled-page";

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
class $Page2 extends StyledPage {
    static $$styleContext = {
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
    // Initalizes super class for this page scope
    constructor(props: any) {
        super(Object.assign(
            {},
            {
                onLoad: () => this.headerBar.title = 'jhkhjjkgkjhkjhkj',
                orientation: Page.Orientation.PORTRAIT
            },
            props || {}
        ));

        this.addChild('lbl', "asdf");
    }
}

class $Lbl extends Label {
    static $$styleContext = {
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
    }
    constructor() {
        super();
    }
}

declare abstract class Styleable {
    static $$styleContext: ComponentStyleContext;
}


class $BtnSayHello extends Button implements Styleable {

    constructor() {
        super({ text: 'Say Hello' });
    }
}


/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */

export = $Page2;
