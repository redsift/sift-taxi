/**
 * Maps the relevant fields from a taxi receipt and emits a YYYYMMDD/msgId key/value pair
 *
 * Copyright (c) 2016 Redsift Limited
 */
'use strict';

var moment = require('moment');

// Entry point for DAG node
module.exports = function(got) {
  const inData = got['in'];
  var ret = inData.data.map(function (d) {
    try {
      var msg = JSON.parse(d.value);
      var tot = _parseTotal(msg);
      if (!tot) {
        // When no "Total:"" is present, try to calculate it using Fare and Tip
        tot = _parseFareAndTip(msg);
      }
      // If found total and managed to extract value from it
      if (tot && tot.length === 3) {
        var currency = _parseCurrency(tot);
        var company = _parseCompany(msg);
        var total = tot[2];
        // Normalize aggregation date for currency conversion to UTC and then to the beginning of the day
        var day = moment(msg.date).utc().startOf('day').valueOf();
        if(currency && total && company && day) {
          return {
            name: 'receipts',
            key: day + '/' + msg.id,
            value: {
              currency: currency,
              total: total,
              company: company,
              threadId: msg.threadId
            },
            epoch: d.epoch
          };
        }
        else {
          console.error('MAP: could not parse receipt: ', msg.id);
        }
      }
    }
    catch (ex) {
      console.error('MAP: Error parsing value for: ', d.key);
      console.error('MAP: Exception: ', ex);
    }
  });
  return ret;
};

const TaxiRegExp = {
  TOTAL: /(Total|Price)\D*(\d+\.\d+)/i,
  FARE: /(Fare|Meter)\D*(\d+\.\d+)/i,
  TIP: /(Tip)\D*(\d+\.\d+)/i
};

const CurrencyRegExp = {
  POUND: /£/,
  DOLLAR: /\$/,
  EURO: /€/
};

const HTMLRegExp = {
  CLEANUP: /(\r\n|\n|\r)/gm,
  POUND: /\&pound\;/i,
  EURO: /\&euro\;/i
};

function _parseTotal(msg) {
  var tot = TaxiRegExp.TOTAL.exec(msg.preview);
  if (!tot) {
    const msgBody = msg.textBody || msg.strippedHtmlBody;
    const sBody = msgBody.replace(HTMLRegExp.CLEANUP, '');
    // Try once again using the message body in case info not in preview
    tot = TaxiRegExp.TOTAL.exec(sBody);
  }
  return tot;
}

function _parseFareAndTip(msg) {
  const msgBody = msg.textBody || msg.strippedHtmlBody;
  const sBody = msgBody.replace(HTMLRegExp.CLEANUP, '');
  var fare = TaxiRegExp.FARE.exec(sBody);
  var fVal = 0.0;
  if (fare && fare.length === 3) {
    fVal += parseFloat(fare[2]);
    var tip = TaxiRegExp.TIP.exec(sBody);
    if (tip && tip.length === 3) {
      fVal += parseFloat(tip[2]);
    }
    // Only Hailo has this format so for simplicity assume GBP for now
    // TODO: Can be improved
    tot = ["£", "", fVal.toString()];
  }
  return tot;
}

function _parseCurrency(tot) {
  var currency = 'USD';
  if (CurrencyRegExp.POUND.test(tot[0]) || HTMLRegExp.POUND.test(tot[0])) {
    currency = 'GBP';
  }
  else if (CurrencyRegExp.EURO.test(tot[0]) || HTMLRegExp.EURO.test(tot[0])) {
    currency = 'EUR';
  }
  return currency;
}

function _parseCompany(msg) {
  var from = msg.from.email.toLowerCase();
  var company;
  if (from.indexOf('hailo') !== -1) {
    company = 'hailo';
  }
  else if (from.indexOf('uber') !== -1) {
    company = 'uber';
  }
  else if (from.indexOf('addisonlee') !== -1) {
    company = 'addisonlee';
  }
  else {
    throw new Error('Could not parse company from: ' + from);
  }
  return company;
}
