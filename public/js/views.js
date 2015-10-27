//GLOBAL VARIABLES FOR TESTING
var Backbone;
var WidgetView;
var widget;
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
// -This view holds the Soundcloud Widget

///////////////////////////////////////////////////////////////////////////////

  WidgetView = Backbone.View.extend({

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


  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR SaveLoginView:
  // -Creates a view that where you can name a playlist and login to the app
  // -The "addPlaylist" function will push the newly named list to the NamedPlaylistsView and allow users to login
  //  it currently makes the #createSaveLoginViewContainer disappear when #saveLoginID is pushed
  // -The "createAcct" function renders the CreateAcctView

  //////////////////////////////////////////////////////////////////////////////
  var SaveLoginView = Backbone.View.extend({
  render: function() {
  var createSaveLoginViewContainer = '<div id="createSaveLoginViewContainer">';
  var playlistTitle = '<input id= "playlistTitle" type="text" value="" />';
  var userName = '<input id= "userName" type="text" value="" />';
  var password = '<input id= "password" type="text" value="" />';
  var saveLogin = '<button id="saveLoginID">Save / Login</button>';
  var signUp = '<button id="signUpID">Sign Up</button>';
  var closeDiv = '</div>';
  this.$el.html(createSaveLoginViewContainer + "New Playlist" + "<div>" + playlistTitle + "</div>" +
    "Username" + "<br><div>" + userName + "</div><div>" + "Password" + "<br><div>" + password + "</div><div>" + saveLogin + "</div>" + "</div><div>" + signUp + "</div>" + closeDiv);
    return this;
  },

  events: {
    'click #saveLoginID': 'addPlaylist',
    'click #signUpID': 'createAcct'
  },

  addPlaylist: function() {
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
  this.$el.html(newAcct + "Username" + "<div>" + newUsername + "</div>" + "Password" + "<br><div>" + newpassword + "</div><div>" + "</div><div>"+ saveNewUser + "</div>" + "</div><div>" + closeDiv);
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
      label = '<h2>SoundCloud Widget</h2>';
      console.log(" SoundCloudView render is listening");
      this.$el.html(label);
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
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR UserView
  //This view holds all of the views
  //This view
  //////////////////////////////////////////////////////////////////////////////

  UserView = Backbone.View.extend({
    render: function(user) {
      userViewContainer = '<div id="userViewContainer">';
      soundcloudPlayer = '<div id="soundcloudPlayer"></div>';
      lists = '<div id="lists"></div>';
      buttons = '<button id="save">Save Playlist</button><button id="logout">Logout</button>';
      closeDiv = '</div>';
      this.$el.html(userViewContainer + soundcloudPlayer + lists + buttons + closeDiv);
    },

    events: {
      "click #logout": "logout",
      "click #save": "createPlaylist"
    },

    initialize: function() {

    },

    logout: function() {
      console.log('click heard on logout button');
      // var newCreateTracks = new CreateTracks();
      // newCreateTracks.render();
      // $("#app").empty();
      // $("#app").append(CreateTracks.$el);
      // window.onload = 'file:///Users/airHome/Desktop/city-sound/test.html';
      $("#userViewContainer").remove();

    },

    createPlaylist: function() {
      console.log('click heard on create Playlist button');
        var newCreatePlaylist = new SaveLoginView();
        this.$el.append(newCreatePlaylist.render().$el);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR CreateTracks:
  //This view is the first view that users see when they visit "Bands from Here"
  //In this view users can enter a city and select from a list of musical genres
  //When users push "Create", the "appAppear" function runs and all of the other views render

  //////////////////////////////////////////////////////////////////////////////

  CreateTracks = Backbone.View.extend({
    id: "CreateTracksContainer",
    render: function() {
    var cityName = '<input type="text" id="post-title">';
    var saveCityBtn = '<button id="saveCity">Create</button>';
    this.$el.html('<b>' + "City: " + '</b>' + cityName + '</br>' + '</b>' + '</b>' + '<b>' + saveCityBtn);
    },

    initialize: function() {
      this.listenTo(app.tasks, 'click', this.render);
    },

    events: {
      "click #saveCity": "appAppear"
    },

    appAppear: function() {
      user = $("#saveCity").val();
      app.currentUser = user;
      userModel = app.users.findWhere({
        username: user
      });

      newUserView = new UserView({
        model: userModel
      });
      newSoundCloudView = new SoundCloudView();
      newNamedPlaylistsView = new NamedPlaylistsView();

      newUserView.render(user);
      newSoundCloudView.render();
      newNamedPlaylistsView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#soundcloudPlayer").append(newSoundCloudView.$el);
      $("#lists").append(newNamedPlaylistsView.$el);
    }
  });

  // generic ctor to represent interface:
  function GUI(users, playlistName, el) {
    var firstView = new CreateTracks();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
