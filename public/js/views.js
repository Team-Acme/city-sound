//GLOBAL VARIABLES FOR TESTING
var Backbone;
var WidgetView;
var widget;
var SaveLoginView;
var newCreateNewTracks;
var CreatePlaylistView;
var namePlaylistContainer;
var playlistName;
var savePlaylist;
var closeDiv;
var SoundCloudView;
var label;
var NamedPlaylistsView;
var UserView;
var userViewContainer;
var soundcloudPlayer;
var lists;
var tracksPlayer;
var buttons;
var closeDiv;
var CreatePlaylistView;
var CreateTracks;
var cityName;
var saveCityBtn;
var classical;
var jazz;
var rap;
var newAge;
var user;
var userModel;
var newUserView;
var newSoundCloudView;
var newNamedPlaylistsView;
var firstView;

//STOP DELETING STUFF
var GUI = (function() { //IIFE for all Views

  ////////////////////////////////////////////////////////////////////////////////

  //NOTES FOR WidgetView
  // -This view holds the Soundcloud Widget and is nested in the SoundCloudView

  ///////////////////////////////////////////////////////////////////////////////

  WidgetView = Backbone.View.extend({
    className: 'widgetContainer',
    render: function() {
      widget = '<div id="widget"></div>';
      this.$el.html('<b>' + widget + " " + '<br></br>');

    },

    initialize: function(opts) {
      this.render();
    },

    events: {

    }
  });

  /////////////////////////////

  //login view

  /////////////////////////////

  LoginView = Backbone.View.extend({
    id: 'loginView',
    render: function(){
      label = '<h2>Log In</h2>';
      this.$el.html(label);
    },
    initialize: function(){

    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR SaveLoginView:
  // -Creates a view that where you can name a playlist and login to the app
  // -The "addPlaylist" function will push the newly named list to the NamedPlaylistsView and allow users to login
  //  it currently makes the #createSaveLoginViewContainer disappear when #saveLoginID is pushed
  // -The "createAcct" function renders the CreateAcctView

  //////////////////////////////////////////////////////////////////////////////

  SaveLoginView = Backbone.View.extend({
    render: function() {
      var createSaveLoginViewContainer = '<div id="createSaveLoginViewContainer">';
      var userName = '<input id= "userName" type="text" value="" />';
      var password = '<input id= "password" type="text" value="" />';
      var saveLogin = '<button id="saveLoginID">Login</button>';
      var signUp = '<button id="signUpID">Sign Up</button>';
      var closeDiv = '</div>';
      this.$el.html(createSaveLoginViewContainer +
        "Username" + "<br><div>" + userName + "</div><div>" + "Password" + "<br><div>" + password + "</div><div>" + saveLogin + "</div>" + "</div><div>" + signUp + "</div>" + closeDiv);
      return this;
    },

    events: {
      'click #saveLoginID': 'loginUser',
      'click #signUpID': 'createAcct'
    },

    loginUser: function() {
      console.log("heard button Save / Login click");
      $("#createSaveLoginViewContainer").remove();
    },

    createAcct: function() {
      console.log("heard button Sign Up click");
      var newCreateUser = new CreateAcctView();
      this.$el.append(newCreateUser.render().$el);
      $("#createSaveLoginViewContainer").remove();
    }

  });

  //////////////////////////////////////////////////////////////////////////////

  // NOTES FOR CreateAcctView
  // -Holds container with username, password, and "Create Account" btn.
  // -It currently makes #newAcctContainer disappear

  //////////////////////////////////////////////////////////////////////////////

  var CreateAcctView = Backbone.View.extend({
    render: function() {
      var newAcct = '<div id="newAcctContainer">';
      var newUsername = '<input id= "newUsernameID" type="text" value="" />';
      var newpassword = '<input id= "newPasswordID" type="text" value="" />';
      var saveNewUser = '<button id="saveUserID">Create Account</button>';
      var closeDiv = '</div>';
      this.$el.html(newAcct + "Username" + "<div>" + newUsername + "</div>" + "Password" + "<br><div>" + newpassword + "</div><div>" + "</div><div>" + saveNewUser + "</div>" + "</div><div>" + closeDiv);
      return this;
    },

    events: {
      'click #saveUserID': 'addUser',
    },

    addUser: function() {
      console.log("heard button new user save click");
      $("#newAcctContainer").remove();
    }

  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR NewPLaylistView:
  // -This is the area where people can create new playlists

  //////////////////////////////////////////////////////////////////////////////

  var NewPLaylistView = Backbone.View.extend({
    className: 'newPlaylist',

    initialize: function() {
      this.listenTo(app.tracks, 'click', this.render);
    },

    events: {
      "click #saveCity": "appAppear"
    },

    appAppear: function() {
      user = $("#saveCity").val();
      app.currentUser = user;
      userModel = app.users.findWhere({username: user});
      newUserView = new UserView({model: userModel});
      newNewPlaylistView = new NewPLaylistView();
      newSoundCloudView = new SoundCloudView();
      newNamedPlaylistsView = new NamedPlaylistsView();
      newUserView.render(user);
      newNewPlaylistView.render();
      newSoundCloudView.render();
      newNamedPlaylistsView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#newPlaylist").append(newNewPlaylistView.$el);
      $("#soundcloudPlayer").append(newSoundCloudView.$el);
      $("#lists").append(newNamedPlaylistsView.$el);
    },

    render: function() {
      label = '<h2>New Playlists</h2>';
      console.log("NamedPlaylistView render is listening");
      // this.$el.html(label);
      var cityName = '<input type="text" id="city-Name">';
      var saveCityBtn = '<button id="saveCity">Create</button>';
      this.$el.html(label + '<b>' + "City: " + '</b>' + cityName + '</br>' + '</b>' + '</b>' + '<b>' + saveCityBtn);
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR SoundCloudView:
  // -Holds the SoundCloud Player

  //////////////////////////////////////////////////////////////////////////////

  var SoundCloudView = Backbone.View.extend({
    className: 'SoundCloudView',

    initalize: function() {

    },

    testFunction: function() {
      console.log("SoundCloudView function is running");
    },

    render: function() {
      label = '<h2>SoundCloud Widget Holder</h2>';
      console.log(" SoundCloudView render is listening");
      this.$el.html(label);
      var saveCurrentPlaylist = '<input type="text" id="currentPlaylist">';
      var saveCurrentPlaylistBtn = '<button id="CurrentPlaylistBtn">Save</button>';
      tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/78115793&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>';
      this.$el.html(label + '<b>' + "Playlist Title: " + '</b>' + saveCurrentPlaylist + '</br>' + '</b>' + '</b>' + '<b>' + saveCurrentPlaylistBtn + tracksPlayer);
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR NamedPlaylistsView:
  // -Will hold the user named (URLs) playlists

  //////////////////////////////////////////////////////////////////////////////

  var NamedPlaylistsView = Backbone.View.extend({
    className: 'lists',
    initalize: function() {

    },

    render: function() {
      label = '<h2>My Playlists</h2>';
      console.log("NamedPlaylistsView render is listening");
      this.$el.html(label);
    },



  });

  //////////////////////////////////////////////////////////////////////////////

  ////NOTES FOR UserView
  //This view holds all of the views
  //This view also has the login and logout buttons

  //////////////////////////////////////////////////////////////////////////////

  UserView = Backbone.View.extend({
    render: function(user) {
      userViewContainer = '<div id="userViewContainer">';

      newPlaylistCity = '<div id="newPlaylist"></div>';
      soundcloudPlayer = '<div id="soundcloudPlayer"></div>';
      lists = '<div id="lists"></div>';
      buttons = '<button id="save">Login</button><button id="logout">Logout</button>';
      closeDiv = '</div>';
      this.$el.html(userViewContainer + newPlaylistCity + soundcloudPlayer + lists + buttons + closeDiv);
    },

    events: {
      "click #logout": "logout",
      "click #save": "createPlaylist"
    },

    initialize: function() {

    },

    logout: function() {
      console.log('click heard on logout button');
      var firstView = new CreateTracks();
      firstView.render();
      $("#app").append(firstView.$el);
      $("#userViewContainer").remove();
      $("#createSaveLoginViewContainer").remove();
      $("#newAcctContainer ").remove();

    },

    createPlaylist: function() {
      console.log('click heard on create Playlist button');
      //var newCreatePlaylist = new SaveLoginView();
      //this.$el.append(newCreatePlaylist.render().$el);
      var loginUser = new LoginView();
      loginUser.render();
      $("#userlogin").append(loginUser.$el);
    },

    appAppear: function() {
      user = $("#saveCity").val();
      app.currentUser = user;
      userModel = app.users.findWhere({username: user});
      newUserView = new UserView({model: userModel});
      newNewPlaylistView = new NewPLaylistView();
      newSoundCloudView = new SoundCloudView();
      newNamedPlaylistsView = new NamedPlaylistsView();
      newUserView.render(user);
      newNewPlaylistView.render();
      newSoundCloudView.render();
      newNamedPlaylistsView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#newPlaylist").append(newNewPlaylistView.$el);
      $("#soundcloudPlayer").append(newSoundCloudView.$el);
      $("#lists").append(newNamedPlaylistsView.$el);
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  ////NOTES FOR CreateTracks:
  //This view is the first view that users see when they visit "Bands from Here"
  //In this view users can enter a city and select from a list of musical genres
  //When users push "Create", the "appAppear" function runs and all of the other views render

  //////////////////////////////////////////////////////////////////////////////

  // CreateTracks = Backbone.View.extend({
  //   id: "CreateTracksContainer",
  //   render: function() {
  //     var cityName = '<input type="text" id="city-Name">';
  //     var saveCityBtn = '<button id="saveCity">Create</button>';
  //     this.$el.html('<b>' + "City: " + '</b>' + cityName + '</br>' + '</b>' + '</b>' + '<b>' + saveCityBtn);
  //   },

  //   initialize: function() {
  //     this.listenTo(app.tracks, 'click', this.render);
  //   },

  //   events: {
  //     "click #saveCity": "appAppear"
  //   },

    // appAppear: function() {
    //   user = $("#saveCity").val();
    //   app.currentUser = user;
    //   userModel = app.users.findWhere({username: user});
    //   newUserView = new UserView({model: userModel});
    //   newNewPlaylistView = new NewPLaylistView();
    //   newSoundCloudView = new SoundCloudView();
    //   newNamedPlaylistsView = new NamedPlaylistsView();
    //   newUserView.render(user);
    //   newNewPlaylistView.render();
    //   newSoundCloudView.render();
    //   newNamedPlaylistsView.render();
    //   $("#app").empty();
    //   $("#app").append(newUserView.$el);
    //   $("#newPlaylist").append(newNewPlaylistView.$el);
    //   $("#soundcloudPlayer").append(newSoundCloudView.$el);
    //   $("#lists").append(newNamedPlaylistsView.$el);
    // }
  // });

  // generic ctor to represent interface:
  function GUI(users, playlistName, el) {
    var firstView = new NewPLaylistView();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
