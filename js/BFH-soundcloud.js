
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
  };
};

function musicTracks(user) {
  console.log('musicTracks has been called');
  responsesNeeded++;
  console.log(responsesNeeded);
  SC.get('/tracks', {
    user_id : user,
    genres : 'alternative' || 'rock' || 'pop'
  }).then(function(tracks) {
    if (tracks.length !== 0) {
      tracksList.push(tracks[0].id);
    };
    responsesNeeded--;
    trackListBuilt();
  }).fail(function() {
    responsesNeeded--;
    trackListBuilt()
  });
};

SC.get('/users', {
  q: 'Portland', limit: 50
}).then(function(users) {
    console.log(users);
    usersIdOnly = users.map(function(obj){
      var rObj = {};
      rObj.id = obj.id;
      return rObj;
    });
    console.log(usersIdOnly);
    for( i = 0; i < usersIdOnly.length; i++ ) {
      musicTracks(usersIdOnly[i].id);
      console.log(i);
    };

});

// test if user_id has tracks in music genres (alternative, rock, pop)
// if yes, get track from user and add track_id to tracks array
// repeat until tracks.length = 10

// SC.get('/tracks', {
//   user_id : usersIdOnly[i].id,
//   genres : 'alternative' || 'rock' || 'pop'
// }).then(function(tracks) {
//   console.log(tracks);
// });

// create playlist from tracks array

// var tracks = [{id: 290}, {id: 291}, {id: 292}];
//
// SC.connect().then(function() {
//   SC.post('/playlists', {
//     playlist: { title: 'My Playlist', tracks: tracks }
//   });
// });

// embed player in page using playlist

// SC.oEmbed('http://soundcloud.com/forss/sets/soulhack', {
//     element: document.getElementById('putTheWidgetHere')
// });
