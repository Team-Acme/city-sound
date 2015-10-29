
SC.initialize({
    client_id: '76d62ab386771b9cd98b1904eb234d8d',
    //redirect_uri: 'http://example.com/callback'
  });



// get users from city entered
// map returned users array to just array of user_id
var usersIdOnly = [];
var tracksList = [];
var responsesNeeded = 0;

function trackListBuilt() {
  if (responsesNeeded <= 0) {
    console.log('Track list is built');
    console.log(tracksList);
    for (var i = 0; i < tracksList.length; i++) {
      SC.stream('/tracks/' + tracksList[i]).then(function(player){
        console.log('track playing: ' + tracksList[i]);
        player.play();
      });
      // SC.oEmbed(tracksList[i], {
      //     element: document.getElementById('app')
      // });
    }
  };
};

function musicTracks(user) {
  console.log('musicTracks has been called');
  console.log(user);
  responsesNeeded++;
  console.log(responsesNeeded);

  SC.get('/users/' + user + '/tracks', {
    //user_id : user,
    //genres : 'alternative'

  })
  .then(function(tracks) {
    console.log(tracks);
    if (tracks.length !== 0) {
      tracksList.push(tracks[0].id);
    };
    responsesNeeded--;
    trackListBuilt();
  })
  // .fail(function() {
  //   responsesNeeded--;
  //   trackListBuilt();
  // });
  // return;
};

// SC.get('/playlists', {
//   q: 'Seattle local music', limit: 10
// }).then(function(playlists) {
//     console.log(playlists);
//     playlistUri = playlists.map(function(obj){
//       var rObj = {};
//       rObj.uri = obj.uri;
//       return rObj;
//     });
//     console.log(playlistsUri);
//     // for(var i = 0; i < playlistsUri.length; i++ ) {
//     //   console.log(i);
//     //   musicTracks(usersIdOnly[i].id);
//     //
//     // };
//
// });



SC.get('/users', {
  q: 'Portland local music', limit: 50
}).then(function(users) {
    console.log(users);
    usersIdOnly = users.map(function(obj){
      var rObj = {};
      rObj.id = obj.id;
      return rObj;
    });
    console.log(usersIdOnly);
    for(var i = 0; i < usersIdOnly.length; i++ ) {
      console.log(i);
      musicTracks(usersIdOnly[i].id);

    };

});


// create playlist from tracks array

// var tracks = [{id: 290}, {id: 291}, {id: 292}];
//
// SC.connect().then(function() {
//   SC.post('/playlists', {
//     playlist: { title: 'My Playlist', tracks: tracks }
//   });
// });

// embed player in page using playlist

  // SC.oEmbed('http://soundcloud.com/tracks/90390073', {
  //     element: document.getElementById('app')
  // });
