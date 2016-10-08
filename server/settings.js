/**
 * Sift Taxi. DAG's 'Settings' node implementation
 *
 * Copyright (c) 2016 Redsift Limited
 */
'use strict';

module.exports = function(got) {
  const inData = got['in'];
  var ret = [];
  inData.data.map(function(datum) {
    var val = datum.value.toString();
    ret.push({ name: 'settings', key: datum.key, value: val });
    // Don't expose app id to frontend
    if(datum.key === 'oxrappid') {
      val = 'connected';
    }
    ret.push({name: 'config', key: datum.key, value: val});
  });
  return ret;
};

