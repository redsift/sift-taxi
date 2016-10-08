/**
 * sift-taxi: frontend controller entry point.
 *
 * Copyright (c) 2016 Redsift Limited
 */

import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';
import moment from 'moment/moment';

export default class TaxiController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._sizeClass = null;
    this._detail = null;
    this.highlightIndexes = {
      uber: 1,
      hailo: 3,
      addisonlee: 5
    };
    // Bind this to method so it can be used in callbacks
    this.onStorageUpdate = this.onStorageUpdate.bind(this);
  }

  // TODO: Docs link
  loadView(state) {
    this._sizeClass = state.sizeClass.current;
    if (state.params && state.params.detail) {
      this._detail = state.params.detail;
    }
    this.storage.subscribe(['year', 'month', 'day', 'config'], this.onStorageUpdate);
    let p = [];
    p.push(this.storage.get({ bucket: '_redsift', keys: ['webhooks/settings-wh'] }));
    p.push(this.getData(this._detail));
    p.push(this.getConfig());
    return {
      html: "view.html",
      data: Promise.all(p).then((results) => {
        return {
          webhooks: {
            settings: results[0][0].value,
          },
          data: results[1],
          config: results[2]
        };
      })
    }
  }

  onStorageUpdate(value) {
    let ps = [];
    ps.push(this.getData(this._detail));
    ps.push(this.getConfig());
    Promise.all(ps).then((results) => {
      this.publish('storageupdate', { data: results[0], config: results[1] });
    });
  }

  getData(details) {
    let ps = [];
    ps.push(this._getMonthData(details));
    ps.push(this._getYTDData());
    ps.push(this._getTodayData());
    return Promise.all(ps).then((results) => {
      let ret = results[0];
      ret.stats.ytd = results[1];
      ret.stats.today = results[2];
      return ret;
    });
  }

  getConfig() {
    return this.storage.getAll({
      bucket: 'config'
    }).then((results) => {
      let ret = {};
      results.forEach((r) => {
        ret[r.key] = r.value;
      });
      return ret;
    });
  }

  _getTodayData() {
    return this.storage.get({
      bucket: 'day',
      keys: [moment().utc().startOf('day').valueOf().toString()]
    }).then((result) => {
      if (result[0].value) {
        return JSON.parse(result[0].value).total;
      }
    });
  }

  _getYTDData() {
    return this.storage.get({
      bucket: 'year',
      keys: ['' + moment().year()]
    }).then((result) => {
      if (result[0].value) {
        return JSON.parse(result[0].value).total;
      }
    });
  }

  _getMonthData(details) {
    let cKeys = this._getChartKeys(this._sizeClass.width, details);
    return this.storage.get({ bucket: 'month', keys: cKeys }).then((results) => {
      let stats = { trips: 0, total: 0, average: 0 };
      let pt = [0.0, 0.0, 0.0];
      let lines = results.map((r) => {
        let k = parseInt(r.key);
        let ms = { l: k, v: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0] };
        if (r.value) {
          let jval = JSON.parse(r.value);
          jval.companies.forEach((v, i) => {
            let o = (i === 0) ? 0 : 2;
            ms.v[o * i] += v;
            pt[i] += v;
          });
          stats.trips += jval.trips;
          stats.total += jval.total;
          if (k === moment().utc().startOf('month').valueOf()) {
            stats.mtd = jval.total;
          }
        }
        if (details && details.month === k) {
          ms.v[this.highlightIndexes[details.company]] = parseInt(details.total);
        }
        return ms;
      });
      if (stats.trips > 0) {
        stats.average = stats.total / stats.trips;
      }
      let ret = {
        lines: lines,
        pie: pt,
        stats: stats
      };
      if (details) {
        ret.hcompany = details.company;
      }
      return ret;
    });
  }

  _getChartKeys(width, details) {
    let num = 6;
    if (!width || width === 480) {
      num = 12;
    }
    let chartKeys = [];
    for (let i = 0; i < num; i++) {
      if (details) {
        chartKeys.unshift(moment.utc(parseInt(details.month)).subtract(i, 'months').valueOf().toString());
      }
      else {
        chartKeys.unshift(moment().utc().startOf('month').subtract(i, 'months').valueOf().toString());
      }
    }
    return chartKeys;
  }
}

registerSiftController(new TaxiController());
