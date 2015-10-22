
console.log("models.js is loading");

var UserModel = Backbone.Model.extend({
  defaults: {
    username:'',
    playlistCreated: [],
  },
    addUser : function (str) {
      this.set("username", str);
  }
});

var PlaylistModel = Backbone.Model.extend({
  defaults: {
    playListName:'',
  },

  newList : function (playListName) {
    this.set("playListName", playListName);
  }
});


var UserCollection = Backbone.Collection.extend({
  model : UserModel
});

var PlaylistCollection = Backbone.Collection.extend({
  model : PlaylistModel
});