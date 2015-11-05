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

describe('loginUser', function(){
  var saveloginview;
  before(function() {
    saveloginview = new SaveLoginView();
});
  it('should print string', function() {
    var _log = console.log;
    console.log = function(arg1) {
        expect (arg1).to.eq("heard button Save / Login click");
    };
    saveloginview.loginUser();
    console.log = _log;
  });
});
describe('searching by city', function() {
  var searchView;
  before(function() {
    searchView = new CreateTracks;
    searchView.render();
  });
  describe('when a city is entered', function() {
    before(function (){
      var $postTitle = searchView.$('#post-title');
      $postTitle.val('Portland');
    });
    describe('clicking submit', function() {
      before(function(){
        sinon.stub(searchView, 'appAppear');
        var $saveCity = searchView.$('#saveCity');
        $saveCity.click();
      });
      it('renders UserView', function() {
        expect(searchView.appAppear.callCount).to.eq(1);
      });
    });
  });
});
