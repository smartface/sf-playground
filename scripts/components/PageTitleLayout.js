/** @type {extend} */
const extend = require('js-base/core/extend');
const PageTitleLayoutDesign = require('components/PageTitleLayout');

const PageTitleLayout = extend(PageTitleLayoutDesign)(
  // Constructor
  function(_super, props = {}, pageName) {
    // Initalizes super class for this scope
    _super(this, props);
    this.pageName = pageName;
  }
);

module.exports = PageTitleLayout;