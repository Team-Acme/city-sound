//GLOBAL VARIABLES FOR TESTING
var Backbone;
var WidgetView;
var NewPLaylistView;
var playlistName;
var closeDiv;
var SoundCloudView;
var label;
var UserView;
var userViewContainer;
var soundcloudPlayer;
var tracksPlayer;
var userModel;
var newUserView;
var newSoundCloudView;
var newNamedPlaylistsView;
var appAppear;

//STOP DELETING STUFF
var GUI = (function() { //IIFE for all Views

  ////////////////////////////////////////////////////////////////////////////////

  //NOTES FOR WidgetView
  // -This view holds the Soundcloud Widget and is nested in the SoundCloudView

  ///////////////////////////////////////////////////////////////////////////////

  WidgetView = Backbone.View.extend({
    className: 'widgetContainer',
    render: function() {
    var widget = '<div id="widget"></div>';
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

    NewPLaylistView = Backbone.View.extend({
    className: 'newPlaylist',
    initialize: function() {
      this.listenTo(app.tracks, 'change', this.render);
    },

    events: {
      // "click #saveCity": "appAppear",
      "change #citiesList": "appAppear",
      "click #logout": "logout"
    },

    appAppear: function() {
      var user = $("#saveCity").val();
      app.currentUser = user;
      // userModel = app.users.findWhere({username: user});
      newUserView = new UserView({
        model: userModel
      });
      // newNewPlaylistView = new NewPLaylistView();
      newSoundCloudView = new SoundCloudView();
      newNamedPlaylistsView = new NamedPlaylistsView();
      newUserView.render(user);
      // newNewPlaylistView.render();
      newSoundCloudView.render();
      newNamedPlaylistsView.render();
      // $("#app").empty();
      $("#app").append(newUserView.$el);
      // $("#newPlaylist").append(newNewPlaylistView.$el);
      $("#soundcloudPlayer").append(newSoundCloudView.$el);
      $("#lists").append(newNamedPlaylistsView.$el);
    },

    render: function() {
      label = '<h2>Bands from where?</h2>';
      console.log("NamedPlaylistView render is listening");
      // this.$el.html(label);
      var cityName = '<select id="citiesList"><option value="Portland">Portland</option><option value="Seattle">Seattle</option><option value="Minneapolis">Minneapolis</option><option value="Austin">Austin</option><option value="Cleveland">Cleveland</option></select>';
      var saveCityBtn = '<div id="saveCity"><img src="/img/monster_black.png"/></div>';
      var buttons = '<button id="logout">log out</button>';
      closeDiv = '</div>';
      this.$el.html(label + "City: " + cityName + buttons +saveCityBtn + closeDiv);
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
    },

    initialize: function() {

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
      label = '<h2>Save Your Playlist</h2>';
      console.log(" SoundCloudView render is listening");
      this.$el.html(label);
      var saveCurrentPlaylist = '<input type="text" id="currentPlaylist">';
      var saveCurrentPlaylistBtn = '<button id="CurrentPlaylistBtn">Save</button>';
      tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/78115793&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>';
      this.$el.html(tracksPlayer + label + '<b>' + "Playlist Title: " + '</b>' + saveCurrentPlaylist + '</br>' + '</b>' + '</b>' + '<b>' + saveCurrentPlaylistBtn);
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
    initalize: function() {},

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
      closeDiv = '</div>';
      this.$el.html(userViewContainer + newPlaylistCity + soundcloudPlayer + lists + closeDiv);
    },

    events: {
      "click #logout": "logout",
    },

    initialize: function() {

    },


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
