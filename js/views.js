var GUI = (function() { //IIFE for all Views

////////////////////////////////////////////////////////////////////////////////

//NOTES FOR WidgetView
// -This view holds the Soundcloud Widget 

///////////////////////////////////////////////////////////////////////////////

  var WidgetView = Backbone.View.extend({

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

  //NOTES FOR CreatePlaylistView:
  // -Creates a view that where you can name a playlist and login to the app
  // -The "save" function will push the newly named list to the NamedPlaylistsView and allow users to login

  //////////////////////////////////////////////////////////////////////////////

  var CreatePlaylistView = Backbone.View.extend({

    render: function(user) {
      var namePlaylistContainer = '<div id="namePlaylistContainer">';
      var playlistName = '<input id= "playlistName" type="text" value="" />'; //text box
      var savePlaylist = '<button id="savePlaylist">Save Playlist</button>';
      var closeDiv = '</div>';
      this.$el.html(namePlaylistContainer  + "<div>" + playlistName + "</div><div>" + savePlaylist + "</div>" + closeDiv);
      return this;
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
      var label = '<h2>SoundCloud Widget</h2>';
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
      var label = '<h2>My Playlists</h2>';
      console.log("NamedPlaylistsView render is listening");
      this.$el.html(label);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR UserView
  //This view holds all of the views
  //This view 
  //////////////////////////////////////////////////////////////////////////////

  var UserView = Backbone.View.extend({
    render: function(user) {
      var userViewContainer = '<div id="userViewContainer">';
      var soundcloudPlayer = '<div id="soundcloudPlayer"></div>';
      var lists = '<div id="lists"></div>';
      var buttons = '<button id="save">Save Playlist</button><button id="logout">Logout</button>';
      var closeDiv = '</div>';
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
      window.location = 'file:///Users/airHome/Desktop/city-sound/test.html';
    }, 

    createPlaylist: function() {
      console.log('click heard on createTask button');
      var CreatePlaylistView = new CreatePlaylistView();
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

  var CreateTracks = Backbone.View.extend({
    id: "CreateTracksContainer",
    render: function() {
    var cityName = '<input type="text" id="post-title">';
    var saveCityBtn = '<button id="saveCity">Create</button>';
    var classical = '<input type="checkbox" name="Classical" value="Classical"> Classical<br>';
    var jazz = '<input type="checkbox" name="Jazz" value="Jazz"> Jazz<br>';
    var rap = '<input type="checkbox" name="Rap" value="Rap"> Rap<br>';
    var newAge = '<input type="checkbox" name="newAge" value="newAge"> New Age<br>';
    this.$el.html('<b>' + "City: " + '</b>' + cityName + '</br>' + '</b>' + '</b>' + jazz + classical  + rap  + newAge + '<b>' + saveCityBtn);

    },

    initialize: function() {
      this.listenTo(app.tasks, 'click', this.render);
    },

    events: {
      "click #saveCity": "appAppear"
    },

    appAppear: function() {
      var user = $("#saveCity").val();
      app.currentUser = user; 
      var userModel = app.users.findWhere({
        username: user
      });
      var newUserView = new UserView({
        model: userModel
      });
      var newSoundCloudView = new SoundCloudView();
      var newNamedPlaylistsView = new NamedPlaylistsView();
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
    var firstView = new CreateTracks();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
