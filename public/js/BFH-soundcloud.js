
SC.initialize({
    client_id: '76d62ab386771b9cd98b1904eb234d8d',
    //redirect_uri: 'http://example.com/callback'
  });

var track_url = 'http://soundcloud.com/haldymusic/sunglasses-and-suicide-doors';
SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
});


(function(){
  var widgetIframe = document.getElementById('sc-widget'),
      widget       = SC.Widget(widgetIframe),
      newSoundUrl = '';

  widget.bind(SC.Widget.Events.READY, function() {
    // load new widget
    widget.bind(SC.Widget.Events.FINISH, function() {
      widget.load(newSoundUrl, {
        show_artwork: false
      });
    });
  });

}());


(function(){
  var widgetIframe = document.getElementById('sc-widget'),
      widget       = SC.Widget(widgetIframe);

  widget.bind(SC.Widget.Events.READY, function() {
    widget.bind(SC.Widget.Events.PLAY, function() {
      // get information about currently playing sound
      widget.getCurrentSound(function(currentSound) {
        console.log('sound ' + currentSound.get('') + 'began to play');
      });
    });
    // get current level of volume
    widget.getVolume(function(volume) {
      console.log('current volume value is ' + volume);
    });
    // set new volume level
    widget.setVolume(50);
    // get the value of the current position
  });

}());
