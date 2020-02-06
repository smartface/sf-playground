const extend = require('js-base/core/extend');
const Simple_gridviewItemDesign = require('library/Simple_gridviewItem');

const Simple_gridviewItem = extend(Simple_gridviewItemDesign)(
  // Constructor
  function(_super, props = {}, pageName) {
    // Initalizes super class for this scope
    _super(this, props);
    this.pageName = pageName;
  }
);

module.exports = Simple_gridviewItem;