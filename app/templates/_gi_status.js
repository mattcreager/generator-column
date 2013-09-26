'use strict';

/* Dependencies */

var giStatus = module.exports = {};

giStatus.connected = function(connectionStatus) {
  var statusEl = $('#gi-status');

  switch (connectionStatus) {
    case true:
      statusEl.removeClass('label-danger');
      statusEl.addClass('label-success');
      statusEl.find('.glyphicon').removeClass('glyphicon-thumbs-down');
      statusEl.find('.glyphicon').addClass('glyphicon-thumbs-up');
      break;
    case false:
      statusEl.addClass('label-danger');
      statusEl.removeClass('label-success');
      statusEl.find('.glyphicon').removeClass('glyphicon-thumbs-up');
      statusEl.find('.glyphicon').addClass('glyphicon-thumbs-down');
  }
};