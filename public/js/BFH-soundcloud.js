
SC.initialize({
    client_id: '76d62ab386771b9cd98b1904eb234d8d',
    //redirect_uri: 'http://example.com/callback'
  });

// SC.oEmbed('https://soundcloud.com/haldymusic/sets/web', {
//     element: document.getElementById('app')
// });
///////////////////////////////////////////////////////////////////////////////
(function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe),
        newSoundUrl = 'http://api.soundcloud.com/tracks/13692671';

    widget.bind(SC.Widget.Events.READY, function() {
      // load new widget
      widget.bind(SC.Widget.Events.FINISH, function() {
        widget.load(newSoundUrl, {
          show_artwork: false
        });
      });
    });

  }());
///////////////////////////////////////////////////////////////////////////////
// (function(){
//     var widgetIframe = document.getElementById('sc-widget'),
//         widget       = SC.Widget(widgetIframe);
//
//     widget.bind(SC.Widget.Events.READY, function() {
//       widget.bind(SC.Widget.Events.PLAY, function() {
//         // get information about currently playing sound
//         widget.getCurrentSound(function(currentSound) {
//           console.log('sound ' + currentSound.get('') + 'began to play');
//         });
//       });
//       // get current level of volume
//       widget.getVolume(function(volume) {
//         console.log('current volume value is ' + volume);
//       });
//       // set new volume level
//       widget.setVolume(50);
//       // get the value of the current position
//     });
//
//   }());
//////////////////////////////////////////////////////////////////////////////

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
      // SC.stream('/tracks/' + tracksList[i]).then(function(player){
      //   console.log('track playing: ' + tracksList[i]);
      //   player.play();
      // });
      SC.oEmbed(tracksList[i], {
        element: document.getElementById('app' + i)
      });
    }
  };
};

function musicTracks(user) {
  console.log('musicTracks has been called');
  console.log(user);
  responsesNeeded++;
  console.log(responsesNeeded);

  SC.get('/users/' + user + '/tracks.json', {
    duration: {to:300000},
    //tags: 'music',
    //genre: 'Alternative'

  })
  .then(function(tracks) {
    console.log(tracks);
    if (tracks.length !== 0) {
      // tracksList.push(tracks[0].id); // build array of track ids
      tracksList.push(tracks[0].uri); // build array of track urls
    };
    responsesNeeded--;
    trackListBuilt();
  })
};

// function makeDivsFromTracks(tracks,SC)
// {
//  var track;
//  var permUrl;
//  var newDiv;
//  for(var ctr=0;ctr<tracks.length;ctr++)
//  {
//   newDiv=document.createElement("div");
//   newDiv.id="track"+ctr;
//   track=tracks[ctr];
//   SC.oEmbed(track.permalink_url,{color:"ff0066"},newDiv);
//   document.body.appendChild(newDiv);
//  }
// }


// SC.get('/tracks',{duration:{to:900000},tags:'hitech',downloadable:true},
//         function(tracks,SC)
//         {
//          makeDivsFromTracks(tracks,SC);
//         });


SC.get('/users.json', {
  q: 'Portland local music', limit: 20
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
