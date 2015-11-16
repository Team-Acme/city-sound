console.log("models.js is loading");

// var BFHModels = (function() {
  var UserModel = Backbone.Model.extend({
    defaults:{
      username:'',
      password:''
    }
  });

  var PostModel = Backbone.Model.extend({
    idAttribute: 'key',
    defaults:{
      title:'',
      author:'',
      url:''
    }
  });

  var Posts = Backbone.Collection.extend({
    model: PostModel,
    url:'/posts/',
    initialize: function (){
      this.fetch();
    }
  });


  var UsersPosts = Backbone.Collection.extend({
    model: PostModel,
    url:'/posts/' + user,
    initialize: function (){
      this.fetch();
    }
  });


  // return {
  //   UserModel: UserModel,
  //   PostModel: PostModel,
  //   Posts: Posts,
  //   UsersPosts: UsersPosts
  // }

// })();