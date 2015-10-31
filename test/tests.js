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
  var addplaylist;
  before(function() {
  addplaylist = new addPlaylist();
});
  it('should print string', function() {
    expect(addPlaylist).to.console.log();
  });
});
