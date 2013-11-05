
/* global goinstant */

'use strict';

/* Dependencies */

var giStatus = require('./gi_status');

var url = 'https://goinstant.net/<%= giAcct %>/<%= giApp %>';

goinstant.connect(url, function (err, connection, lobby) {
  if (err) {
    giStatus.connected(false);
    console.log('Error connecting to platform:', err);
    return;
  }

  giStatus.connected(true);

  /*jshint unused:false*/ // Remove once you're doing something with lobby!
});
