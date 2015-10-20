var BFHViews = (function() {
  var UserView = Backbone.View.extend({
    id:'user-view',
    render: function(){
      var usernameSection = '<p id="username">Welcome  '+ user +'!</p>';
      var bioSection = '<div id="userbio">About Me: '+ bio +'</div>';
      var editUser = '<button id="EditUser"><a href="/users/' + key + '/edit">Edit User</a></button>';
      var logoutButton = '<button id="Logout">Logout</button>';
      this.$el.html('<div id="user-section">' +usernameSection + bioSection + '<div>' + editUser + logoutButton + '</div>'+'</div>');
      return this;
    },

    events: {
      'click #Logout': 'logout',
    },

    logout: function() {
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
})();
