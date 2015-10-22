var chai = require ('chai');
var expect = chai.expect;
var views = require('../js/views.js');
var Backbone = require('backbone');

describe('WidgetView', function() {
  var widgetview;
  before(function() {
    var WidgetView = views.WidgetView;
    widgetview = new WidgetView();
  });

  it('should render method', function() {
    expect(widgetview).to.respondTo('render');
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(0)).to.equal(0);
    });
  });
});
