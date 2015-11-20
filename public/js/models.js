console.log("models.js is loading");

var UserModel = Backbone.Model.extend({
  defaults: {
    username: '',
    password: ''
  }
});

var PostModel = Backbone.Model.extend({
  idAttribute: 'key',
  defaults: {
    title: '',
    author: '',
    url: ''
  }
});

var Posts = Backbone.Collection.extend({
  model: PostModel,
  url: '/posts/',
  initialize: function() {
    // this.fetch();
  }
});

var UsersPosts = Backbone.Collection.extend({
  model: PostModel,
  url: '/posts/' + user,
  initialize: function() {
    this.fetch();
  }
});