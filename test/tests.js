var expect = chai.expect;
var assert = chai.assert;

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

describe('NewPLaylistView', function() {
  var newplaylistview;
  before(function() {
    newplaylistview = new NewPLaylistView();
  });
  it('should initialize method', function() {
    expect(newplaylistview).to.respondTo('initialize');
  });
});

// describe('appAppear', function(){
//   var appear;
//   before(function() {
//   appear = new appAppear();
// });
//   it('should render method', function() {
//     expect(appappear).to.respondTo('render');
//   });
// });
describe('logging in', function() {
  var searchView;
  before(function() {
    searchView = new UserView;
    searchView.render();
  });
  describe('clicking login', function() {
    before(function (){
      var $postTitle = searchView.$('#post-title');
      $postTitle.val('Portland');
    });
    it('renders UserView', function() {
      expect(searchView.appAppear.callCount,1)
    });
    describe('clicking sign up', function() {
      before(function(){
        sinon.stub(searchView, 'appAppear');
        var $saveCity = searchView.$('#saveCity');
        $saveCity.click();
      });
      it('renders UserView', function() {
        expect(searchView.appAppear.callCount,1)
      });
    });
  });
});
