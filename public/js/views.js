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
      "change #citiesList": "appAppear",
      "click #logout": "logout"
    },

      loadPlaylist: function() {
      console.log("this is the city " + cityName.val());
      var cityPlaylists = [];
      // var selectedPlaylist = this.options.playlistURL;
      // get playlists from bfh-curated.URL using cityName.val() as a parameter
      // add to cityPlaylists array
      // find length of cityPlaylists and randomly choose one and save to selectedPlaylist
       

      SC.oEmbed(selectedPlaylist, {
          element: document.getElementById('playerGoesHere')
      });
    },

    appAppear: function() {
      var playlistURL;
     
      //Get current city name
      var thisCity = $("#citiesList").val();
      // var playlistURL;
      //post request to sessions.js for city playlist URL
      $.post("/newlist", {city: thisCity}, function(data, status){
      console.log("status: " + status);
      //playlistURL is the correct playlist URL for selected city!
      playlistURL = data.viewResponse.playlistID;
      console.log('playlistURL:', playlistURL);

      }).done(function(data){
      var user = $("#saveCity").val();
      app.currentUser = user;
      // userModel = app.users.findWhere({username: user});
      newUserView = new UserView({
        model: userModel
      });
      newSoundCloudView = new SoundCloudView({playlistURL: playlistURL});
      newNamedPlaylistsView = new NamedPlaylistsView();
      newUserView.render(user);
      newSoundCloudView.render();
      newNamedPlaylistsView.render();
      $("#app").append(newUserView.$el);
      $("#soundcloudPlayer").append(newSoundCloudView.$el);
      $("#lists").append(newNamedPlaylistsView.$el);
      // this.loadPlaylist();
      });


      //---------------------------------------------------------

      
    },

    // loadPlaylist: function() {
    //   // console.log("this is the city" + $("#citiesList").val());
    //   // var cityPlaylists = [];
    //   // var selectedPlaylist = '';
    //   // // get playlists from bfh-curated.URL using cityName.val() as a parameter
    //   // // add to cityPlaylists array
    //   // // find length of cityPlaylists and randomly choose one and save to selectedPlaylist


    //   SC.oEmbed(selectedPlaylist, {
    //       element: document.getElementById('playlistURL')
    //   });
    // },

    render: function() {
      label = '<h2>Bands from where?</h2>';
      console.log("NamedPlaylistView render is listening");
      // this.$el.html(label);
      var cityName = '<select id="citiesList" class="citySelects"><option value="">choose city</option><option value="Portland">Portland</option><option value="Seattle">Seattle</option><option value="Minneapolis">Minneapolis</option><option value="Austin">Austin</option><option value="Cleveland">Cleveland</option></select>';
      //var saveCityBtn = '<div id="saveCity"><img src="/img/monster_black.png"/></div>';
      var buttons = '<button id="logout">log out</button>';
      closeDiv = '</div>';
      this.$el.html(label + cityName + buttons + closeDiv);
    },

      logout: function() {
      console.log('heard click on logout');
      $.ajax({
        url: '/logout'

      }).done(function(data) {
        
      });
      user = '';
      bio = '';
      key = '';
      window.location = '/';
      console.log('Successfully Logged Out');
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
    id: 'soundcloudContainer',

    initialize: function(options) {
      this.options = options;
      console.log('171:');
      console.log(options);
      _.bindAll(this, 'render');
    },

    testFunction: function() {
      console.log("SoundCloudView function is running");
    },

    render: function() {
      label = '<h2>Save Your Playlist</h2>';
      console.log(" SoundCloudView render is listening");
      this.$el.html(label);
      var playerDiv = '<div id="playerGoesHere"></div>'
      var saveCurrentPlaylist = '<input type="text" id="currentPlaylist">';
      var saveCurrentPlaylistBtn = '<button id="CurrentPlaylistBtn">save</button>';
      // this is the hard coded url that we have benn using: url=https%3A//api.soundcloud.com/playlists/78115793&amp;
      
      console.log('192:');
      console.log(this.options);
      tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/'+ this.options.playlistURL +'&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
      // tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/'+ this.options.playlistURL + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
      // tracksPlayer = '<iframe id="sc-widget" width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+ this.options.playlistURL + ';color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;></iframe>';
      this.$el.html(playerDiv + tracksPlayer + label + '<b>' + "Playlist Title: " + saveCurrentPlaylist + saveCurrentPlaylistBtn);
      $("#userViewContainer").remove();
      $("#newPlaylist").remove();
      $("#soundcloudPlayer").remove();
      $("#lists").remove();
      $("#soundcloudContainer").remove();
      $(".lists").remove();
      $(".SoundCloudView").remove();
    },

    events: {
      'click #CurrentPlaylistBtn': 'savePost'
    },

    savePost: function() {
      var postAdded = this.collection.create({
        title: $('#post-title').val(),
        author: user,

      });
      $('#post-title').val('');
      // Hermit.recentPostsView.collection.fetch();
      // Hermit.usersPostsView.collection.fetch();
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR NamedPlaylistsView:
  // -Will hold the user named (URLs) playlists

  //////////////////////////////////////////////////////////////////////////////

  var NamedPlaylistsView = Backbone.View.extend({
    className: 'lists',
    initialize: function() {},

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
