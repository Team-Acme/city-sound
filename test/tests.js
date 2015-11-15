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
      newplaylistview = new NewPLaylistView();
    });
    before(function() {
      sinon.stub(newplaylistview, 'appAppear');
      var $citieslist = newplaylistview.$('#citiesList');
      console.log($citieslist);
      console.log($citieslist.children('option').length)//.get(1).select();
      console.log(newplaylistview);
    })
    it('pulls up player', function() {
      expect(newplaylistview.appAppear.callCount).to.eq(1);
    })
  })
});
//   describe('clicking login', function() {
//     before(function(){
//       var login = "../views/login.hbs";
//       var appLogin = new '#login';
//     });
//     it('posts login', function() {
//       expect(POST.appLogin.callCount,1)
//     });
//     describe('clicking sign up', function() {
//       before(function(){
//         sinon.stub(searchView, 'appAppear');
//         var $saveCity = searchView.$('#saveCity');
//         $saveCity.click();
//       });
//       it('renders UserView', function() {
//         expect(searchView.appAppear.callCount,1)
//       });
//     });
//   });
//});
