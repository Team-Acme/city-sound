
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
      "click #saveCity": "appAppear",
    },

    appAppear: function() {
      user = $("#saveCity").val();
      app.currentUser = user;
      // userModel = app.users.findWhere({username: user});
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
      label = '<h2>Bands from where?</h2>';
      console.log("NamedPlaylistView render is listening");
      // this.$el.html(label);
      var cityName = '<input type="text" id="city-Name">';
      var saveCityBtn = '<div id="saveCity">Go!</div>';
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
      label = '<h2>Now Playing...</h2>';
      console.log(" SoundCloudView render is listening");
      this.$el.html(label);
      var saveCurrentPlaylist = '<input type="text" id="currentPlaylist">';
      var saveCurrentPlaylistBtn = '<button id="CurrentPlaylistBtn">Save</button>';
      tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/163125746&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>';
      this.$el.html(label + '<b>' + "Playlist Title: " + '</b>' + saveCurrentPlaylist + '</br>' + '</b>' + '</b>' + '<b>' + saveCurrentPlaylistBtn + tracksPlayer);
    },

     events: {
      'click #CurrentPlaylistBtn': 'savePost'
    },

    savePost: function() {
      var postAdded = this.collection.create({
        title: $('#post-title').val(),
        author: user,
        timestamp: Date.now()
      });
      $('#post-title').val('');
      Hermit.recentPostsView.collection.fetch();
      Hermit.usersPostsView.collection.fetch();
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
  //This view also has the login and logout buttons

  //////////////////////////////////////////////////////////////////////////////

  UserView = Backbone.View.extend({
    render: function(user) {
      userViewContainer = '<div id="userViewContainer">';

      newPlaylistCity = '<div id="newPlaylist"></div>';
      soundcloudPlayer = '<div id="soundcloudPlayer"></div>';
      lists = '<div id="lists"></div>';
      buttons = '<button id="logout">Logout</button>';
      closeDiv = '</div>';
      this.$el.html(userViewContainer + newPlaylistCity + soundcloudPlayer + lists + buttons + closeDiv);
    },

    events: {
      "click #logout": "logout",
    },

    initialize: function() {

    },

    logout: function() {
      console.log('heard click on logout');
      $.ajax({
         url: '/logout'
       }).done(function(data) {
         console.log('Successfully Logged Out');
       });
       user = '';
       bio = '';
       key = '';
       window.location = '/';

    }
  });


  // generic ctor to represent interface:
  function GUI(users, playlistName, el) {
    var firstView = new NewPLaylistView();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
GUI();
