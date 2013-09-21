/* jshint node:true */
/* global goinstant */

'use strict';

/* Dependencies */

var giStatus = require('./gi_status');

var url = 'https://goinstant.net/mattcreager/AppitRappity';
var platform = new goinstant.Platform(url);

platform.connect(function (err) {
  if (err) {
    giStatus.connected(false);
    console.log('Error connecting to platform:', err);
    return;
  }

  giStatus.connected(true);
});