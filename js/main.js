console.log("main.js is loading");

var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Anastasia'},
        {username:'Chad'},
		{username:'Molly'},
		{username:'Elizabeth'}

	]);

	app.tasks = new PlaylistCollection([
      {playlistName: 'Chicago'

      },
	]);

	app.gui = new GUI(app.users,
	app.tasks,
	'#app');// selector of main div
});
