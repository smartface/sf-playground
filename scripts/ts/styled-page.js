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
Object.defineProperty(exports, "__esModule", { value: true });
var page_1 = require("sf-core/ui/page");
var StyledPage = /** @class */ (function (_super) {
    __extends(StyledPage, _super);
    function StyledPage(params) {
        var _this = _super.call(this, params) || this;
        _this.children = new Map();
        _this.addChild('statusBar', _this.statusBar);
        _this.addChild('headerBar', _this.headerBar);
        _this.ios && (_this.ios.safeAreaLayoutMode = true);
        return _this;
    }
    StyledPage.prototype.addChild = function (name, child) {
        this.children.set(name, child);
        this.layout && this.layout.addChild(child);
        // else this.addChild && this.addChild(child);
        child = null;
    };
    return StyledPage;
}(page_1.default));
exports.StyledPage = StyledPage;
