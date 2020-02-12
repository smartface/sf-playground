"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var label_1 = require("sf-core/ui/label");
var button_1 = require("sf-core/ui/button");
var page_1 = require("sf-core/ui/page");
var styled_page_1 = require("./styled-page");
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
var $Page2 = /** @class */ (function (_super) {
    __extends($Page2, _super);
    // Initalizes super class for this page scope
    function $Page2(props) {
        var _this = _super.call(this, Object.assign({}, {
            onLoad: function () { return _this.headerBar.title = 'jhkhjjkgkjhkjhkj'; },
            orientation: page_1.default.Orientation.PORTRAIT
        }, props || {})) || this;
        _this.addChild('lbl', "asdf");
        return _this;
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
    return $Page2;
}(styled_page_1.StyledPage));
var $Lbl = /** @class */ (function (_super) {
    __extends($Lbl, _super);
    function $Lbl() {
        return _super.call(this) || this;
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
    return $Lbl;
}(label_1.default));
var $BtnSayHello = /** @class */ (function (_super) {
    __extends($BtnSayHello, _super);
    function $BtnSayHello() {
        return _super.call(this, { text: 'Say Hello' }) || this;
    }
    return $BtnSayHello;
}(button_1.default));
module.exports = $Page2;
