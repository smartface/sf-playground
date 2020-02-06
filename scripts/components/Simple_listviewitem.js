const extend = require('js-base/core/extend');
const Simple_listviewitemDesign = require('library/Simple_listviewitem');

const Simple_listviewitem = extend(Simple_listviewitemDesign)(
  // Constructor
  function(_super, props = {}, pageName) {
    // Initalizes super class for this scope
    _super(this, props);
    this.pageName = pageName;
  }
);

module.exports = Simple_listviewitem;