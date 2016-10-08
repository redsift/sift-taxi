/**
 * sift-taxi: frontend view entry point.
 *
 * Copyright (c) 2016 Redsift Limited
 */

import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import moment from 'moment/moment';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { diagonals, patterns, presentation10 } from '@redsift/d3-rs-theme';
import { html as lines } from '@redsift/d3-rs-lines';
import { html as pies } from '@redsift/d3-rs-pies';
import tingle from 'tingle.js';
import Webhook from './lib/webhook';
import '@redsift/ui-rs-hero';
import oxrCurrencies from './oxr-currencies.json';
import oxrSymbols from './oxr-symbols.json';

export default class TaxiSift extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();

    // Stores the currently displayed data so view can be reflown during transitions
    this._model = null;
    this._sizeClass = null;

    this._pie = null;
    this._stack = null;

    this._currency = 'GBP';

    this._webhooks = [];

    this.fill = {
      uber: {
        color: presentation10.standard[presentation10.names.blue],
        pattern: this._getPattern(presentation10.names.blue)
      },
      hailo: {
        color: presentation10.standard[presentation10.names.yellow],
        pattern: this._getPattern(presentation10.names.yellow)
      },
      addisonlee: {
        color: presentation10.standard[presentation10.names.grey],
        pattern: this._getPattern(presentation10.names.grey)
      }
    };

    // TODO: remove once the build pipeline is fixed
    transition();

    // We subscribe to 'storageupdate' updates from the Controller
    this.controller.subscribe('storageupdate', this.onStorageUpdate.bind(this));

    // The SiftView provides lifecycle methods for when the Sift is fully loaded into the DOM (onLoad)
    // NOTE: the registration of these methods will be handled in the SiftView base class and do not have to be
    // called by the developer manually in the next version.
    this.registerOnLoadHandler(this.onLoad.bind(this)); // FIXXME: expose as 'onLoad'
  }

  onLoad() {
    let currencySelect = document.getElementById('currency-select');
    Object.keys(oxrCurrencies).forEach((c) => {
      let option = document.createElement('option');
      option.value = c;
      option.text = c + '  (' + oxrCurrencies[c] + ')';
      currencySelect.appendChild(option);
    });
    currencySelect.onchange = this._onCurrency.bind(this);
    document.getElementById('help').onclick = this._onHelp.bind(this);
    document.getElementById('enable-conversion').onclick = this._onEnableCurrencyConversion.bind(this);
  }

  _onCurrency(ev) {
    this._webhooks['settings'].send('currency', ev.target.value).catch((e) => {
      console.error('sift-taxi: _onCurrency: error sending webhook: ', e);
    });
  }

  _createWebhooks(whUrls) {
    Object.keys(whUrls).forEach((k) => {
      this._webhooks[k] = new Webhook(whUrls[k]);
    });
  }

  /**
   * Handles storageupdate events
   * @param data - the new view data
   */
  onStorageUpdate(update) {
    this._model.data = update.data;
    this._model.config = update.config;
    this._currency = this._model.config.currency || this._currency;
    this._updateSubtitles(this._model.data.lines.length);
    this._updateStats(this._model.data.stats);
    this._updateCharts(this._model.data, this._sizeClass);
    this._updateCurrencyConversion(this._model.config.oxrappid, this._currency);
  }

  // TODO: docs link
  presentView(value) {
    this._sizeClass = value.sizeClass.current;
    if (value.data) {
      this._model = value.data;
      this._currency = this._model.config.currency || this._currency;
      this._createWebhooks(this._model.webhooks);
      this._updateSubtitles(this._model.data.lines.length);
      this._updateCurrencyConversion(this._model.config.oxrappid, this._currency);
      this._updateSections(this._sizeClass);
      this._updateStats(this._model.data.stats);
      this._updateCharts(this._model.data, this._sizeClass);
    }
  }

  // TODO: docs link
  willPresentView(value) {}

  /**
   * Updates the stack and pie charts
   * @params data - the data to display
   * @params scw - the current size class
   */
  _updateCharts(data, sc) {
    this._callChart('#chart',
      this._stack,
      data.lines,
      sc);
    this._callChart('#pie',
      this._pie,
      data.pie,
      sc);
  }

  /**
   * Renders a chart or transitions an existing one
   * @params tr - whether or not to transition
   * @id - the chart div id
   * @data - the data to display
   * @chart - the chart to call
   */
  _callChart(id, chart, data, sc) {
    let margin = 26;
    let height = 300;
    let legends = {
      stack: ['Uber', null, 'Hailo', null, 'Addison Lee', null],
      pie: ['U', 'H', 'A']
    }
    if (sc.width === 230) {
      height = 200;
      margin = 13;
      legends.stack = ['U', null, 'H', null, 'A', null];
      legends.pie = ['U', 'H', 'A'];
    }
    if (sc.height === 230) {
      height = 200;
    }
    let width = document.getElementById('journeys-period').clientWidth - (2 * margin);
    let chartContainer = select(id).datum(data);
    if (chart) {
      chartContainer.transition().call(this._getChart(id, width, height, margin, legends));
    }
    else {
      chartContainer.call(this._getChart(id, width, height, margin, legends))
        .select('svg')
        .call(this.fill.uber.pattern)
        .call(this.fill.hailo.pattern)
        .call(this.fill.addisonlee.pattern);
    }
  }

  /**
   * Updates the sections visibility based on the current Sift container height
   * @param height - the height class size
   */
  _updateSections(sizeClass) {
    let show = 'none';
    if (!sizeClass.height || sizeClass.height === 520) {
      show = '';
    }
    document.getElementById('currency-conversion').style.display = (sizeClass.width === 230) ? 'none' : show;
    document.getElementById('stats-period').style.display = show;
    document.getElementById('companies-period').style.display = show;
    document.getElementById('totals').style.display = show;
  }

  /**
   * Updates the currency selector
   * @param code - the currency 3-letter code
   */
  _updateCurrencyConversion(show, selection) {
    document.getElementById('currency-setup').style.display = show?'none':'';
    document.getElementById('currency-selection').style.display = show?'':'none';
    document.getElementById('currency-select').value = selection;
  }

  /**
   * Updates the subtitles with the number of months being displayed
   * @param months - number of months being displayed
   */
  _updateSubtitles(months) {
    let subt = 'last ' + months + ' months';
    document.getElementById('subtitle-journeys').textContent = subt +  ' (' + this._currency + ')';
    document.getElementById('subtitle-stats').textContent = subt;
    document.getElementById('subtitle-companies').textContent = subt;
    document.getElementById('subtitle-totals').textContent = '(' + this._currency + ')';
  }

  /**
   * Updates the taxi stats
   * @param stats - the stats
   */
  _updateStats(stats) {
    // Stats section
    if (stats.trips) {
      document.getElementById('trips-period').textContent = '' + stats.trips;
    }
    if (stats.average) {
      document.getElementById('averageprice-period').textContent = this._currencyFormatter(stats.average);
    }
    if (stats.total) {
      document.getElementById('totalspend-period').textContent = this._currencyFormatter(stats.total);
    }
    // Totals section
    if (stats.ytd) {
      document.getElementById('ytd').textContent = this._currencyFormatter(stats.ytd);
      if (stats.mtd) {
        document.getElementById('monthtotal').textContent = this._currencyFormatter(stats.mtd);
        document.getElementById('mtd').textContent = this._currencyFormatter(stats.mtd);
      }
      if (stats.today) {
        document.getElementById('today').textContent = this._currencyFormatter(stats.today);
      }
    }
    else {
      // If no spend in ytd, hide the section
      document.getElementById('totals').style.display = 'none';
    }
  }

  _getChart(id, width, height, margin, legends) {
    switch (id) {
      case '#chart':
        return this._getStackChart(width, height, margin, legends.stack);
      case '#pie':
        return this._getPieChart(width, height, margin, legends.pie);
    }
  }

  /**
   * Gets a stacked line chart with the provided customizations
   * @param width - chart width
   * @param height - chart height
   * @param legend - legend for the data series
   * @return {d3} - a d3 chart
   */
  _getStackChart(width, height, margin, legend) {
    if (!this._stack) {
      // Create a base one if one doesn't already exist
      this._stack = lines('stacked')
        .tickCountIndex('utcMonth')
        .labelTime('multi')
        .fill([
          this.fill.uber.color,
          this.fill.uber.pattern.url(),
          this.fill.hailo.color,
          this.fill.hailo.pattern.url(),
          this.fill.addisonlee.color,
          this.fill.addisonlee.pattern.url()])
        .niceIndex(false)
        .stacked(true)
        .animation('value')
        .curve('curveStep')
        .tipHtml((d, i, s) => {
          if (s < 0) return;
          return this._currencyFormatter(d.v[s], null, true);
        })
        .tickDisplayValue((d) => {
          return this._currencyFormatter(d, 4);
        })
        .tickDisplayIndex((d) => {
          var m = moment(d);
          if (m.month() === 0) {
            return '\'' + m.format('YY');
          }
          else {
            return m.format('MMM');
          }
        });
    }
    return this._stack.width(width).height(height).legend(legend).margin(margin);
  }

  _currencyFormatter(num, limit, literal) {
    let rd = num;
    let postfix = '';
    if(num === 0) {
      return num;
    }
    else if(num >= 1000000 && !literal) {
      rd = (num/1000000).toFixed(1);
      postfix = 'M';
    }
    else if(num >= 1000 && !literal) {
      rd = (num/1000).toFixed(1);
      postfix = 'k';
    }
    else {
      rd = rd.toFixed(0);
    }
    if(limit && (rd.length + oxrSymbols[this._currency].length) > limit) {
      return rd + postfix;
    }
    else {
      return oxrSymbols[this._currency] + rd + postfix;
    }
  }

  /**
   * Gets a pie chart with the provided customizations
   * @param width - chart width
   * @param height - chart height
   * @param legend - legend for the data series
   * @return {d3} - a d3 chart
   */
  _getPieChart(width, height, margin, legend) {
    if (!this._pie) {
      // Create a base one if one doesn't already exist
      this._pie = pies()
        .fill([
          this.fill.uber.color,
          this.fill.hailo.color,
          this.fill.addisonlee.color])
        .displayValue((v) => { return (100 * v / this._model.data.stats.total).toFixed(0) + '%'; });
    }
    return this._pie.width(width).height(height).outerRadius(height / 3).legend(legend).margin(margin);
  }

  _getPattern(color) {
    let p = diagonals('highlight-fill-' + color, patterns.diagonal1);
    p.foreground(presentation10.lighter[color]);
    p.background(presentation10.darker[color]);
    return p;
  }

  _onEnableCurrencyConversion(ev) {
    ev.preventDefault();
    let conversion = new tingle.modal({
      footer: true,
      stickyFooter: true
    });
    conversion.setContent(
      '<div class="popup">' +
      '<h2>Currency Conversion</h2>' +
      '<p>When you enable currency conversion this Sift will convert receipts in foreign currency to your local currency. It will also allow you to change your local currency and view you spend converted to that currency.</p>' +
      '<p>This service is powered by Open Exchange Rates and you can sign up for a free key <a href="https://openexchangerates.org/signup/free" target="_blank">here</a></p>' +
      '<p>Once you complete your sign up you will get an App ID from Open Exchange Rates similar to this one:</p>' +
      '<img src="assets/oxr-screenshot.png" style="width: 80%" />' +
      '<p>To enable currency conversion, enter your App ID: <input id="oxr-app-id" autofocus></input></p>' +
      '</div>');
    let oxrAppId = document.getElementById('oxr-app-id');
    oxrAppId.addEventListener('input', (ev) => {
      if (ev.target.value.length === 32) {
        document.querySelector('.oxr--next').disabled = false;
      }
      else {
        document.querySelector('.oxr--next').disabled = true;
      }
    });
    conversion.addFooterBtn('Submit', 'rs-btn--green oxr--next', () => {
      this._webhooks['settings'].send('oxrappid', oxrAppId.value).then(() => {
        conversion.close();
      });
    });
    document.querySelector('.oxr--next').disabled = true;
    conversion.open();
  }

  _onHelp(ev) {
    ev.preventDefault();
    let help = new tingle.modal();
    help.setContent(
      '<div class="popup">' +
      '<h2>The Taxi Sift</h2>' +
      '<p>This Sift gives you an insightful view on your monthly taxi spend.</p>' +
      '<p>It currently supports Uber, Hailo and Addison Lee receipts.</p>' +
      '<h2>Getting started</h2>' +
      '<p>There nothing that you need to do, if you have taxi receipts in your inbox it will find them and compute your spend.</p>' +
      '<p>If you have receipts in other currencies than your home currency, you can enable currency conversion to get those calculated. You can also choose to see your totals in other currencies.</p>' +
      '<h2>Improve this Sift</h2>' +
      '<p>Found an issue with this Sift or have a suggestion? Report it <a href="https://github.com/redsift/sift-taxi/issues" target="_blank">here</a> or, if you have no idea what Github is, you can send an email to <a href="mailto:sift-taxi@redsift.com">sift-taxi@redsift.com</a></p>' +
      '<p>Are you a developer? Want to contribute? We love pull requests.</p>' +
      '<p>Want to customize this Sift for your own functionality? <a href="https://redsift.com" target="_blank">Sign up</a> for free and become a Red Sift developer, <a href="https://github.com/redsift/sift-taxi" target="_blank">fork this Sift</a> (or create a new one), run it and share it with the world.</p>' +
      '</div>');
    help.open();
  }
}

registerSiftView(new TaxiSift(window));
