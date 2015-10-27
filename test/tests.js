var expect = chai.expect;

describe('WidgetView', function() {
  var widgetview;
  before(function() {
    widgetview = new WidgetView();
  });

  it('should render method', function() {
    expect(widgetview).to.respondTo('render');
  });
});

describe('WidgetView', function(){
  it('should initialize method', function(){
    expect(widgetview).to.respondTo('initialize');
  })
});
