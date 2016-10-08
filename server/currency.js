/**
 * Performs currency conversion on the taxi receipts to the user's preferred currency
 *
 * Copyright (c) 2016 Redsift Limited
 */
'use strict';

var rp = require('request-promise');
var fx = require('money');
var moment = require('moment');

// Entry point for DAG node
module.exports = function(got) {
  // inData contains the key/value pairs that match the given query
  const inData = got['in'];
  // The query matched (array of elements based on the store's key and your selection criteria)
  const query = got['query'];
  // Joined information from your 'with' statement
  const withData = got['with'];
  // Lookup information from your 'lookup' statement
  const lookupData = got['lookup'];

  // Open Exchange Rates app id
  var oxrAppId;
  var oxrUrl = 'http://openexchangerates.org/api/historical/{day}.json?app_id=';
  // TODO: make initial state timezone aware
  var userCurrency = 'GBP';

  var day = query[0];
  var forex = null;
  if(withData.data[0] && withData.data[0].value) {
    forex = JSON.parse(withData.data[0].value);
  }

  if (lookupData[0].data && lookupData[0].data.value) {
    userCurrency = lookupData[0].data.value.toString();
  }
  if (lookupData[1].data && lookupData[1].data.value) {
    oxrAppId = lookupData[1].data.value.toString();
    oxrUrl = oxrUrl + oxrAppId;
  }

  // If any of the receipts in this day is in a foreign currency
  if(_conversionRequired(inData)) {
    if(forex) {
      // If forex returned from cache
      return _processReceipts(day, inData, forex);
    }
    else {
      // Retrieve forex info
      return _getForex(day).then(function (fx) {
        var ret = _processReceipts(day, inData, fx);
        // Cache historical forex for the next time
        ret.push({ name: 'openexchangerates', key: day, value: fx });
        return ret;
      }).catch(function () {
        // do nothing
      });
    }
  }
  else {
    // Just process the receipts
    return _processReceipts(day, inData, null);
  }

  // Scans through all the receipts to see if any require currency conversion
  function _conversionRequired(inData) {
    var ret = false;
    for (var d of inData.data) {
      // Parse the receipts
      d.value = JSON.parse(d.value);
      if (d.value.currency !== userCurrency) {
        ret = true;
      }
    }
    return ret;
  }

  function _getForex(day) {
    return new Promise(function (resolve) {
      if(oxrAppId) {
        rp({ url: oxrUrl.replace('{day}', moment.utc(parseInt(day)).format('YYYY-MM-DD')), json: true }).then(function(fx) {
          resolve(fx);
        }).catch(function(err) {
          console.error('CURRENCY: error getting OXR Response: ', err);
          reject();
        });
      }
      else {
        console.warn('CURRENCY: no OXR app id');
        reject();
      }
    });
  }

  // Process receipts and perform forex conversion if required
  function _processReceipts(day, inData, forex) {
    var ret = [];
    var total = 0;
    for (var d of inData.data) {
      var msgId = d.key.split('/')[1];
      var receipt = d.value;
      var converted = false;
      if (receipt.currency !== userCurrency) {
        if(forex) {
          converted = true;
          fx.rates = forex.rates;
          fx.base = forex.base;
          receipt.total = fx(receipt.total).from(receipt.currency).to(userCurrency).toFixed(2);
        }
        else {
          console.error('CURRENCY: No fx info available, skipping receipt: ', receipt.key);
          continue;
        }
      }
      total += parseFloat(receipt.total);
      // Emits converted receipt
      var year = moment.utc(parseInt(day)).year();
      var month = moment.utc(parseInt(day)).startOf('month').valueOf();
      var key = month + '/' + year + '/' + msgId;
      var convertedReceipt = { currency: userCurrency, total: receipt.total, company: receipt.company, converted: converted, month: month };
      ret.push({ name: 'convertedreceipts', key: key, value: convertedReceipt });
      // Emits _email.tid info
      ret.push({ name: 'tidList', key: receipt.threadId, value: { list: convertedReceipt, detail: convertedReceipt } });
    }
    // Emit totals for the day
    ret.push({ name: 'day', key: day, value: { currency: userCurrency, total: total } });
    return ret;
  }
};
