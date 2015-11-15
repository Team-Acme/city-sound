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
  describe('clicking logout', function() {
    before(function() {
      sinon.stub(newplaylistview, 'logout');
      var $logout = newplaylistview.$('#logout');
      $logout.click();
    })
    it('returns to login page', function() {
      expect('/login'.callCount,1)
    });
});
  describe('selecting city', function () {
    var newplaylistview;
    before(function() {
      sinon.stub(NewPLaylistView.prototype, 'appAppear');
      newplaylistview = new NewPLaylistView();
      newplaylistview.render();
    });
    before(function() {
      var $citieslist = newplaylistview.$('#citiesList');
      console.log($citieslist);
      $citieslist.change();
    })
    after(function () {
      NewPLaylistView.prototype.appAppear.restore()
    });
    it('pulls up player', function() {
      expect(NewPLaylistView.prototype.appAppear.callCount).to.eq(1);
    })
  })
});
