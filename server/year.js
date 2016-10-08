/**
 * Computes yearly expenditure per taxi company and per currency
 *
 * Copyright (c) 2016 Redsift Limited
 */
'use strict';

module.exports = function(got) {
  const inData = got['in'];
  const query = got['query'];
  const year = query[1];
  var total = 0;
  var average = 0;
  var trips = 0;
  for (var d of inData.data) {
    var val = JSON.parse(d.value);
    total += parseFloat(val.total);
    trips = trips + 1;
  }
  if (trips > 0) {
    average = total / trips;
  }
  var res = { name: 'year', key: year, value: { year: year, currency: val.currency, trips: trips, average: average, total: total } };
  return res;
};
