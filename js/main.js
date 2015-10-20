console.log("main js is being called");

var BFH= {
  // Models: BFHModels,
  Views: BFHViews
};

$(function() {

  BFH.UserView = new BFH.UserView();
  $('#app').append(BFH.UserView.render().$el);

$('#user-view').append(BFH.UserView.render().$el);

});
