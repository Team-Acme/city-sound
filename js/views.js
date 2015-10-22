//GLOBAL VARIABLES FOR TESTING
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

module.exports = {
  WidgetView: WidgetView
}


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

  //NOTES FOR CreatePlaylistView:
  // -Creates a view that where you can name a playlist and login to the app
  // -The "save" function will push the newly named list to the NamedPlaylistsView and allow users to login

  //////////////////////////////////////////////////////////////////////////////

  CreatePlaylistView = Backbone.View.extend({

    render: function(user) {
      namePlaylistContainer = '<div id="namePlaylistContainer">';
      playlistName = '<input id= "playlistName" type="text" value="" />'; //text box
      savePlaylist = '<button id="savePlaylist">Save Playlist</button>';
      closeDiv = '</div>';
      this.$el.html(namePlaylistContainer  + "<div>" + playlistName + "</div><div>" + savePlaylist + "</div>" + closeDiv);
    },

    events: {
      "click #savePlaylist": "save",
    },

    save: function() {
      console.log('click heard on saveTask button');
      $("#CreatePlaylistView").remove();
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
      "click #createTask": "createPlaylist"
    },

    initialize: function() {

    },

    logout: function() {
      console.log('click heard on logout button');
      // var newCreateTracks = new CreateTracks();
      // newCreateTracks.render();
      // $("#app").empty();
      // $("#app").append(CreateTracks.$el);
      window.onload = 'file:///Users/airHome/Desktop/city-sound/test.html';

    },

    createPlaylist: function() {
      console.log('click heard on createTask button');
      CreatePlaylistView = new CreatePlaylistView();
      CreatePlaylistView.render();
      $("#app").append(CreatePlaylistView.$el);
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
    cityName = '<input type="text" id="post-title">';
    saveCityBtn = '<button id="saveCity">Create</button>';
    classical = '<input type="checkbox" name="Classical" value="Classical"> Classical<br>';
    jazz = '<input type="checkbox" name="Jazz" value="Jazz"> Jazz<br>';
    rap = '<input type="checkbox" name="Rap" value="Rap"> Rap<br>';
    newAge = '<input type="checkbox" name="newAge" value="newAge"> New Age<br>';
    this.$el.html('<b>' + "City: " + '</b>' + cityName + '</br>' + '</b>' + '</b>' + jazz + classical  + rap  + newAge + '<b>' + saveCityBtn);

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
  function GUI(users, tasks, el) {
    firstView = new CreateTracks();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
