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
var ShowListsView
var cityName;

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
      "update this.collection": 'render'
        // "click #logout": "logout"
    },

    loadPlaylist: function() {
      // console.log("this is the city " + cityName.val());
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
      var self = this;
      var playlistURL;

      //Get current city name
      var thisCity = $("#citiesList").val();
      // var playlistURL;
      //post request to sessions.js for city playlist URL
      $.post("/newlist", {
        city: thisCity
      }, function(data, status) {

        console.log("status: " + status);
        console.log("response: ", data.viewResponse);
        var randPlaylist = data.viewResponse[Math.floor(Math.random() * data.viewResponse.length)];
        playlistURL = randPlaylist.playlistID; //data.viewResponse.playlistID;
        console.log('playlistURL: ', playlistURL);

      }).done(function(data) {
        var saved = $("#saveCity").val();
        app.currentUser = saved;
        // userModel = app.users.findWhere({username: user});
        newUserView = new UserView({
          model: userModel
        });
        console.log("newplaylistview's collection: ", self.collection);
        newSoundCloudView = new SoundCloudView({
          playlistURL: playlistURL,
          collection: self.collection
        });

        newNamedPlaylistsView = new NamedPlaylistsView({
          collection: self.collection
        });
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

    render: function() {
      console.log('nplv render: ', this.collection)
      label = '<h2>Bands from where?</h2>';
      console.log("NamedPlaylistView render is listening");
      // this.$el.html(label);
      cityName = '<select id="citiesList" class="citySelects"><option value="">choose city</option><option value="Portland">Portland</option><option value="Seattle">Seattle</option><option value="Minneapolis">Minneapolis</option><option value="Austin">Austin</option><option value="Cleveland">Cleveland</option></select>';
      //var saveCityBtn = '<div id="saveCity"><img src="/img/monster_black.png"/></div>';
      //var buttons = '<button id="logout">log out</button>';
      closeDiv = '</div>';
      this.$el.html(label + cityName + closeDiv);
    },

    initialize: function() {
      var self = this;
      this.collection = new Posts();
      var route = '/posts/' + user

      $.get(
        route,
        function(data) {
          data = JSON.parse(data);
          for (var i = 0; i < data.length; i++) {
            self.collection.add(data[i])
          }
          console.log(data)
        })
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR SoundCloudView:
  // -Holds the SoundCloud Player

  //////////////////////////////////////////////////////////////////////////////

  SoundCloudView = Backbone.View.extend({
    className: 'SoundCloudView',
    id: 'soundcloudContainer',

    initialize: function(options) {
      this.options = options;
      _.bindAll(this, ['render', "savePost"]);
    },

    testFunction: function() {

    },

    render: function() {
      label = '<h2>Save Your Playlist</h2>';
      this.$el.html(label);
      var playerDiv = '<div id="playerGoesHere"></div>'
      var saveCurrentPlaylist = '<input type="text" id="currentPlaylist">';
      var saveCurrentPlaylistBtn = '<button id="CurrentPlaylistBtn">save</button>';
      // this is the hard coded url that we have benn using: url=https%3A//api.soundcloud.com/playlists/78115793&amp;
      tracksPlayer = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + this.options.playlistURL + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
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

      var saveTitle = $('#currentPlaylist').val();

      this.collection.add({
          title: $('#currentPlaylist').val(),
          author: user,
          url: this.options.playlistURL
        })
        //   $.post("/savelist", {
        //       title: $('#currentPlaylist').val(),
        //       author: user,
        //       url: this.options.playlistURL}, function(data, status){
        //     console.log("status: " + status);

      //     $('#currentPlaylist').val('');
      //     GUI.NamedPlaylistsView.collection.fetch();
      //     // ({collection: self.collection});

      // });
    }
  });

  //////////////////////////////////////////////////////////////////////////////

  //NOTES FOR NamedPlaylistsView:
  // -Will hold the user named (URLs) playlists

  //////////////////////////////////////////////////////////////////////////////

  var NamedPlaylistsView = Backbone.View.extend({
    className: 'lists',
    id: 'lists',
    events: {},
    initialize: function() {
      var self = this;
      console.log('nplSv: ', this.collection)
      this.listenTo(this.collection, 'update', self.render);
      console.log("newPlayListsView's collection", this.collection);
    },

    render: function() {
      console.log(this.collection);
      label = '<h2>My Playlists</h2>';
      this.$el.html(label);
      this.collection.each(function(data) {
        var postView = new ShowListsView({
          model: data
        });
        console.log(data);
        this.$el.append(postView.render().$el);
      }, this);
      return this;
    }



  });

  //////////////////////////////////////////////////////////////////////////////

  ////NOTES FOR UserView
  //This view holds all of the views
  //This view also has the login and logout buttons

  //////////////////////////////////////////////////////////////////////////////

  ShowListsView = Backbone.View.extend({
    className: 'showlists',
    render: function() {
      this.listenTo(this.collection, 'update', this.render);
      var titleContent = $('#title').html();
      var urlContent = $('#url').html();

      var title = '<h3 id="title">' + this.model.get('title') + '</h3>';  
      var playlistPlayer =  tracksPlayer = '<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + this.model.get('url') + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'    
      var url = '<h4 id="url">' + playlistPlayer + '</h4>';      
      // var url = '<h4 id="url">' + '<a href="#">' + this.model.get('url') + '</a>' + '</h4>';
      this.$el.html(title + "<div>" + url + "</div>");
      return this;
    },

    initialize: function() {
      this.listenTo(this.collection, 'update', this.render);

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
      //buttons = '<button id="logout">log out</button>';
      closeDiv = '</div>';
      this.$el.html(userViewContainer + newPlaylistCity + soundcloudPlayer + lists + closeDiv);

    },

    // logout: function() {
    //   console.log('heard click on logout');
    //   $.ajax({
    //     url: '/logout'

    //   }).done(function(data) {

    //   });
    //   user = '';
    //   bio = '';
    //   key = '';
    //   window.location = '/';
    //   console.log('Successfully Logged Out');
    // },

    initialize: function() {

    },

  });

  $(function() {
    var $el = $('#logout');

    var logout = function() {
      console.log('get out of my stuff!')
        $.get('/logout', function(data) {
          // window.location = '/';
      });
    }

    if ($el) {
      $el.click(logout);
    } else {};
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