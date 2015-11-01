var expect = chai.expect;

describe('WidgetView', function() {
  var widgetview;
  before(function() {
    widgetview = new WidgetView();
  });

  it('should render method', function() {
    expect(widgetview).to.respondTo('render');

  });
  it('should initialize method', function(){
    expect(widgetview).to.respondTo('initialize');
  });
});

describe('SaveLoginView', function() {
  var saveloginview;
  before(function() {
    saveloginview = new SaveLoginView();
  });
  it('should render method', function() {
    expect(saveloginview).to.respondTo('render');
  });
});

describe('addPlaylist', function(){
  var saveloginview;
  before(function() {
    saveloginview = new SaveLoginView();
});
  it('should print string', function() {
    var _log = console.log;
    console.log = function(arg1) {
        expect (arg1).to.eq("heard button Save / Login click");
    };
    saveloginview.addPlaylist();
    console.log = _log;
  });
});
