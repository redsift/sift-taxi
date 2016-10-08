/**
 * Computes monthly expenditure
 *
 * Copyright (c) 2016 Redsift Limited
 */
'use strict';

const companyIndexes = {
  uber: 0,
  hailo: 1,
  addisonlee: 2
};

module.exports = function(got) {
  const inData = got['in'];
  const query = got['query'];
  var companiesTot = [0.0, 0.0, 0.0];
  var trips = 0;
  var total = 0;
  var currency;
  inData.data.forEach(function (d) {
    var val = JSON.parse(d.value);
    var tot = parseFloat(val.total);
    currency = val.currency;
    trips = trips + 1;
    total = total + tot;
    companiesTot[companyIndexes[val.company]] += tot;
  });
  var average = 0;
  if (trips > 0) {
    average = total / trips;
  }
  var res = {
    name: 'month',
    key: query[0],
    value: {
      month: query[0],
      currency: currency,
      total: total,
      average: average,
      trips: trips,
      companies: companiesTot
    }
  };
  return res;
};
