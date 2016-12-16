/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _siftSdkWeb = __webpack_require__(8);
	
	var _moment = __webpack_require__(9);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _d3Selection = __webpack_require__(120);
	
	var _d3Transition = __webpack_require__(121);
	
	var _d3RsTheme = __webpack_require__(127);
	
	var _d3RsLines = __webpack_require__(128);
	
	var _d3RsPies = __webpack_require__(129);
	
	var _tingle = __webpack_require__(132);
	
	var _tingle2 = _interopRequireDefault(_tingle);
	
	var _webhook = __webpack_require__(133);
	
	var _webhook2 = _interopRequireDefault(_webhook);
	
	__webpack_require__(134);
	
	var _oxrCurrencies = __webpack_require__(135);
	
	var _oxrCurrencies2 = _interopRequireDefault(_oxrCurrencies);
	
	var _oxrSymbols = __webpack_require__(136);
	
	var _oxrSymbols2 = _interopRequireDefault(_oxrSymbols);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * sift-taxi: frontend view entry point.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 Redsift Limited
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var TaxiSift = function (_SiftView) {
	  _inherits(TaxiSift, _SiftView);
	
	  function TaxiSift() {
	    _classCallCheck(this, TaxiSift);
	
	    // Stores the currently displayed data so view can be reflown during transitions
	    var _this = _possibleConstructorReturn(this, (TaxiSift.__proto__ || Object.getPrototypeOf(TaxiSift)).call(this));
	    // You have to call the super() method to initialize the base class.
	
	
	    _this._model = null;
	    _this._sizeClass = null;
	
	    _this._pie = null;
	    _this._stack = null;
	
	    _this._currency = 'GBP';
	
	    _this._webhooks = [];
	
	    _this.fill = {
	      uber: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.blue],
	        pattern: _this._getPattern(_d3RsTheme.presentation10.names.blue)
	      },
	      hailo: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.yellow],
	        pattern: _this._getPattern(_d3RsTheme.presentation10.names.yellow)
	      },
	      addisonlee: {
	        color: _d3RsTheme.presentation10.standard[_d3RsTheme.presentation10.names.grey],
	        pattern: _this._getPattern(_d3RsTheme.presentation10.names.grey)
	      }
	    };
	
	    // TODO: remove once the build pipeline is fixed
	    (0, _d3Transition.transition)();
	
	    // We subscribe to 'storageupdate' updates from the Controller
	    _this.controller.subscribe('storageupdate', _this.onStorageUpdate.bind(_this));
	
	    // The SiftView provides lifecycle methods for when the Sift is fully loaded into the DOM (onLoad)
	    // NOTE: the registration of these methods will be handled in the SiftView base class and do not have to be
	    // called by the developer manually in the next version.
	    _this.registerOnLoadHandler(_this.onLoad.bind(_this)); // FIXXME: expose as 'onLoad'
	    return _this;
	  }
	
	  _createClass(TaxiSift, [{
	    key: 'onLoad',
	    value: function onLoad() {
	      var currencySelect = document.getElementById('currency-select');
	      Object.keys(_oxrCurrencies2.default).forEach(function (c) {
	        var option = document.createElement('option');
	        option.value = c;
	        option.text = c + '  (' + _oxrCurrencies2.default[c] + ')';
	        currencySelect.appendChild(option);
	      });
	      currencySelect.onchange = this._onCurrency.bind(this);
	      document.getElementById('help').onclick = this._onHelp.bind(this);
	      document.getElementById('enable-conversion').onclick = this._onEnableCurrencyConversion.bind(this);
	    }
	  }, {
	    key: '_onCurrency',
	    value: function _onCurrency(ev) {
	      this._webhooks['settings'].send('currency', ev.target.value).catch(function (e) {
	        console.error('sift-taxi: _onCurrency: error sending webhook: ', e);
	      });
	    }
	  }, {
	    key: '_createWebhooks',
	    value: function _createWebhooks(whUrls) {
	      var _this2 = this;
	
	      Object.keys(whUrls).forEach(function (k) {
	        _this2._webhooks[k] = new _webhook2.default(whUrls[k]);
	      });
	    }
	
	    /**
	     * Handles storageupdate events
	     * @param data - the new view data
	     */
	
	  }, {
	    key: 'onStorageUpdate',
	    value: function onStorageUpdate(update) {
	      this._model.data = update.data;
	      this._model.config = update.config;
	      this._currency = this._model.config.currency || this._currency;
	      this._updateSubtitles(this._model.data.lines.length);
	      this._updateStats(this._model.data.stats);
	      this._updateCharts(this._model.data, this._sizeClass);
	      this._updateCurrencyConversion(this._model.config.oxrappid, this._currency);
	    }
	
	    // TODO: docs link
	
	  }, {
	    key: 'presentView',
	    value: function presentView(value) {
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
	
	  }, {
	    key: 'willPresentView',
	    value: function willPresentView(value) {}
	
	    /**
	     * Updates the stack and pie charts
	     * @params data - the data to display
	     * @params scw - the current size class
	     */
	
	  }, {
	    key: '_updateCharts',
	    value: function _updateCharts(data, sc) {
	      this._callChart('#chart', this._stack, data.lines, sc);
	      this._callChart('#pie', this._pie, data.pie, sc);
	    }
	
	    /**
	     * Renders a chart or transitions an existing one
	     * @params tr - whether or not to transition
	     * @id - the chart div id
	     * @data - the data to display
	     * @chart - the chart to call
	     */
	
	  }, {
	    key: '_callChart',
	    value: function _callChart(id, chart, data, sc) {
	      var margin = 26;
	      var height = 300;
	      var legends = {
	        stack: ['Uber', null, 'Hailo', null, 'Addison Lee', null],
	        pie: ['U', 'H', 'A']
	      };
	      if (sc.width === 230) {
	        height = 200;
	        margin = 13;
	        legends.stack = ['U', null, 'H', null, 'A', null];
	        legends.pie = ['U', 'H', 'A'];
	      }
	      if (sc.height === 230) {
	        height = 200;
	      }
	      var width = document.getElementById('journeys-period').clientWidth - 2 * margin;
	      var chartContainer = (0, _d3Selection.select)(id).datum(data);
	      if (chart) {
	        chartContainer.transition().call(this._getChart(id, width, height, margin, legends));
	      } else {
	        chartContainer.call(this._getChart(id, width, height, margin, legends)).select('svg').call(this.fill.uber.pattern).call(this.fill.hailo.pattern).call(this.fill.addisonlee.pattern);
	      }
	    }
	
	    /**
	     * Updates the sections visibility based on the current Sift container height
	     * @param height - the height class size
	     */
	
	  }, {
	    key: '_updateSections',
	    value: function _updateSections(sizeClass) {
	      var show = 'none';
	      if (!sizeClass.height || sizeClass.height === 520) {
	        show = '';
	      }
	      document.getElementById('currency-conversion').style.display = sizeClass.width === 230 ? 'none' : show;
	      document.getElementById('stats-period').style.display = show;
	      document.getElementById('companies-period').style.display = show;
	      document.getElementById('totals').style.display = show;
	    }
	
	    /**
	     * Updates the currency selector
	     * @param code - the currency 3-letter code
	     */
	
	  }, {
	    key: '_updateCurrencyConversion',
	    value: function _updateCurrencyConversion(show, selection) {
	      document.getElementById('currency-setup').style.display = show ? 'none' : '';
	      document.getElementById('currency-selection').style.display = show ? '' : 'none';
	      document.getElementById('currency-select').value = selection;
	    }
	
	    /**
	     * Updates the subtitles with the number of months being displayed
	     * @param months - number of months being displayed
	     */
	
	  }, {
	    key: '_updateSubtitles',
	    value: function _updateSubtitles(months) {
	      var subt = 'last ' + months + ' months';
	      document.getElementById('subtitle-journeys').textContent = subt + ' (' + this._currency + ')';
	      document.getElementById('subtitle-stats').textContent = subt;
	      document.getElementById('subtitle-companies').textContent = subt;
	      document.getElementById('subtitle-totals').textContent = '(' + this._currency + ')';
	    }
	
	    /**
	     * Updates the taxi stats
	     * @param stats - the stats
	     */
	
	  }, {
	    key: '_updateStats',
	    value: function _updateStats(stats) {
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
	      } else {
	        // If no spend in ytd, hide the section
	        document.getElementById('totals').style.display = 'none';
	      }
	    }
	  }, {
	    key: '_getChart',
	    value: function _getChart(id, width, height, margin, legends) {
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
	
	  }, {
	    key: '_getStackChart',
	    value: function _getStackChart(width, height, margin, legend) {
	      var _this3 = this;
	
	      if (!this._stack) {
	        // Create a base one if one doesn't already exist
	        this._stack = (0, _d3RsLines.html)('stacked').tickCountIndex('utcMonth').labelTime('multi').fill([this.fill.uber.color, this.fill.uber.pattern.url(), this.fill.hailo.color, this.fill.hailo.pattern.url(), this.fill.addisonlee.color, this.fill.addisonlee.pattern.url()]).niceIndex(false).stacked(true).animation('value').curve('curveStep').tipHtml(function (d, i, s) {
	          if (s < 0) return;
	          return _this3._currencyFormatter(d.v[s], null, true);
	        }).tickDisplayValue(function (d) {
	          return _this3._currencyFormatter(d, 4);
	        }).tickDisplayIndex(function (d) {
	          var m = (0, _moment2.default)(d);
	          if (m.month() === 0) {
	            return '\'' + m.format('YY');
	          } else {
	            return m.format('MMM');
	          }
	        });
	      }
	      return this._stack.width(width).height(height).legend(legend).margin(margin);
	    }
	  }, {
	    key: '_currencyFormatter',
	    value: function _currencyFormatter(num, limit, literal) {
	      var rd = num;
	      var postfix = '';
	      if (num === 0) {
	        return num;
	      } else if (num >= 1000000 && !literal) {
	        rd = (num / 1000000).toFixed(1);
	        postfix = 'M';
	      } else if (num >= 1000 && !literal) {
	        rd = (num / 1000).toFixed(1);
	        postfix = 'k';
	      } else {
	        rd = rd.toFixed(0);
	      }
	      if (limit && rd.length + _oxrSymbols2.default[this._currency].length > limit) {
	        return rd + postfix;
	      } else {
	        return _oxrSymbols2.default[this._currency] + rd + postfix;
	      }
	    }
	
	    /**
	     * Gets a pie chart with the provided customizations
	     * @param width - chart width
	     * @param height - chart height
	     * @param legend - legend for the data series
	     * @return {d3} - a d3 chart
	     */
	
	  }, {
	    key: '_getPieChart',
	    value: function _getPieChart(width, height, margin, legend) {
	      var _this4 = this;
	
	      if (!this._pie) {
	        // Create a base one if one doesn't already exist
	        this._pie = (0, _d3RsPies.html)().fill([this.fill.uber.color, this.fill.hailo.color, this.fill.addisonlee.color]).displayValue(function (v) {
	          return (100 * v / _this4._model.data.stats.total).toFixed(0) + '%';
	        });
	      }
	      return this._pie.width(width).height(height).outerRadius(height / 3).legend(legend).margin(margin);
	    }
	  }, {
	    key: '_getPattern',
	    value: function _getPattern(color) {
	      var p = (0, _d3RsTheme.diagonals)('highlight-fill-' + color, _d3RsTheme.patterns.diagonal1);
	      p.foreground(_d3RsTheme.presentation10.lighter[color]);
	      p.background(_d3RsTheme.presentation10.darker[color]);
	      return p;
	    }
	  }, {
	    key: '_onEnableCurrencyConversion',
	    value: function _onEnableCurrencyConversion(ev) {
	      var _this5 = this;
	
	      ev.preventDefault();
	      var conversion = new _tingle2.default.modal({
	        footer: true,
	        stickyFooter: true
	      });
	      conversion.setContent('<div class="popup">' + '<h2>Currency Conversion</h2>' + '<p>When you enable currency conversion this Sift will convert receipts in foreign currency to your local currency. It will also allow you to change your local currency and view you spend converted to that currency.</p>' + '<p>This service is powered by Open Exchange Rates and you can sign up for a free key <a href="https://openexchangerates.org/signup/free" target="_blank">here</a></p>' + '<p>Once you complete your sign up you will get an App ID from Open Exchange Rates similar to this one:</p>' + '<img src="assets/oxr-screenshot.png" style="width: 80%" />' + '<p>To enable currency conversion, enter your App ID: <input id="oxr-app-id" autofocus></input></p>' + '</div>');
	      var oxrAppId = document.getElementById('oxr-app-id');
	      oxrAppId.addEventListener('input', function (ev) {
	        if (ev.target.value.length === 32) {
	          document.querySelector('.oxr--next').disabled = false;
	        } else {
	          document.querySelector('.oxr--next').disabled = true;
	        }
	      });
	      conversion.addFooterBtn('Submit', 'rs-btn--green oxr--next', function () {
	        _this5._webhooks['settings'].send('oxrappid', oxrAppId.value).then(function () {
	          conversion.close();
	        });
	      });
	      document.querySelector('.oxr--next').disabled = true;
	      conversion.open();
	    }
	  }, {
	    key: '_onHelp',
	    value: function _onHelp(ev) {
	      ev.preventDefault();
	      var help = new _tingle2.default.modal();
	      help.setContent('<div class="popup">' + '<h2>The Taxi Sift</h2>' + '<p>This Sift gives you an insightful view on your monthly taxi spend.</p>' + '<p>It currently supports Uber, Hailo and Addison Lee receipts.</p>' + '<h2>Getting started</h2>' + '<p>There nothing that you need to do, if you have taxi receipts in your inbox it will find them and compute your spend.</p>' + '<p>If you have receipts in other currencies than your home currency, you can enable currency conversion to get those calculated. You can also choose to see your totals in other currencies.</p>' + '<h2>Improve this Sift</h2>' + '<p>Found an issue with this Sift or have a suggestion? Report it <a href="https://github.com/redsift/sift-taxi/issues" target="_blank">here</a> or, if you have no idea what Github is, you can send an email to <a href="mailto:sift-taxi@redsift.com">sift-taxi@redsift.com</a></p>' + '<p>Are you a developer? Want to contribute? We love pull requests.</p>' + '<p>Want to customize this Sift for your own functionality? <a href="https://redsift.com" target="_blank">Sign up</a> for free and become a Red Sift developer, <a href="https://github.com/redsift/sift-taxi" target="_blank">fork this Sift</a> (or create a new one), run it and share it with the world.</p>' + '</div>');
	      help.open();
	    }
	  }]);
	
	  return TaxiSift;
	}(_siftSdkWeb.SiftView);
	
	exports.default = TaxiSift;
	
	
	(0, _siftSdkWeb.registerSiftView)(new TaxiSift(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(2)
	var assert = __webpack_require__(6)
	var now = __webpack_require__(7)
	
	var slice = Array.prototype.slice
	var console
	var times = {}
	
	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}
	
	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]
	
	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]
	
	    if (!console[name]) {
	        console[name] = f
	    }
	}
	
	module.exports = console
	
	function log() {}
	
	function info() {
	    console.log.apply(console, arguments)
	}
	
	function warn() {
	    console.log.apply(console, arguments)
	}
	
	function error() {
	    console.warn.apply(console, arguments)
	}
	
	function time(label) {
	    times[label] = now()
	}
	
	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }
	
	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}
	
	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}
	
	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}
	
	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(4);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3), __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(2);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, console) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.Redsift = global.Redsift || {})));
	}(this, (function (exports) { 'use strict';
	
	var EmailClientController = function EmailClientController() {
	  this._proxy = self;
	  this._registerMessageListeners();
	};
	
	EmailClientController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if(!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[EmailClientController::onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	EmailClientController.prototype._emailStats = function _emailStats (stats) {
	  if(this.onstats) {
	    this.onstats(stats.name, stats.value);
	  }
	};
	
	EmailClientController.prototype._getThreadRowDisplayInfo = function _getThreadRowDisplayInfo (params) {
	    var this$1 = this;
	
	  // console.log('[EmailClientController::_getThreadRowDisplayInfo]: ', params);
	  var trdis = {};
	  params.tris.forEach(function (thread) {
	    if (thread.value !== undefined && thread.value.list !== undefined && this$1.loadThreadListView) {
	      trdis[thread.key] = this$1.loadThreadListView(thread.value.list, params.supportedTemplates);
	    }
	  });
	  // Notify the client
	  this._proxy.postMessage({
	    method: 'getThreadRowDisplayInfoCallback',
	    params: trdis
	  });
	};
	
	/**
	 * Observable pattern implementation.
	 * Supports topics as String or an Array.
	 */
	var Observable = function Observable() {
	  this._observers = [];
	};
	
	Observable.prototype.subscribe = function subscribe (topic, observer) {
	  this._op('_sub', topic, observer);
	};
	
	Observable.prototype.unsubscribe = function unsubscribe (topic, observer) {
	  this._op('_unsub', topic, observer);
	};
	
	Observable.prototype.unsubscribeAll = function unsubscribeAll (topic) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  delete this._observers[topic];
	};
	
	Observable.prototype.publish = function publish (topic, message) {
	  this._op('_pub', topic, message);
	};
	
	/**
	 * Internal methods
	 */
	Observable.prototype._op = function _op (op, topic, value) {
	    var this$1 = this;
	
	  if (Array.isArray(topic)) {
	    topic.forEach(function (t) {
	      this$1[op](t, value);
	    });
	  }
	  else {
	    this[op](topic, value);
	  }
	};
	
	Observable.prototype._sub = function _sub (topic, observer) {
	  this._observers[topic] || (this._observers[topic] = []);
	  if(observer && this._observers[topic].indexOf(observer) === -1) {
	    this._observers[topic].push(observer);
	  }
	};
	
	Observable.prototype._unsub = function _unsub (topic, observer) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  var index = this._observers[topic].indexOf(observer);
	  if (~index) {
	    this._observers[topic].splice(index, 1);
	  }
	};
	
	Observable.prototype._pub = function _pub (topic, message) {
	    var this$1 = this;
	
	  if (!this._observers[topic]) {
	    return;
	  }
	  for (var i = this._observers[topic].length - 1; i >= 0; i--) {
	    this$1._observers[topic][i](message)
	  }
	};
	
	var EmailClient = (function (Observable) {
	  function EmailClient(proxy) {
	    Observable.call(this);
	    this._proxy = proxy;
	  }
	
	  if ( Observable ) EmailClient.__proto__ = Observable;
	  EmailClient.prototype = Object.create( Observable && Observable.prototype );
	  EmailClient.prototype.constructor = EmailClient;
	
	  EmailClient.prototype.goto = function goto (params) {
	    this._postMessage('goto', params);
	  };
	
	  EmailClient.prototype.close = function close () {
	    this._postMessage('close');
	  };
	
	  EmailClient.prototype._postMessage = function _postMessage (topic, value) {
	    this._proxy.postMessage({
	      method: 'notifyClient',
	      params: {
	        topic: topic,
	        value: value
	      }
	    });
	  };
	
	  return EmailClient;
	}(Observable));
	
	var SiftStorage = (function (Observable) {
	  function SiftStorage() {
	    Observable.call(this);
	    this._storage = null;
	  }
	
	  if ( Observable ) SiftStorage.__proto__ = Observable;
	  SiftStorage.prototype = Object.create( Observable && Observable.prototype );
	  SiftStorage.prototype.constructor = SiftStorage;
	
	  SiftStorage.prototype.init = function init (storage) {
	    this._storage = storage;
	  };
	
	  SiftStorage.prototype.get = function get (d) { return this._storage.get(d) };
	  SiftStorage.prototype.getIndexKeys = function getIndexKeys (d) { return this._storage.getIndexKeys(d) };
	  SiftStorage.prototype.getIndex = function getIndex (d) { return this._storage.getIndex(d) };
	  SiftStorage.prototype.getWithIndex = function getWithIndex (d) { return this._storage.getWithIndex(d) };
	  SiftStorage.prototype.getAllKeys = function getAllKeys (d) { return this._storage.getAllKeys(d) };
	  SiftStorage.prototype.getAll = function getAll (d) { return this._storage.getAll(d) };
	  SiftStorage.prototype.getUser = function getUser (d) { return this._storage.getUser(d) };
	  SiftStorage.prototype.putUser = function putUser (d) { return this._storage.putUser(d) };
	  SiftStorage.prototype.delUser = function delUser (d) { return this._storage.delUser(d) };
	
	  return SiftStorage;
	}(Observable));
	
	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}
	
	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}
	
	var loglevel = createCommonjsModule(function (module) {
	/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(commonjsGlobal, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";
	
	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }
	
	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }
	
	    // these private functions always need `this` to be set properly
	
	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }
	
	    function replaceLoggingMethods(level, loggerName) {
	        var this$1 = this;
	
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this$1[methodName] = (i < level) ?
	                noop :
	                this$1.methodFactory(methodName, level, loggerName);
	        }
	    }
	
	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }
	
	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];
	
	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }
	
	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
	
	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}
	
	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }
	
	      function getPersistedLevel() {
	          var storedLevel;
	
	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}
	
	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }
	
	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }
	
	          return storedLevel;
	      }
	
	      /*
	       *
	       * Public API
	       *
	       */
	
	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};
	
	      self.methodFactory = factory || defaultMethodFactory;
	
	      self.getLevel = function () {
	          return currentLevel;
	      };
	
	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };
	
	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };
	
	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };
	
	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };
	
	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }
	
	    /*
	     *
	     * Package-level API
	     *
	     */
	
	    var defaultLogger = new Logger();
	
	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }
	
	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };
	
	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }
	
	        return defaultLogger;
	    };
	
	    return defaultLogger;
	}));
	});
	
	var loglevel$1 = (loglevel && typeof loglevel === 'object' && 'default' in loglevel ? loglevel['default'] : loglevel);
	
	var index$2 = createCommonjsModule(function (module) {
	'use strict';
	var toString = Object.prototype.toString;
	
	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};
	});
	
	var require$$0$2 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);
	
	var index$1 = createCommonjsModule(function (module, exports) {
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = range;
	
	var _isPlainObj = require$$0$2;
	
	var _isPlainObj2 = _interopRequireDefault(_isPlainObj);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Parse `opts` to valid IDBKeyRange.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
	 *
	 * @param {Object} opts
	 * @return {IDBKeyRange}
	 */
	
	function range(opts) {
	  var IDBKeyRange = commonjsGlobal.IDBKeyRange || commonjsGlobal.webkitIDBKeyRange;
	  if (opts instanceof IDBKeyRange) return opts;
	  if (typeof opts === 'undefined' || opts === null) return null;
	  if (!(0, _isPlainObj2.default)(opts)) return IDBKeyRange.only(opts);
	  var keys = Object.keys(opts).sort();
	
	  if (keys.length === 1) {
	    var key = keys[0];
	    var val = opts[key];
	
	    switch (key) {
	      case 'eq':
	        return IDBKeyRange.only(val);
	      case 'gt':
	        return IDBKeyRange.lowerBound(val, true);
	      case 'lt':
	        return IDBKeyRange.upperBound(val, true);
	      case 'gte':
	        return IDBKeyRange.lowerBound(val);
	      case 'lte':
	        return IDBKeyRange.upperBound(val);
	      default:
	        throw new TypeError('"' + key + '" is not valid key');
	    }
	  } else {
	    var x = opts[keys[0]];
	    var y = opts[keys[1]];
	    var pattern = keys.join('-');
	
	    switch (pattern) {
	      case 'gt-lt':
	        return IDBKeyRange.bound(x, y, true, true);
	      case 'gt-lte':
	        return IDBKeyRange.bound(x, y, true, false);
	      case 'gte-lt':
	        return IDBKeyRange.bound(x, y, false, true);
	      case 'gte-lte':
	        return IDBKeyRange.bound(x, y, false, false);
	      default:
	        throw new TypeError('"' + pattern + '" are conflicted keys');
	    }
	  }
	}
	module.exports = exports['default'];
	});
	
	var require$$0$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);
	
	var idbIndex = createCommonjsModule(function (module) {
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Index`.
	 */
	
	module.exports = Index;
	
	/**
	 * Initialize new `Index`.
	 *
	 * @param {Store} store
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} opts { unique: false, multi: false }
	 */
	
	function Index(store, name, field, opts) {
	  this.store = store;
	  this.name = name;
	  this.field = field;
	  this.opts = opts;
	  this.multi = opts.multi || opts.multiEntry || false;
	  this.unique = opts.unique || false;
	}
	
	/**
	 * Get `key`.
	 *
	 * @param {Object|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.get = function(key, cb) {
	  var result = [];
	  var isUnique = this.unique;
	  var opts = { range: key, iterator: iterator };
	
	  this.cursor(opts, function(err) {
	    if (err) return cb(err);
	    isUnique ? cb(null, result[0]) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Count records by `key`.
	 *
	 * @param {String|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.count = function(key, cb) {
	  var name = this.store.name;
	  var indexName = this.name;
	
	  this.store.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var index = tr.objectStore(name).index(indexName);
	    var req = index.count(parseRange(key));
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Create cursor.
	 * Proxy to `this.store` for convinience.
	 *
	 * @param {Object} opts
	 * @param {Function} cb
	 */
	
	Index.prototype.cursor = function(opts, cb) {
	  opts.index = this.name;
	  this.store.cursor(opts, cb);
	};
	});
	
	var require$$0 = (idbIndex && typeof idbIndex === 'object' && 'default' in idbIndex ? idbIndex['default'] : idbIndex);
	
	var index$3 = createCommonjsModule(function (module) {
	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};
	});
	
	var require$$2 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);
	
	var idbStore = createCommonjsModule(function (module) {
	var type = require$$2;
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Store`.
	 */
	
	module.exports = Store;
	
	/**
	 * Initialize new `Store`.
	 *
	 * @param {String} name
	 * @param {Object} opts
	 */
	
	function Store(name, opts) {
	  this.db = null;
	  this.name = name;
	  this.indexes = {};
	  this.opts = opts;
	  this.key = opts.key || opts.keyPath || undefined;
	  this.increment = opts.increment || opts.autoIncretement || undefined;
	}
	
	/**
	 * Get index by `name`.
	 *
	 * @param {String} name
	 * @return {Index}
	 */
	
	Store.prototype.index = function(name) {
	  return this.indexes[name];
	};
	
	/**
	 * Put (create or replace) `key` to `val`.
	 *
	 * @param {String|Object} [key] is optional when store.key exists.
	 * @param {Any} val
	 * @param {Function} cb
	 */
	
	Store.prototype.put = function(key, val, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  if (keyPath) {
	    if (type(key) == 'object') {
	      cb = val;
	      val = key;
	      key = null;
	    } else {
	      val[keyPath] = key;
	    }
	  }
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = keyPath ? objectStore.put(val) : objectStore.put(val, key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb(null, req.result) };
	  });
	};
	
	/**
	 * Get `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.get = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.get(key);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Del `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.del = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.delete(key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Count.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.count = function(cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.count();
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Clear.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.clear = function(cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.clear();
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Perform batch operation.
	 *
	 * @param {Object} vals
	 * @param {Function} cb
	 */
	
	Store.prototype.batch = function(vals, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  var keys = Object.keys(vals);
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = tr.objectStore(name);
	    var current = 0;
	    tr.onerror = tr.onabort = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	    next();
	
	    function next() {
	      if (current >= keys.length) return;
	      var currentKey = keys[current];
	      var currentVal = vals[currentKey];
	      var req;
	
	      if (currentVal === null) {
	        req = store.delete(currentKey);
	      } else if (keyPath) {
	        if (!currentVal[keyPath]) currentVal[keyPath] = currentKey;
	        req = store.put(currentVal);
	      } else {
	        req = store.put(currentVal, currentKey);
	      }
	
	      req.onerror = cb;
	      req.onsuccess = next;
	      current += 1;
	    }
	  });
	};
	
	/**
	 * Get all.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.all = function(cb) {
	  var result = [];
	
	  this.cursor({ iterator: iterator }, function(err) {
	    err ? cb(err) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Create read cursor for specific `range`,
	 * and pass IDBCursor to `iterator` function.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor
	 *
	 * @param {Object} opts:
	 *   {IDBRange|Object} range - passes to .openCursor()
	 *   {Function} iterator - function to call with IDBCursor
	 *   {String} [index] - name of index to start cursor by index
	 * @param {Function} cb - calls on end or error
	 */
	
	Store.prototype.cursor = function(opts, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = opts.index
	      ? tr.objectStore(name).index(opts.index)
	      : tr.objectStore(name);
	    var req = store.openCursor(parseRange(opts.range));
	
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) {
	      var cursor = e.target.result;
	      cursor ? opts.iterator(cursor) : cb();
	    };
	  });
	};
	});
	
	var require$$1 = (idbStore && typeof idbStore === 'object' && 'default' in idbStore ? idbStore['default'] : idbStore);
	
	var schema$1 = createCommonjsModule(function (module) {
	var type = require$$2;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Schema`.
	 */
	
	module.exports = Schema;
	
	/**
	 * Initialize new `Schema`.
	 */
	
	function Schema() {
	  if (!(this instanceof Schema)) return new Schema();
	  this._stores = {};
	  this._current = {};
	  this._versions = {};
	}
	
	/**
	 * Set new version.
	 *
	 * @param {Number} version
	 * @return {Schema}
	 */
	
	Schema.prototype.version = function(version) {
	  if (type(version) != 'number' || version < 1 || version < this.getVersion())
	    throw new TypeError('not valid version');
	
	  this._current = { version: version, store: null };
	  this._versions[version] = {
	    stores: [],      // db.createObjectStore
	    dropStores: [],  // db.deleteObjectStore
	    indexes: [],     // store.createIndex
	    dropIndexes: [], // store.deleteIndex
	    version: version // version
	  };
	
	  return this;
	};
	
	/**
	 * Add store.
	 *
	 * @param {String} name
	 * @param {Object} [opts] { key: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addStore = function(name, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (this._stores[name]) throw new TypeError('store is already defined');
	  var store = new Store(name, opts || {});
	  this._stores[name] = store;
	  this._versions[this.getVersion()].stores.push(store);
	  this._current.store = store;
	  return this;
	};
	
	/**
	 * Drop store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var store = this._stores[name];
	  if (!store) throw new TypeError('store is not defined');
	  delete this._stores[name];
	  this._versions[this.getVersion()].dropStores.push(store);
	  return this;
	};
	
	/**
	 * Add index.
	 *
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} [opts] { unique: false, multi: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addIndex = function(name, field, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (type(field) != 'string' && type(field) != 'array') throw new TypeError('`field` is required');
	  var store = this._current.store;
	  if (store.indexes[name]) throw new TypeError('index is already defined');
	  var index = new Index(store, name, field, opts || {});
	  store.indexes[name] = index;
	  this._versions[this.getVersion()].indexes.push(index);
	  return this;
	};
	
	/**
	 * Drop index.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropIndex = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var index = this._current.store.indexes[name];
	  if (!index) throw new TypeError('index is not defined');
	  delete this._current.store.indexes[name];
	  this._versions[this.getVersion()].dropIndexes.push(index);
	  return this;
	};
	
	/**
	 * Change current store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.getStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (!this._stores[name]) throw new TypeError('store is not defined');
	  this._current.store = this._stores[name];
	  return this;
	};
	
	/**
	 * Get version.
	 *
	 * @return {Number}
	 */
	
	Schema.prototype.getVersion = function() {
	  return this._current.version;
	};
	
	/**
	 * Generate onupgradeneeded callback.
	 *
	 * @return {Function}
	 */
	
	Schema.prototype.callback = function() {
	  var versions = Object.keys(this._versions)
	    .map(function(v) { return this._versions[v] }, this)
	    .sort(function(a, b) { return a.version - b.version });
	
	  return function onupgradeneeded(e) {
	    var db = e.target.result;
	    var tr = e.target.transaction;
	
	    versions.forEach(function(versionSchema) {
	      if (e.oldVersion >= versionSchema.version) return;
	
	      versionSchema.stores.forEach(function(s) {
	        var options = {};
	
	        // Only pass the options that are explicitly specified to createObjectStore() otherwise IE/Edge
	        // can throw an InvalidAccessError - see https://msdn.microsoft.com/en-us/library/hh772493(v=vs.85).aspx
	        if (typeof s.key !== 'undefined') options.keyPath = s.key;
	        if (typeof s.increment !== 'undefined') options.autoIncrement = s.increment;
	
	        db.createObjectStore(s.name, options);
	      });
	
	      versionSchema.dropStores.forEach(function(s) {
	        db.deleteObjectStore(s.name);
	      });
	
	      versionSchema.indexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.createIndex(i.name, i.field, {
	          unique: i.unique,
	          multiEntry: i.multi
	        });
	      });
	
	      versionSchema.dropIndexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.deleteIndex(i.name);
	      });
	    });
	  };
	};
	});
	
	var require$$2$1 = (schema$1 && typeof schema$1 === 'object' && 'default' in schema$1 ? schema$1['default'] : schema$1);
	
	var index = createCommonjsModule(function (module, exports) {
	var type = require$$2;
	var Schema = require$$2$1;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Treo`.
	 */
	
	exports = module.exports = Treo;
	
	/**
	 * Initialize new `Treo` instance.
	 *
	 * @param {String} name
	 * @param {Schema} schema
	 */
	
	function Treo(name, schema) {
	  if (!(this instanceof Treo)) return new Treo(name, schema);
	  if (type(name) != 'string') throw new TypeError('`name` required');
	  if (!(schema instanceof Schema)) throw new TypeError('not valid schema');
	
	  this.name = name;
	  this.status = 'close';
	  this.origin = null;
	  this.stores = schema._stores;
	  this.version = schema.getVersion();
	  this.onupgradeneeded = schema.callback();
	
	  // assign db property to each store
	  Object.keys(this.stores).forEach(function(storeName) {
	    this.stores[storeName].db = this;
	  }, this);
	}
	
	/**
	 * Expose core classes.
	 */
	
	exports.schema = Schema;
	exports.cmp = cmp;
	exports.Treo = Treo;
	exports.Schema = Schema;
	exports.Store = Store;
	exports.Index = Index;
	
	/**
	 * Use plugin `fn`.
	 *
	 * @param {Function} fn
	 * @return {Treo}
	 */
	
	Treo.prototype.use = function(fn) {
	  fn(this, exports);
	  return this;
	};
	
	/**
	 * Drop.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.drop = function(cb) {
	  var name = this.name;
	  this.close(function(err) {
	    if (err) return cb(err);
	    var req = indexedDB().deleteDatabase(name);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess() { cb() };
	  });
	};
	
	/**
	 * Close.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.close = function(cb) {
	  if (this.status == 'close') return cb();
	  this.getInstance(function(err, db) {
	    if (err) return cb(err);
	    db.origin = null;
	    db.status = 'close';
	    db.close();
	    cb();
	  });
	};
	
	/**
	 * Get store by `name`.
	 *
	 * @param {String} name
	 * @return {Store}
	 */
	
	Treo.prototype.store = function(name) {
	  return this.stores[name];
	};
	
	/**
	 * Get db instance. It starts opening transaction only once,
	 * another requests will be scheduled to queue.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.getInstance = function(cb) {
	  if (this.status == 'open') return cb(null, this.origin);
	  if (this.status == 'opening') return this.queue.push(cb);
	
	  this.status = 'opening';
	  this.queue = [cb]; // queue callbacks
	
	  var that = this;
	  var req = indexedDB().open(this.name, this.version);
	  req.onupgradeneeded = this.onupgradeneeded;
	
	  req.onerror = req.onblocked = function onerror(e) {
	    that.status = 'error';
	    that.queue.forEach(function(cb) { cb(e) });
	    delete that.queue;
	  };
	
	  req.onsuccess = function onsuccess(e) {
	    that.origin = e.target.result;
	    that.status = 'open';
	    that.origin.onversionchange = function onversionchange() {
	      that.close(function() {});
	    };
	    that.queue.forEach(function(cb) { cb(null, that.origin) });
	    delete that.queue;
	  };
	};
	
	/**
	 * Create new transaction for selected `stores`.
	 *
	 * @param {String} type (readwrite|readonly)
	 * @param {Array} stores - follow indexeddb semantic
	 * @param {Function} cb
	 */
	
	Treo.prototype.transaction = function(type, stores, cb) {
	  this.getInstance(function(err, db) {
	    err ? cb(err) : cb(null, db.transaction(stores, type));
	  });
	};
	
	/**
	 * Compare 2 values using IndexedDB comparision algotihm.
	 *
	 * @param {Mixed} value1
	 * @param {Mixed} value2
	 * @return {Number} -1|0|1
	 */
	
	function cmp() {
	  return indexedDB().cmp.apply(indexedDB(), arguments);
	}
	
	/**
	 * Dynamic link to `global.indexedDB` for polyfills support.
	 *
	 * @return {IDBDatabase}
	 */
	
	function indexedDB() {
	  return commonjsGlobal._indexedDB
	    || commonjsGlobal.indexedDB
	    || commonjsGlobal.msIndexedDB
	    || commonjsGlobal.mozIndexedDB
	    || commonjsGlobal.webkitIndexedDB;
	}
	});
	
	var treo = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);
	
	var logger = loglevel$1.getLogger('RSStorage:operations');
	logger.setLevel('warn');
	
	// Email msg buckets
	var EMAIL_BUCKETS = ['_email.id', '_email.tid'];
	// Message Db schema
	var MSG_DB_VERSIONED_SCHEMA = [
	  // version 1
	  [
	    { name: '_id.list', indexes: ['sift.guid'] },
	    { name: '_tid.list', indexes: ['sift.guid'] }
	  ],
	  // version 2
	  [
	    { name: '_email.id', indexes: ['sift.guid'] },
	    { name: '_email.tid', indexes: ['sift.guid'] },
	    { name: '_id.list', drop: true },
	    { name: '_tid.list', drop: true }
	  ]
	];
	// Sync DB schema
	var SYNC_DB_SCHEMA = [
	  { name: 'events', indexes: ['value.sift.guid'] },
	  { name: 'admin' }];
	// Client DB schema
	var CLIENT_DB_SCHEMA = [
	  { name: 'tour'},
	  { name: 'spm' },
	  { name: 'auth' }];
	
	/*****************************************************************
	 * Operations (alphabetically ordered)
	 *****************************************************************/
	// Create Db
	function opCreateDb(dbInfo) {
	  logger.trace('[opCreateDb]: ', dbInfo);
	  var dbs = {};
	  switch (dbInfo.type) {
	    case 'MSG':
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SIFT':
	      if (!dbInfo.siftGuid) {
	        throw new Error('[opCreateDb]: dbInfo.siftGuid undefined');
	      }
	      logger.trace('[opCreateDb]: creating SIFT db');
	      var schema = _getTreoSchema(dbInfo.schema, true);
	      // Add user and redsift stores to sift db.
	      schema = schema.addStore('_user.default').addStore('_redsift');
	      dbs.db = treo(dbInfo.siftGuid + '-' + dbInfo.accountGuid, schema);
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SYNC':
	      logger.trace('[opCreateDb]: creating SYNC db');
	      dbs.db = treo('rs_sync_log-' + dbInfo.accountGuid, _getTreoSchema(SYNC_DB_SCHEMA));
	      break;
	    case 'CLIENT':
	      dbs.db = treo('rs_client_db-' + dbInfo.clientName, _getTreoSchema(CLIENT_DB_SCHEMA));
	      break;
	    default:
	      throw new Error('[opCreateDb]: unsupported db type: ' + dbInfo.type);
	  }
	  return dbs;
	}
	
	// Del
	function opDel(dbs, params, siftGuid) {
	  logger.trace('[opDel]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opDel]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    logger.trace('[opDel]: params.keys undefined');
	    return Promise.resolve();
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _batchDelete(dbs.msg, { bucket: params.bucket, keys: keys });
	  }
	  return _batchDelete(dbs.db, params);
	}
	
	// Get
	function opGet(dbs, params, siftGuid) {
	  logger.trace('[opGet]: ', params);
	  if (!params.bucket) {
	    return Promise.reject('[opGet]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    return Promise.reject('[opGet]: param.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _findIn(dbs.msg, { bucket: params.bucket, keys: keys }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  return _findIn(dbs.db, params);
	}
	
	// Get All
	function opGetAll(dbs, params, siftGuid) {
	  logger.trace('[opGetAll]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAll]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true)
	      .then(function (result) { return result.map(function (r) { return ({ key: r.key.split('/')[1], value: r.value }); }); }
	      );
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get All Keys
	function opGetAllKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetAllKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAllKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false)
	      .then(function (result) { return result.map(function (r) { return r.key.split('/')[1]; }); });
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get Index
	function opGetIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndex]:params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndex]:params.index undefined');
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get Index Keys
	function opGetIndexKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetIndexKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndexKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndexKeys]: params.index undefined');
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get With Index
	function opGetWithIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetWithIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetWithIndex]:params.bucket undefined');
	  }
	  if (!params.keys) {
	    return Promise.reject('[opGetWithIndex]:params.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _getWithIndexRange(dbs.msg, { bucket: params.bucket, keys: keys, index: 'sift.guid', range: siftGuid }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetWithIndex]:params.index undefined');
	  }
	  if (!params.range) {
	    return Promise.reject('[opGetWithIndex]:params.range undefined');
	  }
	  return _getWithIndexRange(dbs.db, params);
	}
	
	// Put
	function opPut(dbs, params, raw, siftGuid) {
	  logger.trace('[opPut]: ', params, raw, siftGuid);
	  var db = dbs.db;
	  if (!params.bucket) {
	    return Promise.reject('[opPut]: params.bucket undefined');
	  }
	  if (!params.kvs || params.kvs.length === 0) {
	    logger.warn('[opPut]: params.kvs undefined');
	    return Promise.resolve();
	  }
	  var kvs = params.kvs;
	  if (!raw) {
	    // Wrap value into a {value: object}
	    kvs = kvs.map(function (kv) {
	      return { key: kv.key, value: { value: kv.value } };
	    });
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    db = dbs.msg;
	    var kvs = kvs.map(function (kv) {
	      return { key: siftGuid + '/' + kv.key, value: kv.value };
	    });
	  }
	  return _batchPut(db, { bucket: params.bucket, kvs: kvs }, raw);
	}
	
	/*****************************************************************
	 * Internal functions
	 *****************************************************************/
	
	// define db schema
	function _getTreoSchema(stores, sift) {
	  logger.trace('[_getTreoSchema]: ', stores, sift);
	  var schema = treo.schema().version(1);
	  stores.forEach(function (os) {
	    if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	      if (os.keypath) {
	        schema = schema.addStore(os.name, { key: os.keypath });
	      }
	      else {
	        schema = schema.addStore(os.name);
	      }
	      if (os.indexes) {
	        os.indexes.forEach(function (idx) {
	          schema = schema.addIndex(idx, idx, { unique: false });
	        });
	      }
	    }
	  });
	  return schema;
	}
	
	// versioned db schema
	function _getVersionedTreoSchema(versions, sift) {
	  logger.trace('[_getVersionedTreoSchema]: ', versions, sift);
	  var schema = treo.schema();
	  versions.forEach(function (stores, i) {
	    schema = schema.version(i + 1);
	    stores.forEach(function (os) {
	      if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	        if (os.drop) {
	          logger.trace('[_getVersionedTreoSchema]: dropping store: ', os.name);
	          schema = schema.dropStore(os.name);
	        }
	        else if (os.keypath) {
	          schema = schema.addStore(os.name, { key: os.keypath });
	        }
	        else {
	          schema = schema.addStore(os.name);
	        }
	        if (os.indexes) {
	          os.indexes.forEach(function (idx) {
	            if (os.drop) {
	              logger.trace('[_getVersionedTreoSchema]: dropping store/index: ' + os.name + '/' + idx);
	              schema = schema.dropIndex(idx);
	            }
	            else {
	              schema = schema.addIndex(idx, idx, { unique: false });
	            }
	          });
	        }
	      }
	    });
	  });
	  return schema;
	}
	
	// Batch deletion supports numeric keys
	function _batchDelete(db, params) {
	  logger.trace('[_batchDelete]: ', params);
	  return new Promise(function (resolve, reject) {
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= params.keys.length) { return; }
	        var currentKey = params.keys[current];
	        var req;
	        req = store.delete(currentKey);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _batchPut(db, params) {
	  logger.trace('[_batchPut]: ', params);
	  return new Promise(function (resolve, reject) {
	    var count = params.kvs.length;
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= count) { return; }
	        logger.trace('[_batchPut: put: ', params.kvs[current]);
	        var req;
	        req = store.put(params.kvs[current].value, params.kvs[current].key);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _getWithIndexRange(db, params) {
	  logger.trace('[_getWithIndexRange]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var found = 0;
	    var iterator = function (cursor) {
	      var ki = params.keys.indexOf(cursor.primaryKey);
	      if (ki !== -1) {
	        logger.trace('[found key: ', cursor.primaryKey);
	        result[ki].value = cursor.value.value;
	        found++;
	      }
	      if (found === params.keys.length) {
	        return done();
	      }
	      cursor.continue();
	    };
	    var done = function (err) {
	      logger.trace('[_getWithIndexRange: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ index: params.index, range: params.range, iterator: iterator }, done);
	  });
	}
	
	function _findIn(db, params) {
	  logger.trace('[_findIn]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var current = 0;
	    var iterator = function (cursor) {
	      logger.trace('[_findIn]: iterator: ', cursor);
	      if (cursor.key > sKeys[current]) {
	        logger.trace('[_findIn]: cursor ahead: ', cursor.key, sKeys[current]);
	        while (cursor.key > sKeys[current] && current < sKeys.length) {
	          current += 1;
	          logger.trace('[_findIn]: moving to next key: ', cursor.key, sKeys[current]);
	        }
	        if (current > sKeys.length) {
	          logger.trace('[_findIn]: exhausted keys. done.');
	          return done();
	        }
	      }
	      if (cursor.key === sKeys[current]) {
	        logger.trace('[_findIn]: found key: ', cursor.key, cursor.value);
	        result[params.keys.indexOf(sKeys[current])] = { key: cursor.key, value: cursor.value.value };
	        current += 1;
	        (current < sKeys.length) ? cursor.continue(sKeys[current]) : done();
	      }
	      else {
	        logger.trace('[_findIn]: continuing to next key: ', sKeys[current]);
	        cursor.continue(sKeys[current]); // go to next key
	      }
	    };
	    var done = function (err) {
	      logger.trace('[findIn]: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    var sKeys = params.keys.slice();
	    sKeys = sKeys.sort(treo.cmp);
	    logger.trace('[findIn: sorted keys: ', sKeys);
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ iterator: iterator }, done);
	  });
	}
	
	function _getAll(db, params, loadValue) {
	  logger.trace('[_getAll]: ', params, loadValue);
	  return new Promise(function (resolve, reject) {
	    var result = [];
	    var keys = [];
	    var store = db.store(params.bucket);
	    var iterator = function (cursor) {
	      var kv = { key: cursor.primaryKey };
	      logger.trace('[_getAll]: cursor', cursor);
	      if (loadValue) {
	        kv.value = cursor.value.value;
	      }
	      if (params.index) {
	        kv.index = cursor.key;
	      }
	      result.push(kv);
	      keys.push(cursor.primaryKey);
	      cursor.continue();
	    };
	    var opts = { iterator: iterator };
	    if (params.index) {
	      opts.index = params.index;
	    }
	    if (params.range) {
	      opts.range = params.range;
	    }
	    store.cursor(opts, function (err) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        if (!params.index && !params.range && !loadValue) {
	          logger.trace('[_getAll]: resolving: ', keys);
	          resolve(keys);
	        }
	        else {
	          logger.trace('[_getAll]: resolving: ', result);
	          resolve(result);
	        }
	      }
	    });
	  });
	}
	
	/**
	 * Redsift SDK. Sift Storage module.
	 * Based on APIs from https://github.com/CrowdProcess/riak-pb
	 *
	 * Copyright (c) 2016 Redsift Limited. All rights reserved.
	 */
	var _siftGuid = new WeakMap();
	var _dbs = new WeakMap();
	
	var Storage = function Storage(dbInfo, ll) {
	  this._logger = loglevel$1.getLogger('RSStorage');
	  this._logger.setLevel(ll || 'warn');
	  if (!dbInfo.accountGuid) {
	    throw new Error('[Storage]: dbInfo.accountGuid undefined');
	  }
	  _siftGuid.set(this, dbInfo.siftGuid);
	  _dbs.set(this, opCreateDb(dbInfo));
	};
	
	/*****************************************************************
	 * External Operations
	 *****************************************************************/
	Storage.prototype.get = function get (params) {
	  this._logger.trace('[Storage::get]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAll = function getAll (params) {
	  this._logger.trace('[Storage::getAll]: ', params);
	  return opGetAll(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAllKeys = function getAllKeys (params) {
	  this._logger.trace('[Storage::getAllKeys]: ', params);
	  return opGetAllKeys(_dbs.get(this), params, _siftGuid.get(this))
	};
	
	Storage.prototype.getIndex = function getIndex (params) {
	  this._logger.trace('[Storage::getIndex]: ', params);
	  return opGetIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getIndexKeys = function getIndexKeys (params) {
	  this._logger.trace('[Storage::getIndexKeys]: ', params);
	  return opGetIndexKeys(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getWithIndex = function getWithIndex (params) {
	  this._logger.trace('[Storage::getWithIndex]: ', params);
	  return opGetWithIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// Sift-only operations
	///////////////////////////////////////////////////////////////////////////////////////////////
	Storage.prototype.delUser = function delUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::delUser]: ', params);
	  return opDel(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getUser = function getUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::getUser]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.putUser = function putUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::putUser]: ', params);
	  if (!params.kvs || params.kvs.length === 0) {
	    return Promise.reject('[Storage::putUser]: params.kvs undefined');
	  }
	  return opPut(_dbs.get(this), params, false, _siftGuid.get(this));
	};
	
	var SiftController = function SiftController() {
	  this._proxy = self;
	  this.view = new Observable();
	  this.emailclient = new EmailClient(self);
	  this._registerMessageListeners();
	};
	
	SiftController.prototype.publish = function publish (topic, value) {
	  this._proxy.postMessage({
	    method: 'notifyView',
	    params: {
	      topic: topic,
	      value: value
	    }
	  });
	};
	
	SiftController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if (!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[SiftController:onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	SiftController.prototype._init = function _init (params) {
	  // console.log('[SiftController::_init]: ', params);
	  this.storage = new SiftStorage();
	  this.storage.init(
	    new Storage({
	      type: 'SIFT',
	      siftGuid: params.siftGuid,
	      accountGuid: params.accountGuid,
	      schema: params.dbSchema
	    })
	  );
	  // Initialise sift details
	  this._guid = params.siftGuid;
	  this._account = params.accountGuid;
	  // Init is done, post a message to the iframe_controller
	  this._proxy.postMessage({
	    method: 'initCallback',
	    result: params
	  });
	};
	
	SiftController.prototype._terminate = function _terminate () {
	  if (!this._proxy) return;
	  // console.log('[SiftController::_terminate]');
	  this._proxy.close();
	};
	
	SiftController.prototype._postCallback = function _postCallback (params, _result) {
	  this._proxy.postMessage({
	    method: 'loadViewCallback',
	    params: {
	      user: { guid: this._account },
	      sift: { guid: this._guid },
	      type: params.type,
	      sizeClass: params.sizeClass,
	      result: _result
	    }
	  });
	};
	
	SiftController.prototype._loadView = function _loadView (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_loadView]: ', params);
	  if (!this.loadView) {
	    console.error('[SiftController::_loadView]: Sift controller must implement the loadView method');
	    return;
	  }
	  // Invoke loadView method
	  var result = this.loadView({
	    sizeClass: params.sizeClass,
	    type: params.type,
	    params: params.data
	  });
	  // console.log('[SiftController::_loadView] loadView result: ', result);
	  if (result.data && 'function' === typeof result.data.then) {
	    if (result.html) {
	      this._postCallback(params, { html: result.html });
	    }
	    result.data.then(function (data) {
	      this$1._postCallback(params, { html: result.html, data: data });
	    }).catch(function (error) {
	      console.error('[SiftController::loadView]: promise rejected: ', error);
	    });
	  }
	  else {
	    this._postCallback(params, result);
	  }
	};
	
	SiftController.prototype._storageUpdated = function _storageUpdated (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_storageUpdated]: ', params);
	  // Notify the * listeners
	  this.storage.publish('*', params);
	  params.forEach(function (b) {
	    // Notify the bucket listeners.
	    // TODO: send the list of keys instead of "[b]"
	    this$1.storage.publish(b, [b]);
	  });
	};
	
	SiftController.prototype._notifyController = function _notifyController (params) {
	  // console.log('[SiftController::_notifyController]: ', params);
	  this.view.publish(params.topic, params.value);
	};
	
	SiftController.prototype._emailComposer = function _emailComposer (params) {
	  // console.log('[SiftController::_emailComposer]: ', params);
	  this.emailclient.publish(params.topic, params.value);
	};
	
	var SiftView = function SiftView() {
	  this._resizeHandler = null;
	  this._proxy = parent;
	  this.controller = new Observable();
	  this._registerMessageListeners();
	};
	
	SiftView.prototype.publish = function publish (topic, value) {
	 this._proxy.postMessage({
	    method: 'notifyController',
	    params: {
	      topic: topic,
	      value: value } },
	    '*');
	};
	
	SiftView.prototype.registerOnLoadHandler = function registerOnLoadHandler (handler) {
	  window.addEventListener('load', handler);
	};
	
	// TODO: should we really limit resize events to every 1 second?
	SiftView.prototype.registerOnResizeHandler = function registerOnResizeHandler (handler, resizeTimeout) {
	    var this$1 = this;
	    if ( resizeTimeout === void 0 ) resizeTimeout = 1000;
	
	  window.addEventListener('resize', function () {
	    if (!this$1.resizeHandler) {
	      this$1.resizeHandler = setTimeout(function () {
	        this$1.resizeHandler = null;
	        handler();
	      }, resizeTimeout);
	    }
	  });
	};
	
	SiftView.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  window.addEventListener('message', function (e) {
	    var method = e.data.method;
	    var params = e.data.params;
	    if(method === 'notifyView') {
	      this$1.controller.publish(params.topic, params.value);
	    }
	    else if(this$1[method]) {
	      this$1[method](params);
	    }
	    else {
	      console.warn('[SiftView]: method not implemented: ', method);
	    }
	  }, false);
	};
	
	/**
	 * SiftView
	 */
	function registerSiftView(siftView) {
	  console.log('[Redsift::registerSiftView]: registered');
	}
	
	function createSiftView(instanceMethods) {
	  return _create(SiftView, instanceMethods);
	}
	
	/**
	 * SiftController
	 */
	function createSiftController(instanceMethods) {
	  return _create(SiftController, instanceMethods);
	}
	
	function registerSiftController(siftController) {
	  console.log('[Redsift::registerSiftController]: registered');
	}
	
	/**
	 * EmailClientController
	 */
	function createEmailClientController(instanceMethods) {
	  return _create(EmailClientController, instanceMethods);
	}
	
	function registerEmailClientController(emailClientController) {
	  console.log('[Redsift::registerEmailClientController]: registered');
	}
	
	/**
	 * Local functions
	 */
	function _create(Base, methods) {
	  var Creature = function() {
	    Base.call(this);
	    if(this.init && typeof this.init === 'function') {
	      this.init();
	    }
	  };
	  Creature.prototype = Object.create(Base.prototype);
	  Creature.constructor = Creature;
	  Object.keys(methods).forEach(function (method) {
	    Creature.prototype[method] = methods[method];
	  });
	  return new Creature();
	}
	
	exports.EmailClientController = EmailClientController;
	exports.SiftController = SiftController;
	exports.SiftStorage = SiftStorage;
	exports.SiftView = SiftView;
	exports.registerSiftView = registerSiftView;
	exports.createSiftView = createSiftView;
	exports.createSiftController = createSiftController;
	exports.registerSiftController = registerSiftController;
	exports.createEmailClientController = createEmailClientController;
	exports.registerEmailClientController = registerEmailClientController;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console, module) {//! moment.js
	//! version : 2.17.1
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, (function () { 'use strict';
	
	var hookCallback;
	
	function hooks () {
	    return hookCallback.apply(null, arguments);
	}
	
	// This is done to register the method called with moment()
	// without creating circular dependencies.
	function setHookCallback (callback) {
	    hookCallback = callback;
	}
	
	function isArray(input) {
	    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	}
	
	function isObject(input) {
	    // IE8 will treat undefined and null as object if it wasn't for
	    // input != null
	    return input != null && Object.prototype.toString.call(input) === '[object Object]';
	}
	
	function isObjectEmpty(obj) {
	    var k;
	    for (k in obj) {
	        // even if its not own property I'd still call it non-empty
	        return false;
	    }
	    return true;
	}
	
	function isNumber(input) {
	    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
	}
	
	function isDate(input) {
	    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	}
	
	function map(arr, fn) {
	    var res = [], i;
	    for (i = 0; i < arr.length; ++i) {
	        res.push(fn(arr[i], i));
	    }
	    return res;
	}
	
	function hasOwnProp(a, b) {
	    return Object.prototype.hasOwnProperty.call(a, b);
	}
	
	function extend(a, b) {
	    for (var i in b) {
	        if (hasOwnProp(b, i)) {
	            a[i] = b[i];
	        }
	    }
	
	    if (hasOwnProp(b, 'toString')) {
	        a.toString = b.toString;
	    }
	
	    if (hasOwnProp(b, 'valueOf')) {
	        a.valueOf = b.valueOf;
	    }
	
	    return a;
	}
	
	function createUTC (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, true).utc();
	}
	
	function defaultParsingFlags() {
	    // We need to deep clone this object.
	    return {
	        empty           : false,
	        unusedTokens    : [],
	        unusedInput     : [],
	        overflow        : -2,
	        charsLeftOver   : 0,
	        nullInput       : false,
	        invalidMonth    : null,
	        invalidFormat   : false,
	        userInvalidated : false,
	        iso             : false,
	        parsedDateParts : [],
	        meridiem        : null
	    };
	}
	
	function getParsingFlags(m) {
	    if (m._pf == null) {
	        m._pf = defaultParsingFlags();
	    }
	    return m._pf;
	}
	
	var some;
	if (Array.prototype.some) {
	    some = Array.prototype.some;
	} else {
	    some = function (fun) {
	        var t = Object(this);
	        var len = t.length >>> 0;
	
	        for (var i = 0; i < len; i++) {
	            if (i in t && fun.call(this, t[i], i, t)) {
	                return true;
	            }
	        }
	
	        return false;
	    };
	}
	
	var some$1 = some;
	
	function isValid(m) {
	    if (m._isValid == null) {
	        var flags = getParsingFlags(m);
	        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
	            return i != null;
	        });
	        var isNowValid = !isNaN(m._d.getTime()) &&
	            flags.overflow < 0 &&
	            !flags.empty &&
	            !flags.invalidMonth &&
	            !flags.invalidWeekday &&
	            !flags.nullInput &&
	            !flags.invalidFormat &&
	            !flags.userInvalidated &&
	            (!flags.meridiem || (flags.meridiem && parsedParts));
	
	        if (m._strict) {
	            isNowValid = isNowValid &&
	                flags.charsLeftOver === 0 &&
	                flags.unusedTokens.length === 0 &&
	                flags.bigHour === undefined;
	        }
	
	        if (Object.isFrozen == null || !Object.isFrozen(m)) {
	            m._isValid = isNowValid;
	        }
	        else {
	            return isNowValid;
	        }
	    }
	    return m._isValid;
	}
	
	function createInvalid (flags) {
	    var m = createUTC(NaN);
	    if (flags != null) {
	        extend(getParsingFlags(m), flags);
	    }
	    else {
	        getParsingFlags(m).userInvalidated = true;
	    }
	
	    return m;
	}
	
	function isUndefined(input) {
	    return input === void 0;
	}
	
	// Plugins that add properties should also add the key here (null value),
	// so we can properly clone ourselves.
	var momentProperties = hooks.momentProperties = [];
	
	function copyConfig(to, from) {
	    var i, prop, val;
	
	    if (!isUndefined(from._isAMomentObject)) {
	        to._isAMomentObject = from._isAMomentObject;
	    }
	    if (!isUndefined(from._i)) {
	        to._i = from._i;
	    }
	    if (!isUndefined(from._f)) {
	        to._f = from._f;
	    }
	    if (!isUndefined(from._l)) {
	        to._l = from._l;
	    }
	    if (!isUndefined(from._strict)) {
	        to._strict = from._strict;
	    }
	    if (!isUndefined(from._tzm)) {
	        to._tzm = from._tzm;
	    }
	    if (!isUndefined(from._isUTC)) {
	        to._isUTC = from._isUTC;
	    }
	    if (!isUndefined(from._offset)) {
	        to._offset = from._offset;
	    }
	    if (!isUndefined(from._pf)) {
	        to._pf = getParsingFlags(from);
	    }
	    if (!isUndefined(from._locale)) {
	        to._locale = from._locale;
	    }
	
	    if (momentProperties.length > 0) {
	        for (i in momentProperties) {
	            prop = momentProperties[i];
	            val = from[prop];
	            if (!isUndefined(val)) {
	                to[prop] = val;
	            }
	        }
	    }
	
	    return to;
	}
	
	var updateInProgress = false;
	
	// Moment prototype object
	function Moment(config) {
	    copyConfig(this, config);
	    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	    if (!this.isValid()) {
	        this._d = new Date(NaN);
	    }
	    // Prevent infinite loop in case updateOffset creates new moment
	    // objects.
	    if (updateInProgress === false) {
	        updateInProgress = true;
	        hooks.updateOffset(this);
	        updateInProgress = false;
	    }
	}
	
	function isMoment (obj) {
	    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	}
	
	function absFloor (number) {
	    if (number < 0) {
	        // -0 -> 0
	        return Math.ceil(number) || 0;
	    } else {
	        return Math.floor(number);
	    }
	}
	
	function toInt(argumentForCoercion) {
	    var coercedNumber = +argumentForCoercion,
	        value = 0;
	
	    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	        value = absFloor(coercedNumber);
	    }
	
	    return value;
	}
	
	// compare two arrays, return the number of differences
	function compareArrays(array1, array2, dontConvert) {
	    var len = Math.min(array1.length, array2.length),
	        lengthDiff = Math.abs(array1.length - array2.length),
	        diffs = 0,
	        i;
	    for (i = 0; i < len; i++) {
	        if ((dontConvert && array1[i] !== array2[i]) ||
	            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	            diffs++;
	        }
	    }
	    return diffs + lengthDiff;
	}
	
	function warn(msg) {
	    if (hooks.suppressDeprecationWarnings === false &&
	            (typeof console !==  'undefined') && console.warn) {
	        console.warn('Deprecation warning: ' + msg);
	    }
	}
	
	function deprecate(msg, fn) {
	    var firstTime = true;
	
	    return extend(function () {
	        if (hooks.deprecationHandler != null) {
	            hooks.deprecationHandler(null, msg);
	        }
	        if (firstTime) {
	            var args = [];
	            var arg;
	            for (var i = 0; i < arguments.length; i++) {
	                arg = '';
	                if (typeof arguments[i] === 'object') {
	                    arg += '\n[' + i + '] ';
	                    for (var key in arguments[0]) {
	                        arg += key + ': ' + arguments[0][key] + ', ';
	                    }
	                    arg = arg.slice(0, -2); // Remove trailing comma and space
	                } else {
	                    arg = arguments[i];
	                }
	                args.push(arg);
	            }
	            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	            firstTime = false;
	        }
	        return fn.apply(this, arguments);
	    }, fn);
	}
	
	var deprecations = {};
	
	function deprecateSimple(name, msg) {
	    if (hooks.deprecationHandler != null) {
	        hooks.deprecationHandler(name, msg);
	    }
	    if (!deprecations[name]) {
	        warn(msg);
	        deprecations[name] = true;
	    }
	}
	
	hooks.suppressDeprecationWarnings = false;
	hooks.deprecationHandler = null;
	
	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}
	
	function set (config) {
	    var prop, i;
	    for (i in config) {
	        prop = config[i];
	        if (isFunction(prop)) {
	            this[i] = prop;
	        } else {
	            this['_' + i] = prop;
	        }
	    }
	    this._config = config;
	    // Lenient ordinal parsing accepts just a number in addition to
	    // number + (possibly) stuff coming from _ordinalParseLenient.
	    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	}
	
	function mergeConfigs(parentConfig, childConfig) {
	    var res = extend({}, parentConfig), prop;
	    for (prop in childConfig) {
	        if (hasOwnProp(childConfig, prop)) {
	            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                res[prop] = {};
	                extend(res[prop], parentConfig[prop]);
	                extend(res[prop], childConfig[prop]);
	            } else if (childConfig[prop] != null) {
	                res[prop] = childConfig[prop];
	            } else {
	                delete res[prop];
	            }
	        }
	    }
	    for (prop in parentConfig) {
	        if (hasOwnProp(parentConfig, prop) &&
	                !hasOwnProp(childConfig, prop) &&
	                isObject(parentConfig[prop])) {
	            // make sure changes to properties don't modify parent config
	            res[prop] = extend({}, res[prop]);
	        }
	    }
	    return res;
	}
	
	function Locale(config) {
	    if (config != null) {
	        this.set(config);
	    }
	}
	
	var keys;
	
	if (Object.keys) {
	    keys = Object.keys;
	} else {
	    keys = function (obj) {
	        var i, res = [];
	        for (i in obj) {
	            if (hasOwnProp(obj, i)) {
	                res.push(i);
	            }
	        }
	        return res;
	    };
	}
	
	var keys$1 = keys;
	
	var defaultCalendar = {
	    sameDay : '[Today at] LT',
	    nextDay : '[Tomorrow at] LT',
	    nextWeek : 'dddd [at] LT',
	    lastDay : '[Yesterday at] LT',
	    lastWeek : '[Last] dddd [at] LT',
	    sameElse : 'L'
	};
	
	function calendar (key, mom, now) {
	    var output = this._calendar[key] || this._calendar['sameElse'];
	    return isFunction(output) ? output.call(mom, now) : output;
	}
	
	var defaultLongDateFormat = {
	    LTS  : 'h:mm:ss A',
	    LT   : 'h:mm A',
	    L    : 'MM/DD/YYYY',
	    LL   : 'MMMM D, YYYY',
	    LLL  : 'MMMM D, YYYY h:mm A',
	    LLLL : 'dddd, MMMM D, YYYY h:mm A'
	};
	
	function longDateFormat (key) {
	    var format = this._longDateFormat[key],
	        formatUpper = this._longDateFormat[key.toUpperCase()];
	
	    if (format || !formatUpper) {
	        return format;
	    }
	
	    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	        return val.slice(1);
	    });
	
	    return this._longDateFormat[key];
	}
	
	var defaultInvalidDate = 'Invalid date';
	
	function invalidDate () {
	    return this._invalidDate;
	}
	
	var defaultOrdinal = '%d';
	var defaultOrdinalParse = /\d{1,2}/;
	
	function ordinal (number) {
	    return this._ordinal.replace('%d', number);
	}
	
	var defaultRelativeTime = {
	    future : 'in %s',
	    past   : '%s ago',
	    s  : 'a few seconds',
	    m  : 'a minute',
	    mm : '%d minutes',
	    h  : 'an hour',
	    hh : '%d hours',
	    d  : 'a day',
	    dd : '%d days',
	    M  : 'a month',
	    MM : '%d months',
	    y  : 'a year',
	    yy : '%d years'
	};
	
	function relativeTime (number, withoutSuffix, string, isFuture) {
	    var output = this._relativeTime[string];
	    return (isFunction(output)) ?
	        output(number, withoutSuffix, string, isFuture) :
	        output.replace(/%d/i, number);
	}
	
	function pastFuture (diff, output) {
	    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	}
	
	var aliases = {};
	
	function addUnitAlias (unit, shorthand) {
	    var lowerCase = unit.toLowerCase();
	    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	}
	
	function normalizeUnits(units) {
	    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	}
	
	function normalizeObjectUnits(inputObject) {
	    var normalizedInput = {},
	        normalizedProp,
	        prop;
	
	    for (prop in inputObject) {
	        if (hasOwnProp(inputObject, prop)) {
	            normalizedProp = normalizeUnits(prop);
	            if (normalizedProp) {
	                normalizedInput[normalizedProp] = inputObject[prop];
	            }
	        }
	    }
	
	    return normalizedInput;
	}
	
	var priorities = {};
	
	function addUnitPriority(unit, priority) {
	    priorities[unit] = priority;
	}
	
	function getPrioritizedUnits(unitsObj) {
	    var units = [];
	    for (var u in unitsObj) {
	        units.push({unit: u, priority: priorities[u]});
	    }
	    units.sort(function (a, b) {
	        return a.priority - b.priority;
	    });
	    return units;
	}
	
	function makeGetSet (unit, keepTime) {
	    return function (value) {
	        if (value != null) {
	            set$1(this, unit, value);
	            hooks.updateOffset(this, keepTime);
	            return this;
	        } else {
	            return get(this, unit);
	        }
	    };
	}
	
	function get (mom, unit) {
	    return mom.isValid() ?
	        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	}
	
	function set$1 (mom, unit, value) {
	    if (mom.isValid()) {
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	}
	
	// MOMENTS
	
	function stringGet (units) {
	    units = normalizeUnits(units);
	    if (isFunction(this[units])) {
	        return this[units]();
	    }
	    return this;
	}
	
	
	function stringSet (units, value) {
	    if (typeof units === 'object') {
	        units = normalizeObjectUnits(units);
	        var prioritized = getPrioritizedUnits(units);
	        for (var i = 0; i < prioritized.length; i++) {
	            this[prioritized[i].unit](units[prioritized[i].unit]);
	        }
	    } else {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units](value);
	        }
	    }
	    return this;
	}
	
	function zeroFill(number, targetLength, forceSign) {
	    var absNumber = '' + Math.abs(number),
	        zerosToFill = targetLength - absNumber.length,
	        sign = number >= 0;
	    return (sign ? (forceSign ? '+' : '') : '-') +
	        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	}
	
	var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
	var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	var formatFunctions = {};
	
	var formatTokenFunctions = {};
	
	// token:    'M'
	// padded:   ['MM', 2]
	// ordinal:  'Mo'
	// callback: function () { this.month() + 1 }
	function addFormatToken (token, padded, ordinal, callback) {
	    var func = callback;
	    if (typeof callback === 'string') {
	        func = function () {
	            return this[callback]();
	        };
	    }
	    if (token) {
	        formatTokenFunctions[token] = func;
	    }
	    if (padded) {
	        formatTokenFunctions[padded[0]] = function () {
	            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	        };
	    }
	    if (ordinal) {
	        formatTokenFunctions[ordinal] = function () {
	            return this.localeData().ordinal(func.apply(this, arguments), token);
	        };
	    }
	}
	
	function removeFormattingTokens(input) {
	    if (input.match(/\[[\s\S]/)) {
	        return input.replace(/^\[|\]$/g, '');
	    }
	    return input.replace(/\\/g, '');
	}
	
	function makeFormatFunction(format) {
	    var array = format.match(formattingTokens), i, length;
	
	    for (i = 0, length = array.length; i < length; i++) {
	        if (formatTokenFunctions[array[i]]) {
	            array[i] = formatTokenFunctions[array[i]];
	        } else {
	            array[i] = removeFormattingTokens(array[i]);
	        }
	    }
	
	    return function (mom) {
	        var output = '', i;
	        for (i = 0; i < length; i++) {
	            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	        }
	        return output;
	    };
	}
	
	// format date using native date object
	function formatMoment(m, format) {
	    if (!m.isValid()) {
	        return m.localeData().invalidDate();
	    }
	
	    format = expandFormat(format, m.localeData());
	    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	
	    return formatFunctions[format](m);
	}
	
	function expandFormat(format, locale) {
	    var i = 5;
	
	    function replaceLongDateFormatTokens(input) {
	        return locale.longDateFormat(input) || input;
	    }
	
	    localFormattingTokens.lastIndex = 0;
	    while (i >= 0 && localFormattingTokens.test(format)) {
	        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	        localFormattingTokens.lastIndex = 0;
	        i -= 1;
	    }
	
	    return format;
	}
	
	var match1         = /\d/;            //       0 - 9
	var match2         = /\d\d/;          //      00 - 99
	var match3         = /\d{3}/;         //     000 - 999
	var match4         = /\d{4}/;         //    0000 - 9999
	var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	var match1to2      = /\d\d?/;         //       0 - 99
	var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	var match1to3      = /\d{1,3}/;       //       0 - 999
	var match1to4      = /\d{1,4}/;       //       0 - 9999
	var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	var matchUnsigned  = /\d+/;           //       0 - inf
	var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	
	var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	// any word (or two) characters or numbers including two/three word month in arabic.
	// includes scottish gaelic two word and hyphenated months
	var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	
	var regexes = {};
	
	function addRegexToken (token, regex, strictRegex) {
	    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	        return (isStrict && strictRegex) ? strictRegex : regex;
	    };
	}
	
	function getParseRegexForToken (token, config) {
	    if (!hasOwnProp(regexes, token)) {
	        return new RegExp(unescapeFormat(token));
	    }
	
	    return regexes[token](config._strict, config._locale);
	}
	
	// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	function unescapeFormat(s) {
	    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	        return p1 || p2 || p3 || p4;
	    }));
	}
	
	function regexEscape(s) {
	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	var tokens = {};
	
	function addParseToken (token, callback) {
	    var i, func = callback;
	    if (typeof token === 'string') {
	        token = [token];
	    }
	    if (isNumber(callback)) {
	        func = function (input, array) {
	            array[callback] = toInt(input);
	        };
	    }
	    for (i = 0; i < token.length; i++) {
	        tokens[token[i]] = func;
	    }
	}
	
	function addWeekParseToken (token, callback) {
	    addParseToken(token, function (input, array, config, token) {
	        config._w = config._w || {};
	        callback(input, config._w, config, token);
	    });
	}
	
	function addTimeToArrayFromToken(token, input, config) {
	    if (input != null && hasOwnProp(tokens, token)) {
	        tokens[token](input, config._a, config, token);
	    }
	}
	
	var YEAR = 0;
	var MONTH = 1;
	var DATE = 2;
	var HOUR = 3;
	var MINUTE = 4;
	var SECOND = 5;
	var MILLISECOND = 6;
	var WEEK = 7;
	var WEEKDAY = 8;
	
	var indexOf;
	
	if (Array.prototype.indexOf) {
	    indexOf = Array.prototype.indexOf;
	} else {
	    indexOf = function (o) {
	        // I know
	        var i;
	        for (i = 0; i < this.length; ++i) {
	            if (this[i] === o) {
	                return i;
	            }
	        }
	        return -1;
	    };
	}
	
	var indexOf$1 = indexOf;
	
	function daysInMonth(year, month) {
	    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	}
	
	// FORMATTING
	
	addFormatToken('M', ['MM', 2], 'Mo', function () {
	    return this.month() + 1;
	});
	
	addFormatToken('MMM', 0, 0, function (format) {
	    return this.localeData().monthsShort(this, format);
	});
	
	addFormatToken('MMMM', 0, 0, function (format) {
	    return this.localeData().months(this, format);
	});
	
	// ALIASES
	
	addUnitAlias('month', 'M');
	
	// PRIORITY
	
	addUnitPriority('month', 8);
	
	// PARSING
	
	addRegexToken('M',    match1to2);
	addRegexToken('MM',   match1to2, match2);
	addRegexToken('MMM',  function (isStrict, locale) {
	    return locale.monthsShortRegex(isStrict);
	});
	addRegexToken('MMMM', function (isStrict, locale) {
	    return locale.monthsRegex(isStrict);
	});
	
	addParseToken(['M', 'MM'], function (input, array) {
	    array[MONTH] = toInt(input) - 1;
	});
	
	addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	    var month = config._locale.monthsParse(input, token, config._strict);
	    // if we didn't find a month name, mark the date as invalid.
	    if (month != null) {
	        array[MONTH] = month;
	    } else {
	        getParsingFlags(config).invalidMonth = input;
	    }
	});
	
	// LOCALES
	
	var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	function localeMonths (m, format) {
	    if (!m) {
	        return this._months;
	    }
	    return isArray(this._months) ? this._months[m.month()] :
	        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	function localeMonthsShort (m, format) {
	    if (!m) {
	        return this._monthsShort;
	    }
	    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	function handleStrictParse(monthName, format, strict) {
	    var i, ii, mom, llc = monthName.toLocaleLowerCase();
	    if (!this._monthsParse) {
	        // this is not used
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	        for (i = 0; i < 12; ++i) {
	            mom = createUTC([2000, i]);
	            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeMonthsParse (monthName, format, strict) {
	    var i, mom, regex;
	
	    if (this._monthsParseExact) {
	        return handleStrictParse.call(this, monthName, format, strict);
	    }
	
	    if (!this._monthsParse) {
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	    }
	
	    // TODO: add sorting
	    // Sorting makes sure if one month (or abbr) is a prefix of another
	    // see sorting in computeMonthsParse
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        if (strict && !this._longMonthsParse[i]) {
	            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	        }
	        if (!strict && !this._monthsParse[i]) {
	            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (!strict && this._monthsParse[i].test(monthName)) {
	            return i;
	        }
	    }
	}
	
	// MOMENTS
	
	function setMonth (mom, value) {
	    var dayOfMonth;
	
	    if (!mom.isValid()) {
	        // No op
	        return mom;
	    }
	
	    if (typeof value === 'string') {
	        if (/^\d+$/.test(value)) {
	            value = toInt(value);
	        } else {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (!isNumber(value)) {
	                return mom;
	            }
	        }
	    }
	
	    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	    return mom;
	}
	
	function getSetMonth (value) {
	    if (value != null) {
	        setMonth(this, value);
	        hooks.updateOffset(this, true);
	        return this;
	    } else {
	        return get(this, 'Month');
	    }
	}
	
	function getDaysInMonth () {
	    return daysInMonth(this.year(), this.month());
	}
	
	var defaultMonthsShortRegex = matchWord;
	function monthsShortRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsShortStrictRegex;
	        } else {
	            return this._monthsShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsShortRegex')) {
	            this._monthsShortRegex = defaultMonthsShortRegex;
	        }
	        return this._monthsShortStrictRegex && isStrict ?
	            this._monthsShortStrictRegex : this._monthsShortRegex;
	    }
	}
	
	var defaultMonthsRegex = matchWord;
	function monthsRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsStrictRegex;
	        } else {
	            return this._monthsRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            this._monthsRegex = defaultMonthsRegex;
	        }
	        return this._monthsStrictRegex && isStrict ?
	            this._monthsStrictRegex : this._monthsRegex;
	    }
	}
	
	function computeMonthsParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom;
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        shortPieces.push(this.monthsShort(mom, ''));
	        longPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.monthsShort(mom, ''));
	    }
	    // Sorting makes sure if one month (or abbr) is a prefix of another it
	    // will match the longer piece.
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 12; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	    }
	    for (i = 0; i < 24; i++) {
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._monthsShortRegex = this._monthsRegex;
	    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	addFormatToken('Y', 0, 0, function () {
	    var y = this.year();
	    return y <= 9999 ? '' + y : '+' + y;
	});
	
	addFormatToken(0, ['YY', 2], 0, function () {
	    return this.year() % 100;
	});
	
	addFormatToken(0, ['YYYY',   4],       0, 'year');
	addFormatToken(0, ['YYYYY',  5],       0, 'year');
	addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	// ALIASES
	
	addUnitAlias('year', 'y');
	
	// PRIORITIES
	
	addUnitPriority('year', 1);
	
	// PARSING
	
	addRegexToken('Y',      matchSigned);
	addRegexToken('YY',     match1to2, match2);
	addRegexToken('YYYY',   match1to4, match4);
	addRegexToken('YYYYY',  match1to6, match6);
	addRegexToken('YYYYYY', match1to6, match6);
	
	addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	addParseToken('YYYY', function (input, array) {
	    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	});
	addParseToken('YY', function (input, array) {
	    array[YEAR] = hooks.parseTwoDigitYear(input);
	});
	addParseToken('Y', function (input, array) {
	    array[YEAR] = parseInt(input, 10);
	});
	
	// HELPERS
	
	function daysInYear(year) {
	    return isLeapYear(year) ? 366 : 365;
	}
	
	function isLeapYear(year) {
	    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	
	// HOOKS
	
	hooks.parseTwoDigitYear = function (input) {
	    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	};
	
	// MOMENTS
	
	var getSetYear = makeGetSet('FullYear', true);
	
	function getIsLeapYear () {
	    return isLeapYear(this.year());
	}
	
	function createDate (y, m, d, h, M, s, ms) {
	    //can't just apply() to create a date:
	    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	    var date = new Date(y, m, d, h, M, s, ms);
	
	    //the date constructor remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	        date.setFullYear(y);
	    }
	    return date;
	}
	
	function createUTCDate (y) {
	    var date = new Date(Date.UTC.apply(null, arguments));
	
	    //the Date.UTC function remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	        date.setUTCFullYear(y);
	    }
	    return date;
	}
	
	// start-of-first-week - start-of-year
	function firstWeekOffset(year, dow, doy) {
	    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	        fwd = 7 + dow - doy,
	        // first-week day local weekday -- which local weekday is fwd
	        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	
	    return -fwdlw + fwd - 1;
	}
	
	//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	    var localWeekday = (7 + weekday - dow) % 7,
	        weekOffset = firstWeekOffset(year, dow, doy),
	        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	        resYear, resDayOfYear;
	
	    if (dayOfYear <= 0) {
	        resYear = year - 1;
	        resDayOfYear = daysInYear(resYear) + dayOfYear;
	    } else if (dayOfYear > daysInYear(year)) {
	        resYear = year + 1;
	        resDayOfYear = dayOfYear - daysInYear(year);
	    } else {
	        resYear = year;
	        resDayOfYear = dayOfYear;
	    }
	
	    return {
	        year: resYear,
	        dayOfYear: resDayOfYear
	    };
	}
	
	function weekOfYear(mom, dow, doy) {
	    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	        resWeek, resYear;
	
	    if (week < 1) {
	        resYear = mom.year() - 1;
	        resWeek = week + weeksInYear(resYear, dow, doy);
	    } else if (week > weeksInYear(mom.year(), dow, doy)) {
	        resWeek = week - weeksInYear(mom.year(), dow, doy);
	        resYear = mom.year() + 1;
	    } else {
	        resYear = mom.year();
	        resWeek = week;
	    }
	
	    return {
	        week: resWeek,
	        year: resYear
	    };
	}
	
	function weeksInYear(year, dow, doy) {
	    var weekOffset = firstWeekOffset(year, dow, doy),
	        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	}
	
	// FORMATTING
	
	addFormatToken('w', ['ww', 2], 'wo', 'week');
	addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	// ALIASES
	
	addUnitAlias('week', 'w');
	addUnitAlias('isoWeek', 'W');
	
	// PRIORITIES
	
	addUnitPriority('week', 5);
	addUnitPriority('isoWeek', 5);
	
	// PARSING
	
	addRegexToken('w',  match1to2);
	addRegexToken('ww', match1to2, match2);
	addRegexToken('W',  match1to2);
	addRegexToken('WW', match1to2, match2);
	
	addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	    week[token.substr(0, 1)] = toInt(input);
	});
	
	// HELPERS
	
	// LOCALES
	
	function localeWeek (mom) {
	    return weekOfYear(mom, this._week.dow, this._week.doy).week;
	}
	
	var defaultLocaleWeek = {
	    dow : 0, // Sunday is the first day of the week.
	    doy : 6  // The week that contains Jan 1st is the first week of the year.
	};
	
	function localeFirstDayOfWeek () {
	    return this._week.dow;
	}
	
	function localeFirstDayOfYear () {
	    return this._week.doy;
	}
	
	// MOMENTS
	
	function getSetWeek (input) {
	    var week = this.localeData().week(this);
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}
	
	function getSetISOWeek (input) {
	    var week = weekOfYear(this, 1, 4).week;
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}
	
	// FORMATTING
	
	addFormatToken('d', 0, 'do', 'day');
	
	addFormatToken('dd', 0, 0, function (format) {
	    return this.localeData().weekdaysMin(this, format);
	});
	
	addFormatToken('ddd', 0, 0, function (format) {
	    return this.localeData().weekdaysShort(this, format);
	});
	
	addFormatToken('dddd', 0, 0, function (format) {
	    return this.localeData().weekdays(this, format);
	});
	
	addFormatToken('e', 0, 0, 'weekday');
	addFormatToken('E', 0, 0, 'isoWeekday');
	
	// ALIASES
	
	addUnitAlias('day', 'd');
	addUnitAlias('weekday', 'e');
	addUnitAlias('isoWeekday', 'E');
	
	// PRIORITY
	addUnitPriority('day', 11);
	addUnitPriority('weekday', 11);
	addUnitPriority('isoWeekday', 11);
	
	// PARSING
	
	addRegexToken('d',    match1to2);
	addRegexToken('e',    match1to2);
	addRegexToken('E',    match1to2);
	addRegexToken('dd',   function (isStrict, locale) {
	    return locale.weekdaysMinRegex(isStrict);
	});
	addRegexToken('ddd',   function (isStrict, locale) {
	    return locale.weekdaysShortRegex(isStrict);
	});
	addRegexToken('dddd',   function (isStrict, locale) {
	    return locale.weekdaysRegex(isStrict);
	});
	
	addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	    var weekday = config._locale.weekdaysParse(input, token, config._strict);
	    // if we didn't get a weekday name, mark the date as invalid
	    if (weekday != null) {
	        week.d = weekday;
	    } else {
	        getParsingFlags(config).invalidWeekday = input;
	    }
	});
	
	addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	    week[token] = toInt(input);
	});
	
	// HELPERS
	
	function parseWeekday(input, locale) {
	    if (typeof input !== 'string') {
	        return input;
	    }
	
	    if (!isNaN(input)) {
	        return parseInt(input, 10);
	    }
	
	    input = locale.weekdaysParse(input);
	    if (typeof input === 'number') {
	        return input;
	    }
	
	    return null;
	}
	
	function parseIsoWeekday(input, locale) {
	    if (typeof input === 'string') {
	        return locale.weekdaysParse(input) % 7 || 7;
	    }
	    return isNaN(input) ? null : input;
	}
	
	// LOCALES
	
	var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	function localeWeekdays (m, format) {
	    if (!m) {
	        return this._weekdays;
	    }
	    return isArray(this._weekdays) ? this._weekdays[m.day()] :
	        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	}
	
	var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	function localeWeekdaysShort (m) {
	    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	}
	
	var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	function localeWeekdaysMin (m) {
	    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	}
	
	function handleStrictParse$1(weekdayName, format, strict) {
	    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._minWeekdaysParse = [];
	
	        for (i = 0; i < 7; ++i) {
	            mom = createUTC([2000, 1]).day(i);
	            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeWeekdaysParse (weekdayName, format, strict) {
	    var i, mom, regex;
	
	    if (this._weekdaysParseExact) {
	        return handleStrictParse$1.call(this, weekdayName, format, strict);
	    }
	
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._minWeekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._fullWeekdaysParse = [];
	    }
	
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	
	        mom = createUTC([2000, 1]).day(i);
	        if (strict && !this._fullWeekdaysParse[i]) {
	            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	        }
	        if (!this._weekdaysParse[i]) {
	            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	            return i;
	        }
	    }
	}
	
	// MOMENTS
	
	function getSetDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	    if (input != null) {
	        input = parseWeekday(input, this.localeData());
	        return this.add(input - day, 'd');
	    } else {
	        return day;
	    }
	}
	
	function getSetLocaleDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	    return input == null ? weekday : this.add(input - weekday, 'd');
	}
	
	function getSetISODayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	
	    // behaves the same as moment#day except
	    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	    // as a setter, sunday should belong to the previous week.
	
	    if (input != null) {
	        var weekday = parseIsoWeekday(input, this.localeData());
	        return this.day(this.day() % 7 ? weekday : weekday - 7);
	    } else {
	        return this.day() || 7;
	    }
	}
	
	var defaultWeekdaysRegex = matchWord;
	function weekdaysRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysStrictRegex;
	        } else {
	            return this._weekdaysRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            this._weekdaysRegex = defaultWeekdaysRegex;
	        }
	        return this._weekdaysStrictRegex && isStrict ?
	            this._weekdaysStrictRegex : this._weekdaysRegex;
	    }
	}
	
	var defaultWeekdaysShortRegex = matchWord;
	function weekdaysShortRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysShortStrictRegex;
	        } else {
	            return this._weekdaysShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	        }
	        return this._weekdaysShortStrictRegex && isStrict ?
	            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	    }
	}
	
	var defaultWeekdaysMinRegex = matchWord;
	function weekdaysMinRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysMinStrictRegex;
	        } else {
	            return this._weekdaysMinRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	        }
	        return this._weekdaysMinStrictRegex && isStrict ?
	            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	    }
	}
	
	
	function computeWeekdaysParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom, minp, shortp, longp;
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);
	        minp = this.weekdaysMin(mom, '');
	        shortp = this.weekdaysShort(mom, '');
	        longp = this.weekdays(mom, '');
	        minPieces.push(minp);
	        shortPieces.push(shortp);
	        longPieces.push(longp);
	        mixedPieces.push(minp);
	        mixedPieces.push(shortp);
	        mixedPieces.push(longp);
	    }
	    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	    // will match the longer piece.
	    minPieces.sort(cmpLenRev);
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 7; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._weekdaysShortRegex = this._weekdaysRegex;
	    this._weekdaysMinRegex = this._weekdaysRegex;
	
	    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	function hFormat() {
	    return this.hours() % 12 || 12;
	}
	
	function kFormat() {
	    return this.hours() || 24;
	}
	
	addFormatToken('H', ['HH', 2], 0, 'hour');
	addFormatToken('h', ['hh', 2], 0, hFormat);
	addFormatToken('k', ['kk', 2], 0, kFormat);
	
	addFormatToken('hmm', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('hmmss', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});
	
	addFormatToken('Hmm', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('Hmmss', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});
	
	function meridiem (token, lowercase) {
	    addFormatToken(token, 0, 0, function () {
	        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	    });
	}
	
	meridiem('a', true);
	meridiem('A', false);
	
	// ALIASES
	
	addUnitAlias('hour', 'h');
	
	// PRIORITY
	addUnitPriority('hour', 13);
	
	// PARSING
	
	function matchMeridiem (isStrict, locale) {
	    return locale._meridiemParse;
	}
	
	addRegexToken('a',  matchMeridiem);
	addRegexToken('A',  matchMeridiem);
	addRegexToken('H',  match1to2);
	addRegexToken('h',  match1to2);
	addRegexToken('HH', match1to2, match2);
	addRegexToken('hh', match1to2, match2);
	
	addRegexToken('hmm', match3to4);
	addRegexToken('hmmss', match5to6);
	addRegexToken('Hmm', match3to4);
	addRegexToken('Hmmss', match5to6);
	
	addParseToken(['H', 'HH'], HOUR);
	addParseToken(['a', 'A'], function (input, array, config) {
	    config._isPm = config._locale.isPM(input);
	    config._meridiem = input;
	});
	addParseToken(['h', 'hh'], function (input, array, config) {
	    array[HOUR] = toInt(input);
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('Hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	});
	addParseToken('Hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	});
	
	// LOCALES
	
	function localeIsPM (input) {
	    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	    // Using charAt should be more compatible.
	    return ((input + '').toLowerCase().charAt(0) === 'p');
	}
	
	var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	function localeMeridiem (hours, minutes, isLower) {
	    if (hours > 11) {
	        return isLower ? 'pm' : 'PM';
	    } else {
	        return isLower ? 'am' : 'AM';
	    }
	}
	
	
	// MOMENTS
	
	// Setting the hour should keep the time, because the user explicitly
	// specified which hour he wants. So trying to maintain the same hour (in
	// a new timezone) makes sense. Adding/subtracting hours does not follow
	// this rule.
	var getSetHour = makeGetSet('Hours', true);
	
	// months
	// week
	// weekdays
	// meridiem
	var baseConfig = {
	    calendar: defaultCalendar,
	    longDateFormat: defaultLongDateFormat,
	    invalidDate: defaultInvalidDate,
	    ordinal: defaultOrdinal,
	    ordinalParse: defaultOrdinalParse,
	    relativeTime: defaultRelativeTime,
	
	    months: defaultLocaleMonths,
	    monthsShort: defaultLocaleMonthsShort,
	
	    week: defaultLocaleWeek,
	
	    weekdays: defaultLocaleWeekdays,
	    weekdaysMin: defaultLocaleWeekdaysMin,
	    weekdaysShort: defaultLocaleWeekdaysShort,
	
	    meridiemParse: defaultLocaleMeridiemParse
	};
	
	// internal storage for locale config files
	var locales = {};
	var localeFamilies = {};
	var globalLocale;
	
	function normalizeLocale(key) {
	    return key ? key.toLowerCase().replace('_', '-') : key;
	}
	
	// pick the locale from the array
	// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	function chooseLocale(names) {
	    var i = 0, j, next, locale, split;
	
	    while (i < names.length) {
	        split = normalizeLocale(names[i]).split('-');
	        j = split.length;
	        next = normalizeLocale(names[i + 1]);
	        next = next ? next.split('-') : null;
	        while (j > 0) {
	            locale = loadLocale(split.slice(0, j).join('-'));
	            if (locale) {
	                return locale;
	            }
	            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                //the next array item is better than a shallower substring of this one
	                break;
	            }
	            j--;
	        }
	        i++;
	    }
	    return null;
	}
	
	function loadLocale(name) {
	    var oldLocale = null;
	    // TODO: Find a better way to register and load all the locales in Node
	    if (!locales[name] && (typeof module !== 'undefined') &&
	            module && module.exports) {
	        try {
	            oldLocale = globalLocale._abbr;
	            __webpack_require__(11)("./" + name);
	            // because defineLocale currently also sets the global locale, we
	            // want to undo that for lazy loaded locales
	            getSetGlobalLocale(oldLocale);
	        } catch (e) { }
	    }
	    return locales[name];
	}
	
	// This function will load locale and then set the global locale.  If
	// no arguments are passed in, it will simply return the current global
	// locale key.
	function getSetGlobalLocale (key, values) {
	    var data;
	    if (key) {
	        if (isUndefined(values)) {
	            data = getLocale(key);
	        }
	        else {
	            data = defineLocale(key, values);
	        }
	
	        if (data) {
	            // moment.duration._locale = moment._locale = data;
	            globalLocale = data;
	        }
	    }
	
	    return globalLocale._abbr;
	}
	
	function defineLocale (name, config) {
	    if (config !== null) {
	        var parentConfig = baseConfig;
	        config.abbr = name;
	        if (locales[name] != null) {
	            deprecateSimple('defineLocaleOverride',
	                    'use moment.updateLocale(localeName, config) to change ' +
	                    'an existing locale. moment.defineLocale(localeName, ' +
	                    'config) should only be used for creating a new locale ' +
	                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	            parentConfig = locales[name]._config;
	        } else if (config.parentLocale != null) {
	            if (locales[config.parentLocale] != null) {
	                parentConfig = locales[config.parentLocale]._config;
	            } else {
	                if (!localeFamilies[config.parentLocale]) {
	                    localeFamilies[config.parentLocale] = [];
	                }
	                localeFamilies[config.parentLocale].push({
	                    name: name,
	                    config: config
	                });
	                return null;
	            }
	        }
	        locales[name] = new Locale(mergeConfigs(parentConfig, config));
	
	        if (localeFamilies[name]) {
	            localeFamilies[name].forEach(function (x) {
	                defineLocale(x.name, x.config);
	            });
	        }
	
	        // backwards compat for now: also set the locale
	        // make sure we set the locale AFTER all child locales have been
	        // created, so we won't end up with the child locale set.
	        getSetGlobalLocale(name);
	
	
	        return locales[name];
	    } else {
	        // useful for testing
	        delete locales[name];
	        return null;
	    }
	}
	
	function updateLocale(name, config) {
	    if (config != null) {
	        var locale, parentConfig = baseConfig;
	        // MERGE
	        if (locales[name] != null) {
	            parentConfig = locales[name]._config;
	        }
	        config = mergeConfigs(parentConfig, config);
	        locale = new Locale(config);
	        locale.parentLocale = locales[name];
	        locales[name] = locale;
	
	        // backwards compat for now: also set the locale
	        getSetGlobalLocale(name);
	    } else {
	        // pass null for config to unupdate, useful for tests
	        if (locales[name] != null) {
	            if (locales[name].parentLocale != null) {
	                locales[name] = locales[name].parentLocale;
	            } else if (locales[name] != null) {
	                delete locales[name];
	            }
	        }
	    }
	    return locales[name];
	}
	
	// returns locale data
	function getLocale (key) {
	    var locale;
	
	    if (key && key._locale && key._locale._abbr) {
	        key = key._locale._abbr;
	    }
	
	    if (!key) {
	        return globalLocale;
	    }
	
	    if (!isArray(key)) {
	        //short-circuit everything else
	        locale = loadLocale(key);
	        if (locale) {
	            return locale;
	        }
	        key = [key];
	    }
	
	    return chooseLocale(key);
	}
	
	function listLocales() {
	    return keys$1(locales);
	}
	
	function checkOverflow (m) {
	    var overflow;
	    var a = m._a;
	
	    if (a && getParsingFlags(m).overflow === -2) {
	        overflow =
	            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	            -1;
	
	        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	            overflow = DATE;
	        }
	        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	            overflow = WEEK;
	        }
	        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	            overflow = WEEKDAY;
	        }
	
	        getParsingFlags(m).overflow = overflow;
	    }
	
	    return m;
	}
	
	// iso 8601 regex
	// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	
	var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	
	var isoDates = [
	    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	    ['YYYY-DDD', /\d{4}-\d{3}/],
	    ['YYYY-MM', /\d{4}-\d\d/, false],
	    ['YYYYYYMMDD', /[+-]\d{10}/],
	    ['YYYYMMDD', /\d{8}/],
	    // YYYYMM is NOT allowed by the standard
	    ['GGGG[W]WWE', /\d{4}W\d{3}/],
	    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	    ['YYYYDDD', /\d{7}/]
	];
	
	// iso time formats and regexes
	var isoTimes = [
	    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	    ['HH:mm', /\d\d:\d\d/],
	    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	    ['HHmmss', /\d\d\d\d\d\d/],
	    ['HHmm', /\d\d\d\d/],
	    ['HH', /\d\d/]
	];
	
	var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	// date from iso format
	function configFromISO(config) {
	    var i, l,
	        string = config._i,
	        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	        allowTime, dateFormat, timeFormat, tzFormat;
	
	    if (match) {
	        getParsingFlags(config).iso = true;
	
	        for (i = 0, l = isoDates.length; i < l; i++) {
	            if (isoDates[i][1].exec(match[1])) {
	                dateFormat = isoDates[i][0];
	                allowTime = isoDates[i][2] !== false;
	                break;
	            }
	        }
	        if (dateFormat == null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[3]) {
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(match[3])) {
	                    // match[2] should be 'T' or space
	                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (timeFormat == null) {
	                config._isValid = false;
	                return;
	            }
	        }
	        if (!allowTime && timeFormat != null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[4]) {
	            if (tzRegex.exec(match[4])) {
	                tzFormat = 'Z';
	            } else {
	                config._isValid = false;
	                return;
	            }
	        }
	        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	        configFromStringAndFormat(config);
	    } else {
	        config._isValid = false;
	    }
	}
	
	// date from iso format or fallback
	function configFromString(config) {
	    var matched = aspNetJsonRegex.exec(config._i);
	
	    if (matched !== null) {
	        config._d = new Date(+matched[1]);
	        return;
	    }
	
	    configFromISO(config);
	    if (config._isValid === false) {
	        delete config._isValid;
	        hooks.createFromInputFallback(config);
	    }
	}
	
	hooks.createFromInputFallback = deprecate(
	    'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	    'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	    'discouraged and will be removed in an upcoming major release. Please refer to ' +
	    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	    function (config) {
	        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	    }
	);
	
	// Pick the first defined of two or three arguments.
	function defaults(a, b, c) {
	    if (a != null) {
	        return a;
	    }
	    if (b != null) {
	        return b;
	    }
	    return c;
	}
	
	function currentDateArray(config) {
	    // hooks is actually the exported moment object
	    var nowValue = new Date(hooks.now());
	    if (config._useUTC) {
	        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	    }
	    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	}
	
	// convert an array to a date.
	// the array should mirror the parameters below
	// note: all values past the year are optional and will default to the lowest possible value.
	// [year, month, day , hour, minute, second, millisecond]
	function configFromArray (config) {
	    var i, date, input = [], currentDate, yearToUse;
	
	    if (config._d) {
	        return;
	    }
	
	    currentDate = currentDateArray(config);
	
	    //compute day of the year from weeks and weekdays
	    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	        dayOfYearFromWeekInfo(config);
	    }
	
	    //if the day of the year is set, figure out what it is
	    if (config._dayOfYear) {
	        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	        if (config._dayOfYear > daysInYear(yearToUse)) {
	            getParsingFlags(config)._overflowDayOfYear = true;
	        }
	
	        date = createUTCDate(yearToUse, 0, config._dayOfYear);
	        config._a[MONTH] = date.getUTCMonth();
	        config._a[DATE] = date.getUTCDate();
	    }
	
	    // Default to current date.
	    // * if no year, month, day of month are given, default to today
	    // * if day of month is given, default month and year
	    // * if month is given, default only year
	    // * if year is given, don't default anything
	    for (i = 0; i < 3 && config._a[i] == null; ++i) {
	        config._a[i] = input[i] = currentDate[i];
	    }
	
	    // Zero out whatever was not defaulted, including time
	    for (; i < 7; i++) {
	        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	    }
	
	    // Check for 24:00:00.000
	    if (config._a[HOUR] === 24 &&
	            config._a[MINUTE] === 0 &&
	            config._a[SECOND] === 0 &&
	            config._a[MILLISECOND] === 0) {
	        config._nextDay = true;
	        config._a[HOUR] = 0;
	    }
	
	    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	    // Apply timezone offset from input. The actual utcOffset can be changed
	    // with parseZone.
	    if (config._tzm != null) {
	        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	    }
	
	    if (config._nextDay) {
	        config._a[HOUR] = 24;
	    }
	}
	
	function dayOfYearFromWeekInfo(config) {
	    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	
	    w = config._w;
	    if (w.GG != null || w.W != null || w.E != null) {
	        dow = 1;
	        doy = 4;
	
	        // TODO: We need to take the current isoWeekYear, but that depends on
	        // how we interpret now (local, utc, fixed offset). So create
	        // a now version of current config (take local/utc/offset flags, and
	        // create now).
	        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
	        week = defaults(w.W, 1);
	        weekday = defaults(w.E, 1);
	        if (weekday < 1 || weekday > 7) {
	            weekdayOverflow = true;
	        }
	    } else {
	        dow = config._locale._week.dow;
	        doy = config._locale._week.doy;
	
	        var curWeek = weekOfYear(createLocal(), dow, doy);
	
	        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
	
	        // Default to current week.
	        week = defaults(w.w, curWeek.week);
	
	        if (w.d != null) {
	            // weekday -- low day numbers are considered next week
	            weekday = w.d;
	            if (weekday < 0 || weekday > 6) {
	                weekdayOverflow = true;
	            }
	        } else if (w.e != null) {
	            // local weekday -- counting starts from begining of week
	            weekday = w.e + dow;
	            if (w.e < 0 || w.e > 6) {
	                weekdayOverflow = true;
	            }
	        } else {
	            // default to begining of week
	            weekday = dow;
	        }
	    }
	    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	        getParsingFlags(config)._overflowWeeks = true;
	    } else if (weekdayOverflow != null) {
	        getParsingFlags(config)._overflowWeekday = true;
	    } else {
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	}
	
	// constant that refers to the ISO standard
	hooks.ISO_8601 = function () {};
	
	// date from string and format string
	function configFromStringAndFormat(config) {
	    // TODO: Move this to another part of the creation flow to prevent circular deps
	    if (config._f === hooks.ISO_8601) {
	        configFromISO(config);
	        return;
	    }
	
	    config._a = [];
	    getParsingFlags(config).empty = true;
	
	    // This array is used to make a Date, either with `new Date` or `Date.UTC`
	    var string = '' + config._i,
	        i, parsedInput, tokens, token, skipped,
	        stringLength = string.length,
	        totalParsedInputLength = 0;
	
	    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	        // console.log('token', token, 'parsedInput', parsedInput,
	        //         'regex', getParseRegexForToken(token, config));
	        if (parsedInput) {
	            skipped = string.substr(0, string.indexOf(parsedInput));
	            if (skipped.length > 0) {
	                getParsingFlags(config).unusedInput.push(skipped);
	            }
	            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	            totalParsedInputLength += parsedInput.length;
	        }
	        // don't parse if it's not a known token
	        if (formatTokenFunctions[token]) {
	            if (parsedInput) {
	                getParsingFlags(config).empty = false;
	            }
	            else {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	            addTimeToArrayFromToken(token, parsedInput, config);
	        }
	        else if (config._strict && !parsedInput) {
	            getParsingFlags(config).unusedTokens.push(token);
	        }
	    }
	
	    // add remaining unparsed input length to the string
	    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	    if (string.length > 0) {
	        getParsingFlags(config).unusedInput.push(string);
	    }
	
	    // clear _12h flag if hour is <= 12
	    if (config._a[HOUR] <= 12 &&
	        getParsingFlags(config).bigHour === true &&
	        config._a[HOUR] > 0) {
	        getParsingFlags(config).bigHour = undefined;
	    }
	
	    getParsingFlags(config).parsedDateParts = config._a.slice(0);
	    getParsingFlags(config).meridiem = config._meridiem;
	    // handle meridiem
	    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	    configFromArray(config);
	    checkOverflow(config);
	}
	
	
	function meridiemFixWrap (locale, hour, meridiem) {
	    var isPm;
	
	    if (meridiem == null) {
	        // nothing to do
	        return hour;
	    }
	    if (locale.meridiemHour != null) {
	        return locale.meridiemHour(hour, meridiem);
	    } else if (locale.isPM != null) {
	        // Fallback
	        isPm = locale.isPM(meridiem);
	        if (isPm && hour < 12) {
	            hour += 12;
	        }
	        if (!isPm && hour === 12) {
	            hour = 0;
	        }
	        return hour;
	    } else {
	        // this is not supposed to happen
	        return hour;
	    }
	}
	
	// date from string and array of format strings
	function configFromStringAndArray(config) {
	    var tempConfig,
	        bestMoment,
	
	        scoreToBeat,
	        i,
	        currentScore;
	
	    if (config._f.length === 0) {
	        getParsingFlags(config).invalidFormat = true;
	        config._d = new Date(NaN);
	        return;
	    }
	
	    for (i = 0; i < config._f.length; i++) {
	        currentScore = 0;
	        tempConfig = copyConfig({}, config);
	        if (config._useUTC != null) {
	            tempConfig._useUTC = config._useUTC;
	        }
	        tempConfig._f = config._f[i];
	        configFromStringAndFormat(tempConfig);
	
	        if (!isValid(tempConfig)) {
	            continue;
	        }
	
	        // if there is any input that was not parsed add a penalty for that format
	        currentScore += getParsingFlags(tempConfig).charsLeftOver;
	
	        //or tokens
	        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	
	        getParsingFlags(tempConfig).score = currentScore;
	
	        if (scoreToBeat == null || currentScore < scoreToBeat) {
	            scoreToBeat = currentScore;
	            bestMoment = tempConfig;
	        }
	    }
	
	    extend(config, bestMoment || tempConfig);
	}
	
	function configFromObject(config) {
	    if (config._d) {
	        return;
	    }
	
	    var i = normalizeObjectUnits(config._i);
	    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	        return obj && parseInt(obj, 10);
	    });
	
	    configFromArray(config);
	}
	
	function createFromConfig (config) {
	    var res = new Moment(checkOverflow(prepareConfig(config)));
	    if (res._nextDay) {
	        // Adding is smart enough around DST
	        res.add(1, 'd');
	        res._nextDay = undefined;
	    }
	
	    return res;
	}
	
	function prepareConfig (config) {
	    var input = config._i,
	        format = config._f;
	
	    config._locale = config._locale || getLocale(config._l);
	
	    if (input === null || (format === undefined && input === '')) {
	        return createInvalid({nullInput: true});
	    }
	
	    if (typeof input === 'string') {
	        config._i = input = config._locale.preparse(input);
	    }
	
	    if (isMoment(input)) {
	        return new Moment(checkOverflow(input));
	    } else if (isDate(input)) {
	        config._d = input;
	    } else if (isArray(format)) {
	        configFromStringAndArray(config);
	    } else if (format) {
	        configFromStringAndFormat(config);
	    }  else {
	        configFromInput(config);
	    }
	
	    if (!isValid(config)) {
	        config._d = null;
	    }
	
	    return config;
	}
	
	function configFromInput(config) {
	    var input = config._i;
	    if (input === undefined) {
	        config._d = new Date(hooks.now());
	    } else if (isDate(input)) {
	        config._d = new Date(input.valueOf());
	    } else if (typeof input === 'string') {
	        configFromString(config);
	    } else if (isArray(input)) {
	        config._a = map(input.slice(0), function (obj) {
	            return parseInt(obj, 10);
	        });
	        configFromArray(config);
	    } else if (typeof(input) === 'object') {
	        configFromObject(config);
	    } else if (isNumber(input)) {
	        // from milliseconds
	        config._d = new Date(input);
	    } else {
	        hooks.createFromInputFallback(config);
	    }
	}
	
	function createLocalOrUTC (input, format, locale, strict, isUTC) {
	    var c = {};
	
	    if (locale === true || locale === false) {
	        strict = locale;
	        locale = undefined;
	    }
	
	    if ((isObject(input) && isObjectEmpty(input)) ||
	            (isArray(input) && input.length === 0)) {
	        input = undefined;
	    }
	    // object construction must be done this way.
	    // https://github.com/moment/moment/issues/1423
	    c._isAMomentObject = true;
	    c._useUTC = c._isUTC = isUTC;
	    c._l = locale;
	    c._i = input;
	    c._f = format;
	    c._strict = strict;
	
	    return createFromConfig(c);
	}
	
	function createLocal (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, false);
	}
	
	var prototypeMin = deprecate(
	    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other < this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);
	
	var prototypeMax = deprecate(
	    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other > this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);
	
	// Pick a moment m from moments so that m[fn](other) is true for all
	// other. This relies on the function fn to be transitive.
	//
	// moments should either be an array of moment objects or an array, whose
	// first element is an array of moment objects.
	function pickBy(fn, moments) {
	    var res, i;
	    if (moments.length === 1 && isArray(moments[0])) {
	        moments = moments[0];
	    }
	    if (!moments.length) {
	        return createLocal();
	    }
	    res = moments[0];
	    for (i = 1; i < moments.length; ++i) {
	        if (!moments[i].isValid() || moments[i][fn](res)) {
	            res = moments[i];
	        }
	    }
	    return res;
	}
	
	// TODO: Use [].sort instead?
	function min () {
	    var args = [].slice.call(arguments, 0);
	
	    return pickBy('isBefore', args);
	}
	
	function max () {
	    var args = [].slice.call(arguments, 0);
	
	    return pickBy('isAfter', args);
	}
	
	var now = function () {
	    return Date.now ? Date.now() : +(new Date());
	};
	
	function Duration (duration) {
	    var normalizedInput = normalizeObjectUnits(duration),
	        years = normalizedInput.year || 0,
	        quarters = normalizedInput.quarter || 0,
	        months = normalizedInput.month || 0,
	        weeks = normalizedInput.week || 0,
	        days = normalizedInput.day || 0,
	        hours = normalizedInput.hour || 0,
	        minutes = normalizedInput.minute || 0,
	        seconds = normalizedInput.second || 0,
	        milliseconds = normalizedInput.millisecond || 0;
	
	    // representation for dateAddRemove
	    this._milliseconds = +milliseconds +
	        seconds * 1e3 + // 1000
	        minutes * 6e4 + // 1000 * 60
	        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	    // Because of dateAddRemove treats 24 hours as different from a
	    // day when working around DST, we need to store them separately
	    this._days = +days +
	        weeks * 7;
	    // It is impossible translate months into days without knowing
	    // which months you are are talking about, so we have to store
	    // it separately.
	    this._months = +months +
	        quarters * 3 +
	        years * 12;
	
	    this._data = {};
	
	    this._locale = getLocale();
	
	    this._bubble();
	}
	
	function isDuration (obj) {
	    return obj instanceof Duration;
	}
	
	function absRound (number) {
	    if (number < 0) {
	        return Math.round(-1 * number) * -1;
	    } else {
	        return Math.round(number);
	    }
	}
	
	// FORMATTING
	
	function offset (token, separator) {
	    addFormatToken(token, 0, 0, function () {
	        var offset = this.utcOffset();
	        var sign = '+';
	        if (offset < 0) {
	            offset = -offset;
	            sign = '-';
	        }
	        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	    });
	}
	
	offset('Z', ':');
	offset('ZZ', '');
	
	// PARSING
	
	addRegexToken('Z',  matchShortOffset);
	addRegexToken('ZZ', matchShortOffset);
	addParseToken(['Z', 'ZZ'], function (input, array, config) {
	    config._useUTC = true;
	    config._tzm = offsetFromString(matchShortOffset, input);
	});
	
	// HELPERS
	
	// timezone chunker
	// '+10:00' > ['10',  '00']
	// '-1530'  > ['-15', '30']
	var chunkOffset = /([\+\-]|\d\d)/gi;
	
	function offsetFromString(matcher, string) {
	    var matches = (string || '').match(matcher);
	
	    if (matches === null) {
	        return null;
	    }
	
	    var chunk   = matches[matches.length - 1] || [];
	    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	    var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	    return minutes === 0 ?
	      0 :
	      parts[0] === '+' ? minutes : -minutes;
	}
	
	// Return a moment from input, that is local/utc/zone equivalent to model.
	function cloneWithOffset(input, model) {
	    var res, diff;
	    if (model._isUTC) {
	        res = model.clone();
	        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
	        // Use low-level api, because this fn is low-level api.
	        res._d.setTime(res._d.valueOf() + diff);
	        hooks.updateOffset(res, false);
	        return res;
	    } else {
	        return createLocal(input).local();
	    }
	}
	
	function getDateOffset (m) {
	    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	    // https://github.com/moment/moment/pull/1871
	    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	}
	
	// HOOKS
	
	// This function will be called whenever a moment is mutated.
	// It is intended to keep the offset in sync with the timezone.
	hooks.updateOffset = function () {};
	
	// MOMENTS
	
	// keepLocalTime = true means only change the timezone, without
	// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	// +0200, so we adjust the time as needed, to be valid.
	//
	// Keeping the time actually adds/subtracts (one hour)
	// from the actual represented time. That is why we call updateOffset
	// a second time. In case it wants us to change the offset again
	// _changeInProgress == true case, then we have to adjust, because
	// there is no such time in the given timezone.
	function getSetOffset (input, keepLocalTime) {
	    var offset = this._offset || 0,
	        localAdjust;
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    if (input != null) {
	        if (typeof input === 'string') {
	            input = offsetFromString(matchShortOffset, input);
	            if (input === null) {
	                return this;
	            }
	        } else if (Math.abs(input) < 16) {
	            input = input * 60;
	        }
	        if (!this._isUTC && keepLocalTime) {
	            localAdjust = getDateOffset(this);
	        }
	        this._offset = input;
	        this._isUTC = true;
	        if (localAdjust != null) {
	            this.add(localAdjust, 'm');
	        }
	        if (offset !== input) {
	            if (!keepLocalTime || this._changeInProgress) {
	                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
	            } else if (!this._changeInProgress) {
	                this._changeInProgress = true;
	                hooks.updateOffset(this, true);
	                this._changeInProgress = null;
	            }
	        }
	        return this;
	    } else {
	        return this._isUTC ? offset : getDateOffset(this);
	    }
	}
	
	function getSetZone (input, keepLocalTime) {
	    if (input != null) {
	        if (typeof input !== 'string') {
	            input = -input;
	        }
	
	        this.utcOffset(input, keepLocalTime);
	
	        return this;
	    } else {
	        return -this.utcOffset();
	    }
	}
	
	function setOffsetToUTC (keepLocalTime) {
	    return this.utcOffset(0, keepLocalTime);
	}
	
	function setOffsetToLocal (keepLocalTime) {
	    if (this._isUTC) {
	        this.utcOffset(0, keepLocalTime);
	        this._isUTC = false;
	
	        if (keepLocalTime) {
	            this.subtract(getDateOffset(this), 'm');
	        }
	    }
	    return this;
	}
	
	function setOffsetToParsedOffset () {
	    if (this._tzm != null) {
	        this.utcOffset(this._tzm);
	    } else if (typeof this._i === 'string') {
	        var tZone = offsetFromString(matchOffset, this._i);
	        if (tZone != null) {
	            this.utcOffset(tZone);
	        }
	        else {
	            this.utcOffset(0, true);
	        }
	    }
	    return this;
	}
	
	function hasAlignedHourOffset (input) {
	    if (!this.isValid()) {
	        return false;
	    }
	    input = input ? createLocal(input).utcOffset() : 0;
	
	    return (this.utcOffset() - input) % 60 === 0;
	}
	
	function isDaylightSavingTime () {
	    return (
	        this.utcOffset() > this.clone().month(0).utcOffset() ||
	        this.utcOffset() > this.clone().month(5).utcOffset()
	    );
	}
	
	function isDaylightSavingTimeShifted () {
	    if (!isUndefined(this._isDSTShifted)) {
	        return this._isDSTShifted;
	    }
	
	    var c = {};
	
	    copyConfig(c, this);
	    c = prepareConfig(c);
	
	    if (c._a) {
	        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	        this._isDSTShifted = this.isValid() &&
	            compareArrays(c._a, other.toArray()) > 0;
	    } else {
	        this._isDSTShifted = false;
	    }
	
	    return this._isDSTShifted;
	}
	
	function isLocal () {
	    return this.isValid() ? !this._isUTC : false;
	}
	
	function isUtcOffset () {
	    return this.isValid() ? this._isUTC : false;
	}
	
	function isUtc () {
	    return this.isValid() ? this._isUTC && this._offset === 0 : false;
	}
	
	// ASP.NET json date format regex
	var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
	
	// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	// and further modified to allow for strings containing both week and day
	var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	
	function createDuration (input, key) {
	    var duration = input,
	        // matching against regexp is expensive, do it on demand
	        match = null,
	        sign,
	        ret,
	        diffRes;
	
	    if (isDuration(input)) {
	        duration = {
	            ms : input._milliseconds,
	            d  : input._days,
	            M  : input._months
	        };
	    } else if (isNumber(input)) {
	        duration = {};
	        if (key) {
	            duration[key] = input;
	        } else {
	            duration.milliseconds = input;
	        }
	    } else if (!!(match = aspNetRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y  : 0,
	            d  : toInt(match[DATE])                         * sign,
	            h  : toInt(match[HOUR])                         * sign,
	            m  : toInt(match[MINUTE])                       * sign,
	            s  : toInt(match[SECOND])                       * sign,
	            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	        };
	    } else if (!!(match = isoRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y : parseIso(match[2], sign),
	            M : parseIso(match[3], sign),
	            w : parseIso(match[4], sign),
	            d : parseIso(match[5], sign),
	            h : parseIso(match[6], sign),
	            m : parseIso(match[7], sign),
	            s : parseIso(match[8], sign)
	        };
	    } else if (duration == null) {// checks for null or undefined
	        duration = {};
	    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
	
	        duration = {};
	        duration.ms = diffRes.milliseconds;
	        duration.M = diffRes.months;
	    }
	
	    ret = new Duration(duration);
	
	    if (isDuration(input) && hasOwnProp(input, '_locale')) {
	        ret._locale = input._locale;
	    }
	
	    return ret;
	}
	
	createDuration.fn = Duration.prototype;
	
	function parseIso (inp, sign) {
	    // We'd normally use ~~inp for this, but unfortunately it also
	    // converts floats to ints.
	    // inp may be undefined, so careful calling replace on it.
	    var res = inp && parseFloat(inp.replace(',', '.'));
	    // apply sign while we're at it
	    return (isNaN(res) ? 0 : res) * sign;
	}
	
	function positiveMomentsDifference(base, other) {
	    var res = {milliseconds: 0, months: 0};
	
	    res.months = other.month() - base.month() +
	        (other.year() - base.year()) * 12;
	    if (base.clone().add(res.months, 'M').isAfter(other)) {
	        --res.months;
	    }
	
	    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	    return res;
	}
	
	function momentsDifference(base, other) {
	    var res;
	    if (!(base.isValid() && other.isValid())) {
	        return {milliseconds: 0, months: 0};
	    }
	
	    other = cloneWithOffset(other, base);
	    if (base.isBefore(other)) {
	        res = positiveMomentsDifference(base, other);
	    } else {
	        res = positiveMomentsDifference(other, base);
	        res.milliseconds = -res.milliseconds;
	        res.months = -res.months;
	    }
	
	    return res;
	}
	
	// TODO: remove 'name' arg after deprecation is removed
	function createAdder(direction, name) {
	    return function (val, period) {
	        var dur, tmp;
	        //invert the arguments, but complain about it
	        if (period !== null && !isNaN(+period)) {
	            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	            tmp = val; val = period; period = tmp;
	        }
	
	        val = typeof val === 'string' ? +val : val;
	        dur = createDuration(val, period);
	        addSubtract(this, dur, direction);
	        return this;
	    };
	}
	
	function addSubtract (mom, duration, isAdding, updateOffset) {
	    var milliseconds = duration._milliseconds,
	        days = absRound(duration._days),
	        months = absRound(duration._months);
	
	    if (!mom.isValid()) {
	        // No op
	        return;
	    }
	
	    updateOffset = updateOffset == null ? true : updateOffset;
	
	    if (milliseconds) {
	        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	    }
	    if (days) {
	        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	    }
	    if (months) {
	        setMonth(mom, get(mom, 'Month') + months * isAdding);
	    }
	    if (updateOffset) {
	        hooks.updateOffset(mom, days || months);
	    }
	}
	
	var add      = createAdder(1, 'add');
	var subtract = createAdder(-1, 'subtract');
	
	function getCalendarFormat(myMoment, now) {
	    var diff = myMoment.diff(now, 'days', true);
	    return diff < -6 ? 'sameElse' :
	            diff < -1 ? 'lastWeek' :
	            diff < 0 ? 'lastDay' :
	            diff < 1 ? 'sameDay' :
	            diff < 2 ? 'nextDay' :
	            diff < 7 ? 'nextWeek' : 'sameElse';
	}
	
	function calendar$1 (time, formats) {
	    // We want to compare the start of today, vs this.
	    // Getting start-of-today depends on whether we're local/utc/offset or not.
	    var now = time || createLocal(),
	        sod = cloneWithOffset(now, this).startOf('day'),
	        format = hooks.calendarFormat(this, sod) || 'sameElse';
	
	    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
	
	    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
	}
	
	function clone () {
	    return new Moment(this);
	}
	
	function isAfter (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() > localInput.valueOf();
	    } else {
	        return localInput.valueOf() < this.clone().startOf(units).valueOf();
	    }
	}
	
	function isBefore (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() < localInput.valueOf();
	    } else {
	        return this.clone().endOf(units).valueOf() < localInput.valueOf();
	    }
	}
	
	function isBetween (from, to, units, inclusivity) {
	    inclusivity = inclusivity || '()';
	    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	}
	
	function isSame (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input),
	        inputMs;
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(units || 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() === localInput.valueOf();
	    } else {
	        inputMs = localInput.valueOf();
	        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	    }
	}
	
	function isSameOrAfter (input, units) {
	    return this.isSame(input, units) || this.isAfter(input,units);
	}
	
	function isSameOrBefore (input, units) {
	    return this.isSame(input, units) || this.isBefore(input,units);
	}
	
	function diff (input, units, asFloat) {
	    var that,
	        zoneDelta,
	        delta, output;
	
	    if (!this.isValid()) {
	        return NaN;
	    }
	
	    that = cloneWithOffset(input, this);
	
	    if (!that.isValid()) {
	        return NaN;
	    }
	
	    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	
	    units = normalizeUnits(units);
	
	    if (units === 'year' || units === 'month' || units === 'quarter') {
	        output = monthDiff(this, that);
	        if (units === 'quarter') {
	            output = output / 3;
	        } else if (units === 'year') {
	            output = output / 12;
	        }
	    } else {
	        delta = this - that;
	        output = units === 'second' ? delta / 1e3 : // 1000
	            units === 'minute' ? delta / 6e4 : // 1000 * 60
	            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	            delta;
	    }
	    return asFloat ? output : absFloor(output);
	}
	
	function monthDiff (a, b) {
	    // difference in months
	    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	        // b is in (anchor - 1 month, anchor + 1 month)
	        anchor = a.clone().add(wholeMonthDiff, 'months'),
	        anchor2, adjust;
	
	    if (b - anchor < 0) {
	        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor - anchor2);
	    } else {
	        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor2 - anchor);
	    }
	
	    //check for negative zero, return zero if negative zero
	    return -(wholeMonthDiff + adjust) || 0;
	}
	
	hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
	
	function toString () {
	    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	}
	
	function toISOString () {
	    var m = this.clone().utc();
	    if (0 < m.year() && m.year() <= 9999) {
	        if (isFunction(Date.prototype.toISOString)) {
	            // native implementation is ~50x faster, use it when we can
	            return this.toDate().toISOString();
	        } else {
	            return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    } else {
	        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	    }
	}
	
	/**
	 * Return a human readable representation of a moment that can
	 * also be evaluated to get a new moment which is the same
	 *
	 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	 */
	function inspect () {
	    if (!this.isValid()) {
	        return 'moment.invalid(/* ' + this._i + ' */)';
	    }
	    var func = 'moment';
	    var zone = '';
	    if (!this.isLocal()) {
	        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	        zone = 'Z';
	    }
	    var prefix = '[' + func + '("]';
	    var year = (0 < this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
	    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
	    var suffix = zone + '[")]';
	
	    return this.format(prefix + year + datetime + suffix);
	}
	
	function format (inputString) {
	    if (!inputString) {
	        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
	    }
	    var output = formatMoment(this, inputString);
	    return this.localeData().postformat(output);
	}
	
	function from (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function fromNow (withoutSuffix) {
	    return this.from(createLocal(), withoutSuffix);
	}
	
	function to (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function toNow (withoutSuffix) {
	    return this.to(createLocal(), withoutSuffix);
	}
	
	// If passed a locale key, it will set the locale for this
	// instance.  Otherwise, it will return the locale configuration
	// variables for this instance.
	function locale (key) {
	    var newLocaleData;
	
	    if (key === undefined) {
	        return this._locale._abbr;
	    } else {
	        newLocaleData = getLocale(key);
	        if (newLocaleData != null) {
	            this._locale = newLocaleData;
	        }
	        return this;
	    }
	}
	
	var lang = deprecate(
	    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	    function (key) {
	        if (key === undefined) {
	            return this.localeData();
	        } else {
	            return this.locale(key);
	        }
	    }
	);
	
	function localeData () {
	    return this._locale;
	}
	
	function startOf (units) {
	    units = normalizeUnits(units);
	    // the following switch intentionally omits break keywords
	    // to utilize falling through the cases.
	    switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	        case 'date':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	    }
	
	    // weeks are a special case
	    if (units === 'week') {
	        this.weekday(0);
	    }
	    if (units === 'isoWeek') {
	        this.isoWeekday(1);
	    }
	
	    // quarters are also special
	    if (units === 'quarter') {
	        this.month(Math.floor(this.month() / 3) * 3);
	    }
	
	    return this;
	}
	
	function endOf (units) {
	    units = normalizeUnits(units);
	    if (units === undefined || units === 'millisecond') {
	        return this;
	    }
	
	    // 'date' is an alias for 'day', so it should be considered as such.
	    if (units === 'date') {
	        units = 'day';
	    }
	
	    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	}
	
	function valueOf () {
	    return this._d.valueOf() - ((this._offset || 0) * 60000);
	}
	
	function unix () {
	    return Math.floor(this.valueOf() / 1000);
	}
	
	function toDate () {
	    return new Date(this.valueOf());
	}
	
	function toArray () {
	    var m = this;
	    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	}
	
	function toObject () {
	    var m = this;
	    return {
	        years: m.year(),
	        months: m.month(),
	        date: m.date(),
	        hours: m.hours(),
	        minutes: m.minutes(),
	        seconds: m.seconds(),
	        milliseconds: m.milliseconds()
	    };
	}
	
	function toJSON () {
	    // new Date(NaN).toJSON() === null
	    return this.isValid() ? this.toISOString() : null;
	}
	
	function isValid$1 () {
	    return isValid(this);
	}
	
	function parsingFlags () {
	    return extend({}, getParsingFlags(this));
	}
	
	function invalidAt () {
	    return getParsingFlags(this).overflow;
	}
	
	function creationData() {
	    return {
	        input: this._i,
	        format: this._f,
	        locale: this._locale,
	        isUTC: this._isUTC,
	        strict: this._strict
	    };
	}
	
	// FORMATTING
	
	addFormatToken(0, ['gg', 2], 0, function () {
	    return this.weekYear() % 100;
	});
	
	addFormatToken(0, ['GG', 2], 0, function () {
	    return this.isoWeekYear() % 100;
	});
	
	function addWeekYearFormatToken (token, getter) {
	    addFormatToken(0, [token, token.length], 0, getter);
	}
	
	addWeekYearFormatToken('gggg',     'weekYear');
	addWeekYearFormatToken('ggggg',    'weekYear');
	addWeekYearFormatToken('GGGG',  'isoWeekYear');
	addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	// ALIASES
	
	addUnitAlias('weekYear', 'gg');
	addUnitAlias('isoWeekYear', 'GG');
	
	// PRIORITY
	
	addUnitPriority('weekYear', 1);
	addUnitPriority('isoWeekYear', 1);
	
	
	// PARSING
	
	addRegexToken('G',      matchSigned);
	addRegexToken('g',      matchSigned);
	addRegexToken('GG',     match1to2, match2);
	addRegexToken('gg',     match1to2, match2);
	addRegexToken('GGGG',   match1to4, match4);
	addRegexToken('gggg',   match1to4, match4);
	addRegexToken('GGGGG',  match1to6, match6);
	addRegexToken('ggggg',  match1to6, match6);
	
	addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	    week[token.substr(0, 2)] = toInt(input);
	});
	
	addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	    week[token] = hooks.parseTwoDigitYear(input);
	});
	
	// MOMENTS
	
	function getSetWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy);
	}
	
	function getSetISOWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input, this.isoWeek(), this.isoWeekday(), 1, 4);
	}
	
	function getISOWeeksInYear () {
	    return weeksInYear(this.year(), 1, 4);
	}
	
	function getWeeksInYear () {
	    var weekInfo = this.localeData()._week;
	    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	}
	
	function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	    var weeksTarget;
	    if (input == null) {
	        return weekOfYear(this, dow, doy).year;
	    } else {
	        weeksTarget = weeksInYear(input, dow, doy);
	        if (week > weeksTarget) {
	            week = weeksTarget;
	        }
	        return setWeekAll.call(this, input, week, weekday, dow, doy);
	    }
	}
	
	function setWeekAll(weekYear, week, weekday, dow, doy) {
	    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	
	    this.year(date.getUTCFullYear());
	    this.month(date.getUTCMonth());
	    this.date(date.getUTCDate());
	    return this;
	}
	
	// FORMATTING
	
	addFormatToken('Q', 0, 'Qo', 'quarter');
	
	// ALIASES
	
	addUnitAlias('quarter', 'Q');
	
	// PRIORITY
	
	addUnitPriority('quarter', 7);
	
	// PARSING
	
	addRegexToken('Q', match1);
	addParseToken('Q', function (input, array) {
	    array[MONTH] = (toInt(input) - 1) * 3;
	});
	
	// MOMENTS
	
	function getSetQuarter (input) {
	    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	}
	
	// FORMATTING
	
	addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	// ALIASES
	
	addUnitAlias('date', 'D');
	
	// PRIOROITY
	addUnitPriority('date', 9);
	
	// PARSING
	
	addRegexToken('D',  match1to2);
	addRegexToken('DD', match1to2, match2);
	addRegexToken('Do', function (isStrict, locale) {
	    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	});
	
	addParseToken(['D', 'DD'], DATE);
	addParseToken('Do', function (input, array) {
	    array[DATE] = toInt(input.match(match1to2)[0], 10);
	});
	
	// MOMENTS
	
	var getSetDayOfMonth = makeGetSet('Date', true);
	
	// FORMATTING
	
	addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	// ALIASES
	
	addUnitAlias('dayOfYear', 'DDD');
	
	// PRIORITY
	addUnitPriority('dayOfYear', 4);
	
	// PARSING
	
	addRegexToken('DDD',  match1to3);
	addRegexToken('DDDD', match3);
	addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	    config._dayOfYear = toInt(input);
	});
	
	// HELPERS
	
	// MOMENTS
	
	function getSetDayOfYear (input) {
	    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	}
	
	// FORMATTING
	
	addFormatToken('m', ['mm', 2], 0, 'minute');
	
	// ALIASES
	
	addUnitAlias('minute', 'm');
	
	// PRIORITY
	
	addUnitPriority('minute', 14);
	
	// PARSING
	
	addRegexToken('m',  match1to2);
	addRegexToken('mm', match1to2, match2);
	addParseToken(['m', 'mm'], MINUTE);
	
	// MOMENTS
	
	var getSetMinute = makeGetSet('Minutes', false);
	
	// FORMATTING
	
	addFormatToken('s', ['ss', 2], 0, 'second');
	
	// ALIASES
	
	addUnitAlias('second', 's');
	
	// PRIORITY
	
	addUnitPriority('second', 15);
	
	// PARSING
	
	addRegexToken('s',  match1to2);
	addRegexToken('ss', match1to2, match2);
	addParseToken(['s', 'ss'], SECOND);
	
	// MOMENTS
	
	var getSetSecond = makeGetSet('Seconds', false);
	
	// FORMATTING
	
	addFormatToken('S', 0, 0, function () {
	    return ~~(this.millisecond() / 100);
	});
	
	addFormatToken(0, ['SS', 2], 0, function () {
	    return ~~(this.millisecond() / 10);
	});
	
	addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	addFormatToken(0, ['SSSS', 4], 0, function () {
	    return this.millisecond() * 10;
	});
	addFormatToken(0, ['SSSSS', 5], 0, function () {
	    return this.millisecond() * 100;
	});
	addFormatToken(0, ['SSSSSS', 6], 0, function () {
	    return this.millisecond() * 1000;
	});
	addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	    return this.millisecond() * 10000;
	});
	addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	    return this.millisecond() * 100000;
	});
	addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	    return this.millisecond() * 1000000;
	});
	
	
	// ALIASES
	
	addUnitAlias('millisecond', 'ms');
	
	// PRIORITY
	
	addUnitPriority('millisecond', 16);
	
	// PARSING
	
	addRegexToken('S',    match1to3, match1);
	addRegexToken('SS',   match1to3, match2);
	addRegexToken('SSS',  match1to3, match3);
	
	var token;
	for (token = 'SSSS'; token.length <= 9; token += 'S') {
	    addRegexToken(token, matchUnsigned);
	}
	
	function parseMs(input, array) {
	    array[MILLISECOND] = toInt(('0.' + input) * 1000);
	}
	
	for (token = 'S'; token.length <= 9; token += 'S') {
	    addParseToken(token, parseMs);
	}
	// MOMENTS
	
	var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	// FORMATTING
	
	addFormatToken('z',  0, 0, 'zoneAbbr');
	addFormatToken('zz', 0, 0, 'zoneName');
	
	// MOMENTS
	
	function getZoneAbbr () {
	    return this._isUTC ? 'UTC' : '';
	}
	
	function getZoneName () {
	    return this._isUTC ? 'Coordinated Universal Time' : '';
	}
	
	var proto = Moment.prototype;
	
	proto.add               = add;
	proto.calendar          = calendar$1;
	proto.clone             = clone;
	proto.diff              = diff;
	proto.endOf             = endOf;
	proto.format            = format;
	proto.from              = from;
	proto.fromNow           = fromNow;
	proto.to                = to;
	proto.toNow             = toNow;
	proto.get               = stringGet;
	proto.invalidAt         = invalidAt;
	proto.isAfter           = isAfter;
	proto.isBefore          = isBefore;
	proto.isBetween         = isBetween;
	proto.isSame            = isSame;
	proto.isSameOrAfter     = isSameOrAfter;
	proto.isSameOrBefore    = isSameOrBefore;
	proto.isValid           = isValid$1;
	proto.lang              = lang;
	proto.locale            = locale;
	proto.localeData        = localeData;
	proto.max               = prototypeMax;
	proto.min               = prototypeMin;
	proto.parsingFlags      = parsingFlags;
	proto.set               = stringSet;
	proto.startOf           = startOf;
	proto.subtract          = subtract;
	proto.toArray           = toArray;
	proto.toObject          = toObject;
	proto.toDate            = toDate;
	proto.toISOString       = toISOString;
	proto.inspect           = inspect;
	proto.toJSON            = toJSON;
	proto.toString          = toString;
	proto.unix              = unix;
	proto.valueOf           = valueOf;
	proto.creationData      = creationData;
	
	// Year
	proto.year       = getSetYear;
	proto.isLeapYear = getIsLeapYear;
	
	// Week Year
	proto.weekYear    = getSetWeekYear;
	proto.isoWeekYear = getSetISOWeekYear;
	
	// Quarter
	proto.quarter = proto.quarters = getSetQuarter;
	
	// Month
	proto.month       = getSetMonth;
	proto.daysInMonth = getDaysInMonth;
	
	// Week
	proto.week           = proto.weeks        = getSetWeek;
	proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
	proto.weeksInYear    = getWeeksInYear;
	proto.isoWeeksInYear = getISOWeeksInYear;
	
	// Day
	proto.date       = getSetDayOfMonth;
	proto.day        = proto.days             = getSetDayOfWeek;
	proto.weekday    = getSetLocaleDayOfWeek;
	proto.isoWeekday = getSetISODayOfWeek;
	proto.dayOfYear  = getSetDayOfYear;
	
	// Hour
	proto.hour = proto.hours = getSetHour;
	
	// Minute
	proto.minute = proto.minutes = getSetMinute;
	
	// Second
	proto.second = proto.seconds = getSetSecond;
	
	// Millisecond
	proto.millisecond = proto.milliseconds = getSetMillisecond;
	
	// Offset
	proto.utcOffset            = getSetOffset;
	proto.utc                  = setOffsetToUTC;
	proto.local                = setOffsetToLocal;
	proto.parseZone            = setOffsetToParsedOffset;
	proto.hasAlignedHourOffset = hasAlignedHourOffset;
	proto.isDST                = isDaylightSavingTime;
	proto.isLocal              = isLocal;
	proto.isUtcOffset          = isUtcOffset;
	proto.isUtc                = isUtc;
	proto.isUTC                = isUtc;
	
	// Timezone
	proto.zoneAbbr = getZoneAbbr;
	proto.zoneName = getZoneName;
	
	// Deprecations
	proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
	
	function createUnix (input) {
	    return createLocal(input * 1000);
	}
	
	function createInZone () {
	    return createLocal.apply(null, arguments).parseZone();
	}
	
	function preParsePostFormat (string) {
	    return string;
	}
	
	var proto$1 = Locale.prototype;
	
	proto$1.calendar        = calendar;
	proto$1.longDateFormat  = longDateFormat;
	proto$1.invalidDate     = invalidDate;
	proto$1.ordinal         = ordinal;
	proto$1.preparse        = preParsePostFormat;
	proto$1.postformat      = preParsePostFormat;
	proto$1.relativeTime    = relativeTime;
	proto$1.pastFuture      = pastFuture;
	proto$1.set             = set;
	
	// Month
	proto$1.months            =        localeMonths;
	proto$1.monthsShort       =        localeMonthsShort;
	proto$1.monthsParse       =        localeMonthsParse;
	proto$1.monthsRegex       = monthsRegex;
	proto$1.monthsShortRegex  = monthsShortRegex;
	
	// Week
	proto$1.week = localeWeek;
	proto$1.firstDayOfYear = localeFirstDayOfYear;
	proto$1.firstDayOfWeek = localeFirstDayOfWeek;
	
	// Day of Week
	proto$1.weekdays       =        localeWeekdays;
	proto$1.weekdaysMin    =        localeWeekdaysMin;
	proto$1.weekdaysShort  =        localeWeekdaysShort;
	proto$1.weekdaysParse  =        localeWeekdaysParse;
	
	proto$1.weekdaysRegex       =        weekdaysRegex;
	proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
	proto$1.weekdaysMinRegex    =        weekdaysMinRegex;
	
	// Hours
	proto$1.isPM = localeIsPM;
	proto$1.meridiem = localeMeridiem;
	
	function get$1 (format, index, field, setter) {
	    var locale = getLocale();
	    var utc = createUTC().set(setter, index);
	    return locale[field](utc, format);
	}
	
	function listMonthsImpl (format, index, field) {
	    if (isNumber(format)) {
	        index = format;
	        format = undefined;
	    }
	
	    format = format || '';
	
	    if (index != null) {
	        return get$1(format, index, field, 'month');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 12; i++) {
	        out[i] = get$1(format, i, field, 'month');
	    }
	    return out;
	}
	
	// ()
	// (5)
	// (fmt, 5)
	// (fmt)
	// (true)
	// (true, 5)
	// (true, fmt, 5)
	// (true, fmt)
	function listWeekdaysImpl (localeSorted, format, index, field) {
	    if (typeof localeSorted === 'boolean') {
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    } else {
	        format = localeSorted;
	        index = format;
	        localeSorted = false;
	
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    }
	
	    var locale = getLocale(),
	        shift = localeSorted ? locale._week.dow : 0;
	
	    if (index != null) {
	        return get$1(format, (index + shift) % 7, field, 'day');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 7; i++) {
	        out[i] = get$1(format, (i + shift) % 7, field, 'day');
	    }
	    return out;
	}
	
	function listMonths (format, index) {
	    return listMonthsImpl(format, index, 'months');
	}
	
	function listMonthsShort (format, index) {
	    return listMonthsImpl(format, index, 'monthsShort');
	}
	
	function listWeekdays (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	}
	
	function listWeekdaysShort (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	}
	
	function listWeekdaysMin (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	}
	
	getSetGlobalLocale('en', {
	    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (toInt(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    }
	});
	
	// Side effect imports
	hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
	hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
	
	var mathAbs = Math.abs;
	
	function abs () {
	    var data           = this._data;
	
	    this._milliseconds = mathAbs(this._milliseconds);
	    this._days         = mathAbs(this._days);
	    this._months       = mathAbs(this._months);
	
	    data.milliseconds  = mathAbs(data.milliseconds);
	    data.seconds       = mathAbs(data.seconds);
	    data.minutes       = mathAbs(data.minutes);
	    data.hours         = mathAbs(data.hours);
	    data.months        = mathAbs(data.months);
	    data.years         = mathAbs(data.years);
	
	    return this;
	}
	
	function addSubtract$1 (duration, input, value, direction) {
	    var other = createDuration(input, value);
	
	    duration._milliseconds += direction * other._milliseconds;
	    duration._days         += direction * other._days;
	    duration._months       += direction * other._months;
	
	    return duration._bubble();
	}
	
	// supports only 2.0-style add(1, 's') or add(duration)
	function add$1 (input, value) {
	    return addSubtract$1(this, input, value, 1);
	}
	
	// supports only 2.0-style subtract(1, 's') or subtract(duration)
	function subtract$1 (input, value) {
	    return addSubtract$1(this, input, value, -1);
	}
	
	function absCeil (number) {
	    if (number < 0) {
	        return Math.floor(number);
	    } else {
	        return Math.ceil(number);
	    }
	}
	
	function bubble () {
	    var milliseconds = this._milliseconds;
	    var days         = this._days;
	    var months       = this._months;
	    var data         = this._data;
	    var seconds, minutes, hours, years, monthsFromDays;
	
	    // if we have a mix of positive and negative values, bubble down first
	    // check: https://github.com/moment/moment/issues/2166
	    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	            (milliseconds <= 0 && days <= 0 && months <= 0))) {
	        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	        days = 0;
	        months = 0;
	    }
	
	    // The following code bubbles up values, see the tests for
	    // examples of what that means.
	    data.milliseconds = milliseconds % 1000;
	
	    seconds           = absFloor(milliseconds / 1000);
	    data.seconds      = seconds % 60;
	
	    minutes           = absFloor(seconds / 60);
	    data.minutes      = minutes % 60;
	
	    hours             = absFloor(minutes / 60);
	    data.hours        = hours % 24;
	
	    days += absFloor(hours / 24);
	
	    // convert days to months
	    monthsFromDays = absFloor(daysToMonths(days));
	    months += monthsFromDays;
	    days -= absCeil(monthsToDays(monthsFromDays));
	
	    // 12 months -> 1 year
	    years = absFloor(months / 12);
	    months %= 12;
	
	    data.days   = days;
	    data.months = months;
	    data.years  = years;
	
	    return this;
	}
	
	function daysToMonths (days) {
	    // 400 years have 146097 days (taking into account leap year rules)
	    // 400 years have 12 months === 4800
	    return days * 4800 / 146097;
	}
	
	function monthsToDays (months) {
	    // the reverse of daysToMonths
	    return months * 146097 / 4800;
	}
	
	function as (units) {
	    var days;
	    var months;
	    var milliseconds = this._milliseconds;
	
	    units = normalizeUnits(units);
	
	    if (units === 'month' || units === 'year') {
	        days   = this._days   + milliseconds / 864e5;
	        months = this._months + daysToMonths(days);
	        return units === 'month' ? months : months / 12;
	    } else {
	        // handle milliseconds separately because of floating point math errors (issue #1867)
	        days = this._days + Math.round(monthsToDays(this._months));
	        switch (units) {
	            case 'week'   : return days / 7     + milliseconds / 6048e5;
	            case 'day'    : return days         + milliseconds / 864e5;
	            case 'hour'   : return days * 24    + milliseconds / 36e5;
	            case 'minute' : return days * 1440  + milliseconds / 6e4;
	            case 'second' : return days * 86400 + milliseconds / 1000;
	            // Math.floor prevents floating point math errors here
	            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	            default: throw new Error('Unknown unit ' + units);
	        }
	    }
	}
	
	// TODO: Use this.as('ms')?
	function valueOf$1 () {
	    return (
	        this._milliseconds +
	        this._days * 864e5 +
	        (this._months % 12) * 2592e6 +
	        toInt(this._months / 12) * 31536e6
	    );
	}
	
	function makeAs (alias) {
	    return function () {
	        return this.as(alias);
	    };
	}
	
	var asMilliseconds = makeAs('ms');
	var asSeconds      = makeAs('s');
	var asMinutes      = makeAs('m');
	var asHours        = makeAs('h');
	var asDays         = makeAs('d');
	var asWeeks        = makeAs('w');
	var asMonths       = makeAs('M');
	var asYears        = makeAs('y');
	
	function get$2 (units) {
	    units = normalizeUnits(units);
	    return this[units + 's']();
	}
	
	function makeGetter(name) {
	    return function () {
	        return this._data[name];
	    };
	}
	
	var milliseconds = makeGetter('milliseconds');
	var seconds      = makeGetter('seconds');
	var minutes      = makeGetter('minutes');
	var hours        = makeGetter('hours');
	var days         = makeGetter('days');
	var months       = makeGetter('months');
	var years        = makeGetter('years');
	
	function weeks () {
	    return absFloor(this.days() / 7);
	}
	
	var round = Math.round;
	var thresholds = {
	    s: 45,  // seconds to minute
	    m: 45,  // minutes to hour
	    h: 22,  // hours to day
	    d: 26,  // days to month
	    M: 11   // months to year
	};
	
	// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	}
	
	function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
	    var duration = createDuration(posNegDuration).abs();
	    var seconds  = round(duration.as('s'));
	    var minutes  = round(duration.as('m'));
	    var hours    = round(duration.as('h'));
	    var days     = round(duration.as('d'));
	    var months   = round(duration.as('M'));
	    var years    = round(duration.as('y'));
	
	    var a = seconds < thresholds.s && ['s', seconds]  ||
	            minutes <= 1           && ['m']           ||
	            minutes < thresholds.m && ['mm', minutes] ||
	            hours   <= 1           && ['h']           ||
	            hours   < thresholds.h && ['hh', hours]   ||
	            days    <= 1           && ['d']           ||
	            days    < thresholds.d && ['dd', days]    ||
	            months  <= 1           && ['M']           ||
	            months  < thresholds.M && ['MM', months]  ||
	            years   <= 1           && ['y']           || ['yy', years];
	
	    a[2] = withoutSuffix;
	    a[3] = +posNegDuration > 0;
	    a[4] = locale;
	    return substituteTimeAgo.apply(null, a);
	}
	
	// This function allows you to set the rounding function for relative time strings
	function getSetRelativeTimeRounding (roundingFunction) {
	    if (roundingFunction === undefined) {
	        return round;
	    }
	    if (typeof(roundingFunction) === 'function') {
	        round = roundingFunction;
	        return true;
	    }
	    return false;
	}
	
	// This function allows you to set a threshold for relative time strings
	function getSetRelativeTimeThreshold (threshold, limit) {
	    if (thresholds[threshold] === undefined) {
	        return false;
	    }
	    if (limit === undefined) {
	        return thresholds[threshold];
	    }
	    thresholds[threshold] = limit;
	    return true;
	}
	
	function humanize (withSuffix) {
	    var locale = this.localeData();
	    var output = relativeTime$1(this, !withSuffix, locale);
	
	    if (withSuffix) {
	        output = locale.pastFuture(+this, output);
	    }
	
	    return locale.postformat(output);
	}
	
	var abs$1 = Math.abs;
	
	function toISOString$1() {
	    // for ISO strings we do not use the normal bubbling rules:
	    //  * milliseconds bubble up until they become hours
	    //  * days do not bubble at all
	    //  * months bubble up until they become years
	    // This is because there is no context-free conversion between hours and days
	    // (think of clock changes)
	    // and also not between days and months (28-31 days per month)
	    var seconds = abs$1(this._milliseconds) / 1000;
	    var days         = abs$1(this._days);
	    var months       = abs$1(this._months);
	    var minutes, hours, years;
	
	    // 3600 seconds -> 60 minutes -> 1 hour
	    minutes           = absFloor(seconds / 60);
	    hours             = absFloor(minutes / 60);
	    seconds %= 60;
	    minutes %= 60;
	
	    // 12 months -> 1 year
	    years  = absFloor(months / 12);
	    months %= 12;
	
	
	    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	    var Y = years;
	    var M = months;
	    var D = days;
	    var h = hours;
	    var m = minutes;
	    var s = seconds;
	    var total = this.asSeconds();
	
	    if (!total) {
	        // this is the same as C#'s (Noda) and python (isodate)...
	        // but not other JS (goog.date)
	        return 'P0D';
	    }
	
	    return (total < 0 ? '-' : '') +
	        'P' +
	        (Y ? Y + 'Y' : '') +
	        (M ? M + 'M' : '') +
	        (D ? D + 'D' : '') +
	        ((h || m || s) ? 'T' : '') +
	        (h ? h + 'H' : '') +
	        (m ? m + 'M' : '') +
	        (s ? s + 'S' : '');
	}
	
	var proto$2 = Duration.prototype;
	
	proto$2.abs            = abs;
	proto$2.add            = add$1;
	proto$2.subtract       = subtract$1;
	proto$2.as             = as;
	proto$2.asMilliseconds = asMilliseconds;
	proto$2.asSeconds      = asSeconds;
	proto$2.asMinutes      = asMinutes;
	proto$2.asHours        = asHours;
	proto$2.asDays         = asDays;
	proto$2.asWeeks        = asWeeks;
	proto$2.asMonths       = asMonths;
	proto$2.asYears        = asYears;
	proto$2.valueOf        = valueOf$1;
	proto$2._bubble        = bubble;
	proto$2.get            = get$2;
	proto$2.milliseconds   = milliseconds;
	proto$2.seconds        = seconds;
	proto$2.minutes        = minutes;
	proto$2.hours          = hours;
	proto$2.days           = days;
	proto$2.weeks          = weeks;
	proto$2.months         = months;
	proto$2.years          = years;
	proto$2.humanize       = humanize;
	proto$2.toISOString    = toISOString$1;
	proto$2.toString       = toISOString$1;
	proto$2.toJSON         = toISOString$1;
	proto$2.locale         = locale;
	proto$2.localeData     = localeData;
	
	// Deprecations
	proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
	proto$2.lang = lang;
	
	// Side effect imports
	
	// FORMATTING
	
	addFormatToken('X', 0, 0, 'unix');
	addFormatToken('x', 0, 0, 'valueOf');
	
	// PARSING
	
	addRegexToken('x', matchSigned);
	addRegexToken('X', matchTimestamp);
	addParseToken('X', function (input, array, config) {
	    config._d = new Date(parseFloat(input, 10) * 1000);
	});
	addParseToken('x', function (input, array, config) {
	    config._d = new Date(toInt(input));
	});
	
	// Side effect imports
	
	
	hooks.version = '2.17.1';
	
	setHookCallback(createLocal);
	
	hooks.fn                    = proto;
	hooks.min                   = min;
	hooks.max                   = max;
	hooks.now                   = now;
	hooks.utc                   = createUTC;
	hooks.unix                  = createUnix;
	hooks.months                = listMonths;
	hooks.isDate                = isDate;
	hooks.locale                = getSetGlobalLocale;
	hooks.invalid               = createInvalid;
	hooks.duration              = createDuration;
	hooks.isMoment              = isMoment;
	hooks.weekdays              = listWeekdays;
	hooks.parseZone             = createInZone;
	hooks.localeData            = getLocale;
	hooks.isDuration            = isDuration;
	hooks.monthsShort           = listMonthsShort;
	hooks.weekdaysMin           = listWeekdaysMin;
	hooks.defineLocale          = defineLocale;
	hooks.updateLocale          = updateLocale;
	hooks.locales               = listLocales;
	hooks.weekdaysShort         = listWeekdaysShort;
	hooks.normalizeUnits        = normalizeUnits;
	hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	hooks.calendarFormat        = getCalendarFormat;
	hooks.prototype             = proto;
	
	return hooks;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(10)(module)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 12,
		"./af.js": 12,
		"./ar": 13,
		"./ar-dz": 14,
		"./ar-dz.js": 14,
		"./ar-ly": 15,
		"./ar-ly.js": 15,
		"./ar-ma": 16,
		"./ar-ma.js": 16,
		"./ar-sa": 17,
		"./ar-sa.js": 17,
		"./ar-tn": 18,
		"./ar-tn.js": 18,
		"./ar.js": 13,
		"./az": 19,
		"./az.js": 19,
		"./be": 20,
		"./be.js": 20,
		"./bg": 21,
		"./bg.js": 21,
		"./bn": 22,
		"./bn.js": 22,
		"./bo": 23,
		"./bo.js": 23,
		"./br": 24,
		"./br.js": 24,
		"./bs": 25,
		"./bs.js": 25,
		"./ca": 26,
		"./ca.js": 26,
		"./cs": 27,
		"./cs.js": 27,
		"./cv": 28,
		"./cv.js": 28,
		"./cy": 29,
		"./cy.js": 29,
		"./da": 30,
		"./da.js": 30,
		"./de": 31,
		"./de-at": 32,
		"./de-at.js": 32,
		"./de.js": 31,
		"./dv": 33,
		"./dv.js": 33,
		"./el": 34,
		"./el.js": 34,
		"./en-au": 35,
		"./en-au.js": 35,
		"./en-ca": 36,
		"./en-ca.js": 36,
		"./en-gb": 37,
		"./en-gb.js": 37,
		"./en-ie": 38,
		"./en-ie.js": 38,
		"./en-nz": 39,
		"./en-nz.js": 39,
		"./eo": 40,
		"./eo.js": 40,
		"./es": 41,
		"./es-do": 42,
		"./es-do.js": 42,
		"./es.js": 41,
		"./et": 43,
		"./et.js": 43,
		"./eu": 44,
		"./eu.js": 44,
		"./fa": 45,
		"./fa.js": 45,
		"./fi": 46,
		"./fi.js": 46,
		"./fo": 47,
		"./fo.js": 47,
		"./fr": 48,
		"./fr-ca": 49,
		"./fr-ca.js": 49,
		"./fr-ch": 50,
		"./fr-ch.js": 50,
		"./fr.js": 48,
		"./fy": 51,
		"./fy.js": 51,
		"./gd": 52,
		"./gd.js": 52,
		"./gl": 53,
		"./gl.js": 53,
		"./he": 54,
		"./he.js": 54,
		"./hi": 55,
		"./hi.js": 55,
		"./hr": 56,
		"./hr.js": 56,
		"./hu": 57,
		"./hu.js": 57,
		"./hy-am": 58,
		"./hy-am.js": 58,
		"./id": 59,
		"./id.js": 59,
		"./is": 60,
		"./is.js": 60,
		"./it": 61,
		"./it.js": 61,
		"./ja": 62,
		"./ja.js": 62,
		"./jv": 63,
		"./jv.js": 63,
		"./ka": 64,
		"./ka.js": 64,
		"./kk": 65,
		"./kk.js": 65,
		"./km": 66,
		"./km.js": 66,
		"./ko": 67,
		"./ko.js": 67,
		"./ky": 68,
		"./ky.js": 68,
		"./lb": 69,
		"./lb.js": 69,
		"./lo": 70,
		"./lo.js": 70,
		"./lt": 71,
		"./lt.js": 71,
		"./lv": 72,
		"./lv.js": 72,
		"./me": 73,
		"./me.js": 73,
		"./mi": 74,
		"./mi.js": 74,
		"./mk": 75,
		"./mk.js": 75,
		"./ml": 76,
		"./ml.js": 76,
		"./mr": 77,
		"./mr.js": 77,
		"./ms": 78,
		"./ms-my": 79,
		"./ms-my.js": 79,
		"./ms.js": 78,
		"./my": 80,
		"./my.js": 80,
		"./nb": 81,
		"./nb.js": 81,
		"./ne": 82,
		"./ne.js": 82,
		"./nl": 83,
		"./nl-be": 84,
		"./nl-be.js": 84,
		"./nl.js": 83,
		"./nn": 85,
		"./nn.js": 85,
		"./pa-in": 86,
		"./pa-in.js": 86,
		"./pl": 87,
		"./pl.js": 87,
		"./pt": 88,
		"./pt-br": 89,
		"./pt-br.js": 89,
		"./pt.js": 88,
		"./ro": 90,
		"./ro.js": 90,
		"./ru": 91,
		"./ru.js": 91,
		"./se": 92,
		"./se.js": 92,
		"./si": 93,
		"./si.js": 93,
		"./sk": 94,
		"./sk.js": 94,
		"./sl": 95,
		"./sl.js": 95,
		"./sq": 96,
		"./sq.js": 96,
		"./sr": 97,
		"./sr-cyrl": 98,
		"./sr-cyrl.js": 98,
		"./sr.js": 97,
		"./ss": 99,
		"./ss.js": 99,
		"./sv": 100,
		"./sv.js": 100,
		"./sw": 101,
		"./sw.js": 101,
		"./ta": 102,
		"./ta.js": 102,
		"./te": 103,
		"./te.js": 103,
		"./tet": 104,
		"./tet.js": 104,
		"./th": 105,
		"./th.js": 105,
		"./tl-ph": 106,
		"./tl-ph.js": 106,
		"./tlh": 107,
		"./tlh.js": 107,
		"./tr": 108,
		"./tr.js": 108,
		"./tzl": 109,
		"./tzl.js": 109,
		"./tzm": 110,
		"./tzm-latn": 111,
		"./tzm-latn.js": 111,
		"./tzm.js": 110,
		"./uk": 112,
		"./uk.js": 112,
		"./uz": 113,
		"./uz.js": 113,
		"./vi": 114,
		"./vi.js": 114,
		"./x-pseudo": 115,
		"./x-pseudo.js": 115,
		"./yo": 116,
		"./yo.js": 116,
		"./zh-cn": 117,
		"./zh-cn.js": 117,
		"./zh-hk": 118,
		"./zh-hk.js": 118,
		"./zh-tw": 119,
		"./zh-tw.js": 119
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 11;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Afrikaans [af]
	//! author : Werner Mollentze : https://github.com/wernerm
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var af = moment.defineLocale('af', {
	    months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	    weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	    weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	    meridiemParse: /vm|nm/i,
	    isPM : function (input) {
	        return /^nm$/i.test(input);
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower ? 'vm' : 'VM';
	        } else {
	            return isLower ? 'nm' : 'NM';
	        }
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Vandag om] LT',
	        nextDay : '[Môre om] LT',
	        nextWeek : 'dddd [om] LT',
	        lastDay : '[Gister om] LT',
	        lastWeek : '[Laas] dddd [om] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'oor %s',
	        past : '%s gelede',
	        s : '\'n paar sekondes',
	        m : '\'n minuut',
	        mm : '%d minute',
	        h : '\'n uur',
	        hh : '%d ure',
	        d : '\'n dag',
	        dd : '%d dae',
	        M : '\'n maand',
	        MM : '%d maande',
	        y : '\'n jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	    },
	    week : {
	        dow : 1, // Maandag is die eerste dag van die week.
	        doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	    }
	});
	
	return af;
	
	})));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic [ar]
	//! author : Abdel Said: https://github.com/abdelsaid
	//! author : Ahmed Elkhatib
	//! author : forabi https://github.com/forabi
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '١',
	    '2': '٢',
	    '3': '٣',
	    '4': '٤',
	    '5': '٥',
	    '6': '٦',
	    '7': '٧',
	    '8': '٨',
	    '9': '٩',
	    '0': '٠'
	};
	var numberMap = {
	    '١': '1',
	    '٢': '2',
	    '٣': '3',
	    '٤': '4',
	    '٥': '5',
	    '٦': '6',
	    '٧': '7',
	    '٨': '8',
	    '٩': '9',
	    '٠': '0'
	};
	var pluralForm = function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	};
	var plurals = {
	    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	};
	var pluralize = function (u) {
	    return function (number, withoutSuffix, string, isFuture) {
	        var f = pluralForm(number),
	            str = plurals[u][pluralForm(number)];
	        if (f === 2) {
	            str = str[withoutSuffix ? 0 : 1];
	        }
	        return str.replace(/%d/i, number);
	    };
	};
	var months = [
	    'كانون الثاني يناير',
	    'شباط فبراير',
	    'آذار مارس',
	    'نيسان أبريل',
	    'أيار مايو',
	    'حزيران يونيو',
	    'تموز يوليو',
	    'آب أغسطس',
	    'أيلول سبتمبر',
	    'تشرين الأول أكتوبر',
	    'تشرين الثاني نوفمبر',
	    'كانون الأول ديسمبر'
	];
	
	var ar = moment.defineLocale('ar', {
	    months : months,
	    monthsShort : months,
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/\u200FM/\u200FYYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم عند الساعة] LT',
	        nextDay: '[غدًا عند الساعة] LT',
	        nextWeek: 'dddd [عند الساعة] LT',
	        lastDay: '[أمس عند الساعة] LT',
	        lastWeek: 'dddd [عند الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'بعد %s',
	        past : 'منذ %s',
	        s : pluralize('s'),
	        m : pluralize('m'),
	        mm : pluralize('m'),
	        h : pluralize('h'),
	        hh : pluralize('h'),
	        d : pluralize('d'),
	        dd : pluralize('d'),
	        M : pluralize('M'),
	        MM : pluralize('M'),
	        y : pluralize('y'),
	        yy : pluralize('y')
	    },
	    preparse: function (string) {
	        return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ar;
	
	})));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Algeria) [ar-dz]
	//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var arDz = moment.defineLocale('ar-dz', {
	    months : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 4  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return arDz;
	
	})));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Lybia) [ar-ly]
	//! author : Ali Hmer: https://github.com/kikoanis
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    '4': '4',
	    '5': '5',
	    '6': '6',
	    '7': '7',
	    '8': '8',
	    '9': '9',
	    '0': '0'
	};
	var pluralForm = function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	};
	var plurals = {
	    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	};
	var pluralize = function (u) {
	    return function (number, withoutSuffix, string, isFuture) {
	        var f = pluralForm(number),
	            str = plurals[u][pluralForm(number)];
	        if (f === 2) {
	            str = str[withoutSuffix ? 0 : 1];
	        }
	        return str.replace(/%d/i, number);
	    };
	};
	var months = [
	    'يناير',
	    'فبراير',
	    'مارس',
	    'أبريل',
	    'مايو',
	    'يونيو',
	    'يوليو',
	    'أغسطس',
	    'سبتمبر',
	    'أكتوبر',
	    'نوفمبر',
	    'ديسمبر'
	];
	
	var arLy = moment.defineLocale('ar-ly', {
	    months : months,
	    monthsShort : months,
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/\u200FM/\u200FYYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم عند الساعة] LT',
	        nextDay: '[غدًا عند الساعة] LT',
	        nextWeek: 'dddd [عند الساعة] LT',
	        lastDay: '[أمس عند الساعة] LT',
	        lastWeek: 'dddd [عند الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'بعد %s',
	        past : 'منذ %s',
	        s : pluralize('s'),
	        m : pluralize('m'),
	        mm : pluralize('m'),
	        h : pluralize('h'),
	        hh : pluralize('h'),
	        d : pluralize('d'),
	        dd : pluralize('d'),
	        M : pluralize('M'),
	        MM : pluralize('M'),
	        y : pluralize('y'),
	        yy : pluralize('y')
	    },
	    preparse: function (string) {
	        return string.replace(/\u200f/g, '').replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return arLy;
	
	})));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Morocco) [ar-ma]
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var arMa = moment.defineLocale('ar-ma', {
	    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return arMa;
	
	})));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Saudi Arabia) [ar-sa]
	//! author : Suhail Alkowaileet : https://github.com/xsoh
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '١',
	    '2': '٢',
	    '3': '٣',
	    '4': '٤',
	    '5': '٥',
	    '6': '٦',
	    '7': '٧',
	    '8': '٨',
	    '9': '٩',
	    '0': '٠'
	};
	var numberMap = {
	    '١': '1',
	    '٢': '2',
	    '٣': '3',
	    '٤': '4',
	    '٥': '5',
	    '٦': '6',
	    '٧': '7',
	    '٨': '8',
	    '٩': '9',
	    '٠': '0'
	};
	
	var arSa = moment.defineLocale('ar-sa', {
	    months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    preparse: function (string) {
	        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return arSa;
	
	})));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  :  Arabic (Tunisia) [ar-tn]
	//! author : Nader Toukabri : https://github.com/naderio
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var arTn = moment.defineLocale('ar-tn', {
	    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'في %s',
	        past: 'منذ %s',
	        s: 'ثوان',
	        m: 'دقيقة',
	        mm: '%d دقائق',
	        h: 'ساعة',
	        hh: '%d ساعات',
	        d: 'يوم',
	        dd: '%d أيام',
	        M: 'شهر',
	        MM: '%d أشهر',
	        y: 'سنة',
	        yy: '%d سنوات'
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return arTn;
	
	})));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Azerbaijani [az]
	//! author : topchiyev : https://github.com/topchiyev
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var suffixes = {
	    1: '-inci',
	    5: '-inci',
	    8: '-inci',
	    70: '-inci',
	    80: '-inci',
	    2: '-nci',
	    7: '-nci',
	    20: '-nci',
	    50: '-nci',
	    3: '-üncü',
	    4: '-üncü',
	    100: '-üncü',
	    6: '-ncı',
	    9: '-uncu',
	    10: '-uncu',
	    30: '-uncu',
	    60: '-ıncı',
	    90: '-ıncı'
	};
	
	var az = moment.defineLocale('az', {
	    months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	    monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	    weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	    weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	    weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[bugün saat] LT',
	        nextDay : '[sabah saat] LT',
	        nextWeek : '[gələn həftə] dddd [saat] LT',
	        lastDay : '[dünən] LT',
	        lastWeek : '[keçən həftə] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s sonra',
	        past : '%s əvvəl',
	        s : 'birneçə saniyyə',
	        m : 'bir dəqiqə',
	        mm : '%d dəqiqə',
	        h : 'bir saat',
	        hh : '%d saat',
	        d : 'bir gün',
	        dd : '%d gün',
	        M : 'bir ay',
	        MM : '%d ay',
	        y : 'bir il',
	        yy : '%d il'
	    },
	    meridiemParse: /gecə|səhər|gündüz|axşam/,
	    isPM : function (input) {
	        return /^(gündüz|axşam)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'gecə';
	        } else if (hour < 12) {
	            return 'səhər';
	        } else if (hour < 17) {
	            return 'gündüz';
	        } else {
	            return 'axşam';
	        }
	    },
	    ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	    ordinal : function (number) {
	        if (number === 0) {  // special case for zero
	            return number + '-ıncı';
	        }
	        var a = number % 10,
	            b = number % 100 - a,
	            c = number >= 100 ? 100 : null;
	        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return az;
	
	})));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Belarusian [be]
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	        'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	        'dd': 'дзень_дні_дзён',
	        'MM': 'месяц_месяцы_месяцаў',
	        'yy': 'год_гады_гадоў'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'хвіліна' : 'хвіліну';
	    }
	    else if (key === 'h') {
	        return withoutSuffix ? 'гадзіна' : 'гадзіну';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}
	
	var be = moment.defineLocale('be', {
	    months : {
	        format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	        standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	    },
	    monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	    weekdays : {
	        format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	        standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	        isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	    },
	    weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	    weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY г.',
	        LLL : 'D MMMM YYYY г., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	    },
	    calendar : {
	        sameDay: '[Сёння ў] LT',
	        nextDay: '[Заўтра ў] LT',
	        lastDay: '[Учора ў] LT',
	        nextWeek: function () {
	            return '[У] dddd [ў] LT';
	        },
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'праз %s',
	        past : '%s таму',
	        s : 'некалькі секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : relativeTimeWithPlural,
	        hh : relativeTimeWithPlural,
	        d : 'дзень',
	        dd : relativeTimeWithPlural,
	        M : 'месяц',
	        MM : relativeTimeWithPlural,
	        y : 'год',
	        yy : relativeTimeWithPlural
	    },
	    meridiemParse: /ночы|раніцы|дня|вечара/,
	    isPM : function (input) {
	        return /^(дня|вечара)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночы';
	        } else if (hour < 12) {
	            return 'раніцы';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечара';
	        }
	    },
	    ordinalParse: /\d{1,2}-(і|ы|га)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return be;
	
	})));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bulgarian [bg]
	//! author : Krasen Borisov : https://github.com/kraz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var bg = moment.defineLocale('bg', {
	    months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	    monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	    weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	    weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'D.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : '[Днес в] LT',
	        nextDay : '[Утре в] LT',
	        nextWeek : 'dddd [в] LT',
	        lastDay : '[Вчера в] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'след %s',
	        past : 'преди %s',
	        s : 'няколко секунди',
	        m : 'минута',
	        mm : '%d минути',
	        h : 'час',
	        hh : '%d часа',
	        d : 'ден',
	        dd : '%d дни',
	        M : 'месец',
	        MM : '%d месеца',
	        y : 'година',
	        yy : '%d години'
	    },
	    ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	    ordinal : function (number) {
	        var lastDigit = number % 10,
	            last2Digits = number % 100;
	        if (number === 0) {
	            return number + '-ев';
	        } else if (last2Digits === 0) {
	            return number + '-ен';
	        } else if (last2Digits > 10 && last2Digits < 20) {
	            return number + '-ти';
	        } else if (lastDigit === 1) {
	            return number + '-ви';
	        } else if (lastDigit === 2) {
	            return number + '-ри';
	        } else if (lastDigit === 7 || lastDigit === 8) {
	            return number + '-ми';
	        } else {
	            return number + '-ти';
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return bg;
	
	})));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali [bn]
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '১',
	    '2': '২',
	    '3': '৩',
	    '4': '৪',
	    '5': '৫',
	    '6': '৬',
	    '7': '৭',
	    '8': '৮',
	    '9': '৯',
	    '0': '০'
	};
	var numberMap = {
	    '১': '1',
	    '২': '2',
	    '৩': '3',
	    '৪': '4',
	    '৫': '5',
	    '৬': '6',
	    '৭': '7',
	    '৮': '8',
	    '৯': '9',
	    '০': '0'
	};
	
	var bn = moment.defineLocale('bn', {
	    months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	    monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
	    weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
	    weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
	    weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm সময়',
	        LTS : 'A h:mm:ss সময়',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm সময়',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	    },
	    calendar : {
	        sameDay : '[আজ] LT',
	        nextDay : '[আগামীকাল] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[গতকাল] LT',
	        lastWeek : '[গত] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s পরে',
	        past : '%s আগে',
	        s : 'কয়েক সেকেন্ড',
	        m : 'এক মিনিট',
	        mm : '%d মিনিট',
	        h : 'এক ঘন্টা',
	        hh : '%d ঘন্টা',
	        d : 'এক দিন',
	        dd : '%d দিন',
	        M : 'এক মাস',
	        MM : '%d মাস',
	        y : 'এক বছর',
	        yy : '%d বছর'
	    },
	    preparse: function (string) {
	        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'রাত' && hour >= 4) ||
	                (meridiem === 'দুপুর' && hour < 5) ||
	                meridiem === 'বিকাল') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'রাত';
	        } else if (hour < 10) {
	            return 'সকাল';
	        } else if (hour < 17) {
	            return 'দুপুর';
	        } else if (hour < 20) {
	            return 'বিকাল';
	        } else {
	            return 'রাত';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return bn;
	
	})));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tibetan [bo]
	//! author : Thupten N. Chakrishar : https://github.com/vajradog
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '༡',
	    '2': '༢',
	    '3': '༣',
	    '4': '༤',
	    '5': '༥',
	    '6': '༦',
	    '7': '༧',
	    '8': '༨',
	    '9': '༩',
	    '0': '༠'
	};
	var numberMap = {
	    '༡': '1',
	    '༢': '2',
	    '༣': '3',
	    '༤': '4',
	    '༥': '5',
	    '༦': '6',
	    '༧': '7',
	    '༨': '8',
	    '༩': '9',
	    '༠': '0'
	};
	
	var bo = moment.defineLocale('bo', {
	    months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	    monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	    weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	    weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	    weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm',
	        LTS : 'A h:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm'
	    },
	    calendar : {
	        sameDay : '[དི་རིང] LT',
	        nextDay : '[སང་ཉིན] LT',
	        nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	        lastDay : '[ཁ་སང] LT',
	        lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ལ་',
	        past : '%s སྔན་ལ',
	        s : 'ལམ་སང',
	        m : 'སྐར་མ་གཅིག',
	        mm : '%d སྐར་མ',
	        h : 'ཆུ་ཚོད་གཅིག',
	        hh : '%d ཆུ་ཚོད',
	        d : 'ཉིན་གཅིག',
	        dd : '%d ཉིན་',
	        M : 'ཟླ་བ་གཅིག',
	        MM : '%d ཟླ་བ',
	        y : 'ལོ་གཅིག',
	        yy : '%d ལོ'
	    },
	    preparse: function (string) {
	        return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                meridiem === 'དགོང་དག') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'མཚན་མོ';
	        } else if (hour < 10) {
	            return 'ཞོགས་ཀས';
	        } else if (hour < 17) {
	            return 'ཉིན་གུང';
	        } else if (hour < 20) {
	            return 'དགོང་དག';
	        } else {
	            return 'མཚན་མོ';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return bo;
	
	})));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Breton [br]
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function relativeTimeWithMutation(number, withoutSuffix, key) {
	    var format = {
	        'mm': 'munutenn',
	        'MM': 'miz',
	        'dd': 'devezh'
	    };
	    return number + ' ' + mutation(format[key], number);
	}
	function specialMutationForYears(number) {
	    switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	    }
	}
	function lastNumber(number) {
	    if (number > 9) {
	        return lastNumber(number % 10);
	    }
	    return number;
	}
	function mutation(text, number) {
	    if (number === 2) {
	        return softMutation(text);
	    }
	    return text;
	}
	function softMutation(text) {
	    var mutationTable = {
	        'm': 'v',
	        'b': 'v',
	        'd': 'z'
	    };
	    if (mutationTable[text.charAt(0)] === undefined) {
	        return text;
	    }
	    return mutationTable[text.charAt(0)] + text.substring(1);
	}
	
	var br = moment.defineLocale('br', {
	    months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	    monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	    weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	    weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	    weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h[e]mm A',
	        LTS : 'h[e]mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D [a viz] MMMM YYYY',
	        LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	        LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	    },
	    calendar : {
	        sameDay : '[Hiziv da] LT',
	        nextDay : '[Warc\'hoazh da] LT',
	        nextWeek : 'dddd [da] LT',
	        lastDay : '[Dec\'h da] LT',
	        lastWeek : 'dddd [paset da] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'a-benn %s',
	        past : '%s \'zo',
	        s : 'un nebeud segondennoù',
	        m : 'ur vunutenn',
	        mm : relativeTimeWithMutation,
	        h : 'un eur',
	        hh : '%d eur',
	        d : 'un devezh',
	        dd : relativeTimeWithMutation,
	        M : 'ur miz',
	        MM : relativeTimeWithMutation,
	        y : 'ur bloaz',
	        yy : specialMutationForYears
	    },
	    ordinalParse: /\d{1,2}(añ|vet)/,
	    ordinal : function (number) {
	        var output = (number === 1) ? 'añ' : 'vet';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return br;
	
	})));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bosnian [bs]
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	    }
	}
	
	var bs = moment.defineLocale('bs', {
	    months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danas u] LT',
	        nextDay  : '[sutra u] LT',
	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[jučer u] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'par sekundi',
	        m      : translate,
	        mm     : translate,
	        h      : translate,
	        hh     : translate,
	        d      : 'dan',
	        dd     : translate,
	        M      : 'mjesec',
	        MM     : translate,
	        y      : 'godinu',
	        yy     : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return bs;
	
	})));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Catalan [ca]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ca = moment.defineLocale('ca', {
	    months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	    monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	    weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	    weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        nextDay : function () {
	            return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        lastDay : function () {
	            return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'd\'aquí %s',
	        past : 'fa %s',
	        s : 'uns segons',
	        m : 'un minut',
	        mm : '%d minuts',
	        h : 'una hora',
	        hh : '%d hores',
	        d : 'un dia',
	        dd : '%d dies',
	        M : 'un mes',
	        MM : '%d mesos',
	        y : 'un any',
	        yy : '%d anys'
	    },
	    ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	    ordinal : function (number, period) {
	        var output = (number === 1) ? 'r' :
	            (number === 2) ? 'n' :
	            (number === 3) ? 'r' :
	            (number === 4) ? 't' : 'è';
	        if (period === 'w' || period === 'W') {
	            output = 'a';
	        }
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return ca;
	
	})));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Czech [cs]
	//! author : petrbela : https://github.com/petrbela
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
	var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	function plural(n) {
	    return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	    }
	}
	
	var cs = moment.defineLocale('cs', {
	    months : months,
	    monthsShort : monthsShort,
	    monthsParse : (function (months, monthsShort) {
	        var i, _monthsParse = [];
	        for (i = 0; i < 12; i++) {
	            // use custom parser to solve problem with July (červenec)
	            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	        }
	        return _monthsParse;
	    }(months, monthsShort)),
	    shortMonthsParse : (function (monthsShort) {
	        var i, _shortMonthsParse = [];
	        for (i = 0; i < 12; i++) {
	            _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	        }
	        return _shortMonthsParse;
	    }(monthsShort)),
	    longMonthsParse : (function (months) {
	        var i, _longMonthsParse = [];
	        for (i = 0; i < 12; i++) {
	            _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	        }
	        return _longMonthsParse;
	    }(months)),
	    weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	    weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	    weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	    longDateFormat : {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd D. MMMM YYYY H:mm',
	        l : 'D. M. YYYY'
	    },
	    calendar : {
	        sameDay: '[dnes v] LT',
	        nextDay: '[zítra v] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	            }
	        },
	        lastDay: '[včera v] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : 'před %s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse : /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return cs;
	
	})));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chuvash [cv]
	//! author : Anatoly Mironov : https://github.com/mirontoli
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var cv = moment.defineLocale('cv', {
	    months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	    monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	    weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	    weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	    weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	        LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	        LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	    },
	    calendar : {
	        sameDay: '[Паян] LT [сехетре]',
	        nextDay: '[Ыран] LT [сехетре]',
	        lastDay: '[Ӗнер] LT [сехетре]',
	        nextWeek: '[Ҫитес] dddd LT [сехетре]',
	        lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : function (output) {
	            var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	            return output + affix;
	        },
	        past : '%s каялла',
	        s : 'пӗр-ик ҫеккунт',
	        m : 'пӗр минут',
	        mm : '%d минут',
	        h : 'пӗр сехет',
	        hh : '%d сехет',
	        d : 'пӗр кун',
	        dd : '%d кун',
	        M : 'пӗр уйӑх',
	        MM : '%d уйӑх',
	        y : 'пӗр ҫул',
	        yy : '%d ҫул'
	    },
	    ordinalParse: /\d{1,2}-мӗш/,
	    ordinal : '%d-мӗш',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return cv;
	
	})));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh [cy]
	//! author : Robert Allen : https://github.com/robgallen
	//! author : https://github.com/ryangreaves
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var cy = moment.defineLocale('cy', {
	    months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	    monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	    weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	    weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	    weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	    weekdaysParseExact : true,
	    // time formats are the same as en-gb
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[Heddiw am] LT',
	        nextDay: '[Yfory am] LT',
	        nextWeek: 'dddd [am] LT',
	        lastDay: '[Ddoe am] LT',
	        lastWeek: 'dddd [diwethaf am] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'mewn %s',
	        past: '%s yn ôl',
	        s: 'ychydig eiliadau',
	        m: 'munud',
	        mm: '%d munud',
	        h: 'awr',
	        hh: '%d awr',
	        d: 'diwrnod',
	        dd: '%d diwrnod',
	        M: 'mis',
	        MM: '%d mis',
	        y: 'blwyddyn',
	        yy: '%d flynedd'
	    },
	    ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	    ordinal: function (number) {
	        var b = number,
	            output = '',
	            lookup = [
	                '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	            ];
	        if (b > 20) {
	            if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                output = 'fed'; // not 30ain, 70ain or 90ain
	            } else {
	                output = 'ain';
	            }
	        } else if (b > 0) {
	            output = lookup[b];
	        }
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return cy;
	
	})));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Danish [da]
	//! author : Ulrik Nielsen : https://github.com/mrbase
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var da = moment.defineLocale('da', {
	    months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	    weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[I dag kl.] LT',
	        nextDay : '[I morgen kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[I går kl.] LT',
	        lastWeek : '[sidste] dddd [kl] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s siden',
	        s : 'få sekunder',
	        m : 'et minut',
	        mm : '%d minutter',
	        h : 'en time',
	        hh : '%d timer',
	        d : 'en dag',
	        dd : '%d dage',
	        M : 'en måned',
	        MM : '%d måneder',
	        y : 'et år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return da;
	
	})));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German [de]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eine Minute', 'einer Minute'],
	        'h': ['eine Stunde', 'einer Stunde'],
	        'd': ['ein Tag', 'einem Tag'],
	        'dd': [number + ' Tage', number + ' Tagen'],
	        'M': ['ein Monat', 'einem Monat'],
	        'MM': [number + ' Monate', number + ' Monaten'],
	        'y': ['ein Jahr', 'einem Jahr'],
	        'yy': [number + ' Jahre', number + ' Jahren']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}
	
	var de = moment.defineLocale('de', {
	    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd, D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[heute um] LT [Uhr]',
	        sameElse: 'L',
	        nextDay: '[morgen um] LT [Uhr]',
	        nextWeek: 'dddd [um] LT [Uhr]',
	        lastDay: '[gestern um] LT [Uhr]',
	        lastWeek: '[letzten] dddd [um] LT [Uhr]'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : 'vor %s',
	        s : 'ein paar Sekunden',
	        m : processRelativeTime,
	        mm : '%d Minuten',
	        h : processRelativeTime,
	        hh : '%d Stunden',
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return de;
	
	})));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German (Austria) [de-at]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eine Minute', 'einer Minute'],
	        'h': ['eine Stunde', 'einer Stunde'],
	        'd': ['ein Tag', 'einem Tag'],
	        'dd': [number + ' Tage', number + ' Tagen'],
	        'M': ['ein Monat', 'einem Monat'],
	        'MM': [number + ' Monate', number + ' Monaten'],
	        'y': ['ein Jahr', 'einem Jahr'],
	        'yy': [number + ' Jahre', number + ' Jahren']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}
	
	var deAt = moment.defineLocale('de-at', {
	    months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd, D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[heute um] LT [Uhr]',
	        sameElse: 'L',
	        nextDay: '[morgen um] LT [Uhr]',
	        nextWeek: 'dddd [um] LT [Uhr]',
	        lastDay: '[gestern um] LT [Uhr]',
	        lastWeek: '[letzten] dddd [um] LT [Uhr]'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : 'vor %s',
	        s : 'ein paar Sekunden',
	        m : processRelativeTime,
	        mm : '%d Minuten',
	        h : processRelativeTime,
	        hh : '%d Stunden',
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return deAt;
	
	})));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maldivian [dv]
	//! author : Jawish Hameed : https://github.com/jawish
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var months = [
	    'ޖެނުއަރީ',
	    'ފެބްރުއަރީ',
	    'މާރިޗު',
	    'އޭޕްރީލު',
	    'މޭ',
	    'ޖޫން',
	    'ޖުލައި',
	    'އޯގަސްޓު',
	    'ސެޕްޓެމްބަރު',
	    'އޮކްޓޯބަރު',
	    'ނޮވެމްބަރު',
	    'ޑިސެމްބަރު'
	];
	var weekdays = [
	    'އާދިއްތަ',
	    'ހޯމަ',
	    'އަންގާރަ',
	    'ބުދަ',
	    'ބުރާސްފަތި',
	    'ހުކުރު',
	    'ހޮނިހިރު'
	];
	
	var dv = moment.defineLocale('dv', {
	    months : months,
	    monthsShort : months,
	    weekdays : weekdays,
	    weekdaysShort : weekdays,
	    weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	    longDateFormat : {
	
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/M/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /މކ|މފ/,
	    isPM : function (input) {
	        return 'މފ' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'މކ';
	        } else {
	            return 'މފ';
	        }
	    },
	    calendar : {
	        sameDay : '[މިއަދު] LT',
	        nextDay : '[މާދަމާ] LT',
	        nextWeek : 'dddd LT',
	        lastDay : '[އިއްޔެ] LT',
	        lastWeek : '[ފާއިތުވި] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ތެރޭގައި %s',
	        past : 'ކުރިން %s',
	        s : 'ސިކުންތުކޮޅެއް',
	        m : 'މިނިޓެއް',
	        mm : 'މިނިޓު %d',
	        h : 'ގަޑިއިރެއް',
	        hh : 'ގަޑިއިރު %d',
	        d : 'ދުވަހެއް',
	        dd : 'ދުވަސް %d',
	        M : 'މަހެއް',
	        MM : 'މަސް %d',
	        y : 'އަހަރެއް',
	        yy : 'އަހަރު %d'
	    },
	    preparse: function (string) {
	        return string.replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/,/g, '،');
	    },
	    week : {
	        dow : 7,  // Sunday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return dv;
	
	})));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Greek [el]
	//! author : Aggelos Karalias : https://github.com/mehiel
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}
	
	
	var el = moment.defineLocale('el', {
	    monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	    monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	    months : function (momentToFormat, format) {
	        if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	            return this._monthsGenitiveEl[momentToFormat.month()];
	        } else {
	            return this._monthsNominativeEl[momentToFormat.month()];
	        }
	    },
	    monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	    weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	    weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	    weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'μμ' : 'ΜΜ';
	        } else {
	            return isLower ? 'πμ' : 'ΠΜ';
	        }
	    },
	    isPM : function (input) {
	        return ((input + '').toLowerCase()[0] === 'μ');
	    },
	    meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendarEl : {
	        sameDay : '[Σήμερα {}] LT',
	        nextDay : '[Αύριο {}] LT',
	        nextWeek : 'dddd [{}] LT',
	        lastDay : '[Χθες {}] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 6:
	                    return '[το προηγούμενο] dddd [{}] LT';
	                default:
	                    return '[την προηγούμενη] dddd [{}] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    calendar : function (key, mom) {
	        var output = this._calendarEl[key],
	            hours = mom && mom.hours();
	        if (isFunction(output)) {
	            output = output.apply(mom);
	        }
	        return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	    },
	    relativeTime : {
	        future : 'σε %s',
	        past : '%s πριν',
	        s : 'λίγα δευτερόλεπτα',
	        m : 'ένα λεπτό',
	        mm : '%d λεπτά',
	        h : 'μία ώρα',
	        hh : '%d ώρες',
	        d : 'μία μέρα',
	        dd : '%d μέρες',
	        M : 'ένας μήνας',
	        MM : '%d μήνες',
	        y : 'ένας χρόνος',
	        yy : '%d χρόνια'
	    },
	    ordinalParse: /\d{1,2}η/,
	    ordinal: '%dη',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4st is the first week of the year.
	    }
	});
	
	return el;
	
	})));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Australia) [en-au]
	//! author : Jared Morse : https://github.com/jarcoal
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enAu = moment.defineLocale('en-au', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return enAu;
	
	})));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Canada) [en-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enCa = moment.defineLocale('en-ca', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'YYYY-MM-DD',
	        LL : 'MMMM D, YYYY',
	        LLL : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    }
	});
	
	return enCa;
	
	})));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (United Kingdom) [en-gb]
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enGb = moment.defineLocale('en-gb', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return enGb;
	
	})));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Ireland) [en-ie]
	//! author : Chris Cartlidge : https://github.com/chriscartlidge
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enIe = moment.defineLocale('en-ie', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return enIe;
	
	})));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (New Zealand) [en-nz]
	//! author : Luke McGregor : https://github.com/lukemcgregor
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enNz = moment.defineLocale('en-nz', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return enNz;
	
	})));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Esperanto [eo]
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var eo = moment.defineLocale('eo', {
	    months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	    weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	    weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D[-an de] MMMM, YYYY',
	        LLL : 'D[-an de] MMMM, YYYY HH:mm',
	        LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	    },
	    meridiemParse: /[ap]\.t\.m/i,
	    isPM: function (input) {
	        return input.charAt(0).toLowerCase() === 'p';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'p.t.m.' : 'P.T.M.';
	        } else {
	            return isLower ? 'a.t.m.' : 'A.T.M.';
	        }
	    },
	    calendar : {
	        sameDay : '[Hodiaŭ je] LT',
	        nextDay : '[Morgaŭ je] LT',
	        nextWeek : 'dddd [je] LT',
	        lastDay : '[Hieraŭ je] LT',
	        lastWeek : '[pasinta] dddd [je] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'je %s',
	        past : 'antaŭ %s',
	        s : 'sekundoj',
	        m : 'minuto',
	        mm : '%d minutoj',
	        h : 'horo',
	        hh : '%d horoj',
	        d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	        dd : '%d tagoj',
	        M : 'monato',
	        MM : '%d monatoj',
	        y : 'jaro',
	        yy : '%d jaroj'
	    },
	    ordinalParse: /\d{1,2}a/,
	    ordinal : '%da',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return eo;
	
	})));


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish [es]
	//! author : Julio Napurí : https://github.com/julionc
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
	var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
	
	var es = moment.defineLocale('es', {
	    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShort[m.month()];
	        } else {
	            return monthsShortDot[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY H:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastDay : function () {
	            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'en %s',
	        past : 'hace %s',
	        s : 'unos segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'una hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un año',
	        yy : '%d años'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return es;
	
	})));


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish (Dominican Republic) [es-do]
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
	var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
	
	var esDo = moment.defineLocale('es-do', {
	    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShort[m.month()];
	        } else {
	            return monthsShortDot[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY h:mm A',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastDay : function () {
	            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'en %s',
	        past : 'hace %s',
	        s : 'unos segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'una hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un año',
	        yy : '%d años'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return esDo;
	
	})));


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Estonian [et]
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	        'm' : ['ühe minuti', 'üks minut'],
	        'mm': [number + ' minuti', number + ' minutit'],
	        'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	        'hh': [number + ' tunni', number + ' tundi'],
	        'd' : ['ühe päeva', 'üks päev'],
	        'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	        'MM': [number + ' kuu', number + ' kuud'],
	        'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	        'yy': [number + ' aasta', number + ' aastat']
	    };
	    if (withoutSuffix) {
	        return format[key][2] ? format[key][2] : format[key][1];
	    }
	    return isFuture ? format[key][0] : format[key][1];
	}
	
	var et = moment.defineLocale('et', {
	    months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	    monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	    weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	    weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	    weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	    longDateFormat : {
	        LT   : 'H:mm',
	        LTS : 'H:mm:ss',
	        L    : 'DD.MM.YYYY',
	        LL   : 'D. MMMM YYYY',
	        LLL  : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[Täna,] LT',
	        nextDay  : '[Homme,] LT',
	        nextWeek : '[Järgmine] dddd LT',
	        lastDay  : '[Eile,] LT',
	        lastWeek : '[Eelmine] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s pärast',
	        past   : '%s tagasi',
	        s      : processRelativeTime,
	        m      : processRelativeTime,
	        mm     : processRelativeTime,
	        h      : processRelativeTime,
	        hh     : processRelativeTime,
	        d      : processRelativeTime,
	        dd     : '%d päeva',
	        M      : processRelativeTime,
	        MM     : processRelativeTime,
	        y      : processRelativeTime,
	        yy     : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return et;
	
	})));


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Basque [eu]
	//! author : Eneko Illarramendi : https://github.com/eillarra
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var eu = moment.defineLocale('eu', {
	    months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	    monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	    weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	    weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY[ko] MMMM[ren] D[a]',
	        LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	        LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	        l : 'YYYY-M-D',
	        ll : 'YYYY[ko] MMM D[a]',
	        lll : 'YYYY[ko] MMM D[a] HH:mm',
	        llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	    },
	    calendar : {
	        sameDay : '[gaur] LT[etan]',
	        nextDay : '[bihar] LT[etan]',
	        nextWeek : 'dddd LT[etan]',
	        lastDay : '[atzo] LT[etan]',
	        lastWeek : '[aurreko] dddd LT[etan]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s barru',
	        past : 'duela %s',
	        s : 'segundo batzuk',
	        m : 'minutu bat',
	        mm : '%d minutu',
	        h : 'ordu bat',
	        hh : '%d ordu',
	        d : 'egun bat',
	        dd : '%d egun',
	        M : 'hilabete bat',
	        MM : '%d hilabete',
	        y : 'urte bat',
	        yy : '%d urte'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return eu;
	
	})));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian [fa]
	//! author : Ebrahim Byagowi : https://github.com/ebraminio
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '۱',
	    '2': '۲',
	    '3': '۳',
	    '4': '۴',
	    '5': '۵',
	    '6': '۶',
	    '7': '۷',
	    '8': '۸',
	    '9': '۹',
	    '0': '۰'
	};
	var numberMap = {
	    '۱': '1',
	    '۲': '2',
	    '۳': '3',
	    '۴': '4',
	    '۵': '5',
	    '۶': '6',
	    '۷': '7',
	    '۸': '8',
	    '۹': '9',
	    '۰': '0'
	};
	
	var fa = moment.defineLocale('fa', {
	    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	    weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /قبل از ظهر|بعد از ظهر/,
	    isPM: function (input) {
	        return /بعد از ظهر/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'قبل از ظهر';
	        } else {
	            return 'بعد از ظهر';
	        }
	    },
	    calendar : {
	        sameDay : '[امروز ساعت] LT',
	        nextDay : '[فردا ساعت] LT',
	        nextWeek : 'dddd [ساعت] LT',
	        lastDay : '[دیروز ساعت] LT',
	        lastWeek : 'dddd [پیش] [ساعت] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'در %s',
	        past : '%s پیش',
	        s : 'چندین ثانیه',
	        m : 'یک دقیقه',
	        mm : '%d دقیقه',
	        h : 'یک ساعت',
	        hh : '%d ساعت',
	        d : 'یک روز',
	        dd : '%d روز',
	        M : 'یک ماه',
	        MM : '%d ماه',
	        y : 'یک سال',
	        yy : '%d سال'
	    },
	    preparse: function (string) {
	        return string.replace(/[۰-۹]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    ordinalParse: /\d{1,2}م/,
	    ordinal : '%dم',
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12 // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return fa;
	
	})));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Finnish [fi]
	//! author : Tarmo Aidantausta : https://github.com/bleadof
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
	var numbersFuture = [
	        'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	        numbersPast[7], numbersPast[8], numbersPast[9]
	    ];
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = '';
	    switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	    }
	    result = verbalNumber(number, isFuture) + ' ' + result;
	    return result;
	}
	function verbalNumber(number, isFuture) {
	    return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	}
	
	var fi = moment.defineLocale('fi', {
	    months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	    monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	    weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	    weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	    weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD.MM.YYYY',
	        LL : 'Do MMMM[ta] YYYY',
	        LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	        LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	        l : 'D.M.YYYY',
	        ll : 'Do MMM YYYY',
	        lll : 'Do MMM YYYY, [klo] HH.mm',
	        llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	    },
	    calendar : {
	        sameDay : '[tänään] [klo] LT',
	        nextDay : '[huomenna] [klo] LT',
	        nextWeek : 'dddd [klo] LT',
	        lastDay : '[eilen] [klo] LT',
	        lastWeek : '[viime] dddd[na] [klo] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s päästä',
	        past : '%s sitten',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return fi;
	
	})));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Faroese [fo]
	//! author : Ragnar Johannesen : https://github.com/ragnar123
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var fo = moment.defineLocale('fo', {
	    months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	    weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	    weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	    weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D. MMMM, YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Í dag kl.] LT',
	        nextDay : '[Í morgin kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[Í gjár kl.] LT',
	        lastWeek : '[síðstu] dddd [kl] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'um %s',
	        past : '%s síðani',
	        s : 'fá sekund',
	        m : 'ein minutt',
	        mm : '%d minuttir',
	        h : 'ein tími',
	        hh : '%d tímar',
	        d : 'ein dagur',
	        dd : '%d dagar',
	        M : 'ein mánaði',
	        MM : '%d mánaðir',
	        y : 'eitt ár',
	        yy : '%d ár'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return fo;
	
	})));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French [fr]
	//! author : John Fischer : https://github.com/jfroffice
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var fr = moment.defineLocale('fr', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : '');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return fr;
	
	})));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Canada) [fr-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var frCa = moment.defineLocale('fr-ca', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|e)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : 'e');
	    }
	});
	
	return frCa;
	
	})));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Switzerland) [fr-ch]
	//! author : Gaspard Bucher : https://github.com/gaspard
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var frCh = moment.defineLocale('fr-ch', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|e)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : 'e');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return frCh;
	
	})));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Frisian [fy]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');
	
	var fy = moment.defineLocale('fy', {
	    months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	    weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	    weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[hjoed om] LT',
	        nextDay: '[moarn om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[juster om] LT',
	        lastWeek: '[ôfrûne] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'oer %s',
	        past : '%s lyn',
	        s : 'in pear sekonden',
	        m : 'ien minút',
	        mm : '%d minuten',
	        h : 'ien oere',
	        hh : '%d oeren',
	        d : 'ien dei',
	        dd : '%d dagen',
	        M : 'ien moanne',
	        MM : '%d moannen',
	        y : 'ien jier',
	        yy : '%d jierren'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return fy;
	
	})));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Scottish Gaelic [gd]
	//! author : Jon Ashdown : https://github.com/jonashdown
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var months = [
	    'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	];
	
	var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];
	
	var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];
	
	var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];
	
	var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];
	
	var gd = moment.defineLocale('gd', {
	    months : months,
	    monthsShort : monthsShort,
	    monthsParseExact : true,
	    weekdays : weekdays,
	    weekdaysShort : weekdaysShort,
	    weekdaysMin : weekdaysMin,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[An-diugh aig] LT',
	        nextDay : '[A-màireach aig] LT',
	        nextWeek : 'dddd [aig] LT',
	        lastDay : '[An-dè aig] LT',
	        lastWeek : 'dddd [seo chaidh] [aig] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ann an %s',
	        past : 'bho chionn %s',
	        s : 'beagan diogan',
	        m : 'mionaid',
	        mm : '%d mionaidean',
	        h : 'uair',
	        hh : '%d uairean',
	        d : 'latha',
	        dd : '%d latha',
	        M : 'mìos',
	        MM : '%d mìosan',
	        y : 'bliadhna',
	        yy : '%d bliadhna'
	    },
	    ordinalParse : /\d{1,2}(d|na|mh)/,
	    ordinal : function (number) {
	        var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return gd;
	
	})));


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Galician [gl]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var gl = moment.defineLocale('gl', {
	    months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
	    monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY H:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	        },
	        lastDay : function () {
	            return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	        },
	        lastWeek : function () {
	            return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : function (str) {
	            if (str.indexOf('un') === 0) {
	                return 'n' + str;
	            }
	            return 'en ' + str;
	        },
	        past : 'hai %s',
	        s : 'uns segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'unha hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un ano',
	        yy : '%d anos'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return gl;
	
	})));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew [he]
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var he = moment.defineLocale('he', {
	    months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	    monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	    weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	    weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	    weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [ב]MMMM YYYY',
	        LLL : 'D [ב]MMMM YYYY HH:mm',
	        LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	        l : 'D/M/YYYY',
	        ll : 'D MMM YYYY',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd, D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[היום ב־]LT',
	        nextDay : '[מחר ב־]LT',
	        nextWeek : 'dddd [בשעה] LT',
	        lastDay : '[אתמול ב־]LT',
	        lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'בעוד %s',
	        past : 'לפני %s',
	        s : 'מספר שניות',
	        m : 'דקה',
	        mm : '%d דקות',
	        h : 'שעה',
	        hh : function (number) {
	            if (number === 2) {
	                return 'שעתיים';
	            }
	            return number + ' שעות';
	        },
	        d : 'יום',
	        dd : function (number) {
	            if (number === 2) {
	                return 'יומיים';
	            }
	            return number + ' ימים';
	        },
	        M : 'חודש',
	        MM : function (number) {
	            if (number === 2) {
	                return 'חודשיים';
	            }
	            return number + ' חודשים';
	        },
	        y : 'שנה',
	        yy : function (number) {
	            if (number === 2) {
	                return 'שנתיים';
	            } else if (number % 10 === 0 && number !== 10) {
	                return number + ' שנה';
	            }
	            return number + ' שנים';
	        }
	    },
	    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	    isPM : function (input) {
	        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 5) {
	            return 'לפנות בוקר';
	        } else if (hour < 10) {
	            return 'בבוקר';
	        } else if (hour < 12) {
	            return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	        } else if (hour < 18) {
	            return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	        } else {
	            return 'בערב';
	        }
	    }
	});
	
	return he;
	
	})));


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hindi [hi]
	//! author : Mayank Singhal : https://github.com/mayanksinghal
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};
	
	var hi = moment.defineLocale('hi', {
	    months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	    monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	    weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm बजे',
	        LTS : 'A h:mm:ss बजे',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm बजे',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[कल] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[कल] LT',
	        lastWeek : '[पिछले] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s में',
	        past : '%s पहले',
	        s : 'कुछ ही क्षण',
	        m : 'एक मिनट',
	        mm : '%d मिनट',
	        h : 'एक घंटा',
	        hh : '%d घंटे',
	        d : 'एक दिन',
	        dd : '%d दिन',
	        M : 'एक महीने',
	        MM : '%d महीने',
	        y : 'एक वर्ष',
	        yy : '%d वर्ष'
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	    meridiemParse: /रात|सुबह|दोपहर|शाम/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'रात') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'सुबह') {
	            return hour;
	        } else if (meridiem === 'दोपहर') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'शाम') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'रात';
	        } else if (hour < 10) {
	            return 'सुबह';
	        } else if (hour < 17) {
	            return 'दोपहर';
	        } else if (hour < 20) {
	            return 'शाम';
	        } else {
	            return 'रात';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return hi;
	
	})));


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Croatian [hr]
	//! author : Bojan Marković : https://github.com/bmarkovic
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	    }
	}
	
	var hr = moment.defineLocale('hr', {
	    months : {
	        format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	        standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	    },
	    monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danas u] LT',
	        nextDay  : '[sutra u] LT',
	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[jučer u] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'par sekundi',
	        m      : translate,
	        mm     : translate,
	        h      : translate,
	        hh     : translate,
	        d      : 'dan',
	        dd     : translate,
	        M      : 'mjesec',
	        MM     : translate,
	        y      : 'godinu',
	        yy     : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return hr;
	
	})));


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hungarian [hu]
	//! author : Adam Brunner : https://github.com/adambrunner
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	function translate(number, withoutSuffix, key, isFuture) {
	    var num = number,
	        suffix;
	    switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	    }
	    return '';
	}
	function week(isFuture) {
	    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	}
	
	var hu = moment.defineLocale('hu', {
	    months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	    monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	    weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	    weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	    weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'YYYY.MM.DD.',
	        LL : 'YYYY. MMMM D.',
	        LLL : 'YYYY. MMMM D. H:mm',
	        LLLL : 'YYYY. MMMM D., dddd H:mm'
	    },
	    meridiemParse: /de|du/i,
	    isPM: function (input) {
	        return input.charAt(1).toLowerCase() === 'u';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower === true ? 'de' : 'DE';
	        } else {
	            return isLower === true ? 'du' : 'DU';
	        }
	    },
	    calendar : {
	        sameDay : '[ma] LT[-kor]',
	        nextDay : '[holnap] LT[-kor]',
	        nextWeek : function () {
	            return week.call(this, true);
	        },
	        lastDay : '[tegnap] LT[-kor]',
	        lastWeek : function () {
	            return week.call(this, false);
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s múlva',
	        past : '%s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return hu;
	
	})));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian [hy-am]
	//! author : Armendarabyan : https://github.com/armendarabyan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var hyAm = moment.defineLocale('hy-am', {
	    months : {
	        format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	        standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	    },
	    monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	    weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	    weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	    weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY թ.',
	        LLL : 'D MMMM YYYY թ., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	    },
	    calendar : {
	        sameDay: '[այսօր] LT',
	        nextDay: '[վաղը] LT',
	        lastDay: '[երեկ] LT',
	        nextWeek: function () {
	            return 'dddd [օրը ժամը] LT';
	        },
	        lastWeek: function () {
	            return '[անցած] dddd [օրը ժամը] LT';
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s հետո',
	        past : '%s առաջ',
	        s : 'մի քանի վայրկյան',
	        m : 'րոպե',
	        mm : '%d րոպե',
	        h : 'ժամ',
	        hh : '%d ժամ',
	        d : 'օր',
	        dd : '%d օր',
	        M : 'ամիս',
	        MM : '%d ամիս',
	        y : 'տարի',
	        yy : '%d տարի'
	    },
	    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	    isPM: function (input) {
	        return /^(ցերեկվա|երեկոյան)$/.test(input);
	    },
	    meridiem : function (hour) {
	        if (hour < 4) {
	            return 'գիշերվա';
	        } else if (hour < 12) {
	            return 'առավոտվա';
	        } else if (hour < 17) {
	            return 'ցերեկվա';
	        } else {
	            return 'երեկոյան';
	        }
	    },
	    ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return hyAm;
	
	})));


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Indonesian [id]
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var id = moment.defineLocale('id', {
	    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	    weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|siang|sore|malam/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'siang') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'sore' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'siang';
	        } else if (hours < 19) {
	            return 'sore';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Besok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kemarin pukul] LT',
	        lastWeek : 'dddd [lalu pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lalu',
	        s : 'beberapa detik',
	        m : 'semenit',
	        mm : '%d menit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return id;
	
	})));


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Icelandic [is]
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function plural(n) {
	    if (n % 100 === 11) {
	        return true;
	    } else if (n % 10 === 1) {
	        return false;
	    }
	    return true;
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	    }
	}
	
	var is = moment.defineLocale('is', {
	    months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	    weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	    weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	    weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] H:mm',
	        LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	    },
	    calendar : {
	        sameDay : '[í dag kl.] LT',
	        nextDay : '[á morgun kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[í gær kl.] LT',
	        lastWeek : '[síðasta] dddd [kl.] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'eftir %s',
	        past : 'fyrir %s síðan',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : 'klukkustund',
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return is;
	
	})));


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Italian [it]
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var it = moment.defineLocale('it', {
	    months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	    monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	    weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	    weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	    weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Oggi alle] LT',
	        nextDay: '[Domani alle] LT',
	        nextWeek: 'dddd [alle] LT',
	        lastDay: '[Ieri alle] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[la scorsa] dddd [alle] LT';
	                default:
	                    return '[lo scorso] dddd [alle] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : function (s) {
	            return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	        },
	        past : '%s fa',
	        s : 'alcuni secondi',
	        m : 'un minuto',
	        mm : '%d minuti',
	        h : 'un\'ora',
	        hh : '%d ore',
	        d : 'un giorno',
	        dd : '%d giorni',
	        M : 'un mese',
	        MM : '%d mesi',
	        y : 'un anno',
	        yy : '%d anni'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal: '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return it;
	
	})));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Japanese [ja]
	//! author : LI Long : https://github.com/baryon
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ja = moment.defineLocale('ja', {
	    months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	    weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	    weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	    longDateFormat : {
	        LT : 'Ah時m分',
	        LTS : 'Ah時m分s秒',
	        L : 'YYYY/MM/DD',
	        LL : 'YYYY年M月D日',
	        LLL : 'YYYY年M月D日Ah時m分',
	        LLLL : 'YYYY年M月D日Ah時m分 dddd'
	    },
	    meridiemParse: /午前|午後/i,
	    isPM : function (input) {
	        return input === '午後';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return '午前';
	        } else {
	            return '午後';
	        }
	    },
	    calendar : {
	        sameDay : '[今日] LT',
	        nextDay : '[明日] LT',
	        nextWeek : '[来週]dddd LT',
	        lastDay : '[昨日] LT',
	        lastWeek : '[前週]dddd LT',
	        sameElse : 'L'
	    },
	    ordinalParse : /\d{1,2}日/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            default:
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s後',
	        past : '%s前',
	        s : '数秒',
	        m : '1分',
	        mm : '%d分',
	        h : '1時間',
	        hh : '%d時間',
	        d : '1日',
	        dd : '%d日',
	        M : '1ヶ月',
	        MM : '%dヶ月',
	        y : '1年',
	        yy : '%d年'
	    }
	});
	
	return ja;
	
	})));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Javanese [jv]
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var jv = moment.defineLocale('jv', {
	    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	    weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	    weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /enjing|siyang|sonten|ndalu/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'enjing') {
	            return hour;
	        } else if (meridiem === 'siyang') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'enjing';
	        } else if (hours < 15) {
	            return 'siyang';
	        } else if (hours < 19) {
	            return 'sonten';
	        } else {
	            return 'ndalu';
	        }
	    },
	    calendar : {
	        sameDay : '[Dinten puniko pukul] LT',
	        nextDay : '[Mbenjang pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kala wingi pukul] LT',
	        lastWeek : 'dddd [kepengker pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'wonten ing %s',
	        past : '%s ingkang kepengker',
	        s : 'sawetawis detik',
	        m : 'setunggal menit',
	        mm : '%d menit',
	        h : 'setunggal jam',
	        hh : '%d jam',
	        d : 'sedinten',
	        dd : '%d dinten',
	        M : 'sewulan',
	        MM : '%d wulan',
	        y : 'setaun',
	        yy : '%d taun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return jv;
	
	})));


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian [ka]
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ka = moment.defineLocale('ka', {
	    months : {
	        standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	        format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	    },
	    monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	    weekdays : {
	        standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	        format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	        isFormat: /(წინა|შემდეგ)/
	    },
	    weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	    weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[დღეს] LT[-ზე]',
	        nextDay : '[ხვალ] LT[-ზე]',
	        lastDay : '[გუშინ] LT[-ზე]',
	        nextWeek : '[შემდეგ] dddd LT[-ზე]',
	        lastWeek : '[წინა] dddd LT-ზე',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : function (s) {
	            return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                s.replace(/ი$/, 'ში') :
	                s + 'ში';
	        },
	        past : function (s) {
	            if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                return s.replace(/(ი|ე)$/, 'ის წინ');
	            }
	            if ((/წელი/).test(s)) {
	                return s.replace(/წელი$/, 'წლის წინ');
	            }
	        },
	        s : 'რამდენიმე წამი',
	        m : 'წუთი',
	        mm : '%d წუთი',
	        h : 'საათი',
	        hh : '%d საათი',
	        d : 'დღე',
	        dd : '%d დღე',
	        M : 'თვე',
	        MM : '%d თვე',
	        y : 'წელი',
	        yy : '%d წელი'
	    },
	    ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	    ordinal : function (number) {
	        if (number === 0) {
	            return number;
	        }
	        if (number === 1) {
	            return number + '-ლი';
	        }
	        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	            return 'მე-' + number;
	        }
	        return number + '-ე';
	    },
	    week : {
	        dow : 1,
	        doy : 7
	    }
	});
	
	return ka;
	
	})));


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kazakh [kk]
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var suffixes = {
	    0: '-ші',
	    1: '-ші',
	    2: '-ші',
	    3: '-ші',
	    4: '-ші',
	    5: '-ші',
	    6: '-шы',
	    7: '-ші',
	    8: '-ші',
	    9: '-шы',
	    10: '-шы',
	    20: '-шы',
	    30: '-шы',
	    40: '-шы',
	    50: '-ші',
	    60: '-шы',
	    70: '-ші',
	    80: '-ші',
	    90: '-шы',
	    100: '-ші'
	};
	
	var kk = moment.defineLocale('kk', {
	    months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	    monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	    weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	    weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	    weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бүгін сағат] LT',
	        nextDay : '[Ертең сағат] LT',
	        nextWeek : 'dddd [сағат] LT',
	        lastDay : '[Кеше сағат] LT',
	        lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ішінде',
	        past : '%s бұрын',
	        s : 'бірнеше секунд',
	        m : 'бір минут',
	        mm : '%d минут',
	        h : 'бір сағат',
	        hh : '%d сағат',
	        d : 'бір күн',
	        dd : '%d күн',
	        M : 'бір ай',
	        MM : '%d ай',
	        y : 'бір жыл',
	        yy : '%d жыл'
	    },
	    ordinalParse: /\d{1,2}-(ші|шы)/,
	    ordinal : function (number) {
	        var a = number % 10,
	            b = number >= 100 ? 100 : null;
	        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return kk;
	
	})));


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Cambodian [km]
	//! author : Kruy Vanna : https://github.com/kruyvanna
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var km = moment.defineLocale('km', {
	    months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	    monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	    weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	        nextDay: '[ស្អែក ម៉ោង] LT',
	        nextWeek: 'dddd [ម៉ោង] LT',
	        lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	        lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: '%sទៀត',
	        past: '%sមុន',
	        s: 'ប៉ុន្មានវិនាទី',
	        m: 'មួយនាទី',
	        mm: '%d នាទី',
	        h: 'មួយម៉ោង',
	        hh: '%d ម៉ោង',
	        d: 'មួយថ្ងៃ',
	        dd: '%d ថ្ងៃ',
	        M: 'មួយខែ',
	        MM: '%d ខែ',
	        y: 'មួយឆ្នាំ',
	        yy: '%d ឆ្នាំ'
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return km;
	
	})));


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Korean [ko]
	//! author : Kyungwook, Park : https://github.com/kyungw00k
	//! author : Jeeeyul Lee <jeeeyul@gmail.com>
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ko = moment.defineLocale('ko', {
	    months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	    monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	    weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	    weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	    weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	    longDateFormat : {
	        LT : 'A h시 m분',
	        LTS : 'A h시 m분 s초',
	        L : 'YYYY.MM.DD',
	        LL : 'YYYY년 MMMM D일',
	        LLL : 'YYYY년 MMMM D일 A h시 m분',
	        LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	    },
	    calendar : {
	        sameDay : '오늘 LT',
	        nextDay : '내일 LT',
	        nextWeek : 'dddd LT',
	        lastDay : '어제 LT',
	        lastWeek : '지난주 dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s 후',
	        past : '%s 전',
	        s : '몇 초',
	        ss : '%d초',
	        m : '일분',
	        mm : '%d분',
	        h : '한 시간',
	        hh : '%d시간',
	        d : '하루',
	        dd : '%d일',
	        M : '한 달',
	        MM : '%d달',
	        y : '일 년',
	        yy : '%d년'
	    },
	    ordinalParse : /\d{1,2}일/,
	    ordinal : '%d일',
	    meridiemParse : /오전|오후/,
	    isPM : function (token) {
	        return token === '오후';
	    },
	    meridiem : function (hour, minute, isUpper) {
	        return hour < 12 ? '오전' : '오후';
	    }
	});
	
	return ko;
	
	})));


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kyrgyz [ky]
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	
	var suffixes = {
	    0: '-чү',
	    1: '-чи',
	    2: '-чи',
	    3: '-чү',
	    4: '-чү',
	    5: '-чи',
	    6: '-чы',
	    7: '-чи',
	    8: '-чи',
	    9: '-чу',
	    10: '-чу',
	    20: '-чы',
	    30: '-чу',
	    40: '-чы',
	    50: '-чү',
	    60: '-чы',
	    70: '-чи',
	    80: '-чи',
	    90: '-чу',
	    100: '-чү'
	};
	
	var ky = moment.defineLocale('ky', {
	    months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	    monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	    weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	    weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	    weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бүгүн саат] LT',
	        nextDay : '[Эртең саат] LT',
	        nextWeek : 'dddd [саат] LT',
	        lastDay : '[Кече саат] LT',
	        lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ичинде',
	        past : '%s мурун',
	        s : 'бирнече секунд',
	        m : 'бир мүнөт',
	        mm : '%d мүнөт',
	        h : 'бир саат',
	        hh : '%d саат',
	        d : 'бир күн',
	        dd : '%d күн',
	        M : 'бир ай',
	        MM : '%d ай',
	        y : 'бир жыл',
	        yy : '%d жыл'
	    },
	    ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	    ordinal : function (number) {
	        var a = number % 10,
	            b = number >= 100 ? 100 : null;
	        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ky;
	
	})));


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish [lb]
	//! author : mweimerskirch : https://github.com/mweimerskirch
	//! author : David Raison : https://github.com/kwisatz
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eng Minutt', 'enger Minutt'],
	        'h': ['eng Stonn', 'enger Stonn'],
	        'd': ['een Dag', 'engem Dag'],
	        'M': ['ee Mount', 'engem Mount'],
	        'y': ['ee Joer', 'engem Joer']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}
	function processFutureTime(string) {
	    var number = string.substr(0, string.indexOf(' '));
	    if (eifelerRegelAppliesToNumber(number)) {
	        return 'a ' + string;
	    }
	    return 'an ' + string;
	}
	function processPastTime(string) {
	    var number = string.substr(0, string.indexOf(' '));
	    if (eifelerRegelAppliesToNumber(number)) {
	        return 'viru ' + string;
	    }
	    return 'virun ' + string;
	}
	/**
	 * Returns true if the word before the given number loses the '-n' ending.
	 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	 *
	 * @param number {integer}
	 * @returns {boolean}
	 */
	function eifelerRegelAppliesToNumber(number) {
	    number = parseInt(number, 10);
	    if (isNaN(number)) {
	        return false;
	    }
	    if (number < 0) {
	        // Negative Number --> always true
	        return true;
	    } else if (number < 10) {
	        // Only 1 digit
	        if (4 <= number && number <= 7) {
	            return true;
	        }
	        return false;
	    } else if (number < 100) {
	        // 2 digits
	        var lastDigit = number % 10, firstDigit = number / 10;
	        if (lastDigit === 0) {
	            return eifelerRegelAppliesToNumber(firstDigit);
	        }
	        return eifelerRegelAppliesToNumber(lastDigit);
	    } else if (number < 10000) {
	        // 3 or 4 digits --> recursively check first digit
	        while (number >= 10) {
	            number = number / 10;
	        }
	        return eifelerRegelAppliesToNumber(number);
	    } else {
	        // Anything larger than 4 digits: recursively check first n-3 digits
	        number = number / 1000;
	        return eifelerRegelAppliesToNumber(number);
	    }
	}
	
	var lb = moment.defineLocale('lb', {
	    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm [Auer]',
	        LTS: 'H:mm:ss [Auer]',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm [Auer]',
	        LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	    },
	    calendar: {
	        sameDay: '[Haut um] LT',
	        sameElse: 'L',
	        nextDay: '[Muer um] LT',
	        nextWeek: 'dddd [um] LT',
	        lastDay: '[Gëschter um] LT',
	        lastWeek: function () {
	            // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	            switch (this.day()) {
	                case 2:
	                case 4:
	                    return '[Leschten] dddd [um] LT';
	                default:
	                    return '[Leschte] dddd [um] LT';
	            }
	        }
	    },
	    relativeTime : {
	        future : processFutureTime,
	        past : processPastTime,
	        s : 'e puer Sekonnen',
	        m : processRelativeTime,
	        mm : '%d Minutten',
	        h : processRelativeTime,
	        hh : '%d Stonnen',
	        d : processRelativeTime,
	        dd : '%d Deeg',
	        M : processRelativeTime,
	        MM : '%d Méint',
	        y : processRelativeTime,
	        yy : '%d Joer'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal: '%d.',
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return lb;
	
	})));


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lao [lo]
	//! author : Ryan Hart : https://github.com/ryanhart2
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var lo = moment.defineLocale('lo', {
	    months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	    monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	    weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	    weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	    weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	    isPM: function (input) {
	        return input === 'ຕອນແລງ';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ຕອນເຊົ້າ';
	        } else {
	            return 'ຕອນແລງ';
	        }
	    },
	    calendar : {
	        sameDay : '[ມື້ນີ້ເວລາ] LT',
	        nextDay : '[ມື້ອື່ນເວລາ] LT',
	        nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	        lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	        lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ອີກ %s',
	        past : '%sຜ່ານມາ',
	        s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	        m : '1 ນາທີ',
	        mm : '%d ນາທີ',
	        h : '1 ຊົ່ວໂມງ',
	        hh : '%d ຊົ່ວໂມງ',
	        d : '1 ມື້',
	        dd : '%d ມື້',
	        M : '1 ເດືອນ',
	        MM : '%d ເດືອນ',
	        y : '1 ປີ',
	        yy : '%d ປີ'
	    },
	    ordinalParse: /(ທີ່)\d{1,2}/,
	    ordinal : function (number) {
	        return 'ທີ່' + number;
	    }
	});
	
	return lo;
	
	})));


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian [lt]
	//! author : Mindaugas Mozūras : https://github.com/mmozuras
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var units = {
	    'm' : 'minutė_minutės_minutę',
	    'mm': 'minutės_minučių_minutes',
	    'h' : 'valanda_valandos_valandą',
	    'hh': 'valandos_valandų_valandas',
	    'd' : 'diena_dienos_dieną',
	    'dd': 'dienos_dienų_dienas',
	    'M' : 'mėnuo_mėnesio_mėnesį',
	    'MM': 'mėnesiai_mėnesių_mėnesius',
	    'y' : 'metai_metų_metus',
	    'yy': 'metai_metų_metus'
	};
	function translateSeconds(number, withoutSuffix, key, isFuture) {
	    if (withoutSuffix) {
	        return 'kelios sekundės';
	    } else {
	        return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	    }
	}
	function translateSingular(number, withoutSuffix, key, isFuture) {
	    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	}
	function special(number) {
	    return number % 10 === 0 || (number > 10 && number < 20);
	}
	function forms(key) {
	    return units[key].split('_');
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    if (number === 1) {
	        return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	    } else if (withoutSuffix) {
	        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	    } else {
	        if (isFuture) {
	            return result + forms(key)[1];
	        } else {
	            return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	        }
	    }
	}
	var lt = moment.defineLocale('lt', {
	    months : {
	        format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	        standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
	        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
	    },
	    monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	    weekdays : {
	        format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	        standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	        isFormat: /dddd HH:mm/
	    },
	    weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	    weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY [m.] MMMM D [d.]',
	        LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	        LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	        l : 'YYYY-MM-DD',
	        ll : 'YYYY [m.] MMMM D [d.]',
	        lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	        llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	    },
	    calendar : {
	        sameDay : '[Šiandien] LT',
	        nextDay : '[Rytoj] LT',
	        nextWeek : 'dddd LT',
	        lastDay : '[Vakar] LT',
	        lastWeek : '[Praėjusį] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'po %s',
	        past : 'prieš %s',
	        s : translateSeconds,
	        m : translateSingular,
	        mm : translate,
	        h : translateSingular,
	        hh : translate,
	        d : translateSingular,
	        dd : translate,
	        M : translateSingular,
	        MM : translate,
	        y : translateSingular,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}-oji/,
	    ordinal : function (number) {
	        return number + '-oji';
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return lt;
	
	})));


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Latvian [lv]
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var units = {
	    'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	    'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	    'h': 'stundas_stundām_stunda_stundas'.split('_'),
	    'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	    'd': 'dienas_dienām_diena_dienas'.split('_'),
	    'dd': 'dienas_dienām_diena_dienas'.split('_'),
	    'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	    'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	    'y': 'gada_gadiem_gads_gadi'.split('_'),
	    'yy': 'gada_gadiem_gads_gadi'.split('_')
	};
	/**
	 * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	 */
	function format(forms, number, withoutSuffix) {
	    if (withoutSuffix) {
	        // E.g. "21 minūte", "3 minūtes".
	        return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
	    } else {
	        // E.g. "21 minūtes" as in "pēc 21 minūtes".
	        // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	        return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
	    }
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    return number + ' ' + format(units[key], number, withoutSuffix);
	}
	function relativeTimeWithSingular(number, withoutSuffix, key) {
	    return format(units[key], number, withoutSuffix);
	}
	function relativeSeconds(number, withoutSuffix) {
	    return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	}
	
	var lv = moment.defineLocale('lv', {
	    months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	    weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	    weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY.',
	        LL : 'YYYY. [gada] D. MMMM',
	        LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	        LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	    },
	    calendar : {
	        sameDay : '[Šodien pulksten] LT',
	        nextDay : '[Rīt pulksten] LT',
	        nextWeek : 'dddd [pulksten] LT',
	        lastDay : '[Vakar pulksten] LT',
	        lastWeek : '[Pagājušā] dddd [pulksten] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'pēc %s',
	        past : 'pirms %s',
	        s : relativeSeconds,
	        m : relativeTimeWithSingular,
	        mm : relativeTimeWithPlural,
	        h : relativeTimeWithSingular,
	        hh : relativeTimeWithPlural,
	        d : relativeTimeWithSingular,
	        dd : relativeTimeWithPlural,
	        M : relativeTimeWithSingular,
	        MM : relativeTimeWithPlural,
	        y : relativeTimeWithSingular,
	        yy : relativeTimeWithPlural
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return lv;
	
	})));


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin [me]
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var translator = {
	    words: { //Different grammatical cases
	        m: ['jedan minut', 'jednog minuta'],
	        mm: ['minut', 'minuta', 'minuta'],
	        h: ['jedan sat', 'jednog sata'],
	        hh: ['sat', 'sata', 'sati'],
	        dd: ['dan', 'dana', 'dana'],
	        MM: ['mjesec', 'mjeseca', 'mjeseci'],
	        yy: ['godina', 'godine', 'godina']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};
	
	var me = moment.defineLocale('me', {
	    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact : true,
	    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[danas u] LT',
	        nextDay: '[sjutra u] LT',
	
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[juče u] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[prošle] [nedjelje] [u] LT',
	                '[prošlog] [ponedjeljka] [u] LT',
	                '[prošlog] [utorka] [u] LT',
	                '[prošle] [srijede] [u] LT',
	                '[prošlog] [četvrtka] [u] LT',
	                '[prošlog] [petka] [u] LT',
	                '[prošle] [subote] [u] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'nekoliko sekundi',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'dan',
	        dd     : translator.translate,
	        M      : 'mjesec',
	        MM     : translator.translate,
	        y      : 'godinu',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return me;
	
	})));


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maori [mi]
	//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var mi = moment.defineLocale('mi', {
	    months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
	    monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
	    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
	    weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
	    weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	    weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY [i] HH:mm',
	        LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
	    },
	    calendar: {
	        sameDay: '[i teie mahana, i] LT',
	        nextDay: '[apopo i] LT',
	        nextWeek: 'dddd [i] LT',
	        lastDay: '[inanahi i] LT',
	        lastWeek: 'dddd [whakamutunga i] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'i roto i %s',
	        past: '%s i mua',
	        s: 'te hēkona ruarua',
	        m: 'he meneti',
	        mm: '%d meneti',
	        h: 'te haora',
	        hh: '%d haora',
	        d: 'he ra',
	        dd: '%d ra',
	        M: 'he marama',
	        MM: '%d marama',
	        y: 'he tau',
	        yy: '%d tau'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal: '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return mi;
	
	})));


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Macedonian [mk]
	//! author : Borislav Mickov : https://github.com/B0k0
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var mk = moment.defineLocale('mk', {
	    months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	    monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	    weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	    weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	    weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'D.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : '[Денес во] LT',
	        nextDay : '[Утре во] LT',
	        nextWeek : '[Во] dddd [во] LT',
	        lastDay : '[Вчера во] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Изминатиот] dddd [во] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'после %s',
	        past : 'пред %s',
	        s : 'неколку секунди',
	        m : 'минута',
	        mm : '%d минути',
	        h : 'час',
	        hh : '%d часа',
	        d : 'ден',
	        dd : '%d дена',
	        M : 'месец',
	        MM : '%d месеци',
	        y : 'година',
	        yy : '%d години'
	    },
	    ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	    ordinal : function (number) {
	        var lastDigit = number % 10,
	            last2Digits = number % 100;
	        if (number === 0) {
	            return number + '-ев';
	        } else if (last2Digits === 0) {
	            return number + '-ен';
	        } else if (last2Digits > 10 && last2Digits < 20) {
	            return number + '-ти';
	        } else if (lastDigit === 1) {
	            return number + '-ви';
	        } else if (lastDigit === 2) {
	            return number + '-ри';
	        } else if (lastDigit === 7 || lastDigit === 8) {
	            return number + '-ми';
	        } else {
	            return number + '-ти';
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return mk;
	
	})));


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malayalam [ml]
	//! author : Floyd Pink : https://github.com/floydpink
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ml = moment.defineLocale('ml', {
	    months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	    monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	    weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	    weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm -നു',
	        LTS : 'A h:mm:ss -നു',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm -നു',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	    },
	    calendar : {
	        sameDay : '[ഇന്ന്] LT',
	        nextDay : '[നാളെ] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[ഇന്നലെ] LT',
	        lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s കഴിഞ്ഞ്',
	        past : '%s മുൻപ്',
	        s : 'അൽപ നിമിഷങ്ങൾ',
	        m : 'ഒരു മിനിറ്റ്',
	        mm : '%d മിനിറ്റ്',
	        h : 'ഒരു മണിക്കൂർ',
	        hh : '%d മണിക്കൂർ',
	        d : 'ഒരു ദിവസം',
	        dd : '%d ദിവസം',
	        M : 'ഒരു മാസം',
	        MM : '%d മാസം',
	        y : 'ഒരു വർഷം',
	        yy : '%d വർഷം'
	    },
	    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                meridiem === 'വൈകുന്നേരം') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'രാത്രി';
	        } else if (hour < 12) {
	            return 'രാവിലെ';
	        } else if (hour < 17) {
	            return 'ഉച്ച കഴിഞ്ഞ്';
	        } else if (hour < 20) {
	            return 'വൈകുന്നേരം';
	        } else {
	            return 'രാത്രി';
	        }
	    }
	});
	
	return ml;
	
	})));


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi [mr]
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};
	
	function relativeTimeMr(number, withoutSuffix, string, isFuture)
	{
	    var output = '';
	    if (withoutSuffix) {
	        switch (string) {
	            case 's': output = 'काही सेकंद'; break;
	            case 'm': output = 'एक मिनिट'; break;
	            case 'mm': output = '%d मिनिटे'; break;
	            case 'h': output = 'एक तास'; break;
	            case 'hh': output = '%d तास'; break;
	            case 'd': output = 'एक दिवस'; break;
	            case 'dd': output = '%d दिवस'; break;
	            case 'M': output = 'एक महिना'; break;
	            case 'MM': output = '%d महिने'; break;
	            case 'y': output = 'एक वर्ष'; break;
	            case 'yy': output = '%d वर्षे'; break;
	        }
	    }
	    else {
	        switch (string) {
	            case 's': output = 'काही सेकंदां'; break;
	            case 'm': output = 'एका मिनिटा'; break;
	            case 'mm': output = '%d मिनिटां'; break;
	            case 'h': output = 'एका तासा'; break;
	            case 'hh': output = '%d तासां'; break;
	            case 'd': output = 'एका दिवसा'; break;
	            case 'dd': output = '%d दिवसां'; break;
	            case 'M': output = 'एका महिन्या'; break;
	            case 'MM': output = '%d महिन्यां'; break;
	            case 'y': output = 'एका वर्षा'; break;
	            case 'yy': output = '%d वर्षां'; break;
	        }
	    }
	    return output.replace(/%d/i, number);
	}
	
	var mr = moment.defineLocale('mr', {
	    months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	    monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	    weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm वाजता',
	        LTS : 'A h:mm:ss वाजता',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm वाजता',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[उद्या] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[काल] LT',
	        lastWeek: '[मागील] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future: '%sमध्ये',
	        past: '%sपूर्वी',
	        s: relativeTimeMr,
	        m: relativeTimeMr,
	        mm: relativeTimeMr,
	        h: relativeTimeMr,
	        hh: relativeTimeMr,
	        d: relativeTimeMr,
	        dd: relativeTimeMr,
	        M: relativeTimeMr,
	        MM: relativeTimeMr,
	        y: relativeTimeMr,
	        yy: relativeTimeMr
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'रात्री') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'सकाळी') {
	            return hour;
	        } else if (meridiem === 'दुपारी') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'सायंकाळी') {
	            return hour + 12;
	        }
	    },
	    meridiem: function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'रात्री';
	        } else if (hour < 10) {
	            return 'सकाळी';
	        } else if (hour < 17) {
	            return 'दुपारी';
	        } else if (hour < 20) {
	            return 'सायंकाळी';
	        } else {
	            return 'रात्री';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return mr;
	
	})));


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms]
	//! author : Weldan Jamili : https://github.com/weldan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ms = moment.defineLocale('ms', {
	    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|tengahari|petang|malam/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'tengahari') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'petang' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'tengahari';
	        } else if (hours < 19) {
	            return 'petang';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Esok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kelmarin pukul] LT',
	        lastWeek : 'dddd [lepas pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lepas',
	        s : 'beberapa saat',
	        m : 'seminit',
	        mm : '%d minit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ms;
	
	})));


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms-my]
	//! note : DEPRECATED, the correct one is [ms]
	//! author : Weldan Jamili : https://github.com/weldan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var msMy = moment.defineLocale('ms-my', {
	    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|tengahari|petang|malam/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'tengahari') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'petang' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'tengahari';
	        } else if (hours < 19) {
	            return 'petang';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Esok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kelmarin pukul] LT',
	        lastWeek : 'dddd [lepas pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lepas',
	        s : 'beberapa saat',
	        m : 'seminit',
	        mm : '%d minit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return msMy;
	
	})));


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese [my]
	//! author : Squar team, mysquar.com
	//! author : David Rossellat : https://github.com/gholadr
	//! author : Tin Aung Lin : https://github.com/thanyawzinmin
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '၁',
	    '2': '၂',
	    '3': '၃',
	    '4': '၄',
	    '5': '၅',
	    '6': '၆',
	    '7': '၇',
	    '8': '၈',
	    '9': '၉',
	    '0': '၀'
	};
	var numberMap = {
	    '၁': '1',
	    '၂': '2',
	    '၃': '3',
	    '၄': '4',
	    '၅': '5',
	    '၆': '6',
	    '၇': '7',
	    '၈': '8',
	    '၉': '9',
	    '၀': '0'
	};
	
	var my = moment.defineLocale('my', {
	    months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	    monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	    weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	    weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	    weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[ယနေ.] LT [မှာ]',
	        nextDay: '[မနက်ဖြန်] LT [မှာ]',
	        nextWeek: 'dddd LT [မှာ]',
	        lastDay: '[မနေ.က] LT [မှာ]',
	        lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'လာမည့် %s မှာ',
	        past: 'လွန်ခဲ့သော %s က',
	        s: 'စက္ကန်.အနည်းငယ်',
	        m: 'တစ်မိနစ်',
	        mm: '%d မိနစ်',
	        h: 'တစ်နာရီ',
	        hh: '%d နာရီ',
	        d: 'တစ်ရက်',
	        dd: '%d ရက်',
	        M: 'တစ်လ',
	        MM: '%d လ',
	        y: 'တစ်နှစ်',
	        yy: '%d နှစ်'
	    },
	    preparse: function (string) {
	        return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return my;
	
	})));


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Norwegian Bokmål [nb]
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var nb = moment.defineLocale('nb', {
	    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	    weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] HH:mm',
	        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[i dag kl.] LT',
	        nextDay: '[i morgen kl.] LT',
	        nextWeek: 'dddd [kl.] LT',
	        lastDay: '[i går kl.] LT',
	        lastWeek: '[forrige] dddd [kl.] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s siden',
	        s : 'noen sekunder',
	        m : 'ett minutt',
	        mm : '%d minutter',
	        h : 'en time',
	        hh : '%d timer',
	        d : 'en dag',
	        dd : '%d dager',
	        M : 'en måned',
	        MM : '%d måneder',
	        y : 'ett år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return nb;
	
	})));


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nepalese [ne]
	//! author : suvash : https://github.com/suvash
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};
	
	var ne = moment.defineLocale('ne', {
	    months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	    monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	    weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	    weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'Aको h:mm बजे',
	        LTS : 'Aको h:mm:ss बजे',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, Aको h:mm बजे',
	        LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'राति') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'बिहान') {
	            return hour;
	        } else if (meridiem === 'दिउँसो') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'साँझ') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 3) {
	            return 'राति';
	        } else if (hour < 12) {
	            return 'बिहान';
	        } else if (hour < 16) {
	            return 'दिउँसो';
	        } else if (hour < 20) {
	            return 'साँझ';
	        } else {
	            return 'राति';
	        }
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[भोलि] LT',
	        nextWeek : '[आउँदो] dddd[,] LT',
	        lastDay : '[हिजो] LT',
	        lastWeek : '[गएको] dddd[,] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%sमा',
	        past : '%s अगाडि',
	        s : 'केही क्षण',
	        m : 'एक मिनेट',
	        mm : '%d मिनेट',
	        h : 'एक घण्टा',
	        hh : '%d घण्टा',
	        d : 'एक दिन',
	        dd : '%d दिन',
	        M : 'एक महिना',
	        MM : '%d महिना',
	        y : 'एक बर्ष',
	        yy : '%d बर्ष'
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ne;
	
	})));


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Dutch [nl]
	//! author : Joris Röling : https://github.com/jorisroling
	//! author : Jacob Middag : https://github.com/middagj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
	
	var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
	var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
	
	var nl = moment.defineLocale('nl', {
	    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },
	
	    monthsRegex: monthsRegex,
	    monthsShortRegex: monthsRegex,
	    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
	    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
	
	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,
	
	    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[vandaag om] LT',
	        nextDay: '[morgen om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[gisteren om] LT',
	        lastWeek: '[afgelopen] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'over %s',
	        past : '%s geleden',
	        s : 'een paar seconden',
	        m : 'één minuut',
	        mm : '%d minuten',
	        h : 'één uur',
	        hh : '%d uur',
	        d : 'één dag',
	        dd : '%d dagen',
	        M : 'één maand',
	        MM : '%d maanden',
	        y : 'één jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return nl;
	
	})));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Dutch (Belgium) [nl-be]
	//! author : Joris Röling : https://github.com/jorisroling
	//! author : Jacob Middag : https://github.com/middagj
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
	
	var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
	var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
	
	var nlBe = moment.defineLocale('nl-be', {
	    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },
	
	    monthsRegex: monthsRegex,
	    monthsShortRegex: monthsRegex,
	    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
	    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
	
	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,
	
	    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[vandaag om] LT',
	        nextDay: '[morgen om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[gisteren om] LT',
	        lastWeek: '[afgelopen] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'over %s',
	        past : '%s geleden',
	        s : 'een paar seconden',
	        m : 'één minuut',
	        mm : '%d minuten',
	        h : 'één uur',
	        hh : '%d uur',
	        d : 'één dag',
	        dd : '%d dagen',
	        M : 'één maand',
	        MM : '%d maanden',
	        y : 'één jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return nlBe;
	
	})));


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nynorsk [nn]
	//! author : https://github.com/mechuwind
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var nn = moment.defineLocale('nn', {
	    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	    weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	    weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	    weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] H:mm',
	        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[I dag klokka] LT',
	        nextDay: '[I morgon klokka] LT',
	        nextWeek: 'dddd [klokka] LT',
	        lastDay: '[I går klokka] LT',
	        lastWeek: '[Føregåande] dddd [klokka] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s sidan',
	        s : 'nokre sekund',
	        m : 'eit minutt',
	        mm : '%d minutt',
	        h : 'ein time',
	        hh : '%d timar',
	        d : 'ein dag',
	        dd : '%d dagar',
	        M : 'ein månad',
	        MM : '%d månader',
	        y : 'eit år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return nn;
	
	})));


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Punjabi (India) [pa-in]
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '੧',
	    '2': '੨',
	    '3': '੩',
	    '4': '੪',
	    '5': '੫',
	    '6': '੬',
	    '7': '੭',
	    '8': '੮',
	    '9': '੯',
	    '0': '੦'
	};
	var numberMap = {
	    '੧': '1',
	    '੨': '2',
	    '੩': '3',
	    '੪': '4',
	    '੫': '5',
	    '੬': '6',
	    '੭': '7',
	    '੮': '8',
	    '੯': '9',
	    '੦': '0'
	};
	
	var paIn = moment.defineLocale('pa-in', {
	    // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	    months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	    monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	    weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	    weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	    weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm ਵਜੇ',
	        LTS : 'A h:mm:ss ਵਜੇ',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	    },
	    calendar : {
	        sameDay : '[ਅਜ] LT',
	        nextDay : '[ਕਲ] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[ਕਲ] LT',
	        lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ਵਿੱਚ',
	        past : '%s ਪਿਛਲੇ',
	        s : 'ਕੁਝ ਸਕਿੰਟ',
	        m : 'ਇਕ ਮਿੰਟ',
	        mm : '%d ਮਿੰਟ',
	        h : 'ਇੱਕ ਘੰਟਾ',
	        hh : '%d ਘੰਟੇ',
	        d : 'ਇੱਕ ਦਿਨ',
	        dd : '%d ਦਿਨ',
	        M : 'ਇੱਕ ਮਹੀਨਾ',
	        MM : '%d ਮਹੀਨੇ',
	        y : 'ਇੱਕ ਸਾਲ',
	        yy : '%d ਸਾਲ'
	    },
	    preparse: function (string) {
	        return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'ਰਾਤ') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'ਸਵੇਰ') {
	            return hour;
	        } else if (meridiem === 'ਦੁਪਹਿਰ') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'ਸ਼ਾਮ') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ਰਾਤ';
	        } else if (hour < 10) {
	            return 'ਸਵੇਰ';
	        } else if (hour < 17) {
	            return 'ਦੁਪਹਿਰ';
	        } else if (hour < 20) {
	            return 'ਸ਼ਾਮ';
	        } else {
	            return 'ਰਾਤ';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return paIn;
	
	})));


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Polish [pl]
	//! author : Rafal Hirsz : https://github.com/evoL
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
	var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	function plural(n) {
	    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	}
	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	    }
	}
	
	var pl = moment.defineLocale('pl', {
	    months : function (momentToFormat, format) {
	        if (format === '') {
	            // Hack: if format empty we know this is used to generate
	            // RegExp by moment. Give then back both valid forms of months
	            // in RegExp ready format.
	            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	        } else if (/D MMMM/.test(format)) {
	            return monthsSubjective[momentToFormat.month()];
	        } else {
	            return monthsNominative[momentToFormat.month()];
	        }
	    },
	    monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	    weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	    weekdaysShort : 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
	    weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Dziś o] LT',
	        nextDay: '[Jutro o] LT',
	        nextWeek: '[W] dddd [o] LT',
	        lastDay: '[Wczoraj o] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : '%s temu',
	        s : 'kilka sekund',
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : '1 dzień',
	        dd : '%d dni',
	        M : 'miesiąc',
	        MM : translate,
	        y : 'rok',
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return pl;
	
	})));


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese [pt]
	//! author : Jefferson : https://github.com/jalex79
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var pt = moment.defineLocale('pt', {
	    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	    weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY HH:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hoje às] LT',
	        nextDay: '[Amanhã às] LT',
	        nextWeek: 'dddd [às] LT',
	        lastDay: '[Ontem às] LT',
	        lastWeek: function () {
	            return (this.day() === 0 || this.day() === 6) ?
	                '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'em %s',
	        past : 'há %s',
	        s : 'segundos',
	        m : 'um minuto',
	        mm : '%d minutos',
	        h : 'uma hora',
	        hh : '%d horas',
	        d : 'um dia',
	        dd : '%d dias',
	        M : 'um mês',
	        MM : '%d meses',
	        y : 'um ano',
	        yy : '%d anos'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return pt;
	
	})));


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese (Brazil) [pt-br]
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var ptBr = moment.defineLocale('pt-br', {
	    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	    weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hoje às] LT',
	        nextDay: '[Amanhã às] LT',
	        nextWeek: 'dddd [às] LT',
	        lastDay: '[Ontem às] LT',
	        lastWeek: function () {
	            return (this.day() === 0 || this.day() === 6) ?
	                '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'em %s',
	        past : '%s atrás',
	        s : 'poucos segundos',
	        m : 'um minuto',
	        mm : '%d minutos',
	        h : 'uma hora',
	        hh : '%d horas',
	        d : 'um dia',
	        dd : '%d dias',
	        M : 'um mês',
	        MM : '%d meses',
	        y : 'um ano',
	        yy : '%d anos'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal : '%dº'
	});
	
	return ptBr;
	
	})));


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Romanian [ro]
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	            'mm': 'minute',
	            'hh': 'ore',
	            'dd': 'zile',
	            'MM': 'luni',
	            'yy': 'ani'
	        },
	        separator = ' ';
	    if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	        separator = ' de ';
	    }
	    return number + separator + format[key];
	}
	
	var ro = moment.defineLocale('ro', {
	    months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	    monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	    weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	    weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay: '[azi la] LT',
	        nextDay: '[mâine la] LT',
	        nextWeek: 'dddd [la] LT',
	        lastDay: '[ieri la] LT',
	        lastWeek: '[fosta] dddd [la] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'peste %s',
	        past : '%s în urmă',
	        s : 'câteva secunde',
	        m : 'un minut',
	        mm : relativeTimeWithPlural,
	        h : 'o oră',
	        hh : relativeTimeWithPlural,
	        d : 'o zi',
	        dd : relativeTimeWithPlural,
	        M : 'o lună',
	        MM : relativeTimeWithPlural,
	        y : 'un an',
	        yy : relativeTimeWithPlural
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ro;
	
	})));


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Russian [ru]
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	        'hh': 'час_часа_часов',
	        'dd': 'день_дня_дней',
	        'MM': 'месяц_месяца_месяцев',
	        'yy': 'год_года_лет'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'минута' : 'минуту';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}
	var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
	
	// http://new.gramota.ru/spravka/rules/139-prop : § 103
	// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	var ru = moment.defineLocale('ru', {
	    months : {
	        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	    },
	    monthsShort : {
	        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	    },
	    weekdays : {
	        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	    },
	    weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	    weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,
	
	    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
	    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
	
	    // копия предыдущего
	    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
	
	    // полные названия с падежами
	    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
	
	    // Выражение, которое соотвествует только сокращённым формам
	    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY г.',
	        LLL : 'D MMMM YYYY г., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	    },
	    calendar : {
	        sameDay: '[Сегодня в] LT',
	        nextDay: '[Завтра в] LT',
	        lastDay: '[Вчера в] LT',
	        nextWeek: function (now) {
	            if (now.week() !== this.week()) {
	                switch (this.day()) {
	                    case 0:
	                        return '[В следующее] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В следующий] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В следующую] dddd [в] LT';
	                }
	            } else {
	                if (this.day() === 2) {
	                    return '[Во] dddd [в] LT';
	                } else {
	                    return '[В] dddd [в] LT';
	                }
	            }
	        },
	        lastWeek: function (now) {
	            if (now.week() !== this.week()) {
	                switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                }
	            } else {
	                if (this.day() === 2) {
	                    return '[Во] dddd [в] LT';
	                } else {
	                    return '[В] dddd [в] LT';
	                }
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'через %s',
	        past : '%s назад',
	        s : 'несколько секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : 'час',
	        hh : relativeTimeWithPlural,
	        d : 'день',
	        dd : relativeTimeWithPlural,
	        M : 'месяц',
	        MM : relativeTimeWithPlural,
	        y : 'год',
	        yy : relativeTimeWithPlural
	    },
	    meridiemParse: /ночи|утра|дня|вечера/i,
	    isPM : function (input) {
	        return /^(дня|вечера)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночи';
	        } else if (hour < 12) {
	            return 'утра';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечера';
	        }
	    },
	    ordinalParse: /\d{1,2}-(й|го|я)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ru;
	
	})));


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami [se]
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	
	var se = moment.defineLocale('se', {
	    months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	    monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	    weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	    weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	    weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'MMMM D. [b.] YYYY',
	        LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	        LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[otne ti] LT',
	        nextDay: '[ihttin ti] LT',
	        nextWeek: 'dddd [ti] LT',
	        lastDay: '[ikte ti] LT',
	        lastWeek: '[ovddit] dddd [ti] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s geažes',
	        past : 'maŋit %s',
	        s : 'moadde sekunddat',
	        m : 'okta minuhta',
	        mm : '%d minuhtat',
	        h : 'okta diimmu',
	        hh : '%d diimmut',
	        d : 'okta beaivi',
	        dd : '%d beaivvit',
	        M : 'okta mánnu',
	        MM : '%d mánut',
	        y : 'okta jahki',
	        yy : '%d jagit'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return se;
	
	})));


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese [si]
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	/*jshint -W100*/
	var si = moment.defineLocale('si', {
	    months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	    monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	    weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	    weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	    weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'a h:mm',
	        LTS : 'a h:mm:ss',
	        L : 'YYYY/MM/DD',
	        LL : 'YYYY MMMM D',
	        LLL : 'YYYY MMMM D, a h:mm',
	        LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	    },
	    calendar : {
	        sameDay : '[අද] LT[ට]',
	        nextDay : '[හෙට] LT[ට]',
	        nextWeek : 'dddd LT[ට]',
	        lastDay : '[ඊයේ] LT[ට]',
	        lastWeek : '[පසුගිය] dddd LT[ට]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%sකින්',
	        past : '%sකට පෙර',
	        s : 'තත්පර කිහිපය',
	        m : 'මිනිත්තුව',
	        mm : 'මිනිත්තු %d',
	        h : 'පැය',
	        hh : 'පැය %d',
	        d : 'දිනය',
	        dd : 'දින %d',
	        M : 'මාසය',
	        MM : 'මාස %d',
	        y : 'වසර',
	        yy : 'වසර %d'
	    },
	    ordinalParse: /\d{1,2} වැනි/,
	    ordinal : function (number) {
	        return number + ' වැනි';
	    },
	    meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	    isPM : function (input) {
	        return input === 'ප.ව.' || input === 'පස් වරු';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'ප.ව.' : 'පස් වරු';
	        } else {
	            return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	        }
	    }
	});
	
	return si;
	
	})));


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovak [sk]
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
	var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	function plural(n) {
	    return (n > 1) && (n < 5);
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	    }
	}
	
	var sk = moment.defineLocale('sk', {
	    months : months,
	    monthsShort : monthsShort,
	    weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	    weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	    weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	    longDateFormat : {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay: '[dnes o] LT',
	        nextDay: '[zajtra o] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	            }
	        },
	        lastDay: '[včera o] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : 'pred %s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return sk;
	
	})));


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovenian [sl]
	//! author : Robert Sedovšek : https://github.com/sedovsek
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += withoutSuffix ? 'minuta' : 'minuto';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	            } else {
	                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += withoutSuffix ? 'ura' : 'uro';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'uri' : 'urama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'ure' : 'urami';
	            } else {
	                result += withoutSuffix || isFuture ? 'ur' : 'urami';
	            }
	            return result;
	        case 'd':
	            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	        case 'dd':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	            } else {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	            }
	            return result;
	        case 'M':
	            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	        case 'MM':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	            } else {
	                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	            }
	            return result;
	        case 'y':
	            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	        case 'yy':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'leto' : 'letom';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'leta' : 'leti';
	            } else {
	                result += withoutSuffix || isFuture ? 'let' : 'leti';
	            }
	            return result;
	    }
	}
	
	var sl = moment.defineLocale('sl', {
	    months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	    weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	    weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danes ob] LT',
	        nextDay  : '[jutri ob] LT',
	
	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	            }
	        },
	        lastDay  : '[včeraj ob] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[prejšnjo] [nedeljo] [ob] LT';
	                case 3:
	                    return '[prejšnjo] [sredo] [ob] LT';
	                case 6:
	                    return '[prejšnjo] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'čez %s',
	        past   : 'pred %s',
	        s      : processRelativeTime,
	        m      : processRelativeTime,
	        mm     : processRelativeTime,
	        h      : processRelativeTime,
	        hh     : processRelativeTime,
	        d      : processRelativeTime,
	        dd     : processRelativeTime,
	        M      : processRelativeTime,
	        MM     : processRelativeTime,
	        y      : processRelativeTime,
	        yy     : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return sl;
	
	})));


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian [sq]
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author : Menelion Elensúle : https://github.com/Oire
	//! author : Oerd Cukalla : https://github.com/oerd
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var sq = moment.defineLocale('sq', {
	    months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	    monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	    weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	    weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	    weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	    weekdaysParseExact : true,
	    meridiemParse: /PD|MD/,
	    isPM: function (input) {
	        return input.charAt(0) === 'M';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        return hours < 12 ? 'PD' : 'MD';
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Sot në] LT',
	        nextDay : '[Nesër në] LT',
	        nextWeek : 'dddd [në] LT',
	        lastDay : '[Dje në] LT',
	        lastWeek : 'dddd [e kaluar në] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'në %s',
	        past : '%s më parë',
	        s : 'disa sekonda',
	        m : 'një minutë',
	        mm : '%d minuta',
	        h : 'një orë',
	        hh : '%d orë',
	        d : 'një ditë',
	        dd : '%d ditë',
	        M : 'një muaj',
	        MM : '%d muaj',
	        y : 'një vit',
	        yy : '%d vite'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return sq;
	
	})));


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian [sr]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var translator = {
	    words: { //Different grammatical cases
	        m: ['jedan minut', 'jedne minute'],
	        mm: ['minut', 'minute', 'minuta'],
	        h: ['jedan sat', 'jednog sata'],
	        hh: ['sat', 'sata', 'sati'],
	        dd: ['dan', 'dana', 'dana'],
	        MM: ['mesec', 'meseca', 'meseci'],
	        yy: ['godina', 'godine', 'godina']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};
	
	var sr = moment.defineLocale('sr', {
	    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[danas u] LT',
	        nextDay: '[sutra u] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[juče u] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[prošle] [nedelje] [u] LT',
	                '[prošlog] [ponedeljka] [u] LT',
	                '[prošlog] [utorka] [u] LT',
	                '[prošle] [srede] [u] LT',
	                '[prošlog] [četvrtka] [u] LT',
	                '[prošlog] [petka] [u] LT',
	                '[prošle] [subote] [u] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'pre %s',
	        s      : 'nekoliko sekundi',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'dan',
	        dd     : translator.translate,
	        M      : 'mesec',
	        MM     : translator.translate,
	        y      : 'godinu',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return sr;
	
	})));


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian Cyrillic [sr-cyrl]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var translator = {
	    words: { //Different grammatical cases
	        m: ['један минут', 'једне минуте'],
	        mm: ['минут', 'минуте', 'минута'],
	        h: ['један сат', 'једног сата'],
	        hh: ['сат', 'сата', 'сати'],
	        dd: ['дан', 'дана', 'дана'],
	        MM: ['месец', 'месеца', 'месеци'],
	        yy: ['година', 'године', 'година']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};
	
	var srCyrl = moment.defineLocale('sr-cyrl', {
	    months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	    monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	    monthsParseExact: true,
	    weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	    weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	    weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[данас у] LT',
	        nextDay: '[сутра у] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	            }
	        },
	        lastDay  : '[јуче у] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[прошле] [недеље] [у] LT',
	                '[прошлог] [понедељка] [у] LT',
	                '[прошлог] [уторка] [у] LT',
	                '[прошле] [среде] [у] LT',
	                '[прошлог] [четвртка] [у] LT',
	                '[прошлог] [петка] [у] LT',
	                '[прошле] [суботе] [у] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'за %s',
	        past   : 'пре %s',
	        s      : 'неколико секунди',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'дан',
	        dd     : translator.translate,
	        M      : 'месец',
	        MM     : translator.translate,
	        y      : 'годину',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return srCyrl;
	
	})));


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : siSwati [ss]
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	
	var ss = moment.defineLocale('ss', {
	    months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	    monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	    weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	    weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	    weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Namuhla nga] LT',
	        nextDay : '[Kusasa nga] LT',
	        nextWeek : 'dddd [nga] LT',
	        lastDay : '[Itolo nga] LT',
	        lastWeek : 'dddd [leliphelile] [nga] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'nga %s',
	        past : 'wenteka nga %s',
	        s : 'emizuzwana lomcane',
	        m : 'umzuzu',
	        mm : '%d emizuzu',
	        h : 'lihora',
	        hh : '%d emahora',
	        d : 'lilanga',
	        dd : '%d emalanga',
	        M : 'inyanga',
	        MM : '%d tinyanga',
	        y : 'umnyaka',
	        yy : '%d iminyaka'
	    },
	    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'ekuseni';
	        } else if (hours < 15) {
	            return 'emini';
	        } else if (hours < 19) {
	            return 'entsambama';
	        } else {
	            return 'ebusuku';
	        }
	    },
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'ekuseni') {
	            return hour;
	        } else if (meridiem === 'emini') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	            if (hour === 0) {
	                return 0;
	            }
	            return hour + 12;
	        }
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : '%d',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return ss;
	
	})));


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swedish [sv]
	//! author : Jens Alm : https://github.com/ulmus
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var sv = moment.defineLocale('sv', {
	    months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	    weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	    weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [kl.] HH:mm',
	        LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Idag] LT',
	        nextDay: '[Imorgon] LT',
	        lastDay: '[Igår] LT',
	        nextWeek: '[På] dddd LT',
	        lastWeek: '[I] dddd[s] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : 'för %s sedan',
	        s : 'några sekunder',
	        m : 'en minut',
	        mm : '%d minuter',
	        h : 'en timme',
	        hh : '%d timmar',
	        d : 'en dag',
	        dd : '%d dagar',
	        M : 'en månad',
	        MM : '%d månader',
	        y : 'ett år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}(e|a)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'e' :
	            (b === 1) ? 'a' :
	            (b === 2) ? 'a' :
	            (b === 3) ? 'e' : 'e';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return sv;
	
	})));


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swahili [sw]
	//! author : Fahad Kassim : https://github.com/fadsel
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var sw = moment.defineLocale('sw', {
	    months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	    weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	    weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[leo saa] LT',
	        nextDay : '[kesho saa] LT',
	        nextWeek : '[wiki ijayo] dddd [saat] LT',
	        lastDay : '[jana] LT',
	        lastWeek : '[wiki iliyopita] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s baadaye',
	        past : 'tokea %s',
	        s : 'hivi punde',
	        m : 'dakika moja',
	        mm : 'dakika %d',
	        h : 'saa limoja',
	        hh : 'masaa %d',
	        d : 'siku moja',
	        dd : 'masiku %d',
	        M : 'mwezi mmoja',
	        MM : 'miezi %d',
	        y : 'mwaka mmoja',
	        yy : 'miaka %d'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return sw;
	
	})));


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tamil [ta]
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var symbolMap = {
	    '1': '௧',
	    '2': '௨',
	    '3': '௩',
	    '4': '௪',
	    '5': '௫',
	    '6': '௬',
	    '7': '௭',
	    '8': '௮',
	    '9': '௯',
	    '0': '௦'
	};
	var numberMap = {
	    '௧': '1',
	    '௨': '2',
	    '௩': '3',
	    '௪': '4',
	    '௫': '5',
	    '௬': '6',
	    '௭': '7',
	    '௮': '8',
	    '௯': '9',
	    '௦': '0'
	};
	
	var ta = moment.defineLocale('ta', {
	    months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	    monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	    weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	    weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	    weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, HH:mm',
	        LLLL : 'dddd, D MMMM YYYY, HH:mm'
	    },
	    calendar : {
	        sameDay : '[இன்று] LT',
	        nextDay : '[நாளை] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[நேற்று] LT',
	        lastWeek : '[கடந்த வாரம்] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s இல்',
	        past : '%s முன்',
	        s : 'ஒரு சில விநாடிகள்',
	        m : 'ஒரு நிமிடம்',
	        mm : '%d நிமிடங்கள்',
	        h : 'ஒரு மணி நேரம்',
	        hh : '%d மணி நேரம்',
	        d : 'ஒரு நாள்',
	        dd : '%d நாட்கள்',
	        M : 'ஒரு மாதம்',
	        MM : '%d மாதங்கள்',
	        y : 'ஒரு வருடம்',
	        yy : '%d ஆண்டுகள்'
	    },
	    ordinalParse: /\d{1,2}வது/,
	    ordinal : function (number) {
	        return number + 'வது';
	    },
	    preparse: function (string) {
	        return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // refer http://ta.wikipedia.org/s/1er1
	    meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 2) {
	            return ' யாமம்';
	        } else if (hour < 6) {
	            return ' வைகறை';  // வைகறை
	        } else if (hour < 10) {
	            return ' காலை'; // காலை
	        } else if (hour < 14) {
	            return ' நண்பகல்'; // நண்பகல்
	        } else if (hour < 18) {
	            return ' எற்பாடு'; // எற்பாடு
	        } else if (hour < 22) {
	            return ' மாலை'; // மாலை
	        } else {
	            return ' யாமம்';
	        }
	    },
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'யாமம்') {
	            return hour < 2 ? hour : hour + 12;
	        } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	            return hour;
	        } else if (meridiem === 'நண்பகல்') {
	            return hour >= 10 ? hour : hour + 12;
	        } else {
	            return hour + 12;
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return ta;
	
	})));


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Telugu [te]
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var te = moment.defineLocale('te', {
	    months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	    monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	    weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	    weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm',
	        LTS : 'A h:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm'
	    },
	    calendar : {
	        sameDay : '[నేడు] LT',
	        nextDay : '[రేపు] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[నిన్న] LT',
	        lastWeek : '[గత] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s లో',
	        past : '%s క్రితం',
	        s : 'కొన్ని క్షణాలు',
	        m : 'ఒక నిమిషం',
	        mm : '%d నిమిషాలు',
	        h : 'ఒక గంట',
	        hh : '%d గంటలు',
	        d : 'ఒక రోజు',
	        dd : '%d రోజులు',
	        M : 'ఒక నెల',
	        MM : '%d నెలలు',
	        y : 'ఒక సంవత్సరం',
	        yy : '%d సంవత్సరాలు'
	    },
	    ordinalParse : /\d{1,2}వ/,
	    ordinal : '%dవ',
	    meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'రాత్రి') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'ఉదయం') {
	            return hour;
	        } else if (meridiem === 'మధ్యాహ్నం') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'సాయంత్రం') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'రాత్రి';
	        } else if (hour < 10) {
	            return 'ఉదయం';
	        } else if (hour < 17) {
	            return 'మధ్యాహ్నం';
	        } else if (hour < 20) {
	            return 'సాయంత్రం';
	        } else {
	            return 'రాత్రి';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return te;
	
	})));


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tetun Dili (East Timor) [tet]
	//! author : Joshua Brooks : https://github.com/joshbrooks
	//! author : Onorio De J. Afonso : https://github.com/marobo
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var tet = moment.defineLocale('tet', {
	    months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
	    weekdaysMin : 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Ohin iha] LT',
	        nextDay: '[Aban iha] LT',
	        nextWeek: 'dddd [iha] LT',
	        lastDay: '[Horiseik iha] LT',
	        lastWeek: 'dddd [semana kotuk] [iha] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'iha %s',
	        past : '%s liuba',
	        s : 'minutu balun',
	        m : 'minutu ida',
	        mm : 'minutus %d',
	        h : 'horas ida',
	        hh : 'horas %d',
	        d : 'loron ida',
	        dd : 'loron %d',
	        M : 'fulan ida',
	        MM : 'fulan %d',
	        y : 'tinan ida',
	        yy : 'tinan %d'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return tet;
	
	})));


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Thai [th]
	//! author : Kridsada Thanabulpong : https://github.com/sirn
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var th = moment.defineLocale('th', {
	    months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	    monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	    weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	    weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'YYYY/MM/DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY เวลา H:mm',
	        LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
	    },
	    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	    isPM: function (input) {
	        return input === 'หลังเที่ยง';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ก่อนเที่ยง';
	        } else {
	            return 'หลังเที่ยง';
	        }
	    },
	    calendar : {
	        sameDay : '[วันนี้ เวลา] LT',
	        nextDay : '[พรุ่งนี้ เวลา] LT',
	        nextWeek : 'dddd[หน้า เวลา] LT',
	        lastDay : '[เมื่อวานนี้ เวลา] LT',
	        lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'อีก %s',
	        past : '%sที่แล้ว',
	        s : 'ไม่กี่วินาที',
	        m : '1 นาที',
	        mm : '%d นาที',
	        h : '1 ชั่วโมง',
	        hh : '%d ชั่วโมง',
	        d : '1 วัน',
	        dd : '%d วัน',
	        M : '1 เดือน',
	        MM : '%d เดือน',
	        y : '1 ปี',
	        yy : '%d ปี'
	    }
	});
	
	return th;
	
	})));


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog (Philippines) [tl-ph]
	//! author : Dan Hagman : https://github.com/hagmandan
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var tlPh = moment.defineLocale('tl-ph', {
	    months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	    monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	    weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	    weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	    weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'MM/D/YYYY',
	        LL : 'MMMM D, YYYY',
	        LLL : 'MMMM D, YYYY HH:mm',
	        LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: 'LT [ngayong araw]',
	        nextDay: '[Bukas ng] LT',
	        nextWeek: 'LT [sa susunod na] dddd',
	        lastDay: 'LT [kahapon]',
	        lastWeek: 'LT [noong nakaraang] dddd',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'sa loob ng %s',
	        past : '%s ang nakalipas',
	        s : 'ilang segundo',
	        m : 'isang minuto',
	        mm : '%d minuto',
	        h : 'isang oras',
	        hh : '%d oras',
	        d : 'isang araw',
	        dd : '%d araw',
	        M : 'isang buwan',
	        MM : '%d buwan',
	        y : 'isang taon',
	        yy : '%d taon'
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : function (number) {
	        return number;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return tlPh;
	
	})));


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon [tlh]
	//! author : Dominika Kruk : https://github.com/amaranthrose
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');
	
	function translateFuture(output) {
	    var time = output;
	    time = (output.indexOf('jaj') !== -1) ?
	    time.slice(0, -3) + 'leS' :
	    (output.indexOf('jar') !== -1) ?
	    time.slice(0, -3) + 'waQ' :
	    (output.indexOf('DIS') !== -1) ?
	    time.slice(0, -3) + 'nem' :
	    time + ' pIq';
	    return time;
	}
	
	function translatePast(output) {
	    var time = output;
	    time = (output.indexOf('jaj') !== -1) ?
	    time.slice(0, -3) + 'Hu’' :
	    (output.indexOf('jar') !== -1) ?
	    time.slice(0, -3) + 'wen' :
	    (output.indexOf('DIS') !== -1) ?
	    time.slice(0, -3) + 'ben' :
	    time + ' ret';
	    return time;
	}
	
	function translate(number, withoutSuffix, string, isFuture) {
	    var numberNoun = numberAsNoun(number);
	    switch (string) {
	        case 'mm':
	            return numberNoun + ' tup';
	        case 'hh':
	            return numberNoun + ' rep';
	        case 'dd':
	            return numberNoun + ' jaj';
	        case 'MM':
	            return numberNoun + ' jar';
	        case 'yy':
	            return numberNoun + ' DIS';
	    }
	}
	
	function numberAsNoun(number) {
	    var hundred = Math.floor((number % 1000) / 100),
	    ten = Math.floor((number % 100) / 10),
	    one = number % 10,
	    word = '';
	    if (hundred > 0) {
	        word += numbersNouns[hundred] + 'vatlh';
	    }
	    if (ten > 0) {
	        word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	    }
	    if (one > 0) {
	        word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	    }
	    return (word === '') ? 'pagh' : word;
	}
	
	var tlh = moment.defineLocale('tlh', {
	    months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	    monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[DaHjaj] LT',
	        nextDay: '[wa’leS] LT',
	        nextWeek: 'LLL',
	        lastDay: '[wa’Hu’] LT',
	        lastWeek: 'LLL',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : translateFuture,
	        past : translatePast,
	        s : 'puS lup',
	        m : 'wa’ tup',
	        mm : translate,
	        h : 'wa’ rep',
	        hh : translate,
	        d : 'wa’ jaj',
	        dd : translate,
	        M : 'wa’ jar',
	        MM : translate,
	        y : 'wa’ DIS',
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return tlh;
	
	})));


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Turkish [tr]
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var suffixes = {
	    1: '\'inci',
	    5: '\'inci',
	    8: '\'inci',
	    70: '\'inci',
	    80: '\'inci',
	    2: '\'nci',
	    7: '\'nci',
	    20: '\'nci',
	    50: '\'nci',
	    3: '\'üncü',
	    4: '\'üncü',
	    100: '\'üncü',
	    6: '\'ncı',
	    9: '\'uncu',
	    10: '\'uncu',
	    30: '\'uncu',
	    60: '\'ıncı',
	    90: '\'ıncı'
	};
	
	var tr = moment.defineLocale('tr', {
	    months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	    monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	    weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	    weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	    weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[bugün saat] LT',
	        nextDay : '[yarın saat] LT',
	        nextWeek : '[haftaya] dddd [saat] LT',
	        lastDay : '[dün] LT',
	        lastWeek : '[geçen hafta] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s sonra',
	        past : '%s önce',
	        s : 'birkaç saniye',
	        m : 'bir dakika',
	        mm : '%d dakika',
	        h : 'bir saat',
	        hh : '%d saat',
	        d : 'bir gün',
	        dd : '%d gün',
	        M : 'bir ay',
	        MM : '%d ay',
	        y : 'bir yıl',
	        yy : '%d yıl'
	    },
	    ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	    ordinal : function (number) {
	        if (number === 0) {  // special case for zero
	            return number + '\'ıncı';
	        }
	        var a = number % 10,
	            b = number % 100 - a,
	            c = number >= 100 ? 100 : null;
	        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return tr;
	
	})));


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Talossan [tzl]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	//! author : Iustì Canun
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	// After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	// This is currently too difficult (maybe even impossible) to add.
	var tzl = moment.defineLocale('tzl', {
	    months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	    weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	    weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	    weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM [dallas] YYYY',
	        LLL : 'D. MMMM [dallas] YYYY HH.mm',
	        LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	    },
	    meridiemParse: /d\'o|d\'a/i,
	    isPM : function (input) {
	        return 'd\'o' === input.toLowerCase();
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'd\'o' : 'D\'O';
	        } else {
	            return isLower ? 'd\'a' : 'D\'A';
	        }
	    },
	    calendar : {
	        sameDay : '[oxhi à] LT',
	        nextDay : '[demà à] LT',
	        nextWeek : 'dddd [à] LT',
	        lastDay : '[ieiri à] LT',
	        lastWeek : '[sür el] dddd [lasteu à] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'osprei %s',
	        past : 'ja%s',
	        s : processRelativeTime,
	        m : processRelativeTime,
	        mm : processRelativeTime,
	        h : processRelativeTime,
	        hh : processRelativeTime,
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        's': ['viensas secunds', '\'iensas secunds'],
	        'm': ['\'n míut', '\'iens míut'],
	        'mm': [number + ' míuts', '' + number + ' míuts'],
	        'h': ['\'n þora', '\'iensa þora'],
	        'hh': [number + ' þoras', '' + number + ' þoras'],
	        'd': ['\'n ziua', '\'iensa ziua'],
	        'dd': [number + ' ziuas', '' + number + ' ziuas'],
	        'M': ['\'n mes', '\'iens mes'],
	        'MM': [number + ' mesen', '' + number + ' mesen'],
	        'y': ['\'n ar', '\'iens ar'],
	        'yy': [number + ' ars', '' + number + ' ars']
	    };
	    return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	}
	
	return tzl;
	
	})));


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight [tzm]
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var tzm = moment.defineLocale('tzm', {
	    months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	    monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	    weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	        nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	        nextWeek: 'dddd [ⴴ] LT',
	        lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	        lastWeek: 'dddd [ⴴ] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	        past : 'ⵢⴰⵏ %s',
	        s : 'ⵉⵎⵉⴽ',
	        m : 'ⵎⵉⵏⵓⴺ',
	        mm : '%d ⵎⵉⵏⵓⴺ',
	        h : 'ⵙⴰⵄⴰ',
	        hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	        d : 'ⴰⵙⵙ',
	        dd : '%d oⵙⵙⴰⵏ',
	        M : 'ⴰⵢoⵓⵔ',
	        MM : '%d ⵉⵢⵢⵉⵔⵏ',
	        y : 'ⴰⵙⴳⴰⵙ',
	        yy : '%d ⵉⵙⴳⴰⵙⵏ'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return tzm;
	
	})));


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight Latin [tzm-latn]
	//! author : Abdel Said : https://github.com/abdelsaid
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var tzmLatn = moment.defineLocale('tzm-latn', {
	    months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	    monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	    weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[asdkh g] LT',
	        nextDay: '[aska g] LT',
	        nextWeek: 'dddd [g] LT',
	        lastDay: '[assant g] LT',
	        lastWeek: 'dddd [g] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dadkh s yan %s',
	        past : 'yan %s',
	        s : 'imik',
	        m : 'minuḍ',
	        mm : '%d minuḍ',
	        h : 'saɛa',
	        hh : '%d tassaɛin',
	        d : 'ass',
	        dd : '%d ossan',
	        M : 'ayowr',
	        MM : '%d iyyirn',
	        y : 'asgas',
	        yy : '%d isgasn'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return tzmLatn;
	
	})));


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Ukrainian [uk]
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	        'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	        'dd': 'день_дні_днів',
	        'MM': 'місяць_місяці_місяців',
	        'yy': 'рік_роки_років'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'хвилина' : 'хвилину';
	    }
	    else if (key === 'h') {
	        return withoutSuffix ? 'година' : 'годину';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}
	function weekdaysCaseReplace(m, format) {
	    var weekdays = {
	        'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	        'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	        'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	    },
	    nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	        'accusative' :
	        ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	            'genitive' :
	            'nominative');
	    return weekdays[nounCase][m.day()];
	}
	function processHoursFunction(str) {
	    return function () {
	        return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	    };
	}
	
	var uk = moment.defineLocale('uk', {
	    months : {
	        'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	        'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	    },
	    monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	    weekdays : weekdaysCaseReplace,
	    weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY р.',
	        LLL : 'D MMMM YYYY р., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	    },
	    calendar : {
	        sameDay: processHoursFunction('[Сьогодні '),
	        nextDay: processHoursFunction('[Завтра '),
	        lastDay: processHoursFunction('[Вчора '),
	        nextWeek: processHoursFunction('[У] dddd ['),
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'за %s',
	        past : '%s тому',
	        s : 'декілька секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : 'годину',
	        hh : relativeTimeWithPlural,
	        d : 'день',
	        dd : relativeTimeWithPlural,
	        M : 'місяць',
	        MM : relativeTimeWithPlural,
	        y : 'рік',
	        yy : relativeTimeWithPlural
	    },
	    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	    meridiemParse: /ночі|ранку|дня|вечора/,
	    isPM: function (input) {
	        return /^(дня|вечора)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночі';
	        } else if (hour < 12) {
	            return 'ранку';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечора';
	        }
	    },
	    ordinalParse: /\d{1,2}-(й|го)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});
	
	return uk;
	
	})));


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Uzbek [uz]
	//! author : Sardor Muminov : https://github.com/muminoff
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var uz = moment.defineLocale('uz', {
	    months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	    monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	    weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	    weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	    weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'D MMMM YYYY, dddd HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бугун соат] LT [да]',
	        nextDay : '[Эртага] LT [да]',
	        nextWeek : 'dddd [куни соат] LT [да]',
	        lastDay : '[Кеча соат] LT [да]',
	        lastWeek : '[Утган] dddd [куни соат] LT [да]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'Якин %s ичида',
	        past : 'Бир неча %s олдин',
	        s : 'фурсат',
	        m : 'бир дакика',
	        mm : '%d дакика',
	        h : 'бир соат',
	        hh : '%d соат',
	        d : 'бир кун',
	        dd : '%d кун',
	        M : 'бир ой',
	        MM : '%d ой',
	        y : 'бир йил',
	        yy : '%d йил'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return uz;
	
	})));


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Vietnamese [vi]
	//! author : Bang Nguyen : https://github.com/bangnk
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var vi = moment.defineLocale('vi', {
	    months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	    monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	    weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	    weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	    weekdaysParseExact : true,
	    meridiemParse: /sa|ch/i,
	    isPM : function (input) {
	        return /^ch$/i.test(input);
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower ? 'sa' : 'SA';
	        } else {
	            return isLower ? 'ch' : 'CH';
	        }
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM [năm] YYYY',
	        LLL : 'D MMMM [năm] YYYY HH:mm',
	        LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	        l : 'DD/M/YYYY',
	        ll : 'D MMM YYYY',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd, D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hôm nay lúc] LT',
	        nextDay: '[Ngày mai lúc] LT',
	        nextWeek: 'dddd [tuần tới lúc] LT',
	        lastDay: '[Hôm qua lúc] LT',
	        lastWeek: 'dddd [tuần rồi lúc] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s tới',
	        past : '%s trước',
	        s : 'vài giây',
	        m : 'một phút',
	        mm : '%d phút',
	        h : 'một giờ',
	        hh : '%d giờ',
	        d : 'một ngày',
	        dd : '%d ngày',
	        M : 'một tháng',
	        MM : '%d tháng',
	        y : 'một năm',
	        yy : '%d năm'
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : function (number) {
	        return number;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return vi;
	
	})));


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Pseudo [x-pseudo]
	//! author : Andrew Hood : https://github.com/andrewhood125
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var xPseudo = moment.defineLocale('x-pseudo', {
	    months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	    monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	    weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	    weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[T~ódá~ý át] LT',
	        nextDay : '[T~ómó~rró~w át] LT',
	        nextWeek : 'dddd [át] LT',
	        lastDay : '[Ý~ést~érdá~ý át] LT',
	        lastWeek : '[L~ást] dddd [át] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'í~ñ %s',
	        past : '%s á~gó',
	        s : 'á ~féw ~sécó~ñds',
	        m : 'á ~míñ~úté',
	        mm : '%d m~íñú~tés',
	        h : 'á~ñ hó~úr',
	        hh : '%d h~óúrs',
	        d : 'á ~dáý',
	        dd : '%d d~áýs',
	        M : 'á ~móñ~th',
	        MM : '%d m~óñt~hs',
	        y : 'á ~ýéár',
	        yy : '%d ý~éárs'
	    },
	    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return xPseudo;
	
	})));


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Yoruba Nigeria [yo]
	//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var yo = moment.defineLocale('yo', {
	    months : 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
	    monthsShort : 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
	    weekdays : 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
	    weekdaysShort : 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
	    weekdaysMin : 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Ònì ni] LT',
	        nextDay : '[Ọ̀la ni] LT',
	        nextWeek : 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
	        lastDay : '[Àna ni] LT',
	        lastWeek : 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ní %s',
	        past : '%s kọjá',
	        s : 'ìsẹjú aayá die',
	        m : 'ìsẹjú kan',
	        mm : 'ìsẹjú %d',
	        h : 'wákati kan',
	        hh : 'wákati %d',
	        d : 'ọjọ́ kan',
	        dd : 'ọjọ́ %d',
	        M : 'osù kan',
	        MM : 'osù %d',
	        y : 'ọdún kan',
	        yy : 'ọdún %d'
	    },
	    ordinalParse : /ọjọ́\s\d{1,2}/,
	    ordinal : 'ọjọ́ %d',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return yo;
	
	})));


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (China) [zh-cn]
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var zhCn = moment.defineLocale('zh-cn', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah点mm分',
	        LTS : 'Ah点m分s秒',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah点mm分',
	        LLLL : 'YYYY年MMMD日ddddAh点mm分',
	        l : 'YYYY-MM-DD',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah点mm分',
	        llll : 'YYYY年MMMD日ddddAh点mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' ||
	                meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        } else {
	            // '中午'
	            return hour >= 11 ? hour : hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : function () {
	            return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	        },
	        nextDay : function () {
	            return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	        },
	        lastDay : function () {
	            return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	        },
	        nextWeek : function () {
	            var startOfWeek, prefix;
	            startOfWeek = moment().startOf('week');
	            prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	        },
	        lastWeek : function () {
	            var startOfWeek, prefix;
	            startOfWeek = moment().startOf('week');
	            prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	        },
	        sameElse : 'LL'
	    },
	    ordinalParse: /\d{1,2}(日|月|周)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s内',
	        past : '%s前',
	        s : '几秒',
	        m : '1 分钟',
	        mm : '%d 分钟',
	        h : '1 小时',
	        hh : '%d 小时',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 个月',
	        MM : '%d 个月',
	        y : '1 年',
	        yy : '%d 年'
	    },
	    week : {
	        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return zhCn;
	
	})));


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Hong Kong) [zh-hk]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris
	//! author : Konstantin : https://github.com/skfd
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var zhHk = moment.defineLocale('zh-hk', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah點mm分',
	        LTS : 'Ah點m分s秒',
	        L : 'YYYY年MMMD日',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah點mm分',
	        LLLL : 'YYYY年MMMD日ddddAh點mm分',
	        l : 'YYYY年MMMD日',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah點mm分',
	        llll : 'YYYY年MMMD日ddddAh點mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '中午') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : '[今天]LT',
	        nextDay : '[明天]LT',
	        nextWeek : '[下]ddddLT',
	        lastDay : '[昨天]LT',
	        lastWeek : '[上]ddddLT',
	        sameElse : 'L'
	    },
	    ordinalParse: /\d{1,2}(日|月|週)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s內',
	        past : '%s前',
	        s : '幾秒',
	        m : '1 分鐘',
	        mm : '%d 分鐘',
	        h : '1 小時',
	        hh : '%d 小時',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 個月',
	        MM : '%d 個月',
	        y : '1 年',
	        yy : '%d 年'
	    }
	});
	
	return zhHk;
	
	})));


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Taiwan) [zh-tw]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(9)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var zhTw = moment.defineLocale('zh-tw', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah點mm分',
	        LTS : 'Ah點m分s秒',
	        L : 'YYYY年MMMD日',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah點mm分',
	        LLLL : 'YYYY年MMMD日ddddAh點mm分',
	        l : 'YYYY年MMMD日',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah點mm分',
	        llll : 'YYYY年MMMD日ddddAh點mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '中午') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : '[今天]LT',
	        nextDay : '[明天]LT',
	        nextWeek : '[下]ddddLT',
	        lastDay : '[昨天]LT',
	        lastWeek : '[上]ddddLT',
	        sameElse : 'L'
	    },
	    ordinalParse: /\d{1,2}(日|月|週)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s內',
	        past : '%s前',
	        s : '幾秒',
	        m : '1 分鐘',
	        mm : '%d 分鐘',
	        h : '1 小時',
	        hh : '%d 小時',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 個月',
	        MM : '%d 個月',
	        y : '1 年',
	        yy : '%d 年'
	    }
	});
	
	return zhTw;
	
	})));


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-selection/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var xhtml = "http://www.w3.org/1999/xhtml";
	
	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};
	
	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};
	
	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}
	
	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}
	
	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};
	
	var nextId = 0;
	
	function local() {
	  return new Local;
	}
	
	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}
	
	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};
	
	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}
	
	var matcher$1 = matcher;
	
	var filterEvents = {};
	
	exports.event = null;
	
	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}
	
	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}
	
	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}
	
	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}
	
	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}
	
	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}
	
	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	
	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }
	
	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};
	
	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}
	
	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};
	
	var point = function(node, event) {
	  var svg = node.ownerSVGElement || node;
	
	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }
	
	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};
	
	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	};
	
	function none() {}
	
	var selector = function(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	};
	
	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	function empty() {
	  return [];
	}
	
	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};
	
	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, parents);
	};
	
	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	var sparse = function(update) {
	  return new Array(update.length);
	};
	
	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};
	
	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}
	
	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var keyPrefix = "$"; // Protect against keys like “__proto__”.
	
	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;
	
	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}
	
	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;
	
	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }
	
	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}
	
	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }
	
	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;
	
	  if (typeof value !== "function") value = constant(value);
	
	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);
	
	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
	
	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }
	
	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};
	
	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};
	
	var selection_merge = function(selection) {
	
	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Selection(merges, this._parents);
	};
	
	var selection_order = function() {
	
	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }
	
	  return this;
	};
	
	var selection_sort = function(compare) {
	  if (!compare) compare = ascending;
	
	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }
	
	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }
	
	  return new Selection(sortgroups, this._parents).order();
	};
	
	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}
	
	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};
	
	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};
	
	var selection_node = function() {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }
	
	  return null;
	};
	
	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};
	
	var selection_empty = function() {
	  return !this.node();
	};
	
	var selection_each = function(callback) {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }
	
	  return this;
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}
	
	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}
	
	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}
	
	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}
	
	var selection_attr = function(name, value) {
	  var fullname = namespace(name);
	
	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }
	
	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};
	
	var defaultView = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};
	
	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}
	
	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}
	
	var selection_style = function(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : defaultView(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	};
	
	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}
	
	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}
	
	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}
	
	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};
	
	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}
	
	function classList(node) {
	  return node.classList || new ClassList(node);
	}
	
	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}
	
	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};
	
	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}
	
	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}
	
	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}
	
	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}
	
	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}
	
	var selection_classed = function(name, value) {
	  var names = classArray(name + "");
	
	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }
	
	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};
	
	function textRemove() {
	  this.textContent = "";
	}
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}
	
	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};
	
	function htmlRemove() {
	  this.innerHTML = "";
	}
	
	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}
	
	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}
	
	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};
	
	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}
	
	var selection_raise = function() {
	  return this.each(raise);
	};
	
	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	
	var selection_lower = function() {
	  return this.each(lower);
	};
	
	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};
	
	function constantNull() {
	  return null;
	}
	
	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};
	
	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}
	
	var selection_remove = function() {
	  return this.each(remove);
	};
	
	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};
	
	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;
	
	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }
	
	  node.dispatchEvent(event);
	}
	
	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}
	
	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}
	
	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};
	
	var root = [null];
	
	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}
	
	function selection() {
	  return new Selection([[document.documentElement]], root);
	}
	
	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};
	
	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};
	
	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};
	
	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;
	
	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }
	
	  return null;
	};
	
	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;
	
	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }
	
	  return points;
	};
	
	exports.creator = creator;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = defaultView;
	exports.customEvent = customEvent;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-transition/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(120), __webpack_require__(122), __webpack_require__(123), __webpack_require__(124), __webpack_require__(125), __webpack_require__(126)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-dispatch', 'd3-timer', 'd3-interpolate', 'd3-color', 'd3-ease'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Selection,d3Dispatch,d3Timer,d3Interpolate,d3Color,d3Ease) { 'use strict';
	
	var emptyOn = d3Dispatch.dispatch("start", "end", "interrupt");
	var emptyTween = [];
	
	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;
	
	var schedule = function(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	};
	
	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}
	
	function set(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}
	
	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}
	
	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;
	
	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = d3Timer.timer(schedule, 0, self.time);
	
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);
	
	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }
	
	  function start(elapsed) {
	    var i, j, n, o;
	
	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();
	
	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;
	
	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return d3Timer.timeout(start);
	
	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	
	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        delete schedules[i];
	      }
	    }
	
	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    d3Timer.timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });
	
	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;
	
	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }
	
	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;
	
	    while (++i < n) {
	      tween[i].call(null, t);
	    }
	
	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }
	
	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}
	
	var interrupt = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;
	
	  if (!schedules) return;
	
	  name = name == null ? null : name + "";
	
	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }
	
	  if (empty) delete node.__transition;
	};
	
	var selection_interrupt = function(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	};
	
	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	var transition_tween = function(name, value) {
	  var id = this._id;
	
	  name += "";
	
	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }
	
	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	};
	
	function tweenValue(transition, name, value) {
	  var id = transition._id;
	
	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });
	
	  return function(node) {
	    return get(node, id).value[name];
	  };
	}
	
	var interpolate = function(a, b) {
	  var c;
	  return (typeof b === "number" ? d3Interpolate.interpolateNumber
	      : b instanceof d3Color.color ? d3Interpolate.interpolateRgb
	      : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb)
	      : d3Interpolate.interpolateString)(a, b);
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrConstantNS(fullname, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function attrFunctionNS(fullname, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_attr = function(name, value) {
	  var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	};
	
	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	function attrTween(name, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_attrTween = function(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = d3Selection.namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	};
	
	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}
	
	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}
	
	var transition_delay = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	};
	
	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}
	
	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}
	
	var transition_duration = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	};
	
	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}
	
	var transition_ease = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	};
	
	var transition_filter = function(match) {
	  if (typeof match !== "function") match = d3Selection.matcher(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, this._name, this._id);
	};
	
	var transition_merge = function(transition) {
	  if (transition._id !== this._id) throw new Error;
	
	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Transition(merges, this._parents, this._name, this._id);
	};
	
	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}
	
	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;
	
	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
	
	    schedule.on = on1;
	  };
	}
	
	var transition_on = function(name, listener) {
	  var id = this._id;
	
	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	};
	
	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}
	
	var transition_remove = function() {
	  return this.on("end.remove", removeFunction(this._id));
	};
	
	var transition_select = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, name, id);
	};
	
	var transition_selectAll = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, parents, name, id);
	};
	
	var Selection = d3Selection.selection.prototype.constructor;
	
	var transition_selection = function() {
	  return new Selection(this._groups, this._parents);
	};
	
	function styleRemove(name, interpolate$$1) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.window(this).getComputedStyle(this, null).getPropertyValue(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function styleFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_style = function(name, value, priority) {
	  var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
	  return value == null ? this
	          .styleTween(name, styleRemove(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant(name, i, value), priority);
	};
	
	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_styleTween = function(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	};
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}
	
	var transition_text = function(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	};
	
	var transition_transition = function() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id1);
	};
	
	var id = 0;
	
	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}
	
	function transition(name) {
	  return d3Selection.selection().transition(name);
	}
	
	function newId() {
	  return ++id;
	}
	
	var selection_prototype = d3Selection.selection.prototype;
	
	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};
	
	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: d3Ease.easeCubicInOut
	};
	
	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = d3Timer.now(), defaultTiming;
	    }
	  }
	  return timing;
	}
	
	var selection_transition = function(name) {
	  var id,
	      timing;
	
	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
	  }
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id);
	};
	
	d3Selection.selection.prototype.interrupt = selection_interrupt;
	d3Selection.selection.prototype.transition = selection_transition;
	
	var root = [null];
	
	var active = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      i;
	
	  if (schedules) {
	    name = name == null ? null : name + "";
	    for (i in schedules) {
	      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
	        return new Transition([[node]], root, name, +i);
	      }
	    }
	  }
	
	  return null;
	};
	
	exports.transition = transition;
	exports.active = active;
	exports.interrupt = interrupt;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dispatch/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var noop = {value: function() {}};
	
	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}
	
	function Dispatch(_) {
	  this._ = _;
	}
	
	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}
	
	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;
	
	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }
	
	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }
	
	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};
	
	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}
	
	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}
	
	exports.dispatch = dispatch;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-timer/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = typeof performance === "object" && performance.now ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };
	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}
	
	function clearNow() {
	  clockNow = 0;
	}
	
	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}
	
	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};
	
	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}
	
	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}
	
	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}
	
	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}
	
	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}
	
	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}
	
	function timeout$1(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}
	
	function interval$1(callback, delay, time) {
	  var t = new Timer, total = delay;
	  if (delay == null) return t.restart(callback, delay, time), t;
	  delay = +delay, time = time == null ? now() : +time;
	  t.restart(function tick(elapsed) {
	    elapsed += total;
	    t.restart(tick, total += delay, time);
	    callback(elapsed);
	  }, delay, time);
	  return t;
	}
	
	exports.now = now;
	exports.timer = timer;
	exports.timerFlush = timerFlush;
	exports.timeout = timeout$1;
	exports.interval = interval$1;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(125)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Color) { 'use strict';
	
	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}
	
	var basis$1 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var basisClosed = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}
	
	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}
	
	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}
	
	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}
	
	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}
	
	var rgb$1 = (function rgbGamma(y) {
	  var color$$1 = gamma(y);
	
	  function rgb$$1(start, end) {
	    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = color$$1(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  rgb$$1.gamma = rgbGamma;
	
	  return rgb$$1;
	})(1);
	
	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = d3Color.rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}
	
	var rgbBasis = rgbSpline(basis$1);
	var rgbBasisClosed = rgbSpline(basisClosed);
	
	var array = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(nb),
	      c = new Array(nb),
	      i;
	
	  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];
	
	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};
	
	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};
	
	var number = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};
	
	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;
	
	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};
	
	  for (k in b) {
	    if (k in a) {
	      i[k] = value(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }
	
	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};
	
	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	
	function zero(b) {
	  return function() {
	    return b;
	  };
	}
	
	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}
	
	var string = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators
	
	  // Coerce inputs to strings.
	  a = a + "", b = b + "";
	
	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: number(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }
	
	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }
	
	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};
	
	var value = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant(b)
	      : (t === "number" ? number
	      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	      : b instanceof d3Color.color ? rgb$1
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array
	      : isNaN(b) ? object
	      : number)(a, b);
	};
	
	var round = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};
	
	var degrees = 180 / Math.PI;
	
	var identity = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};
	
	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};
	
	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	
	function parseCss(value) {
	  if (value === "none") return identity;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}
	
	function parseSvg(value) {
	  if (value == null) return identity;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}
	
	function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }
	
	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }
	
	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }
	
	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }
	
	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }
	
	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}
	
	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;
	
	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}
	
	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}
	
	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}
	
	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var zoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;
	
	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }
	
	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }
	
	  i.duration = S * 1000;
	
	  return i;
	};
	
	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);
	
	function lab$1(start, end) {
	  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}
	
	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);
	
	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;
	
	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    cubehelix$$1.gamma = cubehelixGamma;
	
	    return cubehelix$$1;
	  })(1);
	}
	
	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);
	
	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};
	
	exports.interpolate = value;
	exports.interpolateArray = array;
	exports.interpolateBasis = basis$1;
	exports.interpolateBasisClosed = basisClosed;
	exports.interpolateDate = date;
	exports.interpolateNumber = number;
	exports.interpolateObject = object;
	exports.interpolateRound = round;
	exports.interpolateString = string;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = zoom;
	exports.interpolateRgb = rgb$1;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.quantize = quantize;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-color/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};
	
	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}
	
	function Color() {}
	
	var darker = 0.7;
	var brighter = 1 / darker;
	
	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
	
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};
	
	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});
	
	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}
	
	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}
	
	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}
	
	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}
	
	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}
	
	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));
	
	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}
	
	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}
	
	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));
	
	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}
	
	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;
	
	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}
	
	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}
	
	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));
	
	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}
	
	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}
	
	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}
	
	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}
	
	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}
	
	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}
	
	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));
	
	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}
	
	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));
	
	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-ease/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	function linear(t) {
	  return +t;
	}
	
	function quadIn(t) {
	  return t * t;
	}
	
	function quadOut(t) {
	  return t * (2 - t);
	}
	
	function quadInOut(t) {
	  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	}
	
	function cubicIn(t) {
	  return t * t * t;
	}
	
	function cubicOut(t) {
	  return --t * t * t + 1;
	}
	
	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}
	
	var exponent = 3;
	
	var polyIn = (function custom(e) {
	  e = +e;
	
	  function polyIn(t) {
	    return Math.pow(t, e);
	  }
	
	  polyIn.exponent = custom;
	
	  return polyIn;
	})(exponent);
	
	var polyOut = (function custom(e) {
	  e = +e;
	
	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }
	
	  polyOut.exponent = custom;
	
	  return polyOut;
	})(exponent);
	
	var polyInOut = (function custom(e) {
	  e = +e;
	
	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }
	
	  polyInOut.exponent = custom;
	
	  return polyInOut;
	})(exponent);
	
	var pi = Math.PI;
	var halfPi = pi / 2;
	
	function sinIn(t) {
	  return 1 - Math.cos(t * halfPi);
	}
	
	function sinOut(t) {
	  return Math.sin(t * halfPi);
	}
	
	function sinInOut(t) {
	  return (1 - Math.cos(pi * t)) / 2;
	}
	
	function expIn(t) {
	  return Math.pow(2, 10 * t - 10);
	}
	
	function expOut(t) {
	  return 1 - Math.pow(2, -10 * t);
	}
	
	function expInOut(t) {
	  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	}
	
	function circleIn(t) {
	  return 1 - Math.sqrt(1 - t * t);
	}
	
	function circleOut(t) {
	  return Math.sqrt(1 - --t * t);
	}
	
	function circleInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	}
	
	var b1 = 4 / 11;
	var b2 = 6 / 11;
	var b3 = 8 / 11;
	var b4 = 3 / 4;
	var b5 = 9 / 11;
	var b6 = 10 / 11;
	var b7 = 15 / 16;
	var b8 = 21 / 22;
	var b9 = 63 / 64;
	var b0 = 1 / b1 / b1;
	
	function bounceIn(t) {
	  return 1 - bounceOut(1 - t);
	}
	
	function bounceOut(t) {
	  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	}
	
	function bounceInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	}
	
	var overshoot = 1.70158;
	
	var backIn = (function custom(s) {
	  s = +s;
	
	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }
	
	  backIn.overshoot = custom;
	
	  return backIn;
	})(overshoot);
	
	var backOut = (function custom(s) {
	  s = +s;
	
	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }
	
	  backOut.overshoot = custom;
	
	  return backOut;
	})(overshoot);
	
	var backInOut = (function custom(s) {
	  s = +s;
	
	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }
	
	  backInOut.overshoot = custom;
	
	  return backInOut;
	})(overshoot);
	
	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	
	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }
	
	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };
	
	  return elasticIn;
	})(amplitude, period);
	
	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }
	
	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };
	
	  return elasticOut;
	})(amplitude, period);
	
	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }
	
	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticInOut.period = function(p) { return custom(a, p); };
	
	  return elasticInOut;
	})(amplitude, period);
	
	exports.easeLinear = linear;
	exports.easeQuad = quadInOut;
	exports.easeQuadIn = quadIn;
	exports.easeQuadOut = quadOut;
	exports.easeQuadInOut = quadInOut;
	exports.easeCubic = cubicInOut;
	exports.easeCubicIn = cubicIn;
	exports.easeCubicOut = cubicOut;
	exports.easeCubicInOut = cubicInOut;
	exports.easePoly = polyInOut;
	exports.easePolyIn = polyIn;
	exports.easePolyOut = polyOut;
	exports.easePolyInOut = polyInOut;
	exports.easeSin = sinInOut;
	exports.easeSinIn = sinIn;
	exports.easeSinOut = sinOut;
	exports.easeSinInOut = sinInOut;
	exports.easeExp = expInOut;
	exports.easeExpIn = expIn;
	exports.easeExpOut = expOut;
	exports.easeExpInOut = expInOut;
	exports.easeCircle = circleInOut;
	exports.easeCircleIn = circleIn;
	exports.easeCircleOut = circleOut;
	exports.easeCircleInOut = circleInOut;
	exports.easeBounce = bounceOut;
	exports.easeBounceIn = bounceIn;
	exports.easeBounceOut = bounceOut;
	exports.easeBounceInOut = bounceInOut;
	exports.easeBack = backInOut;
	exports.easeBackIn = backIn;
	exports.easeBackOut = backOut;
	exports.easeBackInOut = backInOut;
	exports.easeElastic = elasticOut;
	exports.easeElasticIn = elasticIn;
	exports.easeElasticOut = elasticOut;
	exports.easeElasticInOut = elasticInOut;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,r){ true?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(t.d3_rs_theme=t.d3_rs_theme||{})}(this,function(t){"use strict";function r(t){var r=t[0]/255,e=t[1]/255,n=t[2]/255;r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var a=.4124*r+.3576*e+.1805*n,i=.2126*r+.7152*e+.0722*n,o=.0193*r+.1192*e+.9505*n;return[100*a,100*i,100*o]}function e(t){var e,n,a,i=r(t),o=i[0],u=i[1],f=i[2];return o/=95.047,u/=100,f/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,u=u>.008856?Math.pow(u,1/3):7.787*u+16/116,f=f>.008856?Math.pow(f,1/3):7.787*f+16/116,e=116*u-16,n=500*(o-u),a=200*(u-f),[e,n,a]}function n(t){var r,e,n,a,i=t[0],o=t[1],u=t[2];return i<=8?(e=100*i/903.3,a=7.787*(e/100)+16/116):(e=100*Math.pow((i+16)/116,3),a=Math.pow(e/100,1/3)),r=r/95.047<=.008856?r=95.047*(o/500+a-16/116)/7.787:95.047*Math.pow(o/500+a,3),n=n/108.883<=.008859?n=108.883*(a-u/200-16/116)/7.787:108.883*Math.pow(a-u/200,3),[r,e,n]}function a(t){var r,e,n,a=t[0]/100,i=t[1]/100,o=t[2]/100;return r=3.2406*a+i*-1.5372+o*-.4986,e=a*-.9689+1.8758*i+.0415*o,n=.0557*a+i*-.204+1.057*o,r=r>.0031308?1.055*Math.pow(r,1/2.4)-.055:r*=12.92,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,r=Math.min(Math.max(0,r),1),e=Math.min(Math.max(0,e),1),n=Math.min(Math.max(0,n),1),[255*r,255*e,255*n]}function i(t){return a(n(t)).map(function(t){return Math.round(t)})}function o(t){return"#"+t[0].toString(16)+t[1].toString(16)+t[2].toString(16)}function u(t){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(r,function(t,r,e,n){return r+r+e+e+n+n});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]}function f(t){if("string"==typeof t||t instanceof String)return Math.abs(t.split("").reduce(function(t,r){return t=(t<<5)-t+r.charCodeAt(0),t&t},0));if("number"==typeof t){var r=t%1;if(0===r)return t}return null}function l(t,r){("string"==typeof t||t instanceof String)&&(t=u(t));var n=e(t);return n[0]=n[0]*r,i(n)}function s(t,r){return null==r&&(r=Math.random),function(e){var n=f(e);return null==n?n=Math.floor(r()*t.length):n%=t.length,t[n]}}function c(t){return t&&"object"==typeof t&&"default"in t?t.default:t}function d(t,r){return r={exports:{}},t(r,r.exports),r.exports}function h(){return D(.175,.885,.335,1.155)}function p(t,r,e,n){function a(i){var o=i.selection?i.selection():i,u=void 0!==i.selection,f=o.select("defs");f.empty()&&(f=o.append("defs"));var l=f.select(a.self());l.empty()&&(l=f.append("filter").attr("filterUnits","objectBoundingBox").attr("x","0%").attr("y","0%").attr("width","100%").attr("height","100%").attr("id",t),r(l)),e(l),u===!0&&(l=l.transition(i)),n(l)}return a.id=function(){return t},a.self=function(){return"#"+t},a.url=function(){return"url(#"+t+")"},a.css=function(){return"fill: "+a.url()+";"},a}function g(t){var r=1,e=O.light.shadow,n=3,a="10";null==t&&(t="filter-shadow-"+P,P++);var i=p(t,function(t){t.append("feMorphology").attr("operator","dilate").attr("in","SourceAlpha").attr("result","TEMPLATE"),t.append("feFlood").attr("result","COLOUR"),t.append("feComposite").attr("in","COLOUR").attr("in2","TEMPLATE").attr("operator","in").attr("result","TEMPLATE_COLOUR"),t.append("feGaussianBlur").attr("result","BG");var r=t.append("feMerge");r.append("feMergeNode").attr("in","BG"),r.append("feMergeNode").attr("in","SourceGraphic")},function(t){t.attr("x","-"+a+"%").attr("y","-"+a+"%").attr("width",2*a+100+"%").attr("height",2*a+100+"%")},function(t){t.select("feMorphology").attr("radius",r),t.select("feFlood").attr("flood-color",e),t.select("feGaussianBlur").attr("stdDeviation",n)});return i.morphRadius=function(t){return arguments.length?(r=t,i):r},i.color=function(t){return arguments.length?(e=t,i):e},i.blurRadius=function(t){return arguments.length?(n=t,i):n},i.padding=function(t){return arguments.length?(a=t,i):a},i}function m(t){var r=1;null==t&&(t="filter-greyscale-"+P,P++);var e=p(t,function(t){t.append("feColorMatrix").attr("type","matrix")},function(){},function(t){var e=1/3,n=e*r,a=1-2*n;t.select("feColorMatrix").attr("values",a+" "+n+" "+n+" 0 0 "+n+" "+a+" "+n+" 0 0 "+n+" "+n+" "+a+" 0 0 0 0 0 1 0")});return e.strength=function(t){return arguments.length?(r=t,e):r},e}function w(t){var r=U.standard[U.names.grey],e=.6,n=.8;null==t&&(t="filter-emboss-"+P,P++);var a=p(t,function(t){t.append("feColorMatrix").attr("type","matrix").attr("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");var r=t.append("feComponentTransfer");["feFuncR","feFuncG","feFuncB"].forEach(function(t){r.append(t).attr("type","discrete").attr("tableValues","0.0 0.18 0.75 1.0")}),t.append("feGaussianBlur").attr("stdDeviation",e),t.append("feComponentTransfer").attr("result","TRANSFER").append("feFuncA").attr("type","discrete"),t.append("feFlood").attr("rect","").attr("x","0%").attr("y","0%").attr("width","100%").attr("height","100%").attr("result","FILL"),t.append("feBlend").attr("in","TRANSFER").attr("in2","FILL").attr("mode","multiply")},function(){},function(t){t.select("feFlood").attr("flood-color",r),t.select("feFuncA").attr("tableValues","0.0 "+n)});return a.color=function(t){return arguments.length?(r=t,a):r},a.strength=function(t){return arguments.length?(n=t,a):n},a}function y(t){function r(o){var l=o.selection?o.selection():o,s=l.select("defs");s.empty()&&(s=l.append("defs"));var c=t+"-inner",d=s.select("#"+c);d.empty()&&(d=s.append("pattern").attr("id",c).attr("x",0).attr("y",0).attr("patternUnits","userSpaceOnUse"),d.append("rect")),d.attr("width",e).attr("height",e).attr("patternTransform","rotate("+n+")"),d.select("rect").attr("x",i).attr("y",i).attr("width",a).attr("height",a).attr("fill",f);var h=s.select(r.self());h.empty()&&(h=s.append("pattern").attr("id",t).attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("patternUnits","objectBoundingBox"),h.append("rect").attr("class","pattern-background").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%"),h.append("rect").attr("class","pattern-foreground").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("fill","url(#"+c+")")),h.select("rect.pattern-background").attr("fill",u)}var e=8,n=45,a=5,i=(e-a)/2,o=2*Math.sqrt(e),u="transparent",f=O.light.highlight;return null==t&&(t="pattern-diagonals-"+W,W++),r.id=function(){return t},r.self=function(){return"#"+t},r.size=function(){return o},r.align=function(t){return Math.round(o*Math.ceil(t/o))},r.url=function(){return"url(#"+t+")"},r.css=function(){return"fill: "+r.url()+";"},r.foreground=function(t){return arguments.length?(f=t,r):f},r.background=function(t){return arguments.length?(u=t,r):u},r}function v(t,r){function e(r){var l=r.selection?r.selection():r,s=l.select("defs");s.empty()&&(s=l.append("defs"));var c=s.select(e.self());c.empty()&&(c=s.append("pattern").attr("id",t).attr("patternUnits","userSpaceOnUse"),c.append("rect").attr("class","pattern-background"),c.append("rect").attr("class","pattern-foreground")),c.attr("width",n).attr("height",n).attr("patternTransform","translate("+a*Math.sin(o*(Math.PI/180))+",0),rotate("+o+")"),c.select("rect.pattern-background").attr("width",n).attr("height",n).attr("fill",u),c.select("rect.pattern-foreground").attr("width",a).attr("height",i).attr("fill",f)}null==r&&(r={});var n=r.size||4,a=r.width||3,i=r.height||3,o=r.angle||45,u="transparent",f=O.light.highlight;return null==t&&(t="pattern-diagonals-"+W,W++),e.id=function(){return t},e.self=function(){return"#"+t},e.url=function(){return"url(#"+t+")"},e.css=function(){return"fill: "+e.url()+";"},e.size=function(t){return arguments.length?(n=t,e):n},e.width=function(t){return arguments.length?(a=t,e):a},e.height=function(t){return arguments.length?(i=t,e):i},e.angle=function(t){return arguments.length?(o=t,e):o},e.foreground=function(t){return arguments.length?(f=t,e):f},e.background=function(t){return arguments.length?(u=t,e):u},e}function b(t){return t<414?"12px":"14px"}var M="0.4.2",x=64,F={lightness:l,light:function(t){return o(l(t,1.6))},medium:function(t){return o(l(t,1.3))}},C={white:function(t){("string"==typeof t||t instanceof String)&&(t=u(t));var r=e(t);return r[0]<x}},A={lightness:function(t){var r=t.map(function(t){var r=t;return Array.isArray(t)||(r=u(t)),[e(r),t]}),n=r.sort(function(t,r){return t[0][0]<r[0][0]?-1:t[0][0]>r[0][0]?-1:0});return n.map(function(t){return t[1]})}},E=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],S=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],k=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],z={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},B={standard:S,darker:E,lighter:k,names:z},R=["#e11010","#0ab93a","#1671f4","#cacaca"],T=["#6a0000","#087927","#0b49a2","#828282"],I={red:0,green:1,blue:2,grey:3},U={standard:R,darker:T,names:I},L=["light","dark"],O={light:{background:"#ffffff",text:"#262626",axis:"#262626",grid:"#e0e0e0",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.3)",shadow:"rgba(127,127,127,0.4)",fillOpacity:.33,negative:{background:"rgba(0, 0, 0, 0.66)",text:"#ffffff"}},dark:{background:"#333333",text:"#ffffff",axis:"#ffffff",grid:"#6d6d6d",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.5)",shadow:"rgba(255,255,255,0.4)",fillOpacity:.33,negative:{background:"rgba(255, 255, 255, 0.85)",text:"#262626"}}},j=d(function(t){function r(t,r){return 1-3*r+3*t}function e(t,r){return 3*r-6*t}function n(t){return 3*t}function a(t,a,i){return((r(a,i)*t+e(a,i))*t+n(a))*t}function i(t,a,i){return 3*r(a,i)*t*t+2*e(a,i)*t+n(a)}function o(t,r,e,n,i){var o,u,f=0;do u=r+(e-r)/2,o=a(u,n,i)-t,o>0?e=u:r=u;while(Math.abs(o)>s&&++f<c);return u}function u(t,r,e,n){for(var o=0;o<f;++o){var u=i(r,e,n);if(0===u)return r;var l=a(r,e,n)-t;r-=l/u}return r}var f=4,l=.001,s=1e-7,c=10,d=11,h=1/(d-1),p="function"==typeof Float32Array;t.exports=function(t,r,e,n){function f(r){for(var n=0,a=1,f=d-1;a!==f&&s[a]<=r;++a)n+=h;--a;var c=(r-s[a])/(s[a+1]-s[a]),p=n+c*h,g=i(p,t,e);return g>=l?u(r,p,t,e):0===g?p:o(r,n,n+h,t,e)}if(!(0<=t&&t<=1&&0<=e&&e<=1))throw new Error("bezier x values must be in [0, 1] range");var s=p?new Float32Array(d):new Array(d);if(t!==r||e!==n)for(var c=0;c<d;++c)s[c]=a(c*h,t,e);return function(i){return t===r&&e===n?i:0===i?0:1===i?1:a(f(i),r,n)}}}),D=c(j),G=400,P=1,_=33.75,N={diagonal1:{angle:_,width:5,height:4,size:5},diagonal2:{angle:_,width:5,height:2,size:5},diagonal3:{angle:_,width:5,height:3,size:5},crosshatch1:{angle:45,width:4,height:4,size:5},crosshatch2:{angle:45,width:3,height:4,size:5},crosshatch3:{angle:45,width:3,height:3,size:5},blocks:{angle:0,width:3,height:4,size:5},redsift:{angle:_,width:3,height:3,size:5}},W=1,q={outline:.5,data:2.5,axis:1,grid:2},V={grid:"2,2"},$='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',H={fixed:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",weightMonochrome:300,weightColor:500,sizeForWidth:b,family:'"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace'},variable:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",weightMonochrome:400,weightColor:500,sizeForWidth:b,family:'"Raleway", "Trebuchet MS", '+$},brand:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Electrolize);",weightMonochrome:400,weightColor:400,sizeForWidth:b,family:'"Electrolize", '+$}};t.version=M,t.transform=F,t.random=s,t.contrasts=C,t.sort=A,t.themes=L,t.presentation10=B,t.brand=U,t.display=O,t.duration=G,t.easing=h,t.shadow=g,t.greyscale=m,t.emboss=w,t.angle=_,t.patterns=N,t.diagonals=v,t.highlights=y,t.widths=q,t.dashes=V,t.fonts=H,Object.defineProperty(t,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-theme.umd-es2015.min.js.map


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,n){ true?n(exports,__webpack_require__(120)):"function"==typeof define&&define.amd?define(["exports","d3-selection"],n):n(t.d3_rs_lines=t.d3_rs_lines||{},t.d3)}(this,function(t,n){"use strict";function e(){this._x0=this._y0=this._x1=this._y1=null,this._=[]}function r(){return new e}function i(t){this._context=t}function a(t){return t[0]}function o(t){return t[1]}function u(t){this._curve=t}function s(t){function n(n){return new u(t(n))}return n._curve=t,n}function l(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function c(t){this._context=t}function h(t,n){this._basis=new c(t),this._beta=n}function f(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function d(t,n){this._context=t,this._k=(1-n)/6}function m(t,n){this._context=t,this._k=(1-n)/6}function g(t,n){this._context=t,this._k=(1-n)/6}function p(t,n,e){var r=t._x1,i=t._y1,a=t._x2,o=t._y2;if(t._l01_a>ri){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,s=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/s,i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/s}if(t._l23_a>ri){var l=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);a=(a*l+t._x1*t._l23_2a-n*t._l12_2a)/c,o=(o*l+t._y1*t._l23_2a-e*t._l12_2a)/c}t._context.bezierCurveTo(r,i,a,o,t._x2,t._y2)}function v(t,n){this._context=t,this._alpha=n}function y(t,n){this._context=t,this._alpha=n}function _(t,n){this._context=t,this._alpha=n}function b(t){return t<0?-1:1}function x(t,n,e){var r=t._x1-t._x0,i=n-t._x1,a=(t._y1-t._y0)/(r||i<0&&-0),o=(e-t._y1)/(i||r<0&&-0),u=(a*i+o*r)/(r+i);return(b(a)+b(o))*Math.min(Math.abs(a),Math.abs(o),.5*Math.abs(u))||0}function M(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function w(t,n,e){var r=t._x0,i=t._y0,a=t._x1,o=t._y1,u=(a-r)/3;t._context.bezierCurveTo(r+u,i+u*n,a-u,o-u*e,a,o)}function k(t){this._context=t}function N(t){this._context=new T(t)}function T(t){this._context=t}function S(t){return new k(t)}function A(t){return new N(t)}function C(t){this._context=t}function z(t){var n,e,r=t.length-1,i=new Array(r),a=new Array(r),o=new Array(r);for(i[0]=0,a[0]=2,o[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,a[n]=4,o[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,a[r-1]=7,o[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/a[n-1],a[n]-=e,o[n]-=e*o[n-1];for(i[r-1]=o[r-1]/a[r-1],n=r-2;n>=0;--n)i[n]=(o[n]-i[n+1])/a[n];for(a[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)a[n]=2*t[n+1]-i[n+1];return[i,a]}function D(t,n){this._context=t,this._t=n}function j(t){return new D(t,0)}function F(t){return new D(t,1)}function P(t,n){return t[n]}function O(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}function E(t){return function(n,e){return Ji(t(n),e)}}function L(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),a=r/i;return a>=Zi?i*=10:a>=Qi?i*=5:a>=ta&&(i*=2),n<t?-i:i}function U(){}function Y(t,n){var e=new U;if(t instanceof U)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,i=-1,a=t.length;if(null==n)for(;++i<a;)e.set(i,t[i]);else for(;++i<a;)e.set(n(r=t[i],i,t),r)}else if(t)for(var o in t)e.set(o,t[o]);return e}function I(){return{}}function H(t,n,e){t[n]=e}function R(){return Y()}function B(t,n,e){t.set(n,e)}function W(){}function J(t,n){var e=new W;if(t instanceof W)t.each(function(t){e.add(t)});else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}function q(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function X(){}function K(t){var n;return t=(t+"").trim().toLowerCase(),(n=da.exec(t))?(n=parseInt(n[1],16),new Q(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1)):(n=ma.exec(t))?V(parseInt(n[1],16)):(n=ga.exec(t))?new Q(n[1],n[2],n[3],1):(n=pa.exec(t))?new Q(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=va.exec(t))?G(n[1],n[2],n[3],n[4]):(n=ya.exec(t))?G(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=_a.exec(t))?tt(n[1],n[2]/100,n[3]/100,1):(n=ba.exec(t))?tt(n[1],n[2]/100,n[3]/100,n[4]):xa.hasOwnProperty(t)?V(xa[t]):"transparent"===t?new Q(NaN,NaN,NaN,0):null}function V(t){return new Q(t>>16&255,t>>8&255,255&t,1)}function G(t,n,e,r){return r<=0&&(t=n=e=NaN),new Q(t,n,e,r)}function $(t){return t instanceof X||(t=K(t)),t?(t=t.rgb(),new Q(t.r,t.g,t.b,t.opacity)):new Q}function Z(t,n,e,r){return 1===arguments.length?$(t):new Q(t,n,e,null==r?1:r)}function Q(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function tt(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new rt(t,n,e,r)}function nt(t){if(t instanceof rt)return new rt(t.h,t.s,t.l,t.opacity);if(t instanceof X||(t=K(t)),!t)return new rt;if(t instanceof rt)return t;t=t.rgb();var n=t.r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),a=Math.max(n,e,r),o=NaN,u=a-i,s=(a+i)/2;return u?(o=n===a?(e-r)/u+6*(e<r):e===a?(r-n)/u+2:(n-e)/u+4,u/=s<.5?a+i:2-a-i,o*=60):u=s>0&&s<1?0:o,new rt(o,u,s,t.opacity)}function et(t,n,e,r){return 1===arguments.length?nt(t):new rt(t,n,e,null==r?1:r)}function rt(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function it(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}function at(t){if(t instanceof ut)return new ut(t.l,t.a,t.b,t.opacity);if(t instanceof mt){var n=t.h*Ma;return new ut(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof Q||(t=$(t));var e=ht(t.r),r=ht(t.g),i=ht(t.b),a=st((.4124564*e+.3575761*r+.1804375*i)/Na),o=st((.2126729*e+.7151522*r+.072175*i)/Ta),u=st((.0193339*e+.119192*r+.9503041*i)/Sa);return new ut(116*o-16,500*(a-o),200*(o-u),t.opacity)}function ot(t,n,e,r){return 1===arguments.length?at(t):new ut(t,n,e,null==r?1:r)}function ut(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function st(t){return t>Da?Math.pow(t,1/3):t/za+Aa}function lt(t){return t>Ca?t*t*t:za*(t-Aa)}function ct(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function ht(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function ft(t){if(t instanceof mt)return new mt(t.h,t.c,t.l,t.opacity);t instanceof ut||(t=at(t));var n=Math.atan2(t.b,t.a)*wa;return new mt(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function dt(t,n,e,r){return 1===arguments.length?ft(t):new mt(t,n,e,null==r?1:r)}function mt(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function gt(t){if(t instanceof vt)return new vt(t.h,t.s,t.l,t.opacity);t instanceof Q||(t=$(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(Ya*r+La*n-Ua*e)/(Ya+La-Ua),a=r-i,o=(Ea*(e-i)-Pa*a)/Oa,u=Math.sqrt(o*o+a*a)/(Ea*i*(1-i)),s=u?Math.atan2(o,a)*wa-120:NaN;return new vt(s<0?s+360:s,u,i,t.opacity)}function pt(t,n,e,r){return 1===arguments.length?gt(t):new vt(t,n,e,null==r?1:r)}function vt(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function yt(t,n){return function(e){return t+e*n}}function _t(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}function bt(t,n){var e=n-t;return e?yt(t,e>180||e<-180?e-360*Math.round(e/360):e):Wa(isNaN(t)?n:t)}function xt(t){return 1===(t=+t)?Mt:function(n,e){return e-n?_t(n,e,t):Wa(isNaN(n)?e:n)}}function Mt(t,n){var e=n-t;return e?yt(t,e):Wa(isNaN(t)?n:t)}function wt(t){return function(){return t}}function kt(t){return function(n){return t(n)+""}}function Nt(t){return"none"===t?eo:(Ia||(Ia=document.createElement("DIV"),Ha=document.documentElement,Ra=document.defaultView),Ia.style.transform=t,t=Ra.getComputedStyle(Ha.appendChild(Ia),null).getPropertyValue("transform"),Ha.removeChild(Ia),t=t.slice(7,-1).split(","),ro(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function Tt(t){return null==t?eo:(Ba||(Ba=document.createElementNS("http://www.w3.org/2000/svg","g")),Ba.setAttribute("transform",t),(t=Ba.transform.baseVal.consolidate())?(t=t.matrix,ro(t.a,t.b,t.c,t.d,t.e,t.f)):eo)}function St(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}function a(t,r,i,a,o,u){if(t!==i||r!==a){var s=o.push("translate(",null,n,null,e);u.push({i:s-4,x:Ka(t,i)},{i:s-2,x:Ka(r,a)})}else(i||a)&&o.push("translate("+i+n+a+e)}function o(t,n,e,a){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),a.push({i:e.push(i(e)+"rotate(",null,r)-2,x:Ka(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}function u(t,n,e,a){t!==n?a.push({i:e.push(i(e)+"skewX(",null,r)-2,x:Ka(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}function s(t,n,e,r,a,o){if(t!==e||n!==r){var u=a.push(i(a)+"scale(",null,",",null,")");o.push({i:u-4,x:Ka(t,e)},{i:u-2,x:Ka(n,r)})}else 1===e&&1===r||a.push(i(a)+"scale("+e+","+r+")")}return function(n,e){var r=[],i=[];return n=t(n),e=t(e),a(n.translateX,n.translateY,e.translateX,e.translateY,r,i),o(n.rotate,e.rotate,r,i),u(n.skewX,e.skewX,r,i),s(n.scaleX,n.scaleY,e.scaleX,e.scaleY,r,i),n=e=null,function(t){for(var n,e=-1,a=i.length;++e<a;)r[(n=i[e]).i]=n.x(t);return r.join("")}}}function At(t){return function n(e){function r(n,r){var i=t((n=pt(n)).h,(r=pt(r)).h),a=Mt(n.s,r.s),o=Mt(n.l,r.l),u=Mt(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=a(t),n.l=o(Math.pow(t,e)),n.opacity=u(t),n+""}}return e=+e,r.gamma=n,r}(1)}function Ct(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:so(n)}function zt(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}function Dt(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}function jt(t,n,e,r){var i=t[0],a=t[1],o=n[0],u=n[1];return a<i?(i=e(a,i),o=r(u,o)):(i=e(i,a),o=r(o,u)),function(t){return o(i(t))}}function Ft(t,n,e,r){var i=Math.min(t.length,n.length)-1,a=new Array(i),o=new Array(i),u=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++u<i;)a[u]=e(t[u],t[u+1]),o[u]=r(n[u],n[u+1]);return function(n){var e=Ki(t,n,1,i)-1;return o[e](a[e](n))}}function Pt(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function Ot(t,n){function e(){return i=Math.min(u.length,s.length)>2?Ft:jt,a=o=null,r}function r(n){return(a||(a=i(u,s,c?zt(t):t,l)))(+n)}var i,a,o,u=co,s=co,l=Qa,c=!1;return r.invert=function(t){return(o||(o=i(s,u,Ct,c?Dt(n):n)))(+t)},r.domain=function(t){return arguments.length?(u=sa.call(t,lo),e()):u.slice()},r.range=function(t){return arguments.length?(s=la.call(t),e()):s.slice()},r.rangeRound=function(t){return s=la.call(t),l=to,e()},r.clamp=function(t){return arguments.length?(c=!!t,e()):c},r.interpolate=function(t){return arguments.length?(l=t,e()):l},e()}function Et(t){if(!(n=_o.exec(t)))throw new Error("invalid format: "+t);var n,e=n[1]||" ",r=n[2]||">",i=n[3]||"-",a=n[4]||"",o=!!n[5],u=n[6]&&+n[6],s=!!n[7],l=n[8]&&+n[8].slice(1),c=n[9]||"";"n"===c?(s=!0,c="g"):yo[c]||(c=""),(o||"0"===e&&"="===r)&&(o=!0,e="0",r="="),this.fill=e,this.align=r,this.sign=i,this.symbol=a,this.zero=o,this.width=u,this.comma=s,this.precision=l,this.type=c}function Lt(t){return t}function Ut(t){return xo=No(t),Mo=xo.format,wo=xo.formatPrefix,xo}function Yt(t){var n=t.domain;return t.ticks=function(t){var e=n();return na(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return Co(n(),t,e)},t.nice=function(e){var r=n(),i=r.length-1,a=null==e?10:e,o=r[0],u=r[i],s=L(o,u,a);return s&&(s=L(Math.floor(o/s)*s,Math.ceil(u/s)*s,a),r[0]=Math.floor(o/s)*s,r[i]=Math.ceil(u/s)*s,n(r)),t},t}function It(){var t=Ot(Ct,Ka);return t.copy=function(){return Pt(t,It())},Yt(t)}function Ht(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:so(n)}function Rt(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function Bt(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Wt(t){return 10===t?Bt:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function Jt(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function qt(t){return function(n){return-t(-n)}}function Xt(){function t(){return i=Jt(r),a=Wt(r),e()[0]<0&&(i=qt(i),a=qt(a)),n}var n=Ot(Ht,Rt).domain([1,10]),e=n.domain,r=10,i=Jt(10),a=Wt(10);return n.base=function(n){return arguments.length?(r=+n,t()):r},n.domain=function(n){return arguments.length?(e(n),t()):e()},n.ticks=function(t){var n,o=e(),u=o[0],s=o[o.length-1];(n=s<u)&&(f=u,u=s,s=f);var l,c,h,f=i(u),d=i(s),m=null==t?10:+t,g=[];if(!(r%1)&&d-f<m){if(f=Math.round(f)-1,d=Math.round(d)+1,u>0){for(;f<d;++f)for(c=1,l=a(f);c<r;++c)if(h=l*c,!(h<u)){if(h>s)break;g.push(h)}}else for(;f<d;++f)for(c=r-1,l=a(f);c>=1;--c)if(h=l*c,!(h<u)){if(h>s)break;g.push(h)}}else g=na(f,d,Math.min(d-f,m)).map(a);return n?g.reverse():g},n.tickFormat=function(t,e){if(null==e&&(e=10===r?".0e":","),"function"!=typeof e&&(e=Mo(e)),t===1/0)return e;null==t&&(t=10);var o=Math.max(1,r*t/n.ticks().length);return function(t){var n=t/a(Math.round(i(t)));return n*r<r-.5&&(n*=r),n<=o?e(t):""}},n.nice=function(){return e(zo(e(),{floor:function(t){return a(Math.floor(i(t)))},ceil:function(t){return a(Math.ceil(i(t)))}}))},n.copy=function(){return Pt(n,Xt().base(r))},n}function Kt(t,n,e,r){function i(n){return t(n=new Date((+n))),n}return i.floor=i,i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date((+t)),null==e?1:Math.floor(e)),t},i.range=function(e,r,a){var o=[];if(e=i.ceil(e),a=null==a?1:Math.floor(a),!(e<r&&a>0))return o;do o.push(new Date((+e)));while(n(e,a),t(e),e<r);return o},i.filter=function(e){return Kt(function(n){if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)},function(t,r){if(t>=t)for(;--r>=0;)for(;n(t,1),!e(t););})},e&&(i.count=function(n,r){return Do.setTime(+n),jo.setTime(+r),t(Do),t(jo),Math.floor(e(Do,jo))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t===0}:function(n){return i.count(0,n)%t===0}):i:null}),i}function Vt(t){return Kt(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Oo)/Uo})}function Gt(t){return Kt(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/Uo})}function $t(t){if(0<=t.y&&t.y<100){var n=new Date((-1),t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Zt(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Qt(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function tn(t){function n(t,n){return function(e){var r,i,a,o=[],u=-1,s=0,l=t.length;for(e instanceof Date||(e=new Date((+e)));++u<l;)37===t.charCodeAt(u)&&(o.push(t.slice(s,u)),null!=(i=gu[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",(a=n[r])&&(r=a(e,i)),o.push(r),s=u+1);return o.push(t.slice(s,u)),o.join("")}}function e(t,n){return function(e){var i=Qt(1900),a=r(i,t,e+="",0);if(a!=e.length)return null;if("p"in i&&(i.H=i.H%12+12*i.p),"W"in i||"U"in i){"w"in i||(i.w="W"in i?1:0);var o="Z"in i?Zt(Qt(i.y)).getUTCDay():n(Qt(i.y)).getDay();i.m=0,i.d="W"in i?(i.w+6)%7+7*i.W-(o+5)%7:i.w+7*i.U-(o+6)%7}return"Z"in i?(i.H+=i.Z/100|0,i.M+=i.Z%100,Zt(i)):n(i)}}function r(t,n,e,r){for(var i,a,o=0,u=n.length,s=e.length;o<u;){if(r>=s)return-1;if(i=n.charCodeAt(o++),37===i){if(i=n.charAt(o++),a=R[i in gu?n.charAt(o++):i],!a||(r=a(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function i(t,n,e){var r=z.exec(n.slice(e));return r?(t.p=D[r[0].toLowerCase()],e+r[0].length):-1}function a(t,n,e){var r=P.exec(n.slice(e));return r?(t.w=O[r[0].toLowerCase()],e+r[0].length):-1}function o(t,n,e){var r=j.exec(n.slice(e));return r?(t.w=F[r[0].toLowerCase()],e+r[0].length):-1}function u(t,n,e){var r=U.exec(n.slice(e));return r?(t.m=Y[r[0].toLowerCase()],e+r[0].length):-1}function s(t,n,e){var r=E.exec(n.slice(e));return r?(t.m=L[r[0].toLowerCase()],e+r[0].length):-1}function l(t,n,e){return r(t,M,n,e)}function c(t,n,e){return r(t,w,n,e)}function h(t,n,e){return r(t,k,n,e)}function f(t){return S[t.getDay()]}function d(t){return T[t.getDay()]}function m(t){return C[t.getMonth()]}function g(t){return A[t.getMonth()]}function p(t){return N[+(t.getHours()>=12)]}function v(t){return S[t.getUTCDay()]}function y(t){return T[t.getUTCDay()]}function _(t){return C[t.getUTCMonth()]}function b(t){return A[t.getUTCMonth()]}function x(t){return N[+(t.getUTCHours()>=12)]}var M=t.dateTime,w=t.date,k=t.time,N=t.periods,T=t.days,S=t.shortDays,A=t.months,C=t.shortMonths,z=rn(N),D=an(N),j=rn(T),F=an(T),P=rn(S),O=an(S),E=rn(A),L=an(A),U=rn(C),Y=an(C),I={a:f,A:d,b:m,B:g,c:null,d:bn,e:bn,H:xn,I:Mn,j:wn,L:kn,m:Nn,M:Tn,p:p,S:Sn,U:An,w:Cn,W:zn,x:null,X:null,y:Dn,Y:jn,Z:Fn,"%":Kn},H={a:v,A:y,b:_,B:b,c:null,d:Pn,e:Pn,H:On,I:En,j:Ln,L:Un,m:Yn,M:In,p:x,S:Hn,U:Rn,w:Bn,W:Wn,x:null,X:null,y:Jn,Y:qn,Z:Xn,"%":Kn},R={a:a,A:o,b:u,B:s,c:l,d:dn,e:dn,H:gn,I:gn,j:mn,L:yn,m:fn,M:pn,p:i,S:vn,U:un,w:on,W:sn,x:c,X:h,y:cn,Y:ln,Z:hn,"%":_n};return I.x=n(w,I),I.X=n(k,I),I.c=n(M,I),H.x=n(w,H),H.X=n(k,H),H.c=n(M,H),{format:function(t){var e=n(t+="",I);return e.toString=function(){return t},e},parse:function(t){var n=e(t+="",$t);return n.toString=function(){return t},n},utcFormat:function(t){var e=n(t+="",H);return e.toString=function(){return t},e},utcParse:function(t){var n=e(t,Zt);return n.toString=function(){return t},n}}}function nn(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",a=i.length;return r+(a<e?new Array(e-a+1).join(n)+i:i)}function en(t){return t.replace(yu,"\\$&")}function rn(t){return new RegExp("^(?:"+t.map(en).join("|")+")","i")}function an(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function on(t,n,e){var r=pu.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function un(t,n,e){var r=pu.exec(n.slice(e));return r?(t.U=+r[0],e+r[0].length):-1}function sn(t,n,e){var r=pu.exec(n.slice(e));return r?(t.W=+r[0],e+r[0].length):-1}function ln(t,n,e){var r=pu.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function cn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function hn(t,n,e){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function fn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function dn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function mn(t,n,e){var r=pu.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function gn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function pn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function vn(t,n,e){var r=pu.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function yn(t,n,e){var r=pu.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function _n(t,n,e){var r=vu.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function bn(t,n){return nn(t.getDate(),n,2)}function xn(t,n){return nn(t.getHours(),n,2)}function Mn(t,n){return nn(t.getHours()%12||12,n,2)}function wn(t,n){return nn(1+Ro.count($o(t),t),n,3)}function kn(t,n){return nn(t.getMilliseconds(),n,3)}function Nn(t,n){return nn(t.getMonth()+1,n,2)}function Tn(t,n){return nn(t.getMinutes(),n,2)}function Sn(t,n){return nn(t.getSeconds(),n,2)}function An(t,n){return nn(Bo.count($o(t),t),n,2)}function Cn(t){return t.getDay()}function zn(t,n){return nn(Wo.count($o(t),t),n,2)}function Dn(t,n){return nn(t.getFullYear()%100,n,2)}function jn(t,n){return nn(t.getFullYear()%1e4,n,4)}function Fn(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+nn(n/60|0,"0",2)+nn(n%60,"0",2)}function Pn(t,n){return nn(t.getUTCDate(),n,2)}function On(t,n){return nn(t.getUTCHours(),n,2)}function En(t,n){return nn(t.getUTCHours()%12||12,n,2)}function Ln(t,n){return nn(1+tu.count(lu(t),t),n,3)}function Un(t,n){return nn(t.getUTCMilliseconds(),n,3)}function Yn(t,n){return nn(t.getUTCMonth()+1,n,2)}function In(t,n){return nn(t.getUTCMinutes(),n,2)}function Hn(t,n){return nn(t.getUTCSeconds(),n,2)}function Rn(t,n){return nn(nu.count(lu(t),t),n,2)}function Bn(t){return t.getUTCDay()}function Wn(t,n){return nn(eu.count(lu(t),t),n,2)}function Jn(t,n){return nn(t.getUTCFullYear()%100,n,2)}function qn(t,n){return nn(t.getUTCFullYear()%1e4,n,4)}function Xn(){return"+0000"}function Kn(){return"%"}function Vn(t){return cu=tn(t),hu=cu.format,fu=cu.parse,du=cu.utcFormat,mu=cu.utcParse,cu}function Gn(t){return t.toISOString()}function $n(t){var n=new Date(t);return isNaN(n)?null:n}function Zn(t){return new Date(t)}function Qn(t){return t instanceof Date?+t:+new Date((+t))}function te(t,n,e,r,i,a,o,u,s){function l(u){return(o(u)<u?m:a(u)<u?g:i(u)<u?p:r(u)<u?v:n(u)<u?e(u)<u?y:_:t(u)<u?b:x)(u)}function c(n,e,r,i){if(null==n&&(n=10),"number"==typeof n){var a=Math.abs(r-e)/n,o=qi(function(t){return t[2]}).right(M,a);o===M.length?(i=L(e/Tu,r/Tu,n),n=t):o?(o=M[a/M[o-1][2]<M[o][2]/a?o-1:o],i=o[1],n=o[0]):(i=L(e,r,n),n=u)}return null==i?n:n.every(i)}var h=Ot(Ct,Ka),f=h.invert,d=h.domain,m=s(".%L"),g=s(":%S"),p=s("%I:%M"),v=s("%I %p"),y=s("%a %d"),_=s("%b %d"),b=s("%B"),x=s("%Y"),M=[[o,1,bu],[o,5,5*bu],[o,15,15*bu],[o,30,30*bu],[a,1,xu],[a,5,5*xu],[a,15,15*xu],[a,30,30*xu],[i,1,Mu],[i,3,3*Mu],[i,6,6*Mu],[i,12,12*Mu],[r,1,wu],[r,2,2*wu],[e,1,ku],[n,1,Nu],[n,3,3*Nu],[t,1,Tu]];return h.invert=function(t){return new Date(f(t))},h.domain=function(t){return arguments.length?d(sa.call(t,Qn)):d().map(Zn)},h.ticks=function(t,n){var e,r=d(),i=r[0],a=r[r.length-1],o=a<i;return o&&(e=i,i=a,a=e),e=c(t,i,a,n),e=e?e.range(i,a+1):[],o?e.reverse():e},h.tickFormat=function(t,n){return null==n?l:s(n)},h.nice=function(t,n){var e=d();return(t=c(t,e[0],e[e.length-1],n))?d(zo(e,t)):h},h.copy=function(){return Pt(h,te(t,n,e,r,i,a,o,u,s))},h}function ne(t,n,e){var r=t(e);return"translate("+(isFinite(r)?r:n(e))+",0)"}function ee(t,n,e){var r=t(e);return"translate(0,"+(isFinite(r)?r:n(e))+")"}function re(t){var n=t.bandwidth()/2;return t.round()&&(n=Math.round(n)),function(e){return t(e)+n}}function ie(){return!this.__axis}function ae(t,n){function e(e){var l,c=null==i?n.ticks?n.ticks.apply(n,r):n.domain():i,h=null==a?n.tickFormat?n.tickFormat.apply(n,r):zu:a,f=Math.max(o,0)+s,d=t===Du||t===Fu?ne:ee,m=n.range(),g=m[0]+.5,p=m[m.length-1]+.5,v=(n.bandwidth?re:zu)(n.copy()),y=e.selection?e.selection():e,_=y.selectAll(".domain").data([null]),b=y.selectAll(".tick").data(c,n).order(),x=b.exit(),M=b.enter().append("g").attr("class","tick"),w=b.select("line"),k=b.select("text"),N=t===Du||t===Pu?-1:1,T=t===Pu||t===ju?(l="x","y"):(l="y","x");_=_.merge(_.enter().insert("path",".tick").attr("class","domain").attr("stroke","#000")),b=b.merge(M),w=w.merge(M.append("line").attr("stroke","#000").attr(l+"2",N*o).attr(T+"1",.5).attr(T+"2",.5)),k=k.merge(M.append("text").attr("fill","#000").attr(l,N*f).attr(T,.5).attr("dy",t===Du?"0em":t===Fu?"0.71em":"0.32em")),e!==y&&(_=_.transition(e),b=b.transition(e),w=w.transition(e),k=k.transition(e),x=x.transition(e).attr("opacity",Ou).attr("transform",function(t){return d(v,this.parentNode.__axis||v,t)}),M.attr("opacity",Ou).attr("transform",function(t){return d(this.parentNode.__axis||v,v,t)})),x.remove(),_.attr("d",t===Pu||t==ju?"M"+N*u+","+g+"H0.5V"+p+"H"+N*u:"M"+g+","+N*u+"V0.5H"+p+"V"+N*u),b.attr("opacity",1).attr("transform",function(t){return d(v,v,t)}),w.attr(l+"2",N*o),k.attr(l,N*f).text(h),y.filter(ie).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===ju?"start":t===Pu?"end":"middle"),y.each(function(){this.__axis=v})}var r=[],i=null,a=null,o=6,u=6,s=3;return e.scale=function(t){return arguments.length?(n=t,e):n},e.ticks=function(){return r=Cu.call(arguments),e},e.tickArguments=function(t){return arguments.length?(r=null==t?[]:Cu.call(t),e):r.slice()},e.tickValues=function(t){return arguments.length?(i=null==t?null:Cu.call(t),e):i&&i.slice()},e.tickFormat=function(t){return arguments.length?(a=t,e):a},e.tickSize=function(t){return arguments.length?(o=u=+t,e):o},e.tickSizeInner=function(t){return arguments.length?(o=+t,e):o},e.tickSizeOuter=function(t){return arguments.length?(u=+t,e):u},e.tickPadding=function(t){return arguments.length?(s=+t,e):s},e}function oe(t){return ae(ju,t)}function ue(t){return ae(Fu,t)}function se(t){return ae(Pu,t)}function le(t){return t[0]}function ce(t){return t[1]}function he(){this._=null}function fe(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function de(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function me(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function ge(t){for(;t.L;)t=t.L;return t}function pe(t,n,e,r){var i=[null,null],a=Hu.push(i)-1;return i.left=t,i.right=n,e&&ye(i,t,n,e),r&&ye(i,n,t,r),Yu[t.index].halfedges.push(a),Yu[n.index].halfedges.push(a),i}function ve(t,n,e){var r=[n,e];return r.left=t,r}function ye(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function _e(t,n,e,r,i){var a,o=t[0],u=t[1],s=o[0],l=o[1],c=u[0],h=u[1],f=0,d=1,m=c-s,g=h-l;if(a=n-s,m||!(a>0)){if(a/=m,m<0){if(a<f)return;a<d&&(d=a)}else if(m>0){if(a>d)return;a>f&&(f=a)}if(a=r-s,m||!(a<0)){if(a/=m,m<0){if(a>d)return;a>f&&(f=a)}else if(m>0){if(a<f)return;a<d&&(d=a)}if(a=e-l,g||!(a>0)){if(a/=g,g<0){if(a<f)return;a<d&&(d=a)}else if(g>0){if(a>d)return;a>f&&(f=a)}if(a=i-l,g||!(a<0)){if(a/=g,g<0){if(a>d)return;a>f&&(f=a)}else if(g>0){if(a<f)return;a<d&&(d=a)}return!(f>0||d<1)||(f>0&&(t[0]=[s+f*m,l+f*g]),d<1&&(t[1]=[s+d*m,l+d*g]),!0)}}}}}function be(t,n,e,r,i){var a=t[1];if(a)return!0;var o,u,s=t[0],l=t.left,c=t.right,h=l[0],f=l[1],d=c[0],m=c[1],g=(h+d)/2,p=(f+m)/2;if(m===f){if(g<n||g>=r)return;if(h>d){if(s){if(s[1]>=i)return}else s=[g,e];a=[g,i]}else{if(s){if(s[1]<e)return}else s=[g,i];a=[g,e]}}else if(o=(h-d)/(m-f),u=p-o*g,o<-1||o>1)if(h>d){if(s){if(s[1]>=i)return}else s=[(e-u)/o,e];a=[(i-u)/o,i]}else{if(s){if(s[1]<e)return}else s=[(i-u)/o,i];a=[(e-u)/o,e]}else if(f<m){if(s){if(s[0]>=r)return}else s=[n,o*n+u];a=[r,o*r+u]}else{if(s){if(s[0]<n)return}else s=[r,o*r+u];a=[n,o*n+u]}return t[0]=s,t[1]=a,!0}function xe(t,n,e,r){for(var i,a=Hu.length;a--;)be(i=Hu[a],t,n,e,r)&&_e(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>Wu||Math.abs(i[0][1]-i[1][1])>Wu)||delete Hu[a]}function Me(t){return Yu[t.index]={site:t,halfedges:[]}}function we(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function ke(t,n){return n[+(n.left!==t.site)]}function Ne(t,n){return n[+(n.left===t.site)]}function Te(){for(var t,n,e,r,i=0,a=Yu.length;i<a;++i)if((t=Yu[i])&&(r=(n=t.halfedges).length)){var o=new Array(r),u=new Array(r);for(e=0;e<r;++e)o[e]=e,u[e]=we(t,Hu[n[e]]);for(o.sort(function(t,n){return u[n]-u[t]}),e=0;e<r;++e)u[e]=n[o[e]];for(e=0;e<r;++e)n[e]=u[e]}}function Se(t,n,e,r){var i,a,o,u,s,l,c,h,f,d,m,g,p=Yu.length,v=!0;for(i=0;i<p;++i)if(a=Yu[i]){for(o=a.site,s=a.halfedges,u=s.length;u--;)Hu[s[u]]||s.splice(u,1);for(u=0,l=s.length;u<l;)d=Ne(a,Hu[s[u]]),m=d[0],g=d[1],c=ke(a,Hu[s[++u%l]]),h=c[0],f=c[1],(Math.abs(m-h)>Wu||Math.abs(g-f)>Wu)&&(s.splice(u,0,Hu.push(ve(o,d,Math.abs(m-t)<Wu&&r-g>Wu?[t,Math.abs(h-t)<Wu?f:r]:Math.abs(g-r)<Wu&&e-m>Wu?[Math.abs(f-r)<Wu?h:e,r]:Math.abs(m-e)<Wu&&g-n>Wu?[e,Math.abs(h-e)<Wu?f:n]:Math.abs(g-n)<Wu&&m-t>Wu?[Math.abs(f-n)<Wu?h:t,n]:null))-1),++l);l&&(v=!1)}if(v){var y,_,b,x=1/0;for(i=0,v=null;i<p;++i)(a=Yu[i])&&(o=a.site,y=o[0]-t,_=o[1]-n,b=y*y+_*_,b<x&&(x=b,v=a));if(v){var M=[t,n],w=[t,r],k=[e,r],N=[e,n];v.halfedges.push(Hu.push(ve(o=v.site,M,w))-1,Hu.push(ve(o,w,k))-1,Hu.push(ve(o,k,N))-1,Hu.push(ve(o,N,M))-1)}}for(i=0;i<p;++i)(a=Yu[i])&&(a.halfedges.length||delete Yu[i])}function Ae(){fe(this),this.x=this.y=this.arc=this.site=this.cy=null}function Ce(t){var n=t.P,e=t.N;if(n&&e){var r=n.site,i=t.site,a=e.site;if(r!==a){var o=i[0],u=i[1],s=r[0]-o,l=r[1]-u,c=a[0]-o,h=a[1]-u,f=2*(s*h-l*c);if(!(f>=-Ju)){var d=s*s+l*l,m=c*c+h*h,g=(h*d-l*m)/f,p=(s*m-c*d)/f,v=Ru.pop()||new Ae;v.arc=t,v.site=i,v.x=g+o,v.y=(v.cy=p+u)+Math.sqrt(g*g+p*p),t.circle=v;for(var y=null,_=Iu._;_;)if(v.y<_.y||v.y===_.y&&v.x<=_.x){if(!_.L){y=_.P;break}_=_.L}else{if(!_.R){y=_;break}_=_.R}Iu.insert(y,v),y||(Lu=v)}}}}function ze(t){var n=t.circle;n&&(n.P||(Lu=n.N),Iu.remove(n),Ru.push(n),fe(n),t.circle=null)}function De(){fe(this),this.edge=this.site=this.circle=null}function je(t){var n=Bu.pop()||new De;return n.site=t,n}function Fe(t){ze(t),Uu.remove(t),Bu.push(t),fe(t)}function Pe(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],a=t.P,o=t.N,u=[t];Fe(t);for(var s=a;s.circle&&Math.abs(e-s.circle.x)<Wu&&Math.abs(r-s.circle.cy)<Wu;)a=s.P,u.unshift(s),Fe(s),s=a;u.unshift(s),ze(s);for(var l=o;l.circle&&Math.abs(e-l.circle.x)<Wu&&Math.abs(r-l.circle.cy)<Wu;)o=l.N,u.push(l),Fe(l),l=o;u.push(l),ze(l);var c,h=u.length;for(c=1;c<h;++c)l=u[c],s=u[c-1],ye(l.edge,s.site,l.site,i);s=u[0],l=u[h-1],l.edge=pe(s.site,l.site,null,i),Ce(s),Ce(l)}function Oe(t){for(var n,e,r,i,a=t[0],o=t[1],u=Uu._;u;)if(r=Ee(u,o)-a,r>Wu)u=u.L;else{if(i=a-Le(u,o),!(i>Wu)){r>-Wu?(n=u.P,e=u):i>-Wu?(n=u,e=u.N):n=e=u;break}if(!u.R){n=u;break}u=u.R}Me(t);var s=je(t);if(Uu.insert(n,s),n||e){if(n===e)return ze(n),e=je(n.site),Uu.insert(s,e),s.edge=e.edge=pe(n.site,s.site),Ce(n),void Ce(e);if(!e)return void(s.edge=pe(n.site,s.site));ze(n),ze(e);var l=n.site,c=l[0],h=l[1],f=t[0]-c,d=t[1]-h,m=e.site,g=m[0]-c,p=m[1]-h,v=2*(f*p-d*g),y=f*f+d*d,_=g*g+p*p,b=[(p*y-d*_)/v+c,(f*_-g*y)/v+h];ye(e.edge,l,m,b),s.edge=pe(l,t,null,b),e.edge=pe(t,m,null,b),Ce(n),Ce(e)}}function Ee(t,n){var e=t.site,r=e[0],i=e[1],a=i-n;if(!a)return r;var o=t.P;if(!o)return-(1/0);e=o.site;var u=e[0],s=e[1],l=s-n;if(!l)return u;var c=u-r,h=1/a-1/l,f=c/l;return h?(-f+Math.sqrt(f*f-2*h*(c*c/(-2*l)-s+l/2+i-a/2)))/h+r:(r+u)/2}function Le(t,n){var e=t.N;if(e)return Ee(e,n);var r=t.site;return r[1]===n?r[0]:1/0}function Ue(t,n,e){return(t[0]-e[0])*(n[1]-t[1])-(t[0]-n[0])*(e[1]-t[1])}function Ye(t,n){return n[1]-t[1]||n[0]-t[0]}function Ie(t,n){var e,r,i,a=t.sort(Ye).pop();for(Hu=[],Yu=new Array(t.length),Uu=new he,Iu=new he;;)if(i=Lu,a&&(!i||a[1]<i.y||a[1]===i.y&&a[0]<i.x))a[0]===e&&a[1]===r||(Oe(a),e=a[0],r=a[1]),a=t.pop();else{if(!i)break;Pe(i.arc)}if(Te(),n){var o=+n[0][0],u=+n[0][1],s=+n[1][0],l=+n[1][1];xe(o,u,s,l),Se(o,u,s,l)}this.edges=Hu,this.cells=Yu,Uu=Iu=Hu=Yu=null}function He(t){function e(){d=a-c-s}function r(){m=o-u-l}function i(e){var r=e.selection?e.selection():e,s=void 0!==e.selection;r.each(function(){var r=n.select(this),l=r.select(i.self());if(l.empty()){var f=(null==t?"":t+"-")+"title",d=(null==t?"":t+"-")+"desc";l=r.append("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("preserveAspectRatio","xMidYMid meet").attr("aria-labelledby",f).attr("aria-describedby",d).attr("id",t),l.append("title").attr("id",f),l.append("desc").attr("id",d),l.append("defs"),l.append("rect").attr("class","background"),l.append("g").attr("class","svg-child")}var m=l.select("defs"),x=m.selectAll("style").data(g?[g]:[]);x.exit().remove(),x=x.enter().append("style").attr("type","text/css").merge(x),x.text(g),l.attr("role",_),l.select("title").text(v),l.select("desc").text(y);var M=l.select("rect.background").attr("width",null!=p?a*h:null).attr("height",null!=p?o*h:null);l.attr("class",b);var w=l.select(i.child());s===!0&&(l=l.transition(e),w=w.transition(e),M=M.transition(e)),l.attr("width",a*h).attr("height",o*h).attr("viewBox","0 0 "+a+" "+o),w.attr("transform","translate("+c+","+u+")"),M.attr("fill",p)})}var a=300,o=150,u=16,s=16,l=16,c=16,h=1,f="g.svg-child",d=-1,m=-1,g=null,p=null,v=null,y=null,_="img",b="svg-svg";return e(),r(),i.self=function(){return"svg"+(t?"#"+t:"")},i.child=function(){return f},i.childDefs=function(){return"defs"},i.childWidth=function(){return d},i.childHeight=function(){
	return m},i.id=function(){return t},i.classed=function(t){return arguments.length?(b=t,i):b},i.style=function(t){return arguments.length?(g=t,i):g},i.background=function(t){return arguments.length?(p=t,i):p},i.width=function(t){return arguments.length?(a=t,e(),i):a},i.height=function(t){return arguments.length?(o=t,r(),i):a},i.scale=function(t){return arguments.length?(h=t,i):h},i.title=function(t){return arguments.length?(v=t,i):v},i.desc=function(t){return arguments.length?(y=t,i):y},i.role=function(t){return arguments.length?(_=t,i):_},i.margin=function(t){return arguments.length?(void 0!==t.top?(u=t.top,s=t.right,l=t.bottom,c=t.left):(u=t,s=t,l=t,c=t),e(),r(),i):{top:u,right:s,bottom:l,left:c}},i}function Re(t){return t&&"object"==typeof t&&"default"in t?t.default:t}function Be(t,n){return n={exports:{}},t(n,n.exports),n.exports}function We(t){return t<414?"12px":"14px"}function Je(t,e){function r(){var t=function(){return x};if(null==x){var n=Qu.standard;t=function(t,e){return n[e%n.length]}}else"function"==typeof x?t=x:Array.isArray(x)&&(t=function(t,n){return x[n%x.length]});return t}function i(h){var x=h.selection?h.selection():h,w=void 0!==h.selection,k=i.canonicalInset(),N=m;void 0===N&&(N=i.defaultStyle()),x.each(function(){var m=n.select(this),x=l||Math.round(s*as),T=m,S=s,A=x;if(e===!0){var C=u;void 0===C&&(C=ts[o].background);var z=null;t&&(z="svg-"+t);var D=He(z).width(S).height(A).margin(c).scale(M).style(N).background(C),j=m;w===!0&&(j=m.transition(h)),j.call(D),T=m.select(D.self()).select(D.child()),S=D.childWidth(),A=D.childHeight()}var F=T.select(i.self());F.empty()&&(F=T.append("g").attr("class",a).attr("id",t));var P=m.datum()||[],O=F.selectAll("g").data(P);O.exit().remove();var E=O.enter().append("g");E.append("rect"),E.append("text").attr("dominant-baseline","central");var L=F.selectAll("g rect").data(P),U=F.selectAll("g text").data(P).text(function(t){return t}),Y=P.map(function(t){return null==t?0:t.length*v+g+d+f});if("left"===b||"right"===b){var I=F.selectAll("g").data(Y);I=w===!0?I.transition(h):I;var H=-1,R=P.map(function(t){return null==t?H:++H});I.attr("transform",function(t,n){return"translate(0,"+R[n]*(g+f)+")"})}else{var B=[],W=Y.reduce(function(t,n){return B.push(t),t+n},0)-f,J=-W/2,q=F.selectAll("g").data(B);q=w===!0?q.transition(h):q,q.attr("transform",function(t){return"translate("+(J+t)+",0)"})}w===!0&&(F=F.transition(h),L=L.transition(h),U=U.transition(h)),"top"===b?F.attr("transform","translate("+S/2+","+k.top+")"):"left"===b?F.attr("transform","translate("+k.left+","+(A-P.length*(g+f)+f)/2+")"):"right"===b?F.attr("transform","translate("+(S-k.right-g)+","+(A-P.length*(g+f)+f)/2+")"):F.attr("transform","translate("+S/2+","+(A-k.bottom-g)+")");var X=r();L.attr("rx",p).attr("ry",p).attr("width",function(t){return null!=t?g:0}).attr("height",function(t){return null!=t?g:0}).attr("fill",X),U.attr("y",g/2).attr("fill",void 0===_?ts[o].text:_).attr("font-size",void 0===y?rs.fixed.sizeForWidth(S):y),"right"===b?U.attr("x",function(){return-d}).attr("text-anchor","end"):U.attr("x",function(){return g+d}).attr("text-anchor","start")})}var a="chart-legends",o="light",u=void 0,s=is,l=null,c=os,h=us,f=us,d=us,m=void 0,g=ss,p=ls,v=cs,y=void 0,_=void 0,b="bottom",x=null,M=1;return i.self=function(){return"g"+(t?"#"+t:"."+a)},i.id=function(){return t},i.defaultStyle=function(){return rs.fixed.cssImport+"\n                              "+i.self()+" text { \n                                font-family: "+rs.fixed.family+"; \n                                font-weight: "+rs.fixed.weightMonochrome+"; }\n  "},i.childWidth=function(){var t=i.canonicalInset();return t.left+t.right+g},i.childHeight=function(){var t=i.canonicalInset();return t.top+t.bottom+g},i.childInset=function(t){null==t&&(t=0),t="object"!=typeof t?{top:t,left:t,right:t,bottom:t}:{top:t.top,left:t.left,right:t.right,bottom:t.bottom};var n=i.orientation();return"top"===n?t.top=t.top+i.childHeight():"left"===n?t.left=t.left+i.childWidth():"right"===n?t.right=t.right+i.childWidth():t.bottom=t.bottom+i.childHeight(),t},i.canonicalMargin=function(){var t=c;return null==t&&(t=0),t="object"==typeof t?{top:t.top,bottom:t.bottom,left:t.left,right:t.right}:{top:t,bottom:t,left:t,right:t}},i.canonicalInset=function(){var t=h;return null==t&&(t=0),t="object"==typeof t?{top:t.top,bottom:t.bottom,left:t.left,right:t.right}:{top:t,bottom:t,left:t,right:t}},i.classed=function(t){return arguments.length?(a=t,i):a},i.background=function(t){return arguments.length?(u=t,i):u},i.theme=function(t){return arguments.length?(o=t,i):o},i.size=function(t){return arguments.length?(s=t,l=null,i):s},i.width=function(t){return arguments.length?(s=t,i):s},i.height=function(t){return arguments.length?(l=t,i):l},i.scale=function(t){return arguments.length?(M=t,i):M},i.margin=function(t){return arguments.length?(c=t,i):c},i.inset=function(t){return arguments.length?(h=t,i):h},i.style=function(t){return arguments.length?(m=t,i):m},i.padding=function(t){return arguments.length?(f=t,i):f},i.fill=function(t){return arguments.length?(x=t,i):x},i.textPadding=function(t){return arguments.length?(d=t,i):d},i.msize=function(t){return arguments.length?(v=t,i):v},i.legendSize=function(t){return arguments.length?(g=t,i):g},i.radius=function(t){return arguments.length?(p=t,i):p},i.inset=function(t){return arguments.length?(h=t,i):h},i.orientation=function(t){return arguments.length?(b=t,i):b},i.fontSize=function(t){return arguments.length?(y=t,i):y},i.fontFill=function(t){return arguments.length?(_=t,i):_},i}function qe(t){return Je(t,!1)}function Xe(t){var n={};return Object.keys(t).forEach(function(e){var r=e.split("_");r[0]===r[1].toLowerCase()&&(n[r[0]]=t[e]),n[e]=t[e]}),Object.keys(fs).forEach(function(e){n[e]=t[fs[e]]}),n}function Ke(t){var n=t;return null==n?"undefined"!=typeof navigator?(n=navigator.languages,null==n&&(n=[navigator.userLanguage||navigator.language])):n=["en"]:Array.isArray(n)||(n=[n]),n.map(function(t){return t.replace("-","_")})}function Ve(t){for(var n=Ke(t),e=0;e<n.length;++e){var r=n[e],i=_f[r];if(i)return{d3:i,iso639:r.replace("_","-")}}return{d3:yf.en_US,iso639:"en-US"}}function Ge(t){for(var n=Ke(t),e=0;e<n.length;++e){var r=n[e],i=rg[r];if(i)return{d3:i,iso639:r.replace("_","-")}}return{d3:eg.en_US,iso639:"en-US"}}function $e(){for(var t,n=arguments,e=0,r=arguments.length,i={};e<r;++e){if(!(t=n[e]+"")||t in i)throw new Error("illegal type: "+t);i[t]=[]}return new Ze(i)}function Ze(t){this._=t}function Qe(t,n){return t.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}})}function tr(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function nr(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=ig,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}function er(){return fg||(gg(rr),fg=mg.now()+dg)}function rr(){fg=0}function ir(){this._call=this._time=this._next=null}function ar(t,n,e){var r=new ir;return r.restart(t,n,e),r}function or(){er(),++ug;for(var t,n=ag;n;)(t=fg-n._time)>=0&&n._call.call(null,t),n=n._next;--ug}function ur(){fg=(hg=mg.now())+dg,ug=sg=0;try{or()}finally{ug=0,lr(),fg=0}}function sr(){var t=mg.now(),n=t-hg;n>cg&&(dg-=n,hg=t)}function lr(){for(var t,n,e=ag,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:ag=n);og=t,cr(r)}function cr(t){if(!ug){sg&&(sg=clearTimeout(sg));var n=t-fg;n>24?(t<1/0&&(sg=setTimeout(ur,n)),lg&&(lg=clearInterval(lg))):(lg||(lg=setInterval(sr,cg)),ug=1,gg(ur))}}function hr(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>_g)throw new Error("too late");return e}function fr(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>xg)throw new Error("too late");return e}function dr(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("too late");return e}function mr(t,n,e){function r(t){e.state=bg,e.timer.restart(i,e.delay,e.time),e.delay<=t&&i(t-e.delay)}function i(r){var l,c,h,f;if(e.state!==bg)return o();for(l in s)if(f=s[l],f.name===e.name){if(f.state===Mg)return pg(i);f.state===wg?(f.state=Ng,f.timer.stop(),f.on.call("interrupt",t,t.__data__,f.index,f.group),delete s[l]):+l<n&&(f.state=Ng,f.timer.stop(),delete s[l])}if(pg(function(){e.state===Mg&&(e.state=wg,e.timer.restart(a,e.delay,e.time),a(r))}),e.state=xg,e.on.call("start",t,t.__data__,e.index,e.group),e.state===xg){for(e.state=Mg,u=new Array(h=e.tween.length),l=0,c=-1;l<h;++l)(f=e.tween[l].value.call(t,t.__data__,e.index,e.group))&&(u[++c]=f);u.length=c+1}}function a(n){for(var r=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(o),e.state=kg,1),i=-1,a=u.length;++i<a;)u[i].call(null,r);e.state===kg&&(e.on.call("end",t,t.__data__,e.index,e.group),o())}function o(){e.state=Ng,e.timer.stop(),delete s[n];for(var r in s)return;delete t.__transition}var u,s=t.__transition;s[n]=e,e.timer=ar(r,0,e.time)}function gr(t,n){var e,r;return function(){var i=fr(this,t),a=i.tween;if(a!==e){r=e=a;for(var o=0,u=r.length;o<u;++o)if(r[o].name===n){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function pr(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var a=fr(this,t),o=a.tween;if(o!==r){i=(r=o).slice();for(var u={name:n,value:e},s=0,l=i.length;s<l;++s)if(i[s].name===n){i[s]=u;break}s===l&&i.push(u)}a.tween=i}}function vr(t,n,e){var r=t._id;return t.each(function(){var t=fr(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return dr(t,r).value[n]}}function yr(t){return function(){this.removeAttribute(t)}}function _r(t){return function(){this.removeAttributeNS(t.space,t.local)}}function br(t,n,e){var r,i;return function(){var a=this.getAttribute(t);return a===e?null:a===r?i:i=n(r=a,e)}}function xr(t,n,e){var r,i;return function(){var a=this.getAttributeNS(t.space,t.local);return a===e?null:a===r?i:i=n(r=a,e)}}function Mr(t,n,e){var r,i,a;return function(){var o,u=e(this);return null==u?void this.removeAttribute(t):(o=this.getAttribute(t),o===u?null:o===r&&u===i?a:a=n(r=o,i=u))}}function wr(t,n,e){var r,i,a;return function(){var o,u=e(this);return null==u?void this.removeAttributeNS(t.space,t.local):(o=this.getAttributeNS(t.space,t.local),o===u?null:o===r&&u===i?a:a=n(r=o,i=u))}}function kr(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}function Nr(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e}function Tr(t,n){return function(){hr(this,t).delay=+n.apply(this,arguments)}}function Sr(t,n){return n=+n,function(){hr(this,t).delay=n}}function Ar(t,n){return function(){fr(this,t).duration=+n.apply(this,arguments)}}function Cr(t,n){return n=+n,function(){fr(this,t).duration=n}}function zr(t,n){if("function"!=typeof n)throw new Error;return function(){fr(this,t).ease=n}}function Dr(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}function jr(t,n,e){var r,i,a=Dr(n)?hr:fr;return function(){var o=a(this,t),u=o.on;u!==r&&(i=(r=u).copy()).on(n,e),o.on=i}}function Fr(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function Pr(t,e){var r,i,a;return function(){var o=n.window(this).getComputedStyle(this,null),u=o.getPropertyValue(t),s=(this.style.removeProperty(t),o.getPropertyValue(t));return u===s?null:u===r&&s===i?a:a=e(r=u,i=s)}}function Or(t){return function(){this.style.removeProperty(t)}}function Er(t,e,r){var i,a;return function(){var o=n.window(this).getComputedStyle(this,null).getPropertyValue(t);return o===r?null:o===i?a:a=e(i=o,r)}}function Lr(t,e,r){var i,a,o;return function(){var u=n.window(this).getComputedStyle(this,null),s=u.getPropertyValue(t),l=r(this);return null==l&&(this.style.removeProperty(t),l=u.getPropertyValue(t)),s===l?null:s===i&&l===a?o:o=e(i=s,a=l)}}function Ur(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}function Yr(t){return function(){this.textContent=t}}function Ir(t){return function(){var n=t(this);this.textContent=null==n?"":n}}function Hr(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function Rr(t){return n.selection().transition(t)}function Br(){return++Kg}function Wr(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}function Jr(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return np.time=er(),np;return e}function qr(t){function n(o){var l=o.selection?o.selection():o,c=l.select("defs");c.empty()&&(c=l.append("defs"));var h=t+"-inner",f=c.select("#"+h);f.empty()&&(f=c.append("pattern").attr("id",h).attr("x",0).attr("y",0).attr("patternUnits","userSpaceOnUse"),f.append("rect")),f.attr("width",e).attr("height",e).attr("patternTransform","rotate("+r+")"),f.select("rect").attr("x",a).attr("y",a).attr("width",i).attr("height",i).attr("fill",s);var d=c.select(n.self());d.empty()&&(d=c.append("pattern").attr("id",t).attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("patternUnits","objectBoundingBox"),d.append("rect").attr("class","pattern-background").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%"),d.append("rect").attr("class","pattern-foreground").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("fill","url(#"+h+")")),d.select("rect.pattern-background").attr("fill",u)}var e=8,r=45,i=5,a=(e-i)/2,o=2*Math.sqrt(e),u="transparent",s=sp.light.highlight;return null==t&&(t="pattern-diagonals-"+lp,lp++),n.id=function(){return t},n.self=function(){return"#"+t},n.size=function(){return o},n.align=function(t){return Math.round(o*Math.ceil(t/o))},n.url=function(){return"url(#"+t+")"},n.css=function(){return"fill: "+n.url()+";"},n.foreground=function(t){return arguments.length?(s=t,n):s},n.background=function(t){return arguments.length?(u=t,n):u},n}function Xr(t){return t<414?"12px":"14px"}function Kr(t){function e(){var e=n.select("div"+(t?"#"+t:"."+w));return e.empty()&&(e=n.select(document.createElement("div"))),e.attr("id",t).attr("class",w).style("position","absolute").style("top",0).style("left",0).style("opacity",0).style("pointer-events","none").style("box-sizing","border-box"),e.node()}function r(t){if(t=t.node())return"svg"===t.tagName.toLowerCase()?t:t.ownerSVGElement}function i(){return null===k&&(k=e(),S.appendChild(k)),n.select(k)}function a(e){S||document.body.appendChild(k);var i=r(e);if(i){null!=i.createSVGPoint&&(N=i.createSVGPoint()),i=n.select(i);var o=i.select("defs");o.empty()&&(o=i.append("defs"));var u=z;void 0===u&&(u=a.defaultStyle(A,mp));var s=o.selectAll("style"+(t?"#style-tip-"+t:".style-"+w)).data(u?[u]:[]);s.exit().remove(),s=s.enter().append("style").attr("type","text/css").attr("id",t?"style-tip-"+t:null).attr("class",t?null:"style-"+w).merge(s),s.text(function(t){return t})}}function o(){var t=m();return{top:t.n.y-k.offsetHeight,left:t.n.x-k.offsetWidth/2}}function u(){var t=m();return{top:t.s.y,left:t.s.x-k.offsetWidth/2}}function s(){var t=m();return{top:t.e.y-k.offsetHeight/2,left:t.e.x}}function l(){var t=m();return{top:t.w.y-k.offsetHeight/2,left:t.w.x-k.offsetWidth}}function c(){var t=m();return{top:t.nw.y-k.offsetHeight,left:t.nw.x-k.offsetWidth}}function h(){var t=m();return{top:t.ne.y-k.offsetHeight,left:t.ne.x}}function f(){var t=m();return{top:t.sw.y,left:t.sw.x-k.offsetWidth}}function d(){var t=m();return{top:t.se.y,left:t.se.x}}function m(){for(var t=T||n.event.target;"undefined"==typeof t.getScreenCTM&&"undefined"===t.parentNode;)t=t.parentNode;var e={},r=t.getScreenCTM(),i=t.getBBox(),a=i.width,o=i.height,u=i.x,s=i.y;return N.x=u,N.y=s,e.nw=N.matrixTransform(r),N.x+=a,e.ne=N.matrixTransform(r),N.y+=o,e.se=N.matrixTransform(r),N.x-=a,e.sw=N.matrixTransform(r),N.y-=o/2,e.w=N.matrixTransform(r),N.x+=a,e.e=N.matrixTransform(r),N.x-=a/2,N.y-=o/2,e.n=N.matrixTransform(r),N.y+=o,e.s=N.matrixTransform(r),e}var g=function(t){return"function"==typeof t?t:function(){return t}},p=function(){return"n"},v=function(){return[0,0]},y=function(){return" "},_=function(t){return t instanceof Node};Rr();var b=p,x=v,M=y,w="d3-tip",k=e(),N=null,T=null,S=null,A="light",C=!1,z=void 0;a.self=function(){return"div"+(t?"#"+t:"."+w)},a.id=function(){return t},a.classed=function(t){return arguments.length?(w=t,a):w},a.show=function(){S||a.parent(document.body);var t=[].slice.call(arguments);T=this;var n=!1;1===t.length&&_(t[0])&&(T=t[0],t[0]=T.__data__,n=!0);var e=M.apply(T,t);if(null==e)return a;for(var r=x.apply(T,t),o=b.apply(T,t),u=i(),s=j.length,l=k.offsetParent.getBoundingClientRect();s--;)u.classed(j[s],!1);u.classed(o,!0).html(e);var c=D[o].apply(T);return u.style("top",c.top+r[0]-l.top+"px").style("left",c.left+r[1]-l.left+"px"),n&&window.addEventListener("load",function(){c=D[o].apply(T),u.style("top",c.top+r[0]-l.top+"px").style("left",c.left+r[1]-l.left+"px")}),null!=C&&C!==!1&&(u=u.transition(),"number"==typeof C&&(u=u.duration(C))),u.style("opacity",1),a},a.hide=function(){var t=i();return t.interrupt(),t.style("opacity",0),a},a.attr=function(t){if(arguments.length<2&&"string"==typeof t)return i().attr(t);var e=[].slice.call(arguments);return n.selection.prototype.attr.apply(i(),e),a},a.direction=function(t){return arguments.length?(b=null==t?t:g(t),a):b},a.offset=function(t){return arguments.length?(x=null==t?t:g(t),a):x},a.html=function(t){return arguments.length?(M=null==t?t:g(t),a):M},a.destroy=function(){return k&&(i().remove(),k=null),a},a.style=function(t){return arguments.length?(z=t,a):z},a.transition=function(t){return arguments.length?(C=t,a):C},a.theme=function(t){return arguments.length?(A=t,a):A},a.parent=function(t){if(!arguments.length)return S;S=t||document.body,S.appendChild(k);var e=n.select(k.offsetParent);return"static"===e.style("position")&&e.style("position","relative"),a},a.defaultStyle=function(t,n){return"\n                  "+dp.fixed.cssImport+"  \n                  "+a.self()+" {\n                                    line-height: 1;\n                                    font-family: "+dp.fixed.family+";\n                                    color: "+sp[t].negative.text+";\n                                    font-weight: "+dp.fixed.weightMonochrome+";  \n                                    font-size: "+dp.fixed.sizeForWidth(n)+";  \n                                    padding: 8px;\n                                    background: "+sp[t].negative.background+";\n                                    border-radius: 2px;\n                                    pointer-events: none;\n                                  }\n                    /* Creates a small triangle extender for the tooltip */\n                    "+a.self()+":after {\n                                      box-sizing: border-box;\n                                      display: inline;\n                                      width: 100%;\n                                      line-height: 1;\n                                      color: "+sp[t].negative.background+";\n                                      font-size: "+dp.fixed.sizeForWidth(1)+";  \n                                      position: absolute;\n                                      pointer-events: none;\n                                    }\n                    /* Northward tooltips */\n                    "+a.self()+'.n:after {\n                                      content: "\\25bc";\n                                      margin: -3px 0 0 0;\n                                      top: 100%;\n                                      left: 0;\n                                      text-align: center;\n                                    }\n                    /* Eastward tooltips */\n                    '+a.self()+'.e:after {\n                                      content: "\\25C0";\n                                      margin: -7px 0 0 0;\n                                      top: 50%;\n                                      left: -7px;\n                                    }\n                    /* Southward tooltips */\n                    '+a.self()+'.s:after {\n                                      content: "\\25B2";\n                                      margin: 0 0 1px 0;\n                                      top: -10px;\n                                      left: 0;\n                                      text-align: center;\n                                    }\n                    /* Westward tooltips */\n                    '+a.self()+'.w:after {\n                                      content: "\\25B6";\n                                      margin: -7px 0 0 0;\n                                      top: 50%;\n                                      left: 100%;\n                                    }                \n                '};var D={n:o,s:u,e:s,w:l,nw:c,ne:h,sw:f,se:d},j=Object.keys(D);return a}function Vr(t,n){t=t||{};var e=null,r=Yo,i=Zo,a=Qo,o=tu,u=nu,s=su,l=lu;return t.localtime===!0&&(r=Yo,i=Io,a=Ho,o=Ro,u=Bo,s=Go,l=$o),function(c){return null==e&&(n=n||hu,e={},[["millisecond",".%L"],["second",":%S"],["minute","%I:%M"],["hour","%I %p"],["day","%a %d"],["week","%b %d"],["month","%B"],["year","%Y"]].forEach(function(r){var i=t[r[0]];null==i?e[r[0]]=n(r[1]):"function"==typeof i?e[r[0]]=i:e[r[0]]=n(i)})),(r(c)<c?e.millisecond:i(c)<c?e.second:a(c)<c?e.minute:o(c)<c?e.hour:s(c)<c?u(c)<c?e.day:e.week:l(c)<c?e.month:e.year)(c)}}function Gr(t){function e(t){for(var n=ea(t,function(t){return t[1].length}),e=[],r=function(n){var r=t.map(function(t){return 0===n?[t[0],Array.isArray(t[1])?t[1][n]:t[1]]:Array.isArray(t[1])&&t[1].length>n?[t[0],t[1][n]]:null});e.push(r.filter(function(t){return null!==t}))},i=0;i<n;++i)r(i);return e}function r(t){return null==t?[]:Array.isArray(t)?t:[t]}function i(t){return function(n){return null==n?null:"string"==typeof n?t[n]:n}}function a(){var t=function(){return et};if(null==et){var n=up.standard;t=function(t,e){return n[e%n.length]}}else"function"==typeof et?t=et:Array.isArray(et)&&(t=function(t,n){return et[n%et.length]});return t}function o(r){var i=r.selection?r.selection():r,q=void 0!==r.selection,X=Ge(E).d3;Ut(X);var et=Ve(E).d3;Vn(et);var ut=F,lt=P,dt=O;null!==L&&L!==!1?(null==ut&&(ut=1),null==lt&&(lt=!0),null==dt&&(dt=!1)):(null==ut&&(ut=sp[s].fillOpacity),null==lt&&(lt=!0),null==dt&&(dt=!0));var vt=l;void 0===vt&&(vt=sp[s].background),i.each(function(){function i(t,n){return function(e,r){var i=n(r);null==t&&(t=1);var a=It().domain([0,1]).range([t,e.length+1]);return function(t){if(0==e.length)return"";var n=Math.floor(a(t)),r=a(t)-n,o=e.slice(0,n);if(n>0&&n<e.length){var u=e[n][1][0]*r+e[n-1][1][0]*(1-r),s=e[n][1][1]*r+e[n-1][1][1]*(1-r),l=e[n][0]*r+e[n-1][0]*(1-r);o.push([l,[u,s]])}return i(o)}}}function l(t,n){return function(t,e){var r=n(e);return function(n){var e=t.length-1;if(e<0)return"";var i=t.slice(0,e),a=t[e][1][0]*n,o=t[e][1][1]*n;return i.push([t[e][0],[a,o]]),r(i)}}}function F(t){return Array.isArray(t)?{l:t.map(Cn).join(","),v:t}:"object"==typeof t?Array.isArray(t.v)?{l:t.l,v:t.v,c:"supplied"}:{l:t.l,v:[t.v],c:"supplied"}:{l:Cn(t),v:[t]}}var P=n.select(this),O=h||Math.round(c*xp),E=null;t&&(E="svg-"+t);var yt=He(E).width(c).height(O).margin(f).scale(m).background(vt),_t=P;q===!0&&(_t=P.transition(r)),_t.call(yt);var bt=P.select(yt.self()),xt="highlight-fill";t&&(xt=xt+"-"+t);var Mt=qr(xt);bt.call(Mt);var wt=bt.select(yt.child()),kt=b;null==kt?(kt={top:0,bottom:wp+Cp,left:0,right:0},"left"===J?kt.left=wp:kt.right=wp):kt="object"==typeof kt?{top:kt.top,bottom:kt.bottom,left:kt.left,right:kt.right}:{top:kt,bottom:kt,left:kt,right:kt};var Nt=null!=t?"clip-"+t:"clip",Tt=wt.select(o.self());Tt.empty()&&(Tt=wt.append("g").attr("class",u).attr("id",t),Tt.append("g").attr("class","axis-v-minor axis"),Tt.append("g").attr("class","axis-v axis"),Tt.append("g").attr("class","axis-i-minor axis"),Tt.append("g").attr("class","axis-i axis"),Tt.append("g").attr("class","legend"),Tt.append("g").attr("class","lines"),Tt.append("g").attr("class","highlight-v highlight"),Tt.append("g").attr("class","highlight-i highlight"),Tt.append("g").attr("class","voronoi"),Tt.append("clipPath").attr("id",Nt).append("rect")),Tt.selectAll("circle.tip").remove();var St=Tt.datum()||[];if(Array.isArray(St)||(St=[St]),St.length>0)if(null!==L&&L!==!1){var At=Li();if(L===!0){var Ct=ea(St,function(t){return t.v.length});At.keys(Array.from(Array(Ct).keys())).value(function(t,n){return null!=t.v[n]?t.v[n]:0})}else At.keys(L);var zt=gt(Y);null!=zt&&At.order(zt);var Dt=mt(I);null!=Dt&&At.offset(Dt),St=At(St).map(function(t){return t.map(function(t){return[t.data.l,t]})})}else St=Array.isArray(St[0])?St.map(function(t){return t.map(function(t,n){return st(t,n,!0)})}).map(function(t){return t.map(function(t){return[t[0],[0,t[1]]]})}):e(St.map(function(t,n){return st(t,n,!1)})).map(function(t){return t.map(function(t){return[t[0],[0,t[1]]]})});var jt=function(t){var n=[];return n=Array.isArray(t)?St.map(function(n,e){return e<t.length&&t[e]===!0?null==G?n:n.slice(0,G):[]}):St.map(function(n){return t===!0?null==G?n:n.slice(0,G):[]})},Ft=jt(lt),Pt=jt(dt),Ot=St.map(function(t,n){return Array.isArray(it)?n<it.length?ht(it[n]):null:ht(it)});Tt.datum(St);var Et=p;null==Et&&(Et=ra(St,function(t){return ra(t,function(t){return ra(t[1])})}),Et>0&&(Et=0===g?0:1));var Lt=v;null==Lt&&(Lt=ea(St,function(t){return ea(t,function(t){return ea(t[1])})}));var Ut=y;null==Ut&&(Ut=ra(St,function(t){return ra(t,function(t){return t[0]})})),null==Ut&&(Ut=0);var Yt=_;null==Yt&&(Yt=ea(St,function(t){return ea(t,function(t){return t[0]})})),null==Yt&&(Yt=Sp);var Ht=yt.childWidth(),Rt=yt.childHeight(),Bt=a(),Wt=null;if(nt.length>0&&"voronoi"!==Z){var Jt=null;t&&(Jt="legend-"+t),Wt=qe(Jt).width(Ht).height(Rt).style(null).margin(0).inset(0).fill(Bt).theme(s).orientation(Z),kt=Wt.childInset(kt),wt.datum(nt).call(Wt)}var qt=void 0!==f.top?f.top:f;Tt.select("#"+Nt).select("rect").attr("x",kt.left).attr("y",-(kt.top+qt)).attr("width",Ht-kt.right-kt.left).attr("height",Rt-kt.bottom+kt.top+qt);var Kt=It();g>0&&(Kt=Xt().base(g));var Vt=Kt.domain([Et,Lt]).range([Rt-kt.bottom,kt.top]);C===!0&&(Vt=Vt.nice());var Gt=It();null!=rt&&(Gt=Su());var $t=[Ut,Yt],Zt=Gt.domain($t).range([kt.left,Ht-kt.right]);z===!0&&(Zt=Zt.nice());var Qt=x;g>0&&null==Qt&&(Qt=".0r");var nn="left"===J?se:oe,en=nn(Vt).tickPadding(tt).ticks(N,null==Qt?Vt.tickFormat(N):Qt);D===!0?en.tickSizeInner(kt.left+kt.right-Ht):en.tickSizeInner(Cp),w&&en.tickFormat(w);var rn=null;null!==S&&(rn=nn(Vt).ticks(S).tickSizeInner(zp).tickFormat(function(){}));var an="left"===J?kt.left:Ht-kt.right,on=Tt.select("g.axis-v").attr("transform","translate("+an+",0)"),un=Tt.select("g.axis-v-minor").attr("transform","translate("+an+",0)"),sn=ue(Zt).tickPadding(Q);if(null!=rt){var ln=pt(T);null!=ln&&(sn=sn.tickArguments(ln)),"function"==typeof rt?sn.tickFormat(rt):"multi"===rt?sn.tickFormat(Vr()):sn.tickFormat(hu(rt))}else sn=sn.ticks(T,null==M?Zt.tickFormat(T):M);j===!0?sn.tickSizeInner(kt.top+kt.bottom-Rt):sn.tickSizeInner(Cp),null!=k&&sn.tickFormat(k);var cn=null;if(null!==A){var hn=[A];null!=rt&&(hn=pt(A)),cn=ue(Zt).tickArguments(hn).tickSizeInner(zp).tickFormat(function(){})}var fn=Tt.select("g.axis-i").attr("transform","translate(0,"+(Rt-kt.bottom)+")"),dn=Tt.select("g.axis-i-minor").attr("transform","translate(0,"+(Rt-kt.bottom)+")");q===!0&&B===!0&&(un=un.transition(r),dn=dn.transition(r),on=on.transition(r),fn=fn.transition(r)),null!==cn?dn.call(cn):dn.selectAll("*").remove(),null!==rn?un.call(rn):un.selectAll("*").remove(),on.call(en).selectAll("line").attr("class",function(t,n){return D?0===n?"grid first":"grid":null}),fn.call(sn).selectAll("line").attr("class",function(t,n){return j?0===n?"grid first":"grid":null});var mn=ui().x(function(t){return Zt(t[0])}).y(function(t){return Vt(t[1][1])}),gn=si().x(function(t){return Zt(t[0])}).y0(function(t){return Vt(t[1][0])}).y1(function(t){return Vt(t[1][1])}),pn=at.map(ft).map(function(t){return null!=t?Si().type(t).size(ot):null}),vn=St.map(function(t,n){return n<pn.length?pn[n]:null}).map(function(t){return null!==t?t:null}),yn=Tt.select("g.lines"),_n=yn.selectAll("g.line").data(St);_n.exit().remove();var bn=_n.enter().append("g").attr("class","line");bn.append("path").attr("class","area").attr("stroke","none"),bn.append("path").attr("class","stroke").attr("fill","none"),bn.append("g").attr("class","symbols"),_n=_n.merge(bn);var xn=yn.selectAll("path.area").data(Ft),Mn=yn.selectAll("path.stroke").data(Pt);xn.attr("clip-path","url(#"+Nt+")"),Mn.attr("clip-path","url(#"+Nt+")"),q===!0&&(xn=xn.transition(r),Mn=Mn.transition(r)),xn.attr("opacity",ut).attr("fill",function(t,n){return Bt(t,n,"area")}),Mn.attr("stroke",function(t,n){return Bt(t,n,"stroke")});var wn=null;q===!0&&("reveal"===K?wn=i:"value"===K&&(wn=l)),null!==wn?(xn.attrTween("d",wn($,function(t){return null!=Ot[t]?gn.curve(Ot[t]):gn})),Mn.attrTween("d",wn($,function(t){return null!=Ot[t]?mn.curve(Ot[t]):mn}))):(xn.attr("d",function(t,n){return null!=Ot[n]?gn.curve(Ot[n])(t,n):gn(t,n)}),Mn.attr("d",function(t,n){return null!=Ot[n]?mn.curve(Ot[n])(t,n):mn(t,n)}));var kn=_n.select("g.symbols").selectAll("path").data(function(t,n){return null!=vn[n]?t.map(function(t){return{v:t,i:n}}):[]});kn.exit().remove(),kn=kn.enter().append("path").merge(kn),kn.attr("transform",function(t){return"translate("+Zt(t.v[0])+","+Vt(t.v[1][1])+")"}).attr("d",function(t){return vn[t.i](t.v,t.i)}).attr("fill",function(t){return Bt(t.v,t.i,"symbol")}).attr("stroke","none");var Nn=St.reduce(function(t,n,e){return t.concat(n.map(function(t,n){return[t[0],t[1][1],e,n,t[1][1]-t[1][0]]}))},[]),Tn=qu().x(function(t){return Zt(t[0])}).y(function(t){return Vt(t[1])}).extent([[kt.left,kt.top],[Ht-kt.right,Rt-kt.bottom]]).polygons(Nn),Sn=Tt.select("g.voronoi").selectAll("path").data(Tn);Sn.exit().remove(),Sn=Sn.enter().append("path").attr("fill","none").attr("pointer-events","all").merge(Sn),Sn.attr("d",function(t){return null!=t?"M"+t.join("L")+"Z":""}).attr("class",function(t){return null!=t?"series-"+t.data[2]:null});var An=V,Cn=function(t){return t};if(null!=rt)if("function"==typeof rt)Cn=rt;else if("multi"===rt){var zn=tn(et).format;Cn=Vr(!1,zn)}else{var Dn=tn(et);Cn=Dn.format(rt)}else"function"==typeof M?Cn=M:null!=M&&(Cn=No(X).format(M));var jn=null;null!=Qt&&(jn="function"==typeof Qt?Qt:No(X).format(Qt)),null==An&&(An=function(t,n,e){var r=st(t),i=r[0],a=0;return a=L===!0?r[1][e]:r[1],null!=Cn&&(i=Cn(i)),null!=jn&&(a=jn(a)),i+", "+a});var Fn=d;void 0===Fn&&(Fn=[o,Wt,ct].filter(function(t){return null!=t}).reduce(function(t,n){return t+n.defaultStyle(s,Ht)},"")),ct.html(An),wt.call(ct);var Pn=bt.select("defs");Pn.empty()&&(Pn=bt.append("defs"));var On=Pn.selectAll("style"+(t?"#style-lines-"+t:".style-"+u)).data(Fn?[Fn]:[]);On.exit().remove(),On=On.enter().append("style").attr("type","text/css").attr("id",t?"style-lines-"+t:null).attr("class",t?null:"style-"+u).merge(On),On.text(function(t){return t}),Sn.on("click",function(t){var n=t.data[2],e=t.data[3],r=St[n][e];if(L===!0)for(;!(null!=r&&r[1][1]-r[1][0]!==0||(n-=1,n<0));)r=St[n][e];var i=r[1].data;void 0!==i&&(r=i),U&&U(r)}),Sn.on("mouseover",function(t){var n=t.data[2],e=t.data[3],r=St[n][e],i=0;if(L===!0){for(;!(null!=r&&r[1][1]-r[1][0]!==0||(n-=1,n<0));)r=St[n][e];i=Vt(r[1][1])}else r=[t.data[0],t.data[1]],i=Vt(r[1]);var a=Zt(r[0]),o=r[1].data;void 0!==o&&(r=o),Tt.append("circle").attr("r",Dp).attr("class","tip outline").attr("cx",a).attr("cy",i).attr("pointer-events","none").attr("fill",sp[s].axis);var u=Tt.append("circle").attr("r",Dp-cp.outline).attr("class","tip fill").attr("cx",a).attr("cy",i).attr("pointer-events","none").attr("fill",Bt(r,n));ct.show.apply(u.node(),[r,e,n])}),wt.on("mouseout",function(){Tt.selectAll("circle.tip").remove(),ct.hide.apply(this)}),ct.hide();var En=[];if("voronoi"===Z){
	var Ln=(Zt.range()[1]-Zt.range()[0])/2,Un=Math.PI/2,Yn=function(t,n){var e=Ku(t),r=Math.cos(Un*Math.abs(Ln-e[0])/Ln);return{a:Xu(t)*r,s:t.data[2],i:n,c:e}},In=function(t,n){var e=Math.atan2(t[1]-n[1],t[0]-n[0]),r=t[0]-n[0],i=t[1]-n[1],a=Math.sqrt(r*r+i*i);return[t[0]-H*a*Math.cos(e),t[1]-H*a*Math.sin(e)]},Hn=Tn.map(Yn),Rn=aa().key(function(t){return null!=t?t.s:""}).sortValues(function(t,n){return Vi(t.a,n.a)}).entries(Hn).filter(function(t){return""!==t.key}).map(function(t){for(var n=0;n<t.values.length;n++){var e=t.values[n];if(null!=e)return e.i}return 0});En=Rn.map(function(t){return In(Hn[t].c,[Zt(Nn[t][0]),Vt(Nn[t][1])])})}var Bn=Tt.select("g.voronoi").selectAll("text").data(En);Bn.exit().remove(),Bn=Bn.enter().append("text").attr("text-anchor","middle").attr("dominant-baseline","central").merge(Bn),q===!0&&W===!0&&(Bn=Bn.transition(r)),Bn.attr("x",function(t){return t[0]}).attr("y",function(t){return t[1]}).attr("fill",function(t,n){return Bt(t,n,"legend")}).attr("font-weight",dp.variable.weightColor).text(function(t,n){return n<nt.length?nt[n]:""});var Wn=R.map(F),Jn=Tt.select("g.highlight-v").selectAll("rect").data(Wn);Jn.exit().remove(),Jn=Jn.enter().append("rect").merge(Jn);var qn=Tt.select("g.highlight-v").selectAll("text").data(Wn);qn.exit().remove(),qn=qn.enter().append("text").attr("dominant-baseline","text-after-edge").merge(qn),qn.attr("text-anchor","middle").attr("class",function(t){return t.c}),q===!0&&(Jn=Jn.transition(r),qn=qn.transition(r)),Jn.attr("y",kt.top).attr("height",Rt-kt.bottom-kt.top).attr("x",function(t){return Math.round(Zt(t.v[0])-Mt.size()/2)}).attr("width",function(t){var n=1;return null!=t.v[1]&&(n=Zt(t.v[1])-Zt(t.v[0])),Mt.align(n)}).attr("fill",Mt.url()),qn.attr("x",function(t){return null==t.v[1]?Zt(t.v[0])+Fp:Fp+Zt(t.v[0])+(Zt(t.v[1])-Zt(t.v[0]))/2}).attr("y",kt.top).text(function(t){return t.l}),$=G})}var u="chart-lines",s="light",l=void 0,c=bp,h=null,f=Mp,d=void 0,m=1,g=0,p=null,v=null,y=null,_=null,b=null,x=null,M=null,w=null,k=null,N=Np,T=kp,S=null,A=null,C=!0,z=!0,D=!0,j=!1,F=null,P=null,O=null,E=null,L=null,U=null,Y=Ei,I=Oi,H=.33,R=[],B=!0,W=!0,J="left",q=!0,X=!1,K=null,V=null,G=null,$=null,Z="bottom",Q=Ap,tt=Ap,nt=[],et=null,rt=null,it=Di.alpha(0),at=[],ot=Tp,ut=-1,st=function(t,n,e){return Array.isArray(t)?t:("object"==typeof t&&(n=void 0===t.l?n:t.l,t=t.v),[n,e===!0||Array.isArray(t)?t:[t]])},lt=null;t&&(lt="tip-"+t);var ct=Kr(lt).offset([-Dp-jp,0]).style(null),ht=i(pp),ft=i(vp),dt=i(gp),mt=i(yp),gt=i(_p),pt=function(t){var n=dt(t);return null==n?[]:Array.isArray(n)?n:[t]};return o.self=function(){return"g"+(t?"#"+t:"."+u)},o.id=function(){return t},o.defaultStyle=function(t,n){return"\n                  "+dp.fixed.cssImport+"\n                  "+dp.variable.cssImport+"  \n                  "+o.self()+" .axis line, \n                  "+o.self()+" .axis path { \n                                              shape-rendering: crispEdges; \n                                              stroke-width: "+cp.axis+"; \n                                              stroke: none;\n                                            }\n\n                  "+o.self()+" g.axis-v line, \n                  "+o.self()+" g.axis-v path { \n                                              stroke: "+(X===!0?sp[t].axis:"none")+"; \n                                            }\n                                            \n                  "+o.self()+" g.axis-i line, \n                  "+o.self()+" g.axis-i path { \n                                              stroke: "+(q===!0?sp[t].axis:"none")+"; \n                                            }\n\n                  "+o.self()+" g.axis-v-minor line,\n                  "+o.self()+" g.axis-i-minor line { \n                                              stroke: "+sp[t].axis+"; \n                                            }\n                                              \n                  "+o.self()+" text { \n                                        font-family: "+dp.variable.family+";\n                                        font-size: "+dp.variable.sizeForWidth(n)+";                \n                                      }\n                   \n                  "+o.self()+" path.stroke { stroke-width: "+cp.data+" }\n                  \n                  "+o.self()+" g.axis-v line.grid,\n                  "+o.self()+" g.axis-i line.grid { \n                                             stroke-width: "+cp.grid+"; \n                                             stroke-dasharray: "+hp.grid+";\n                                             stroke: "+sp[t].grid+";\n                                            }\n\n                  "+o.self()+" g.axis-i g.tick line.grid.first,                  \n                  "+o.self()+" g.axis-v g.tick line.grid.first {\n                                              stroke: none;\n                                            }\n                                            \n                  "+o.self()+" .axis text, \n                  "+o.self()+" g.highlight text { \n                                    font-family: "+dp.fixed.family+";\n                                    font-size: "+dp.fixed.sizeForWidth(n)+";                \n                                    font-weight: "+dp.fixed.weightMonochrome+";  \n                                    fill: "+sp[t].text+"\n                                  }\n                "},o.classed=function(t){return arguments.length?(u=t,o):u},o.background=function(t){return arguments.length?(l=t,o):l},o.theme=function(t){return arguments.length?(s=t,o):s},o.size=function(t){return arguments.length?(c=t,h=null,o):c},o.width=function(t){return arguments.length?(c=t,o):c},o.height=function(t){return arguments.length?(h=t,o):h},o.scale=function(t){return arguments.length?(m=t,o):m},o.margin=function(t){return arguments.length?(f=t,o):f},o.logValue=function(t){return arguments.length?(g=t,o):g},o.minValue=function(t){return arguments.length?(p=t,o):p},o.maxValue=function(t){return arguments.length?(v=t,o):v},o.minIndex=function(t){return arguments.length?(y=t,o):y},o.maxIndex=function(t){return arguments.length?(_=t,o):_},o.inset=function(t){return arguments.length?(b=t,o):b},o.tickFormatValue=function(t){return arguments.length?(x=t,o):x},o.tickFormatIndex=function(t){return arguments.length?(M=t,o):M},o.tickDisplayValue=function(t){return arguments.length?(w=t,o):w},o.tickDisplayIndex=function(t){return arguments.length?(k=t,o):k},o.tickCountValue=function(t){return arguments.length?(N=t,o):N},o.tickCountIndex=function(t){return arguments.length?(T=t,o):T},o.tickMinorValue=function(t){return arguments.length?(S=t,o):S},o.tickMinorIndex=function(t){return arguments.length?(A=t,o):A},o.style=function(t){return arguments.length?(d=t,o):d},o.value=function(t){return arguments.length?(st=t,o):st},o.language=function(t){return arguments.length?(E=t,o):E},o.legend=function(t){return arguments.length?(nt=r(t),o):nt},o.labelTime=function(t){return arguments.length?(rt=t,o):rt},o.displayTip=function(t){return arguments.length?(ut=t,o):ut},o.gridValue=function(t){return arguments.length?(D=t,o):D},o.gridIndex=function(t){return arguments.length?(j=t,o):j},o.niceValue=function(t){return arguments.length?(C=t,o):C},o.niceIndex=function(t){return arguments.length?(z=t,o):z},o.curve=function(t){return arguments.length?(it=t,o):it},o.symbol=function(t){return arguments.length?(at=r(t),o):at},o.symbolSize=function(t){return arguments.length?(ot=t,o):ot},o.stacked=function(t){return arguments.length?(L=t,o):L},o.stackOrder=function(t){return arguments.length?(Y=t,o):Y},o.stackOffset=function(t){return arguments.length?(I=t,o):I},o.trim=function(t){return arguments.length?(G=t,o):G},o.fill=function(t){return arguments.length?(et=t,o):et},o.fillArea=function(t){return arguments.length?(P=t,o):P},o.fillStroke=function(t){return arguments.length?(O=t,o):O},o.fillAreaOpacity=function(t){return arguments.length?(F=t,o):F},o.axisValue=function(t){return arguments.length?(J=t,o):J},o.axisPaddingIndex=function(t){return arguments.length?(Q=t,o):Q},o.axisPaddingValue=function(t){return arguments.length?(tt=t,o):tt},o.legendOrientation=function(t){return arguments.length?(Z=t,o):Z},o.voronoiAttraction=function(t){return arguments.length?(H=t,o):H},o.animateAxis=function(t){return arguments.length?(B=t,o):B},o.animateLabels=function(t){return arguments.length?(W=t,o):W},o.animation=function(t){return arguments.length?(K=t,o):K},o.tipHtml=function(t){return arguments.length?(V=t,o):V},o.highlightIndex=function(t){return arguments.length?(R=r(t),o):R},o.axisDisplayValue=function(t){return arguments.length?(X=t,o):X},o.axisDisplayIndex=function(t){return arguments.length?(q=t,o):q},o.onClick=function(t){return arguments.length?(U=t,o):U},o}var $r="0.3.1",Zr=Math.PI,Qr=2*Zr,ti=1e-6,ni=Qr-ti;e.prototype=r.prototype={constructor:e,moveTo:function(t,n){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._.push("Z"))},lineTo:function(t,n){this._.push("L",this._x1=+t,",",this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._.push("Q",+t,",",+n,",",this._x1=+e,",",this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,a){this._.push("C",+t,",",+n,",",+e,",",+r,",",this._x1=+i,",",this._y1=+a)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var a=this._x1,o=this._y1,u=e-t,s=r-n,l=a-t,c=o-n,h=l*l+c*c;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._.push("M",this._x1=t,",",this._y1=n);else if(h>ti)if(Math.abs(c*u-s*l)>ti&&i){var f=e-a,d=r-o,m=u*u+s*s,g=f*f+d*d,p=Math.sqrt(m),v=Math.sqrt(h),y=i*Math.tan((Zr-Math.acos((m+h-g)/(2*p*v)))/2),_=y/v,b=y/p;Math.abs(_-1)>ti&&this._.push("L",t+_*l,",",n+_*c),this._.push("A",i,",",i,",0,0,",+(c*f>l*d),",",this._x1=t+b*u,",",this._y1=n+b*s)}else this._.push("L",this._x1=t,",",this._y1=n);else;},arc:function(t,n,e,r,i,a){t=+t,n=+n,e=+e;var o=e*Math.cos(r),u=e*Math.sin(r),s=t+o,l=n+u,c=1^a,h=a?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._.push("M",s,",",l):(Math.abs(this._x1-s)>ti||Math.abs(this._y1-l)>ti)&&this._.push("L",s,",",l),e&&(h>ni?this._.push("A",e,",",e,",0,1,",c,",",t-o,",",n-u,"A",e,",",e,",0,1,",c,",",this._x1=s,",",this._y1=l):(h<0&&(h=h%Qr+Qr),this._.push("A",e,",",e,",0,",+(h>=Zr),",",c,",",this._x1=t+e*Math.cos(i),",",this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n,"h",+e,"v",+r,"h",-e,"Z")},toString:function(){return this._.join("")}};var ei=function(t){return function(){return t}},ri=1e-12,ii=Math.PI,ai=2*ii;i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var oi=function(t){return new i(t)},ui=function(){function t(t){var a,o,c,h=t.length,f=!1;for(null==u&&(l=s(c=r())),a=0;a<=h;++a)!(a<h&&i(o=t[a],a,t))===f&&((f=!f)?l.lineStart():l.lineEnd()),f&&l.point(+n(o,a,t),+e(o,a,t));if(c)return l=null,c+""||null}var n=a,e=o,i=ei(!0),u=null,s=oi,l=null;return t.x=function(e){return arguments.length?(n="function"==typeof e?e:ei(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:ei(+n),t):e},t.defined=function(n){return arguments.length?(i="function"==typeof n?n:ei(!!n),t):i},t.curve=function(n){return arguments.length?(s=n,null!=u&&(l=s(u)),t):s},t.context=function(n){return arguments.length?(null==n?u=l=null:l=s(u=n),t):u},t},si=function(){function t(t){var n,a,o,d,m,g=t.length,p=!1,v=new Array(g),y=new Array(g);for(null==c&&(f=h(m=r())),n=0;n<=g;++n){if(!(n<g&&l(d=t[n],n,t))===p)if(p=!p)a=n,f.areaStart(),f.lineStart();else{for(f.lineEnd(),f.lineStart(),o=n-1;o>=a;--o)f.point(v[o],y[o]);f.lineEnd(),f.areaEnd()}p&&(v[n]=+e(d,n,t),y[n]=+u(d,n,t),f.point(i?+i(d,n,t):v[n],s?+s(d,n,t):y[n]))}if(m)return f=null,m+""||null}function n(){return ui().defined(l).curve(h).context(c)}var e=a,i=null,u=ei(0),s=o,l=ei(!0),c=null,h=oi,f=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:ei(+n),i=null,t):e},t.x0=function(n){return arguments.length?(e="function"==typeof n?n:ei(+n),t):e},t.x1=function(n){return arguments.length?(i=null==n?null:"function"==typeof n?n:ei(+n),t):i},t.y=function(n){return arguments.length?(u="function"==typeof n?n:ei(+n),s=null,t):u},t.y0=function(n){return arguments.length?(u="function"==typeof n?n:ei(+n),t):u},t.y1=function(n){return arguments.length?(s=null==n?null:"function"==typeof n?n:ei(+n),t):s},t.lineX0=t.lineY0=function(){return n().x(e).y(u)},t.lineY1=function(){return n().x(e).y(s)},t.lineX1=function(){return n().x(i).y(u)},t.defined=function(n){return arguments.length?(l="function"==typeof n?n:ei(!!n),t):l},t.curve=function(n){return arguments.length?(h=n,null!=c&&(f=h(c)),t):h},t.context=function(n){return arguments.length?(null==n?c=f=null:f=h(c=n),t):c},t};s(oi);u.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var li={draw:function(t,n){var e=Math.sqrt(n/ii);t.moveTo(e,0),t.arc(0,0,e,0,ai)}},ci={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},hi=Math.sqrt(1/3),fi=2*hi,di={draw:function(t,n){var e=Math.sqrt(n/fi),r=e*hi;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},mi=.8908130915292852,gi=Math.sin(ii/10)/Math.sin(7*ii/10),pi=Math.sin(ai/10)*gi,vi=-Math.cos(ai/10)*gi,yi={draw:function(t,n){var e=Math.sqrt(n*mi),r=pi*e,i=vi*e;t.moveTo(0,-e),t.lineTo(r,i);for(var a=1;a<5;++a){var o=ai*a/5,u=Math.cos(o),s=Math.sin(o);t.lineTo(s*e,-u*e),t.lineTo(u*r-s*i,s*r+u*i)}t.closePath()}},_i={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},bi=Math.sqrt(3),xi={draw:function(t,n){var e=-Math.sqrt(n/(3*bi));t.moveTo(0,2*e),t.lineTo(-bi*e,-e),t.lineTo(bi*e,-e),t.closePath()}},Mi=-.5,wi=Math.sqrt(3)/2,ki=1/Math.sqrt(12),Ni=3*(ki/2+1),Ti={draw:function(t,n){var e=Math.sqrt(n/Ni),r=e/2,i=e*ki,a=r,o=e*ki+e,u=-a,s=o;t.moveTo(r,i),t.lineTo(a,o),t.lineTo(u,s),t.lineTo(Mi*r-wi*i,wi*r+Mi*i),t.lineTo(Mi*a-wi*o,wi*a+Mi*o),t.lineTo(Mi*u-wi*s,wi*u+Mi*s),t.lineTo(Mi*r+wi*i,Mi*i-wi*r),t.lineTo(Mi*a+wi*o,Mi*o-wi*a),t.lineTo(Mi*u+wi*s,Mi*s-wi*u),t.closePath()}},Si=function(){function t(){var t;if(i||(i=t=r()),n.apply(this,arguments).draw(i,+e.apply(this,arguments)),t)return i=null,t+""||null}var n=ei(li),e=ei(64),i=null;return t.type=function(e){return arguments.length?(n="function"==typeof e?e:ei(e),t):n},t.size=function(n){return arguments.length?(e="function"==typeof n?n:ei(+n),t):e},t.context=function(n){return arguments.length?(i=null==n?null:n,t):i},t},Ai=function(){};c.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:l(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:l(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Ci=function(t){return new c(t)};h.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this,n=this._x,e=this._y,r=n.length-1;if(r>0)for(var i,a=n[0],o=e[0],u=n[r]-a,s=e[r]-o,l=-1;++l<=r;)i=l/r,t._basis.point(t._beta*n[l]+(1-t._beta)*(a+i*u),t._beta*e[l]+(1-t._beta)*(o+i*s));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}},function t(n){function e(t){return 1===n?new c(t):new h(t,n)}return e.beta=function(n){return t(+n)},e}(.85),d.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:f(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:f(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var zi=function t(n){function e(t){return new d(t,n)}return e.tension=function(n){return t(+n)},e}(0);m.prototype={areaStart:Ai,areaEnd:Ai,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:f(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function e(t){return new m(t,n)}return e.tension=function(n){return t(+n)},e}(0),g.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:f(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function e(t){return new g(t,n)}return e.tension=function(n){return t(+n)},e}(0),v.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:p(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Di=function t(n){function e(t){return n?new v(t,n):new d(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);y.prototype={areaStart:Ai,areaEnd:Ai,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:p(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function e(t){return n?new y(t,n):new m(t,0)}return e.alpha=function(n){return t(+n)},e}(.5),_.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:p(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},function t(n){function e(t){return n?new _(t,n):new g(t,0)}return e.alpha=function(n){return t(+n)},e}(.5),k.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:w(this,this._t0,M(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,w(this,M(this,e=x(this,t,n)),e);break;default:w(this,this._t0,e=x(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(N.prototype=Object.create(k.prototype)).point=function(t,n){k.prototype.point.call(this,n,t)},T.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,a){this._context.bezierCurveTo(n,t,r,e,a,i)}},C.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this,n=this._x,e=this._y,r=n.length;if(r)if(this._line?this._context.lineTo(n[0],e[0]):this._context.moveTo(n[0],e[0]),2===r)this._context.lineTo(n[1],e[1]);else for(var i=z(n),a=z(e),o=0,u=1;u<r;++o,++u)t._context.bezierCurveTo(i[0][o],a[0][o],i[1][o],a[1][o],n[u],e[u]);(this._line||0!==this._line&&1===r)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var ji=function(t){return new C(t)};D.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var Fi=function(t){return new D(t,.5)},Pi=Array.prototype.slice,Oi=function(t,n){if((r=t.length)>1)for(var e,r,i=1,a=t[n[0]],o=a.length;i<r;++i){e=a,a=t[n[i]];for(var u=0;u<o;++u)a[u][1]+=a[u][0]=isNaN(e[u][1])?e[u][0]:e[u][1]}},Ei=function(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e},Li=function(){function t(t){var a,o,u=n.apply(this,arguments),s=t.length,l=u.length,c=new Array(l);for(a=0;a<l;++a){for(var h,f=u[a],d=c[a]=new Array(s),m=0;m<s;++m)d[m]=h=[0,+i(t[m],f,m,t)],h.data=t[m];d.key=f}for(a=0,o=e(c);a<l;++a)c[o[a]].index=a;return r(c,o),c}var n=ei([]),e=Ei,r=Oi,i=P;return t.keys=function(e){return arguments.length?(n="function"==typeof e?e:ei(Pi.call(e)),t):n},t.value=function(n){return arguments.length?(i="function"==typeof n?n:ei(+n),t):i},t.order=function(n){return arguments.length?(e=null==n?Ei:"function"==typeof n?n:ei(Pi.call(n)),t):e},t.offset=function(n){return arguments.length?(r=null==n?Oi:n,t):r},t},Ui=function(t,n){if((r=t.length)>0){for(var e,r,i,a=0,o=t[0].length;a<o;++a){for(i=e=0;e<r;++e)i+=t[e][a][1]||0;if(i)for(e=0;e<r;++e)t[e][a][1]/=i}Oi(t,n)}},Yi=function(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],a=i.length;r<a;++r){for(var o=0,u=0;o<e;++o)u+=t[o][r][1]||0;i[r][1]+=i[r][0]=-u/2}Oi(t,n)}},Ii=function(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,a=0,o=1;o<r;++o){for(var u=0,s=0,l=0;u<i;++u){for(var c=t[n[u]],h=c[o][1]||0,f=c[o-1][1]||0,d=(h-f)/2,m=0;m<u;++m){var g=t[n[m]],p=g[o][1]||0,v=g[o-1][1]||0;d+=p-v}s+=h,l+=d*h}e[o-1][1]+=e[o-1][0]=a,s&&(a-=l/s)}e[o-1][1]+=e[o-1][0]=a,Oi(t,n)}},Hi=function(t){var n=t.map(O);return Ei(t).sort(function(t,e){return n[t]-n[e]})},Ri=function(t){return Hi(t).reverse()},Bi=function(t){var n,e,r=t.length,i=t.map(O),a=Ei(t).sort(function(t,n){return i[n]-i[t]}),o=0,u=0,s=[],l=[];for(n=0;n<r;++n)e=a[n],o<u?(o+=i[e],s.push(e)):(u+=i[e],l.push(e));return l.reverse().concat(s)},Wi=function(t){return Ei(t).reverse()},Ji=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},qi=function(t){return 1===t.length&&(t=E(t)),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var a=r+i>>>1;t(n[a],e)<0?r=a+1:i=a}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var a=r+i>>>1;t(n[a],e)>0?i=a:r=a+1}return r}}},Xi=qi(Ji),Ki=Xi.right,Vi=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},Gi=Array.prototype,$i=(Gi.slice,Gi.map,function(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),a=new Array(i);++r<i;)a[r]=t+r*e;return a}),Zi=Math.sqrt(50),Qi=Math.sqrt(10),ta=Math.sqrt(2),na=function(t,n,e){var r=L(t,n,e);return $i(Math.ceil(t/r)*r,Math.floor(n/r)*r+r/2,r)},ea=function(t,n){var e,r,i=-1,a=t.length;if(null==n){for(;++i<a;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<a;)null!=(r=t[i])&&r>e&&(e=r)}else{for(;++i<a;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<a;)null!=(r=n(t[i],i,t))&&r>e&&(e=r)}return e},ra=function(t,n){var e,r,i=-1,a=t.length;if(null==n){for(;++i<a;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<a;)null!=(r=t[i])&&e>r&&(e=r)}else{for(;++i<a;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<a;)null!=(r=n(t[i],i,t))&&e>r&&(e=r)}return e},ia="$";U.prototype=Y.prototype={constructor:U,has:function(t){return ia+t in this},get:function(t){return this[ia+t]},set:function(t,n){return this[ia+t]=n,this},remove:function(t){var n=ia+t;return n in this&&delete this[n]},clear:function(){var t=this;for(var n in this)n[0]===ia&&delete t[n]},keys:function(){var t=[];for(var n in this)n[0]===ia&&t.push(n.slice(1));return t},values:function(){var t=this,n=[];for(var e in this)e[0]===ia&&n.push(t[e]);return n},entries:function(){var t=this,n=[];for(var e in this)e[0]===ia&&n.push({key:e.slice(1),value:t[e]});return n},size:function(){var t=0;for(var n in this)n[0]===ia&&++t;return t},empty:function(){for(var t in this)if(t[0]===ia)return!1;return!0},each:function(t){var n=this;for(var e in this)e[0]===ia&&t(n[e],e.slice(1),n)}};var aa=function(){function t(n,i,o,u){if(i>=a.length)return null!=r?r(n):null!=e?n.sort(e):n;for(var s,l,c,h=-1,f=n.length,d=a[i++],m=Y(),g=o();++h<f;)(c=m.get(s=d(l=n[h])+""))?c.push(l):m.set(s,[l]);return m.each(function(n,e){u(g,e,t(n,i,o,u))}),g}function n(t,e){if(++e>a.length)return t;var i,u=o[e-1];return null!=r&&e>=a.length?i=t.entries():(i=[],t.each(function(t,r){i.push({key:r,values:n(t,e)})})),null!=u?i.sort(function(t,n){return u(t.key,n.key)}):i}var e,r,i,a=[],o=[];return i={object:function(n){return t(n,0,I,H)},map:function(n){return t(n,0,R,B)},entries:function(e){return n(t(e,0,R,B),0)},key:function(t){return a.push(t),i},sortKeys:function(t){return o[a.length-1]=t,i},sortValues:function(t){return e=t,i},rollup:function(t){return r=t,i}}},oa=Y.prototype;W.prototype=J.prototype={constructor:W,has:oa.has,add:function(t){return t+="",this[ia+t]=t,this},remove:oa.remove,clear:oa.clear,values:oa.keys,size:oa.size,empty:oa.empty,each:oa.each};var ua=Array.prototype,sa=ua.map,la=ua.slice,ca=function(t,n,e){t.prototype=n.prototype=e,e.constructor=t},ha=.7,fa=1/ha,da=/^#([0-9a-f]{3})$/,ma=/^#([0-9a-f]{6})$/,ga=/^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/,pa=/^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,va=/^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,ya=/^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,_a=/^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,ba=/^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,xa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,
	lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ca(X,K,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),ca(Q,Z,q(X,{brighter:function(t){return t=null==t?fa:Math.pow(fa,t),new Q(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?ha:Math.pow(ha,t),new Q(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),ca(rt,et,q(X,{brighter:function(t){return t=null==t?fa:Math.pow(fa,t),new rt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?ha:Math.pow(ha,t),new rt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new Q(it(t>=240?t-240:t+120,i,r),it(t,i,r),it(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var Ma=Math.PI/180,wa=180/Math.PI,ka=18,Na=.95047,Ta=1,Sa=1.08883,Aa=4/29,Ca=6/29,za=3*Ca*Ca,Da=Ca*Ca*Ca;ca(ut,ot,q(X,{brighter:function(t){return new ut(this.l+ka*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new ut(this.l-ka*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return t=Ta*lt(t),n=Na*lt(n),e=Sa*lt(e),new Q(ct(3.2404542*n-1.5371385*t-.4985314*e),ct(-.969266*n+1.8760108*t+.041556*e),ct(.0556434*n-.2040259*t+1.0572252*e),this.opacity)}})),ca(mt,dt,q(X,{brighter:function(t){return new mt(this.h,this.c,this.l+ka*(null==t?1:t),this.opacity)},darker:function(t){return new mt(this.h,this.c,this.l-ka*(null==t?1:t),this.opacity)},rgb:function(){return at(this).rgb()}}));var ja=-.14861,Fa=1.78277,Pa=-.29227,Oa=-.90649,Ea=1.97294,La=Ea*Oa,Ua=Ea*Fa,Ya=Fa*Pa-Oa*ja;ca(vt,pt,q(X,{brighter:function(t){return t=null==t?fa:Math.pow(fa,t),new vt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?ha:Math.pow(ha,t),new vt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*Ma,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new Q(255*(n+e*(ja*r+Fa*i)),255*(n+e*(Pa*r+Oa*i)),255*(n+e*(Ea*r)),this.opacity)}}));var Ia,Ha,Ra,Ba,Wa=function(t){return function(){return t}},Ja=function t(n){function e(t,n){var e=r((t=Z(t)).r,(n=Z(n)).r),i=r(t.g,n.g),a=r(t.b,n.b),o=r(t.opacity,n.opacity);return function(n){return t.r=e(n),t.g=i(n),t.b=a(n),t.opacity=o(n),t+""}}var r=xt(n);return e.gamma=t,e}(1),qa=function(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,a=new Array(r),o=new Array(r);for(e=0;e<i;++e)a[e]=Qa(t[e],n[e]);for(;e<r;++e)o[e]=n[e];return function(t){for(e=0;e<i;++e)o[e]=a[e](t);return o}},Xa=function(t,n){var e=new Date;return t=+t,n-=t,function(r){return e.setTime(t+n*r),e}},Ka=function(t,n){return t=+t,n-=t,function(e){return t+n*e}},Va=function(t,n){var e,r={},i={};null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={});for(e in n)e in t?r[e]=Qa(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}},Ga=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,$a=new RegExp(Ga.source,"g"),Za=function(t,n){var e,r,i,a=Ga.lastIndex=$a.lastIndex=0,o=-1,u=[],s=[];for(t+="",n+="";(e=Ga.exec(t))&&(r=$a.exec(n));)(i=r.index)>a&&(i=n.slice(a,i),u[o]?u[o]+=i:u[++o]=i),(e=e[0])===(r=r[0])?u[o]?u[o]+=r:u[++o]=r:(u[++o]=null,s.push({i:o,x:Ka(e,r)})),a=$a.lastIndex;return a<n.length&&(i=n.slice(a),u[o]?u[o]+=i:u[++o]=i),u.length<2?s[0]?kt(s[0].x):wt(n):(n=s.length,function(t){for(var e,r=0;r<n;++r)u[(e=s[r]).i]=e.x(t);return u.join("")})},Qa=function(t,n){var e,r=typeof n;return null==n||"boolean"===r?Wa(n):("number"===r?Ka:"string"===r?(e=K(n))?(n=e,Ja):Za:n instanceof K?Ja:n instanceof Date?Xa:Array.isArray(n)?qa:isNaN(n)?Va:Ka)(t,n)},to=function(t,n){return t=+t,n-=t,function(e){return Math.round(t+n*e)}},no=180/Math.PI,eo={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},ro=function(t,n,e,r,i,a){var o,u,s;return(o=Math.sqrt(t*t+n*n))&&(t/=o,n/=o),(s=t*e+n*r)&&(e-=t*s,r-=n*s),(u=Math.sqrt(e*e+r*r))&&(e/=u,r/=u,s/=u),t*r<n*e&&(t=-t,n=-n,s=-s,o=-o),{translateX:i,translateY:a,rotate:Math.atan2(n,t)*no,skewX:Math.atan(s)*no,scaleX:o,scaleY:u}},io=St(Nt,"px, ","px)","deg)"),ao=St(Tt,", ",")",")");Math.SQRT2;At(bt);var oo,uo=At(Mt),so=function(t){return function(){return t}},lo=function(t){return+t},co=[0,1],ho=function(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]},fo=function(t){return t=ho(Math.abs(t)),t?t[1]:NaN},mo=function(t,n){return function(e,r){for(var i=e.length,a=[],o=0,u=t[0],s=0;i>0&&u>0&&(s+u+1>r&&(u=Math.max(1,r-s)),a.push(e.substring(i-=u,i+u)),!((s+=u+1)>r));)u=t[o=(o+1)%t.length];return a.reverse().join(n)}},go=function(t,n){t=t.toPrecision(n);t:for(var e,r=t.length,i=1,a=-1;i<r;++i)switch(t[i]){case".":a=e=i;break;case"0":0===a&&(a=i),e=i;break;case"e":break t;default:a>0&&(a=0)}return a>0?t.slice(0,a)+t.slice(e+1):t},po=function(t,n){var e=ho(t,n);if(!e)return t+"";var r=e[0],i=e[1],a=i-(oo=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,o=r.length;return a===o?r:a>o?r+new Array(a-o+1).join("0"):a>0?r.slice(0,a)+"."+r.slice(a):"0."+new Array(1-a).join("0")+ho(t,Math.max(0,n+a-1))[0]},vo=function(t,n){var e=ho(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array((-i)).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")},yo={"":go,"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return vo(100*t,n)},r:vo,s:po,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},_o=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i,bo=function(t){return new Et(t)};Et.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var xo,Mo,wo,ko=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],No=function(t){function n(t){function n(t){var n,i,s,y=m,_=g;if("c"===d)_=p(t)+_,t="";else{t=+t;var b=(t<0||1/t<0)&&(t*=-1,!0);if(t=p(t,f),b)for(n=-1,i=t.length,b=!1;++n<i;)if(s=t.charCodeAt(n),48<s&&s<58||"x"===d&&96<s&&s<103||"X"===d&&64<s&&s<71){b=!0;break}if(y=(b?"("===u?u:"-":"-"===u||"("===u?"":u)+y,_=_+("s"===d?ko[8+oo/3]:"")+(b&&"("===u?")":""),v)for(n=-1,i=t.length;++n<i;)if(s=t.charCodeAt(n),48>s||s>57){_=(46===s?a+t.slice(n+1):t.slice(n))+_,t=t.slice(0,n);break}}h&&!l&&(t=r(t,1/0));var x=y.length+t.length+_.length,M=x<c?new Array(c-x+1).join(e):"";switch(h&&l&&(t=r(M+t,M.length?c-_.length:1/0),M=""),o){case"<":return y+t+_+M;case"=":return y+M+t+_;case"^":return M.slice(0,x=M.length>>1)+y+t+_+M.slice(x)}return M+y+t+_}t=bo(t);var e=t.fill,o=t.align,u=t.sign,s=t.symbol,l=t.zero,c=t.width,h=t.comma,f=t.precision,d=t.type,m="$"===s?i[0]:"#"===s&&/[boxX]/.test(d)?"0"+d.toLowerCase():"",g="$"===s?i[1]:/[%p]/.test(d)?"%":"",p=yo[d],v=!d||/[defgprs%]/.test(d);return f=null==f?d?6:12:/[gprs]/.test(d)?Math.max(1,Math.min(21,f)):Math.max(0,Math.min(20,f)),n.toString=function(){return t+""},n}function e(t,e){var r=n((t=bo(t),t.type="f",t)),i=3*Math.max(-8,Math.min(8,Math.floor(fo(e)/3))),a=Math.pow(10,-i),o=ko[8+i/3];return function(t){return r(a*t)+o}}var r=t.grouping&&t.thousands?mo(t.grouping,t.thousands):Lt,i=t.currency,a=t.decimal;return{format:n,formatPrefix:e}};Ut({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var To=function(t){return Math.max(0,-fo(Math.abs(t)))},So=function(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(fo(n)/3)))-fo(Math.abs(t)))},Ao=function(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,fo(n)-fo(t))+1},Co=function(t,n,e){var r,i=t[0],a=t[t.length-1],o=L(i,a,null==n?10:n);switch(e=bo(null==e?",f":e),e.type){case"s":var u=Math.max(Math.abs(i),Math.abs(a));return null!=e.precision||isNaN(r=So(o,u))||(e.precision=r),wo(e,u);case"":case"e":case"g":case"p":case"r":null!=e.precision||isNaN(r=Ao(o,Math.max(Math.abs(i),Math.abs(a))))||(e.precision=r-("e"===e.type));break;case"f":case"%":null!=e.precision||isNaN(r=To(o))||(e.precision=r-2*("%"===e.type))}return Mo(e)},zo=function(t,n){t=t.slice();var e,r=0,i=t.length-1,a=t[r],o=t[i];return o<a&&(e=r,r=i,i=e,e=a,a=o,o=e),t[r]=n.floor(a),t[i]=n.ceil(o),t},Do=new Date,jo=new Date,Fo=Kt(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});Fo.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Kt(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):Fo:null};var Po=1e3,Oo=6e4,Eo=36e5,Lo=864e5,Uo=6048e5,Yo=Kt(function(t){t.setTime(Math.floor(t/Po)*Po)},function(t,n){t.setTime(+t+n*Po)},function(t,n){return(n-t)/Po},function(t){return t.getUTCSeconds()}),Io=Kt(function(t){t.setTime(Math.floor(t/Oo)*Oo)},function(t,n){t.setTime(+t+n*Oo)},function(t,n){return(n-t)/Oo},function(t){return t.getMinutes()}),Ho=Kt(function(t){var n=t.getTimezoneOffset()*Oo%Eo;n<0&&(n+=Eo),t.setTime(Math.floor((+t-n)/Eo)*Eo+n)},function(t,n){t.setTime(+t+n*Eo)},function(t,n){return(n-t)/Eo},function(t){return t.getHours()}),Ro=Kt(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Oo)/Lo},function(t){return t.getDate()-1}),Bo=Vt(0),Wo=Vt(1),Jo=Vt(2),qo=Vt(3),Xo=Vt(4),Ko=Vt(5),Vo=Vt(6),Go=Kt(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),$o=Kt(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});$o.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Kt(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null};var Zo=Kt(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*Oo)},function(t,n){return(n-t)/Oo},function(t){return t.getUTCMinutes()}),Qo=Kt(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+n*Eo)},function(t,n){return(n-t)/Eo},function(t){return t.getUTCHours()}),tu=Kt(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/Lo},function(t){return t.getUTCDate()-1}),nu=Gt(0),eu=Gt(1),ru=Gt(2),iu=Gt(3),au=Gt(4),ou=Gt(5),uu=Gt(6),su=Kt(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),lu=Kt(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});lu.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Kt(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null};var cu,hu,fu,du,mu,gu={"-":"",_:" ",0:"0"},pu=/^\s*\d+/,vu=/^%/,yu=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;Vn({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var _u="%Y-%m-%dT%H:%M:%S.%LZ",bu=(Date.prototype.toISOString?Gn:du(_u),+new Date("2000-01-01T00:00:00.000Z")?$n:mu(_u),1e3),xu=60*bu,Mu=60*xu,wu=24*Mu,ku=7*wu,Nu=30*wu,Tu=365*wu,Su=function(){return te($o,Go,Bo,Ro,Ho,Io,Yo,Fo,hu).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},Au=function(t){return t.match(/.{6}/g).map(function(t){return"#"+t})};Au("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Au("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),Au("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),Au("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),uo(pt(300,.5,0),pt(-240,.5,1));var Cu=(uo(pt(-100,.75,.35),pt(80,1.5,.8)),uo(pt(260,.75,.35),pt(80,1.5,.8)),pt(),Array.prototype.slice),zu=function(t){return t},Du=1,ju=2,Fu=3,Pu=4,Ou=1e-6,Eu=function(t){return function(){return t}};he.prototype={constructor:he,insert:function(t,n){var e,r,i,a=this;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=ge(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.R&&(de(a,e),t=e,e=t.U),e.C=!1,r.C=!0,me(a,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.L&&(me(a,e),t=e,e=t.U),e.C=!1,r.C=!0,de(a,r))),e=t.U;this._.C=!1},remove:function(t){var n=this;t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var e,r,i,a=t.U,o=t.L,u=t.R;if(r=o?u?ge(u):o:u,a?a.L===t?a.L=r:a.R=r:this._=r,o&&u?(i=r.C,r.C=t.C,r.L=o,o.U=r,r!==u?(a=r.U,r.U=t.U,t=r.R,a.L=t,r.R=u,u.U=r):(r.U=a,a=r,t=r.R)):(i=t.C,t=r),t&&(t.U=a),!i){if(t&&t.C)return void(t.C=!1);do{if(t===n._)break;if(t===a.L){if(e=a.R,e.C&&(e.C=!1,a.C=!0,de(n,a),e=a.R),e.L&&e.L.C||e.R&&e.R.C){e.R&&e.R.C||(e.L.C=!1,e.C=!0,me(n,e),e=a.R),e.C=a.C,a.C=e.R.C=!1,de(n,a),t=n._;break}}else if(e=a.L,e.C&&(e.C=!1,a.C=!0,me(n,a),e=a.L),e.L&&e.L.C||e.R&&e.R.C){e.L&&e.L.C||(e.R.C=!1,e.C=!0,de(n,e),e=a.L),e.C=a.C,a.C=e.L.C=!1,me(n,a),t=n._;break}e.C=!0,t=a,a=a.U}while(!t.C);t&&(t.C=!1)}}};var Lu,Uu,Yu,Iu,Hu,Ru=[],Bu=[],Wu=1e-6,Ju=1e-12;Ie.prototype={constructor:Ie,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return ke(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){for(var i,a=e.site,o=e.halfedges,u=-1,s=o.length,l=n[o[s-1]],c=l.left===a?l.right:l.left;++u<s;)i=c,l=n[o[u]],c=l.left===a?l.right:l.left,r<i.index&&r<c.index&&Ue(a,i,c)<0&&t.push([a.data,i.data,c.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})}};var qu=function(){function t(t){return new Ie(t.map(function(r,i){var a=[Math.round(n(r,i,t)/Wu)*Wu,Math.round(e(r,i,t)/Wu)*Wu];return a.index=i,a.data=r,a}),r)}var n=le,e=ce,r=null;return t.polygons=function(n){return t(n).polygons()},t.links=function(n){return t(n).links()},t.triangles=function(n){return t(n).triangles()},t.x=function(e){return arguments.length?(n="function"==typeof e?e:Eu(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:Eu(+n),t):e},t.extent=function(n){return arguments.length?(r=null==n?null:[[+n[0][0],+n[0][1]],[+n[1][0],+n[1][1]]],t):r&&[[r[0][0],r[0][1]],[r[1][0],r[1][1]]]},t.size=function(n){return arguments.length?(r=null==n?null:[[0,0],[+n[0],+n[1]]],t):r&&[r[1][0]-r[0][0],r[1][1]-r[0][1]]},t},Xu=function(t){for(var n,e=-1,r=t.length,i=t[r-1],a=0;++e<r;)n=i,i=t[e],a+=n[1]*i[0]-n[0]*i[1];return a/2},Ku=function(t){for(var n,e,r=-1,i=t.length,a=0,o=0,u=t[i-1],s=0;++r<i;)n=u,u=t[r],s+=e=n[0]*u[1]-u[0]*n[1],a+=(n[0]+u[0])*e,o+=(n[1]+u[1])*e;return s*=3,[a/s,o/s]},Vu=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],Gu=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],$u=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],Zu={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},Qu={standard:Gu,darker:Vu,lighter:$u,names:Zu},ts={light:{background:"#ffffff",text:"#262626",axis:"#262626",grid:"#e0e0e0",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.3)",shadow:"rgba(127,127,127,0.4)",fillOpacity:.33},dark:{background:"#333333",text:"#ffffff",axis:"#ffffff",grid:"#6d6d6d",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.5)",shadow:"rgba(255,255,255,0.4)",fillOpacity:.33}},ns=Be(function(t){function n(t,n){return 1-3*n+3*t}function e(t,n){return 3*n-6*t}function r(t){return 3*t}function i(t,i,a){return((n(i,a)*t+e(i,a))*t+r(i))*t}function a(t,i,a){return 3*n(i,a)*t*t+2*e(i,a)*t+r(i)}function o(t,n,e,r,a){var o,u,s=0;do u=n+(e-n)/2,o=i(u,r,a)-t,o>0?e=u:n=u;while(Math.abs(o)>c&&++s<h);return u}function u(t,n,e,r){for(var o=0;o<s;++o){var u=a(n,e,r);if(0===u)return n;var l=i(n,e,r)-t;n-=l/u}return n}var s=4,l=.001,c=1e-7,h=10,f=11,d=1/(f-1),m="function"==typeof Float32Array;t.exports=function(t,n,e,r){function s(n){for(var r=0,i=1,s=f-1;i!==s&&c[i]<=n;++i)r+=d;--i;var h=(n-c[i])/(c[i+1]-c[i]),m=r+h*d,g=a(m,t,e);return g>=l?u(n,m,t,e):0===g?m:o(n,r,r+d,t,e)}if(!(0<=t&&t<=1&&0<=e&&e<=1))throw new Error("bezier x values must be in [0, 1] range");var c=m?new Float32Array(f):new Array(f);if(t!==n||e!==r)for(var h=0;h<f;++h)c[h]=i(h*d,t,e);return function(a){return t===n&&e===r?a:0===a?0:1===a?1:i(s(a),n,r)}}}),es=(Re(ns),'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'),rs={fixed:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",weightMonochrome:300,weightColor:500,sizeForWidth:We,family:'"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace'},variable:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",weightMonochrome:400,weightColor:500,sizeForWidth:We,family:'"Raleway", "Trebuchet MS", '+es},brand:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Electrolize);",weightMonochrome:400,weightColor:400,sizeForWidth:We,family:'"Electrolize", '+es}},is=270,as=.5,os=12,us=8,ss=14,ls=2,cs=8.39,hs={ab:{name:"Abkhaz",nativeName:"аҧсуа"},aa:{name:"Afar",nativeName:"Afaraf"},af:{name:"Afrikaans",nativeName:"Afrikaans"},ak:{name:"Akan",nativeName:"Akan"},sq:{name:"Albanian",nativeName:"Shqip"},am:{name:"Amharic",nativeName:"አማርኛ"},ar:{name:"Arabic",nativeName:"العربية"},an:{name:"Aragonese",nativeName:"Aragonés"},hy:{name:"Armenian",nativeName:"Հայերեն"},as:{name:"Assamese",nativeName:"অসমীয়া"},av:{name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},ae:{name:"Avestan",nativeName:"avesta"},ay:{name:"Aymara",nativeName:"aymar aru"},az:{name:"Azerbaijani",nativeName:"azərbaycan dili"},bm:{name:"Bambara",nativeName:"bamanankan"},ba:{name:"Bashkir",nativeName:"башҡорт теле"},eu:{name:"Basque",nativeName:"euskara, euskera"},be:{name:"Belarusian",nativeName:"Беларуская"},bn:{name:"Bengali",nativeName:"বাংলা"},bh:{name:"Bihari",nativeName:"भोजपुरी"},bi:{name:"Bislama",nativeName:"Bislama"},bs:{name:"Bosnian",nativeName:"bosanski jezik"},br:{name:"Breton",nativeName:"brezhoneg"},bg:{name:"Bulgarian",nativeName:"български език"},my:{name:"Burmese",nativeName:"ဗမာစာ"},ca:{name:"Catalan; Valencian",nativeName:"Català"},ch:{name:"Chamorro",nativeName:"Chamoru"},ce:{name:"Chechen",nativeName:"нохчийн мотт"},ny:{name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},zh:{name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},cv:{name:"Chuvash",nativeName:"чӑваш чӗлхи"},kw:{name:"Cornish",nativeName:"Kernewek"},co:{name:"Corsican",nativeName:"corsu, lingua corsa"},cr:{name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},hr:{name:"Croatian",nativeName:"hrvatski"},cs:{name:"Czech",nativeName:"česky, čeština"},da:{name:"Danish",nativeName:"dansk"},dv:{name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},nl:{name:"Dutch",nativeName:"Nederlands, Vlaams"},en:{name:"English",nativeName:"English"},eo:{name:"Esperanto",nativeName:"Esperanto"},et:{name:"Estonian",nativeName:"eesti, eesti keel"},ee:{name:"Ewe",nativeName:"Eʋegbe"},fo:{name:"Faroese",nativeName:"føroyskt"},fj:{name:"Fijian",nativeName:"vosa Vakaviti"},fi:{name:"Finnish",nativeName:"suomi, suomen kieli"},fr:{name:"French",nativeName:"français, langue française"},ff:{name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},gl:{name:"Galician",nativeName:"Galego"},ka:{name:"Georgian",nativeName:"ქართული"},de:{name:"German",nativeName:"Deutsch"},el:{name:"Greek, Modern",nativeName:"Ελληνικά"},gn:{name:"Guaraní",nativeName:"Avañeẽ"},gu:{name:"Gujarati",nativeName:"ગુજરાતી"},ht:{name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},ha:{name:"Hausa",nativeName:"Hausa, هَوُسَ"},he:{name:"Hebrew (modern)",nativeName:"עברית"},hz:{name:"Herero",nativeName:"Otjiherero"},hi:{name:"Hindi",nativeName:"हिन्दी, हिंदी"},ho:{name:"Hiri Motu",nativeName:"Hiri Motu"},hu:{name:"Hungarian",nativeName:"Magyar"},ia:{name:"Interlingua",nativeName:"Interlingua"},id:{name:"Indonesian",nativeName:"Bahasa Indonesia"},ie:{name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},ga:{name:"Irish",nativeName:"Gaeilge"},ig:{name:"Igbo",nativeName:"Asụsụ Igbo"},ik:{name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},io:{name:"Ido",nativeName:"Ido"},is:{name:"Icelandic",nativeName:"Íslenska"},it:{name:"Italian",nativeName:"Italiano"},iu:{name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},ja:{name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},jv:{name:"Javanese",nativeName:"basa Jawa"},kl:{name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},kn:{name:"Kannada",nativeName:"ಕನ್ನಡ"},kr:{name:"Kanuri",nativeName:"Kanuri"},ks:{name:"Kashmiri",nativeName:"कश्मीरी, كشميري‎"},kk:{name:"Kazakh",nativeName:"Қазақ тілі"},km:{name:"Khmer",nativeName:"ភាសាខ្មែរ"},ki:{name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},rw:{name:"Kinyarwanda",nativeName:"Ikinyarwanda"},ky:{name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},kv:{name:"Komi",nativeName:"коми кыв"},kg:{name:"Kongo",nativeName:"KiKongo"},ko:{name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},ku:{name:"Kurdish",nativeName:"Kurdî, كوردی‎"},kj:{name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},la:{name:"Latin",nativeName:"latine, lingua latina"},lb:{name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},lg:{name:"Luganda",nativeName:"Luganda"},li:{name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},ln:{name:"Lingala",nativeName:"Lingála"},lo:{name:"Lao",nativeName:"ພາສາລາວ"},lt:{name:"Lithuanian",nativeName:"lietuvių kalba"},lu:{name:"Luba-Katanga",nativeName:""},lv:{name:"Latvian",nativeName:"latviešu valoda"},gv:{name:"Manx",nativeName:"Gaelg, Gailck"},mk:{name:"Macedonian",nativeName:"македонски јазик"},mg:{name:"Malagasy",nativeName:"Malagasy fiteny"},ms:{name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو‎"},ml:{name:"Malayalam",nativeName:"മലയാളം"},mt:{name:"Maltese",nativeName:"Malti"},mi:{name:"Māori",nativeName:"te reo Māori"},mr:{name:"Marathi (Marāṭhī)",nativeName:"मराठी"},mh:{name:"Marshallese",nativeName:"Kajin M̧ajeļ"},mn:{name:"Mongolian",nativeName:"монгол"},na:{name:"Nauru",nativeName:"Ekakairũ Naoero"},nv:{name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},nb:{name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},nd:{name:"North Ndebele",nativeName:"isiNdebele"},ne:{name:"Nepali",nativeName:"नेपाली"},ng:{name:"Ndonga",nativeName:"Owambo"},nn:{name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},no:{name:"Norwegian",nativeName:"Norsk"},ii:{name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},nr:{name:"South Ndebele",nativeName:"isiNdebele"},oc:{name:"Occitan",nativeName:"Occitan"},oj:{name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},cu:{name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},om:{name:"Oromo",nativeName:"Afaan Oromoo"},or:{name:"Oriya",nativeName:"ଓଡ଼ିଆ"},os:{name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},pa:{name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی‎"},pi:{name:"Pāli",nativeName:"पाऴि"},fa:{name:"Persian",nativeName:"فارسی"},pl:{name:"Polish",nativeName:"polski"},ps:{name:"Pashto, Pushto",nativeName:"پښتو"},pt:{name:"Portuguese",nativeName:"Português"},qu:{name:"Quechua",nativeName:"Runa Simi, Kichwa"},rm:{name:"Romansh",nativeName:"rumantsch grischun"},rn:{name:"Kirundi",nativeName:"kiRundi"},ro:{name:"Romanian, Moldavian, Moldovan",nativeName:"română"},ru:{name:"Russian",nativeName:"русский язык"},sa:{name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},sc:{name:"Sardinian",nativeName:"sardu"},sd:{name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی‎"},se:{name:"Northern Sami",nativeName:"Davvisámegiella"},sm:{name:"Samoan",nativeName:"gagana faa Samoa"},sg:{name:"Sango",nativeName:"yângâ tî sängö"},sr:{name:"Serbian",nativeName:"српски језик"},gd:{name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},sn:{name:"Shona",nativeName:"chiShona"},si:{name:"Sinhala, Sinhalese",nativeName:"සිංහල"},sk:{name:"Slovak",nativeName:"slovenčina"},sl:{name:"Slovene",nativeName:"slovenščina"},so:{name:"Somali",nativeName:"Soomaaliga, af Soomaali"},st:{name:"Southern Sotho",nativeName:"Sesotho"},es:{name:"Spanish; Castilian",nativeName:"español, castellano"},su:{name:"Sundanese",nativeName:"Basa Sunda"},sw:{name:"Swahili",nativeName:"Kiswahili"},ss:{name:"Swati",nativeName:"SiSwati"},sv:{name:"Swedish",nativeName:"svenska"},ta:{name:"Tamil",nativeName:"தமிழ்"},te:{name:"Telugu",nativeName:"తెలుగు"},tg:{name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی‎"},th:{name:"Thai",nativeName:"ไทย"},ti:{name:"Tigrinya",nativeName:"ትግርኛ"},bo:{name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},tk:{name:"Turkmen",nativeName:"Türkmen, Түркмен"},tl:{name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},tn:{name:"Tswana",nativeName:"Setswana"},to:{name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},tr:{name:"Turkish",nativeName:"Türkçe"},ts:{name:"Tsonga",nativeName:"Xitsonga"},tt:{name:"Tatar",nativeName:"татарча, tatarça, تاتارچا‎"},tw:{name:"Twi",nativeName:"Twi"},ty:{name:"Tahitian",nativeName:"Reo Tahiti"},ug:{name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە‎"},uk:{name:"Ukrainian",nativeName:"українська"},ur:{name:"Urdu",nativeName:"اردو"},uz:{name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك‎"},ve:{name:"Venda",nativeName:"Tshivenḓa"},vi:{name:"Vietnamese",nativeName:"Tiếng Việt"},vo:{name:"Volapük",nativeName:"Volapük"},wa:{name:"Walloon",nativeName:"Walon"},cy:{name:"Welsh",nativeName:"Cymraeg"},wo:{name:"Wolof",nativeName:"Wollof"},fy:{name:"Western Frisian",nativeName:"Frysk"},xh:{name:"Xhosa",nativeName:"isiXhosa"},yi:{name:"Yiddish",nativeName:"ייִדיש"},yo:{name:"Yoruba",nativeName:"Yorùbá"},za:{name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}},fs=(Object.keys(hs).map(function(t){return[t,hs[t].name.toLowerCase()]}),{ca:"ca_ES",cs:"cs_CZ",en:"en_US",he:"he_IL",ja:"ja_JP",ko:"ko_KR",pt:"pt_BR",sv:"sv_SE",zh:"zh_CN"}),ds="%A, %e de %B de %Y, %X",ms="%d/%m/%Y",gs="%H:%M:%S",ps=["AM","PM"],vs=["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],ys=["dg.","dl.","dt.","dc.","dj.","dv.","ds."],_s=["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],bs=["gen.","febr.","març","abr.","maig","juny","jul.","ag.","set.","oct.","nov.","des."],xs={dateTime:ds,date:ms,time:gs,periods:ps,days:vs,shortDays:ys,months:_s,shortMonths:bs},Ms=Object.freeze({dateTime:ds,date:ms,time:gs,periods:ps,days:vs,shortDays:ys,months:_s,shortMonths:bs,default:xs}),ws="%A, der %e. %B %Y, %X",ks="%d.%m.%Y",Ns="%H:%M:%S",Ts=["AM","PM"],Ss=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],As=["So","Mo","Di","Mi","Do","Fr","Sa"],Cs=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],zs=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],Ds={dateTime:ws,date:ks,time:Ns,periods:Ts,days:Ss,shortDays:As,months:Cs,shortMonths:zs},js=Object.freeze({dateTime:ws,date:ks,time:Ns,periods:Ts,days:Ss,shortDays:As,months:Cs,shortMonths:zs,default:Ds}),Fs="%A, der %e. %B %Y, %X",Ps="%d.%m.%Y",Os="%H:%M:%S",Es=["AM","PM"],Ls=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],Us=["So","Mo","Di","Mi","Do","Fr","Sa"],Ys=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],Is=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],Hs={dateTime:Fs,date:Ps,time:Os,periods:Es,days:Ls,shortDays:Us,months:Ys,shortMonths:Is},Rs=Object.freeze({dateTime:Fs,date:Ps,time:Os,periods:Es,days:Ls,shortDays:Us,months:Ys,shortMonths:Is,default:Hs}),Bs="%a %b %e %X %Y",Ws="%Y-%m-%d",Js="%H:%M:%S",qs=["AM","PM"],Xs=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Ks=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Vs=["January","February","March","April","May","June","July","August","September","October","November","December"],Gs=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],$s={dateTime:Bs,date:Ws,time:Js,periods:qs,days:Xs,shortDays:Ks,months:Vs,shortMonths:Gs},Zs=Object.freeze({dateTime:Bs,date:Ws,time:Js,periods:qs,days:Xs,shortDays:Ks,months:Vs,shortMonths:Gs,default:$s}),Qs="%a %e %b %X %Y",tl="%d/%m/%Y",nl="%H:%M:%S",el=["AM","PM"],rl=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],il=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],al=["January","February","March","April","May","June","July","August","September","October","November","December"],ol=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ul={dateTime:Qs,date:tl,time:nl,periods:el,days:rl,shortDays:il,months:al,shortMonths:ol},sl=Object.freeze({dateTime:Qs,date:tl,time:nl,periods:el,days:rl,shortDays:il,
	months:al,shortMonths:ol,default:ul}),ll="%a %b %e %X %Y",cl="%m/%d/%Y",hl="%H:%M:%S",fl=["AM","PM"],dl=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ml=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],gl=["January","February","March","April","May","June","July","August","September","October","November","December"],pl=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],vl={dateTime:ll,date:cl,time:hl,periods:fl,days:dl,shortDays:ml,months:gl,shortMonths:pl},yl=Object.freeze({dateTime:ll,date:cl,time:hl,periods:fl,days:dl,shortDays:ml,months:gl,shortMonths:pl,default:vl}),_l="%A, %e de %B de %Y, %X",bl="%d/%m/%Y",xl="%H:%M:%S",Ml=["AM","PM"],wl=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],kl=["dom","lun","mar","mié","jue","vie","sáb"],Nl=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],Tl=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],Sl={dateTime:_l,date:bl,time:xl,periods:Ml,days:wl,shortDays:kl,months:Nl,shortMonths:Tl},Al=Object.freeze({dateTime:_l,date:bl,time:xl,periods:Ml,days:wl,shortDays:kl,months:Nl,shortMonths:Tl,default:Sl}),Cl="%A, %-d. %Bta %Y klo %X",zl="%-d.%-m.%Y",Dl="%H:%M:%S",jl=["a.m.","p.m."],Fl=["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],Pl=["Su","Ma","Ti","Ke","To","Pe","La"],Ol=["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],El=["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"],Ll={dateTime:Cl,date:zl,time:Dl,periods:jl,days:Fl,shortDays:Pl,months:Ol,shortMonths:El},Ul=Object.freeze({dateTime:Cl,date:zl,time:Dl,periods:jl,days:Fl,shortDays:Pl,months:Ol,shortMonths:El,default:Ll}),Yl="%a %e %b %Y %X",Il="%Y-%m-%d",Hl="%H:%M:%S",Rl=["",""],Bl=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],Wl=["dim","lun","mar","mer","jeu","ven","sam"],Jl=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ql=["jan","fév","mar","avr","mai","jui","jul","aoû","sep","oct","nov","déc"],Xl={dateTime:Yl,date:Il,time:Hl,periods:Rl,days:Bl,shortDays:Wl,months:Jl,shortMonths:ql},Kl=Object.freeze({dateTime:Yl,date:Il,time:Hl,periods:Rl,days:Bl,shortDays:Wl,months:Jl,shortMonths:ql,default:Xl}),Vl="%A, le %e %B %Y, %X",Gl="%d/%m/%Y",$l="%H:%M:%S",Zl=["AM","PM"],Ql=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],tc=["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],nc=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ec=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],rc={dateTime:Vl,date:Gl,time:$l,periods:Zl,days:Ql,shortDays:tc,months:nc,shortMonths:ec},ic=Object.freeze({dateTime:Vl,date:Gl,time:$l,periods:Zl,days:Ql,shortDays:tc,months:nc,shortMonths:ec,default:rc}),ac="%A, %e ב%B %Y %X",oc="%d.%m.%Y",uc="%H:%M:%S",sc=["AM","PM"],lc=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],cc=["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],hc=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],fc=["ינו׳","פבר׳","מרץ","אפר׳","מאי","יוני","יולי","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"],dc={dateTime:ac,date:oc,time:uc,periods:sc,days:lc,shortDays:cc,months:hc,shortMonths:fc},mc=Object.freeze({dateTime:ac,date:oc,time:uc,periods:sc,days:lc,shortDays:cc,months:hc,shortMonths:fc,default:dc}),gc="%Y. %B %-e., %A %X",pc="%Y. %m. %d.",vc="%H:%M:%S",yc=["de.","du."],_c=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],bc=["V","H","K","Sze","Cs","P","Szo"],xc=["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],Mc=["jan.","feb.","már.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."],wc={dateTime:gc,date:pc,time:vc,periods:yc,days:_c,shortDays:bc,months:xc,shortMonths:Mc},kc=Object.freeze({dateTime:gc,date:pc,time:vc,periods:yc,days:_c,shortDays:bc,months:xc,shortMonths:Mc,default:wc}),Nc="%A %e %B %Y, %X",Tc="%d/%m/%Y",Sc="%H:%M:%S",Ac=["AM","PM"],Cc=["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],zc=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],Dc=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],jc=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],Fc={dateTime:Nc,date:Tc,time:Sc,periods:Ac,days:Cc,shortDays:zc,months:Dc,shortMonths:jc},Pc=Object.freeze({dateTime:Nc,date:Tc,time:Sc,periods:Ac,days:Cc,shortDays:zc,months:Dc,shortMonths:jc,default:Fc}),Oc="%Y %b %e %a %X",Ec="%Y/%m/%d",Lc="%H:%M:%S",Uc=["AM","PM"],Yc=["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],Ic=["日","月","火","水","木","金","土"],Hc=["睦月","如月","弥生","卯月","皐月","水無月","文月","葉月","長月","神無月","霜月","師走"],Rc=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Bc={dateTime:Oc,date:Ec,time:Lc,periods:Uc,days:Yc,shortDays:Ic,months:Hc,shortMonths:Rc},Wc=Object.freeze({dateTime:Oc,date:Ec,time:Lc,periods:Uc,days:Yc,shortDays:Ic,months:Hc,shortMonths:Rc,default:Bc}),Jc="%Y/%m/%d %a %X",qc="%Y/%m/%d",Xc="%H:%M:%S",Kc=["오전","오후"],Vc=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],Gc=["일","월","화","수","목","금","토"],$c=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],Zc=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],Qc={dateTime:Jc,date:qc,time:Xc,periods:Kc,days:Vc,shortDays:Gc,months:$c,shortMonths:Zc},th=Object.freeze({dateTime:Jc,date:qc,time:Xc,periods:Kc,days:Vc,shortDays:Gc,months:$c,shortMonths:Zc,default:Qc}),nh="%A, %e %B %Y г. %X",eh="%d.%m.%Y",rh="%H:%M:%S",ih=["AM","PM"],ah=["недела","понеделник","вторник","среда","четврток","петок","сабота"],oh=["нед","пон","вто","сре","чет","пет","саб"],uh=["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],sh=["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек"],lh={dateTime:nh,date:eh,time:rh,periods:ih,days:ah,shortDays:oh,months:uh,shortMonths:sh},ch=Object.freeze({dateTime:nh,date:eh,time:rh,periods:ih,days:ah,shortDays:oh,months:uh,shortMonths:sh,default:lh}),hh="%a %e %B %Y %T",fh="%d-%m-%Y",dh="%H:%M:%S",mh=["AM","PM"],gh=["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],ph=["zo","ma","di","wo","do","vr","za"],vh=["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],yh=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],_h={dateTime:hh,date:fh,time:dh,periods:mh,days:gh,shortDays:ph,months:vh,shortMonths:yh},bh=Object.freeze({dateTime:hh,date:fh,time:dh,periods:mh,days:gh,shortDays:ph,months:vh,shortMonths:yh,default:_h}),xh="%A, %e %B %Y, %X",Mh="%d/%m/%Y",wh="%H:%M:%S",kh=["AM","PM"],Nh=["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],Th=["Niedz.","Pon.","Wt.","Śr.","Czw.","Pt.","Sob."],Sh=["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],Ah=["Stycz.","Luty","Marz.","Kwie.","Maj","Czerw.","Lipc.","Sierp.","Wrz.","Paźdz.","Listop.","Grudz."],Ch={dateTime:xh,date:Mh,time:wh,periods:kh,days:Nh,shortDays:Th,months:Sh,shortMonths:Ah},zh=Object.freeze({dateTime:xh,date:Mh,time:wh,periods:kh,days:Nh,shortDays:Th,months:Sh,shortMonths:Ah,default:Ch}),Dh="%A, %e de %B de %Y. %X",jh="%d/%m/%Y",Fh="%H:%M:%S",Ph=["AM","PM"],Oh=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],Eh=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],Lh=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],Uh=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],Yh={dateTime:Dh,date:jh,time:Fh,periods:Ph,days:Oh,shortDays:Eh,months:Lh,shortMonths:Uh},Ih=Object.freeze({dateTime:Dh,date:jh,time:Fh,periods:Ph,days:Oh,shortDays:Eh,months:Lh,shortMonths:Uh,default:Yh}),Hh="%A, %e %B %Y г. %X",Rh="%d.%m.%Y",Bh="%H:%M:%S",Wh=["AM","PM"],Jh=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],qh=["вс","пн","вт","ср","чт","пт","сб"],Xh=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],Kh=["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],Vh={dateTime:Hh,date:Rh,time:Bh,periods:Wh,days:Jh,shortDays:qh,months:Xh,shortMonths:Kh},Gh=Object.freeze({dateTime:Hh,date:Rh,time:Bh,periods:Wh,days:Jh,shortDays:qh,months:Xh,shortMonths:Kh,default:Vh}),$h="%A den %d %B %Y %X",Zh="%Y-%m-%d",Qh="%H:%M:%S",tf=["fm","em"],nf=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],ef=["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],rf=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],af=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],of={dateTime:$h,date:Zh,time:Qh,periods:tf,days:nf,shortDays:ef,months:rf,shortMonths:af},uf=Object.freeze({dateTime:$h,date:Zh,time:Qh,periods:tf,days:nf,shortDays:ef,months:rf,shortMonths:af,default:of}),sf="%x %A %X",lf="%Y年%-m月%-d日",cf="%H:%M:%S",hf=["上午","下午"],ff=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],df=["周日","周一","周二","周三","周四","周五","周六"],mf=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],gf=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],pf={dateTime:sf,date:lf,time:cf,periods:hf,days:ff,shortDays:df,months:mf,shortMonths:gf},vf=Object.freeze({dateTime:sf,date:lf,time:cf,periods:hf,days:ff,shortDays:df,months:mf,shortMonths:gf,default:pf}),yf={ca_ES:Ms,de_CH:js,de_DE:Rs,en_CA:Zs,en_GB:sl,en_US:yl,es_ES:Al,fi_FI:Ul,fr_CA:Kl,fr_FR:ic,he_IL:mc,hu_HU:kc,it_IT:Pc,ja_JP:Wc,ko_KR:th,mk_MK:ch,nl_NL:bh,pl_PL:zh,pt_BR:Ih,ru_RU:Gh,sv_SE:uf,zh_CN:vf},_f=Xe(yf),bf=",",xf=".",Mf=[3],wf=[""," €"],kf={decimal:bf,thousands:xf,grouping:Mf,currency:wf},Nf=Object.freeze({decimal:bf,thousands:xf,grouping:Mf,currency:wf,default:kf}),Tf=",",Sf=" ",Af=[3],Cf=[""," Kč"],zf={decimal:Tf,thousands:Sf,grouping:Af,currency:Cf},Df=Object.freeze({decimal:Tf,thousands:Sf,grouping:Af,currency:Cf,default:zf}),jf=",",Ff="'",Pf=[3],Of=[""," CHF"],Ef={decimal:jf,thousands:Ff,grouping:Pf,currency:Of},Lf=Object.freeze({decimal:jf,thousands:Ff,grouping:Pf,currency:Of,default:Ef}),Uf=",",Yf=".",If=[3],Hf=[""," €"],Rf={decimal:Uf,thousands:Yf,grouping:If,currency:Hf},Bf=Object.freeze({decimal:Uf,thousands:Yf,grouping:If,currency:Hf,default:Rf}),Wf=".",Jf=",",qf=[3],Xf=["$",""],Kf={decimal:Wf,thousands:Jf,grouping:qf,currency:Xf},Vf=Object.freeze({decimal:Wf,thousands:Jf,grouping:qf,currency:Xf,default:Kf}),Gf=".",$f=",",Zf=[3],Qf=["£",""],td={decimal:Gf,thousands:$f,grouping:Zf,currency:Qf},nd=Object.freeze({decimal:Gf,thousands:$f,grouping:Zf,currency:Qf,default:td}),ed=".",rd=",",id=[3],ad=["$",""],od={decimal:ed,thousands:rd,grouping:id,currency:ad},ud=Object.freeze({decimal:ed,thousands:rd,grouping:id,currency:ad,default:od}),sd=",",ld=".",cd=[3],hd=[""," €"],fd={decimal:sd,thousands:ld,grouping:cd,currency:hd},dd=Object.freeze({decimal:sd,thousands:ld,grouping:cd,currency:hd,default:fd}),md=".",gd=",",pd=[3],vd=["$",""],yd={decimal:md,thousands:gd,grouping:pd,currency:vd},_d=Object.freeze({decimal:md,thousands:gd,grouping:pd,currency:vd,default:yd}),bd=",",xd=" ",Md=[3],wd=[""," €"],kd={decimal:bd,thousands:xd,grouping:Md,currency:wd},Nd=Object.freeze({decimal:bd,thousands:xd,grouping:Md,currency:wd,default:kd}),Td=",",Sd=" ",Ad=[3],Cd=["","$"],zd={decimal:Td,thousands:Sd,grouping:Ad,currency:Cd},Dd=Object.freeze({decimal:Td,thousands:Sd,grouping:Ad,currency:Cd,default:zd}),jd=",",Fd=".",Pd=[3],Od=[""," €"],Ed={decimal:jd,thousands:Fd,grouping:Pd,currency:Od},Ld=Object.freeze({decimal:jd,thousands:Fd,grouping:Pd,currency:Od,default:Ed}),Ud=".",Yd=",",Id=[3],Hd=["₪",""],Rd={decimal:Ud,thousands:Yd,grouping:Id,currency:Hd},Bd=Object.freeze({decimal:Ud,thousands:Yd,grouping:Id,currency:Hd,default:Rd}),Wd=",",Jd=" ",qd=[3],Xd=[""," Ft"],Kd={decimal:Wd,thousands:Jd,grouping:qd,currency:Xd},Vd=Object.freeze({decimal:Wd,thousands:Jd,grouping:qd,currency:Xd,default:Kd}),Gd=",",$d=".",Zd=[3],Qd=["€",""],tm={decimal:Gd,thousands:$d,grouping:Zd,currency:Qd},nm=Object.freeze({decimal:Gd,thousands:$d,grouping:Zd,currency:Qd,default:tm}),em=".",rm=",",im=[3],am=["","円"],om={decimal:em,thousands:rm,grouping:im,currency:am},um=Object.freeze({decimal:em,thousands:rm,grouping:im,currency:am,default:om}),sm=".",lm=",",cm=[3],hm=["₩",""],fm={decimal:sm,thousands:lm,grouping:cm,currency:hm},dm=Object.freeze({decimal:sm,thousands:lm,grouping:cm,currency:hm,default:fm}),mm=",",gm=".",pm=[3],vm=[""," ден."],ym={decimal:mm,thousands:gm,grouping:pm,currency:vm},_m=Object.freeze({decimal:mm,thousands:gm,grouping:pm,currency:vm,default:ym}),bm=",",xm=".",Mm=[3],wm=["€ ",""],km={decimal:bm,thousands:xm,grouping:Mm,currency:wm},Nm=Object.freeze({decimal:bm,thousands:xm,grouping:Mm,currency:wm,default:km}),Tm=",",Sm=".",Am=[3],Cm=["","zł"],zm={decimal:Tm,thousands:Sm,grouping:Am,currency:Cm},Dm=Object.freeze({decimal:Tm,thousands:Sm,grouping:Am,currency:Cm,default:zm}),jm=",",Fm=".",Pm=[3],Om=["R$",""],Em={decimal:jm,thousands:Fm,grouping:Pm,currency:Om},Lm=Object.freeze({decimal:jm,thousands:Fm,grouping:Pm,currency:Om,default:Em}),Um=",",Ym=" ",Im=[3],Hm=[""," руб."],Rm={decimal:Um,thousands:Ym,grouping:Im,currency:Hm},Bm=Object.freeze({decimal:Um,thousands:Ym,grouping:Im,currency:Hm,default:Rm}),Wm=",",Jm=" ",qm=[3],Xm=["","SEK"],Km={decimal:Wm,thousands:Jm,grouping:qm,currency:Xm},Vm=Object.freeze({decimal:Wm,thousands:Jm,grouping:qm,currency:Xm,default:Km}),Gm=".",$m=",",Zm=[3],Qm=["¥",""],tg={decimal:Gm,thousands:$m,grouping:Zm,currency:Qm},ng=Object.freeze({decimal:Gm,thousands:$m,grouping:Zm,currency:Qm,default:tg}),eg={ca_ES:Nf,cs_CZ:Df,de_CH:Lf,de_DE:Bf,en_CA:Vf,en_GB:nd,en_US:ud,es_ES:dd,es_MX:_d,fi_FI:Nd,fr_CA:Dd,fr_FR:Ld,he_IL:Bd,hu_HU:Vd,it_IT:nm,ja_JP:um,ko_KR:dm,mk_MK:_m,nl_NL:Nm,pl_PL:Dm,pt_BR:Lm,ru_RU:Bm,sv_SE:Vm,zh_CN:ng},rg=Xe(eg),ig={value:function(){}};Ze.prototype=$e.prototype={constructor:Ze,on:function(t,n){var e,r=this._,i=Qe(t+"",r),a=-1,o=i.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++a<o;)if(e=(t=i[a]).type)r[e]=nr(r[e],t.name,n);else if(null==n)for(e in r)r[e]=nr(r[e],t.name,null);return this}for(;++a<o;)if((e=(t=i[a]).type)&&(e=tr(r[e],t.name)))return e}},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new Ze(t)},call:function(t,n){var e=arguments;if((r=arguments.length-2)>0)for(var r,i,a=new Array(r),o=0;o<r;++o)a[o]=e[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(i=this._[t],o=0,r=i.length;o<r;++o)i[o].value.apply(n,a)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,a=r.length;i<a;++i)r[i].value.apply(n,e)}};var ag,og,ug=0,sg=0,lg=0,cg=1e3,hg=0,fg=0,dg=0,mg="object"==typeof performance&&performance.now?performance:Date,gg="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){setTimeout(t,17)};ir.prototype=ar.prototype={constructor:ir,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?er():+e)+(null==n?0:+n),this._next||og===this||(og?og._next=this:ag=this,og=this),this._call=t,this._time=e,cr()},stop:function(){this._call&&(this._call=null,this._time=1/0,cr())}};var pg=function(t,n,e){var r=new ir;return n=null==n?0:+n,r.restart(function(e){r.stop(),t(e+n)},n,e),r},vg=$e("start","end","interrupt"),yg=[],_g=0,bg=1,xg=2,Mg=3,wg=4,kg=5,Ng=6,Tg=function(t,n,e,r,i,a){var o=t.__transition;if(o){if(e in o)return}else t.__transition={};mr(t,e,{name:n,index:r,group:i,on:vg,tween:yg,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:_g})},Sg=function(t,n){var e,r,i,a=t.__transition,o=!0;if(a){n=null==n?null:n+"";for(i in a)(e=a[i]).name===n?(r=e.state===Mg,e.state=Ng,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete a[i]):o=!1;o&&delete t.__transition}},Ag=function(t){return this.each(function(){Sg(this,t)})},Cg=function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=dr(this.node(),e).tween,a=0,o=i.length;a<o;++a)if((r=i[a]).name===t)return r.value;return null}return this.each((null==n?gr:pr)(e,t,n))},zg=function(t,n){var e;return("number"==typeof n?Ka:n instanceof K?Ja:(e=K(n))?(n=e,Ja):Za)(t,n)},Dg=function(t,e){var r=n.namespace(t),i="transform"===r?ao:zg;return this.attrTween(t,"function"==typeof e?(r.local?wr:Mr)(r,i,vr(this,"attr."+t,e)):null==e?(r.local?_r:yr)(r):(r.local?xr:br)(r,i,e))},jg=function(t,e){var r="attr."+t;if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==e)return this.tween(r,null);if("function"!=typeof e)throw new Error;var i=n.namespace(t);return this.tween(r,(i.local?kr:Nr)(i,e))},Fg=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?Tr:Sr)(n,t)):dr(this.node(),n).delay},Pg=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?Ar:Cr)(n,t)):dr(this.node(),n).duration},Og=function(t){var n=this._id;return arguments.length?this.each(zr(n,t)):dr(this.node(),n).ease},Eg=function(t){"function"!=typeof t&&(t=n.matcher(t));for(var e=this._groups,r=e.length,i=new Array(r),a=0;a<r;++a)for(var o,u=e[a],s=u.length,l=i[a]=[],c=0;c<s;++c)(o=u[c])&&t.call(o,o.__data__,c,u)&&l.push(o);return new Hr(i,this._parents,this._name,this._id)},Lg=function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,a=Math.min(r,i),o=new Array(r),u=0;u<a;++u)for(var s,l=n[u],c=e[u],h=l.length,f=o[u]=new Array(h),d=0;d<h;++d)(s=l[d]||c[d])&&(f[d]=s);for(;u<r;++u)o[u]=n[u];return new Hr(o,this._parents,this._name,this._id)},Ug=function(t,n){var e=this._id;return arguments.length<2?dr(this.node(),e).on.on(t):this.each(jr(e,t,n))},Yg=function(){return this.on("end.remove",Fr(this._id))},Ig=function(t){var e=this._name,r=this._id;"function"!=typeof t&&(t=n.selector(t));for(var i=this._groups,a=i.length,o=new Array(a),u=0;u<a;++u)for(var s,l,c=i[u],h=c.length,f=o[u]=new Array(h),d=0;d<h;++d)(s=c[d])&&(l=t.call(s,s.__data__,d,c))&&("__data__"in s&&(l.__data__=s.__data__),f[d]=l,Tg(f[d],e,r,d,f,dr(s,r)));return new Hr(o,this._parents,e,r)},Hg=function(t){var e=this._name,r=this._id;"function"!=typeof t&&(t=n.selectorAll(t));for(var i=this._groups,a=i.length,o=[],u=[],s=0;s<a;++s)for(var l,c=i[s],h=c.length,f=0;f<h;++f)if(l=c[f]){for(var d,m=t.call(l,l.__data__,f,c),g=dr(l,r),p=0,v=m.length;p<v;++p)(d=m[p])&&Tg(d,e,r,p,m,g);o.push(m),u.push(l)}return new Hr(o,u,e,r)},Rg=n.selection.prototype.constructor,Bg=function(){return new Rg(this._groups,this._parents)},Wg=function(t,n,e){var r="transform"==(t+="")?io:zg;return null==n?this.styleTween(t,Pr(t,r)).on("end.style."+t,Or(t)):this.styleTween(t,"function"==typeof n?Lr(t,r,vr(this,"style."+t,n)):Er(t,r,n),e)},Jg=function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,Ur(t,n,null==e?"":e))},qg=function(t){return this.tween("text","function"==typeof t?Ir(vr(this,"text",t)):Yr(null==t?"":t+""))},Xg=function(){for(var t=this._name,n=this._id,e=Br(),r=this._groups,i=r.length,a=0;a<i;++a)for(var o,u=r[a],s=u.length,l=0;l<s;++l)if(o=u[l]){var c=dr(o,n);Tg(o,t,e,l,u,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new Hr(r,this._parents,t,e)},Kg=0,Vg=n.selection.prototype;Hr.prototype=Rr.prototype={constructor:Hr,select:Ig,selectAll:Hg,filter:Eg,merge:Lg,selection:Bg,transition:Xg,call:Vg.call,nodes:Vg.nodes,node:Vg.node,size:Vg.size,empty:Vg.empty,each:Vg.each,on:Ug,attr:Dg,attrTween:jg,style:Wg,styleTween:Jg,text:qg,remove:Yg,tween:Cg,delay:Fg,duration:Pg,ease:Og};var Gg=3,$g=(function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(Gg),function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(Gg),function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(Gg),1.70158),Zg=(function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e}($g),function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}($g),function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}($g),2*Math.PI),Qg=1,tp=.3,np=(function t(n,e){function r(t){return n*Math.pow(2,10*--t)*Math.sin((i-t)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Zg);return r.amplitude=function(n){return t(n,e*Zg)},r.period=function(e){return t(n,e)},r}(Qg,tp),function t(n,e){function r(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+i)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Zg);return r.amplitude=function(n){return t(n,e*Zg)},r.period=function(e){return t(n,e)},r}(Qg,tp),function t(n,e){function r(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((i-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((i+t)/e))/2}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Zg);return r.amplitude=function(n){return t(n,e*Zg)},r.period=function(e){return t(n,e)},r}(Qg,tp),{time:null,delay:0,duration:250,ease:Wr}),ep=function(t){var n,e;t instanceof Hr?(n=t._id,t=t._name):(n=Br(),(e=np).time=er(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var o,u=r[a],s=u.length,l=0;l<s;++l)(o=u[l])&&Tg(o,t,n,l,u,e||Jr(o,n));return new Hr(r,this._parents,t,n)};n.selection.prototype.interrupt=Ag,n.selection.prototype.transition=ep;var rp=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],ip=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],ap=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],op={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},up={standard:ip,darker:rp,lighter:ap,names:op},sp={light:{background:"#ffffff",text:"#262626",axis:"#262626",grid:"#e0e0e0",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.3)",shadow:"rgba(127,127,127,0.4)",fillOpacity:.33,negative:{background:"rgba(0, 0, 0, 0.66)",text:"#ffffff"}},dark:{background:"#333333",text:"#ffffff",axis:"#ffffff",grid:"#6d6d6d",highlight:"rgba(225,16,16,0.5)",lowlight:"rgba(127,127,127,0.5)",shadow:"rgba(255,255,255,0.4)",fillOpacity:.33,negative:{background:"rgba(255, 255, 255, 0.85)",text:"#262626"}}},lp=1,cp={outline:.5,data:2.5,axis:1,grid:2},hp={grid:"2,2"},fp='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',dp={fixed:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",weightMonochrome:300,weightColor:500,sizeForWidth:Xr,family:'"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace'},variable:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",weightMonochrome:400,weightColor:500,sizeForWidth:Xr,family:'"Raleway", "Trebuchet MS", '+fp},brand:{cssImport:"@import url(https://fonts.googleapis.com/css?family=Electrolize);",weightMonochrome:400,weightColor:400,sizeForWidth:Xr,family:'"Electrolize", '+fp}},mp=800,gp={timeMillisecond:[Fo,1],timeTnMillisecond:[Fo,10],timeHnMillisecond:[Fo,100],timeSecond:[Yo,1],timeTnSecond:[Yo,10],timeMinute:[Io,1],timeHour:[Ho,1],timeDay:[Ro,1],timeBiDay:[Ro,2],timeSunday:[Bo,1],timeMonday:[Wo,1],timeTuesday:[Jo,1],timeWednesday:[qo,1],timeThursday:[Xo,1],timeFriday:[Ko,1],timeSaturday:[Vo,1],timeWeek:[Bo,1],timeBiWeek:[Bo,2],timeMonth:[Go,1],timeBiMonth:[Go,2],timeQtYear:[Go,3],timeYear:[$o,1],timeBiYear:[$o,2],timeDecade:[$o,10],utcMillisecond:[Fo,1],utcTnMillisecond:[Fo,10],utcHnMillisecond:[Fo,100],utcSecond:[Yo,1],utcTnSecond:[Yo,10],utcMinute:[Zo,1],utcHour:[Qo,1],utcDay:[tu,1],utcBiDay:[tu,2],utcSunday:[nu,1],utcMonday:[eu,1],utcTuesday:[ru,1],utcWednesday:[iu,1],utcThursday:[au,1],utcFriday:[ou,1],utcSaturday:[uu,1],utcWeek:[nu,1],utcBiWeek:[nu,2],utcMonth:[su,1],utcBiMonth:[su,2],utcQtYear:[su,3],utcYear:[lu,1],utcBiYear:[lu,2],utcDecade:[lu,10]},pp={curveBasis:Ci,curveCardinal:zi,curveCatmullRom:Di,curveMonotoneX:S,curveMonotoneY:A,curveNatural:ji,curveStep:Fi,curveStepAfter:F,curveStepBefore:j},vp={symbolCircle:li,symbolCross:ci,symbolDiamond:di,symbolSquare:_i,symbolStar:yi,symbolTriangle:xi,symbolWye:Ti},yp={stackOffsetExpand:Ui,stackOffsetNone:Oi,stackOffsetSilhouette:Yi,stackOffsetWiggle:Ii},_p={stackOrderAscending:Hi,stackOrderDescending:Ri,stackOrderInsideOut:Bi,stackOrderNone:Ei,stackOrderReverse:Wi},bp=420,xp=160/420,Mp=26,wp=24,kp=6,Np=Math.ceil(kp*xp),Tp=32,Sp=42,Ap=8,Cp=8,zp=4,Dp=4,jp=4,Fp=4;t.version=$r,t.html=Gr,t.timeIntervals=gp,t.timeMultiFormat=Vr,Object.defineProperty(t,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-lines.umd-es2015.min.js.map


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,a){ true?a(exports,__webpack_require__(120),__webpack_require__(130)):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-shape"],a):a(e.d3_rs_pies=e.d3_rs_pies||{},e.d3,e.d3)}(this,function(e,a,t){"use strict";function n(e,a){if((t=(e=a?e.toExponential(a-1):e.toExponential()).indexOf("e"))<0)return null;var t,n=e.slice(0,t);return[n.length>1?n[0]+n.slice(2):n,+e.slice(t+1)]}function r(e){return e=n(Math.abs(e)),e?e[1]:NaN}function i(e,a){return function(t,n){for(var r=t.length,i=[],o=0,s=e[0],u=0;r>0&&s>0&&(u+s+1>n&&(s=Math.max(1,n-u)),i.push(t.substring(r-=s,r+s)),!((u+=s+1)>n));)s=e[o=(o+1)%e.length];return i.reverse().join(a)}}function o(e,a){e=e.toPrecision(a);e:for(var t,n=e.length,r=1,i=-1;r<n;++r)switch(e[r]){case".":i=t=r;break;case"0":0===i&&(i=r),t=r;break;case"e":break e;default:i>0&&(i=0)}return i>0?e.slice(0,i)+e.slice(t+1):e}function s(e,a){var t=n(e,a);if(!t)return e+"";var r=t[0],i=t[1],o=i-(j=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,s=r.length;return o===s?r:o>s?r+new Array(o-s+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+n(e,Math.max(0,a+o-1))[0]}function u(e,a){var t=n(e,a);if(!t)return e+"";var r=t[0],i=t[1];return i<0?"0."+new Array((-i)).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}function m(e){return new d(e)}function d(e){if(!(a=w.exec(e)))throw new Error("invalid format: "+e);var a,t=a[1]||" ",n=a[2]||">",r=a[3]||"-",i=a[4]||"",o=!!a[5],s=a[6]&&+a[6],u=!!a[7],m=a[8]&&+a[8].slice(1),d=a[9]||"";"n"===d?(u=!0,d="g"):z[d]||(d=""),(o||"0"===t&&"="===n)&&(o=!0,t="0",n="="),this.fill=t,this.align=n,this.sign=r,this.symbol=i,this.zero=o,this.width=s,this.comma=u,this.precision=m,this.type=d}function l(e){return e}function c(e){function a(e){function a(e){var a,o,u,m=g,b=v;if("c"===f)b=p(e)+b,e="";else{e=+e;var N=(e<0||1/e<0)&&(e*=-1,!0);if(e=p(e,h),N)for(a=-1,o=e.length,N=!1;++a<o;)if(u=e.charCodeAt(a),48<u&&u<58||"x"===f&&96<u&&u<103||"X"===f&&64<u&&u<71){N=!0;break}if(m=(N?"("===i?i:"-":"-"===i||"("===i?"":i)+m,b=b+("s"===f?O[8+j/3]:"")+(N&&"("===i?")":""),y)for(a=-1,o=e.length;++a<o;)if(u=e.charCodeAt(a),48>u||u>57){b=(46===u?s+e.slice(a+1):e.slice(a))+b,e=e.slice(0,a);break}}c&&!d&&(e=n(e,1/0));var M=m.length+e.length+b.length,S=M<l?new Array(l-M+1).join(t):"";switch(c&&d&&(e=n(S+e,S.length?l-b.length:1/0),S=""),r){case"<":return m+e+b+S;case"=":return m+S+e+b;case"^":return S.slice(0,M=S.length>>1)+m+e+b+S.slice(M)}return S+m+e+b}e=m(e);var t=e.fill,r=e.align,i=e.sign,u=e.symbol,d=e.zero,l=e.width,c=e.comma,h=e.precision,f=e.type,g="$"===u?o[0]:"#"===u&&/[boxX]/.test(f)?"0"+f.toLowerCase():"",v="$"===u?o[1]:/[%p]/.test(f)?"%":"",p=z[f],y=!f||/[defgprs%]/.test(f);return h=null==h?f?6:12:/[gprs]/.test(f)?Math.max(1,Math.min(21,h)):Math.max(0,Math.min(20,h)),a.toString=function(){return e+""},a}function t(e,t){var n=a((e=m(e),e.type="f",e)),i=3*Math.max(-8,Math.min(8,Math.floor(r(t)/3))),o=Math.pow(10,-i),s=O[8+i/3];return function(e){return n(o*e)+s}}var n=e.grouping&&e.thousands?i(e.grouping,e.thousands):l,o=e.currency,s=e.decimal;return{format:a,formatPrefix:t}}function h(e){return x=c(e),T=x.format,D=x.formatPrefix,x}function f(e){function t(){h=i-d-u}function n(){f=o-s-m}function r(t){var n=t.selection?t.selection():t,u=void 0!==t.selection;n.each(function(){var n=a.select(this),m=n.select(r.self());m.empty()&&(m=n.append("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("preserveAspectRatio","xMidYMid meet").attr("id",e),m.append("defs"),m.append("g").attr("class","svg-child"));var c=m.select("defs"),h=c.selectAll("style").data(g?[g]:[]);h.exit().remove(),h=h.enter().append("style").attr("type","text/css").merge(h),h.text(g);var f=m.select(r.child());m.attr("class",v),u===!0&&(m=m.transition(t),f=f.transition(t)),m.attr("width",i*l).attr("height",o*l).attr("viewBox","0 0 "+i+" "+o),f.attr("transform","translate("+d+","+s+")")})}var i=300,o=150,s=16,u=16,m=16,d=16,l=1,c="g.svg-child",h=-1,f=-1,g=null,v="svg-svg";return t(),n(),r.self=function(){return"svg"+(e?"#"+e:"")},r.child=function(){return c},r.childDefs=function(){return"defs"},r.childWidth=function(){return h},r.childHeight=function(){return f},r.id=function(){return e},r.classed=function(e){return arguments.length?(v=e,r):v},r.style=function(e){return arguments.length?(g=e,r):g},r.width=function(e){return arguments.length?(i=e,t(),r):i},r.height=function(e){return arguments.length?(o=e,n(),r):i},r.scale=function(e){return arguments.length?(l=e,r):l},r.margin=function(e){return arguments.length?(void 0!==e.top?(s=e.top,u=e.right,m=e.bottom,d=e.left):(s=e,u=e,m=e,d=e),t(),n(),r):{top:s,right:u,bottom:m,left:d}},r}function g(e){var a={};return Object.keys(e).forEach(function(t){var n=t.split("_");n[0]===n[1].toLowerCase()&&(a[n[0]]=e[t]),a[t]=e[t]}),Object.keys(C).forEach(function(t){a[t]=e[C[t]]}),a}function v(e){var a=e;return null==a?"undefined"!=typeof navigator?(a=navigator.languages,null==a&&(a=[navigator.userLanguage||navigator.language])):a=["en"]:Array.isArray(a)||(a=[a]),a.map(function(e){return e.replace("-","_")})}function p(e){for(var a=v(e),t=0;t<a.length;++t){var n=a[t],r=jo[n];if(r)return{d3:r,iso639:n.replace("_","-")}}return{d3:ko.en_US,iso639:"en-US"}}function y(e){function t(){var t=a.select(document.createElement("div"));return t.attr("id",e).classed(j,!0).style("position","absolute").style("top",0).style("left",0).style("opacity",0).style("pointer-events","none").style("box-sizing","border-box"),t.node()}function n(e){if(e=e.node())return"svg"===e.tagName.toLowerCase()?e:e.ownerSVGElement}function r(){return null===A&&(A=t(),T.appendChild(A)),a.select(A)}function i(e){if(z=n(e)){w=z.createSVGPoint(),z=a.select(z),z.append("defs");var t=z.select("defs"),r=t.selectAll("style").data(D?[D]:[]);r.exit().remove(),r=r.enter().append("style").attr("type","text/css").merge(r),r.text(D)}}function o(){var e=f();return{top:e.n.y-A.offsetHeight,left:e.n.x-A.offsetWidth/2}}function s(){var e=f();return{top:e.s.y,left:e.s.x-A.offsetWidth/2}}function u(){var e=f();return{top:e.e.y-A.offsetHeight/2,left:e.e.x}}function m(){var e=f();return{top:e.w.y-A.offsetHeight/2,left:e.w.x-A.offsetWidth}}function d(){var e=f();return{top:e.nw.y-A.offsetHeight,left:e.nw.x-A.offsetWidth}}function l(){var e=f();return{top:e.ne.y-A.offsetHeight,left:e.ne.x}}function c(){var e=f();return{top:e.sw.y,left:e.sw.x-A.offsetWidth}}function h(){var e=f();return{top:e.se.y,left:e.se.x}}function f(){for(var e=x||a.event.target;"undefined"==typeof e.getScreenCTM&&"undefined"===e.parentNode;)e=e.parentNode;var t={},n=e.getScreenCTM(),r=e.getBBox(),i=r.width,o=r.height,s=r.x,u=r.y;return w.x=s,w.y=u,t.nw=w.matrixTransform(n),w.x+=i,t.ne=w.matrixTransform(n),w.y+=o,t.se=w.matrixTransform(n),w.x-=i,t.sw=w.matrixTransform(n),w.y-=o/2,t.w=w.matrixTransform(n),w.x+=i,t.e=w.matrixTransform(n),w.x-=i/2,w.y-=o/2,t.n=w.matrixTransform(n),w.y+=o,t.s=w.matrixTransform(n),t}var g=function(e){return"function"==typeof e?e:function(){return e}},v=function(){return"n"},p=function(){return[0,0]},y=function(){return" "},b=function(e){return e instanceof Node},N=[".d3-tip {line-height: 1;font-family: 'Source Code Pro'; font-weight: bold;font-size: 0.66em;padding: 8px;background: rgba(0, 0, 0, 0.66);color: #fff;border-radius: 2px;pointer-events: none;}","/* Creates a small triangle extender for the tooltip */",".d3-tip:after {box-sizing: border-box;display: inline;font-size: 0.66em;width: 100%;line-height: 1;color: rgba(0, 0, 0, 0.66);position: absolute;pointer-events: none;}","/* Northward tooltips */",'.d3-tip.n:after {content: "\\25bc";margin: -1px 0 0 0;top: 100%;left: 0;text-align: center;}',"/* Eastward tooltips */",'.d3-tip.e:after {content: "\\25C0";margin: -4px 0 0 0;top: 50%;left: -8px;}',"/* Southward tooltips */",'.d3-tip.s:after {content: "\\25B2";margin: 0 0 1px 0;top: -7px;left: 0;text-align: center;}',"/* Westward tooltips */",'.d3-tip.w:after {content: "\\25B6";margin: -4px 0 0 -1px;top: 50%;left: 100%;}'].join("\n"),M=v,S=p,k=y,j="d3-tip",A=t(),z=null,w=null,x=null,T=null,D=N;i.self=function(){return"g"+(e?"#"+e:"."+j)},i.id=function(){return e},i.classed=function(e){return arguments.length?(j=e,i):j},i.show=function(){T||i.parent(document.body);var e=[].slice.call(arguments);x=this,1===e.length&&b(e[0])&&(x=e[0],e[0]=x.__data__);var a,t=k.apply(x,e),n=S.apply(x,e),o=M.apply(x,e),s=r(),u=_.length,m=A.offsetParent.getBoundingClientRect();for(s.html(t).style("opacity",1).style("pointer-events","all");u--;)s.classed(_[u],!1);return a=O[o].apply(x),s.classed(o,!0).style("top",a.top+n[0]-m.top+"px").style("left",a.left+n[1]-m.left+"px"),i},i.hide=function(){var e=r();return e.style("opacity",0).style("pointer-events","none"),i},i.attr=function(e){if(arguments.length<2&&"string"==typeof e)return r().attr(e);var t=[].slice.call(arguments);return a.selection.prototype.attr.apply(r(),t),i},i.direction=function(e){return arguments.length?(M=null==e?e:g(e),i):M},i.offset=function(e){return arguments.length?(S=null==e?e:g(e),i):S},i.html=function(e){return arguments.length?(k=null==e?e:g(e),i):k},i.destroy=function(){return A&&(r().remove(),A=null),i},i.style=function(e){return arguments.length?(D=e,i):D},i.parent=function(e){if(!arguments.length)return T;T=e||document.body,T.appendChild(A);var t=a.select(A.offsetParent);return"static"===t.style("position")&&t.style("position","relative"),i};var O={n:o,s:s,e:u,w:m,nw:d,ne:l,sw:c,se:h},_=Object.keys(O);return i}function b(e){var a=e[0]/255,t=e[1]/255,n=e[2]/255;a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92,t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var r=.4124*a+.3576*t+.1805*n,i=.2126*a+.7152*t+.0722*n,o=.0193*a+.1192*t+.9505*n;return[100*r,100*i,100*o]}function N(e){var a,t,n,r=b(e),i=r[0],o=r[1],s=r[2];return i/=95.047,o/=100,s/=108.883,i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,a=116*o-16,t=500*(i-o),n=200*(o-s),[a,t,n]}function M(e){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(a,function(e,a,t,n){return a+a+t+t+n+n});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]}function S(e,a){return a={exports:{}},e(a,a.exports),a.exports}function k(e){function n(e){return null==e?[]:Array.isArray(e)?e:[e]}function r(){var e=function(){return S};if(null==S){var a=Oo.standard;e=function(e,t){return a[t%a.length]}}else"function"==typeof S?e=S:Array.isArray(S)&&(e=function(e,a){return S[a%S.length]});return e}function i(n){var s=n.selection?n.selection():n,u=void 0!==n.selection;h(p(b).d3);var N=T(Eo),S=T(Io),C=T(Go),F=k;if(null==F)if(null!=j){var P=T(j);F=function(e){return P(e)}}else F=function(e){return 0===e?N(e):e>9999||e<=.001?S(e):e<1?C(e):N(e)};s.each(function(){var s=a.select(this),h=d||Math.round(m*Fo),p=null;e&&(p="svg-"+e);var b=f(p).width(m).height(h).margin(l).scale(g),N=s;u===!0&&(N=s.transition(n)),N.call(b);var S=s.select(b.self()),k=S.select("defs"),j=S.select(b.child()),T=null;e&&(T="tip-"+e);var C=y(T).html(function(e){return e}),P=c+" "+C.style();C.style(P),j.call(C);var J=j.select(i.self());J.empty()&&(J=j.append("g").attr("class",o).attr("id",e),J.append("g").attr("class","legend"),J.append("g").attr("class","pie"),k.append("path").attr("id","text-outer"),k.append("path").attr("id","text-inner"));var H=J.datum()||[1],Y=H.map(function(e,a){return _(e,a)});J.datum(Y);var B=b.childWidth(),L=b.childHeight();if(M.length>0){L-=Ho+Bo;var K=J.select("g.legend"),E=K.attr("transform","translate("+B/2+","+(L+Bo)+")").selectAll("g").data(M);E.exit().remove();var I=E.enter().append("g"),G=r();I.append("rect").attr("width",Ho).attr("height",Ho).attr("fill",G),I.append("text").attr("dominant-baseline","central").attr("y",Ho/2).attr("x",function(){return Ho+Yo}),E=I.merge(E),E.selectAll("text").text(function(e){return e});var X=M.map(function(e){return e.length*Lo+Ho+2*Yo}),R=[],W=X.reduce(function(e,a){return R.push(e),e+a},0),U=-W/2;K.selectAll("g").data(R).attr("transform",function(e){return"translate("+(U+e)+",0)"})}var V=r(),$=z;null==$&&($=(Math.min(B,L)-2*v)/2);var q=A;q<0&&(q=(1+q)*$);var Q=t.arc().innerRadius(q).outerRadius($).cornerRadius(null!==O?O:D>0?Ko:0),Z=t.pie().sortValues(null).sort(null).padAngle(D).startAngle(w).endAngle(x),ee=B/2,ae=J.select("g.pie").attr("transform","translate("+ee+","+($+v)+")").selectAll("g.slice").data(Z(Y));ae.exit().remove();var te=ae.enter().append("g").attr("class","slice");te.append("path"),te.append("text").attr("text-anchor","middle").attr("dominant-baseline","middle"),ae=te.merge(ae);var ne=ae.selectAll("path").data(function(e){return[e]});ne.attr("d",Q).attr("fill",function(e){return V(e.data,e.index)});var re=ae.selectAll("text").data(function(e){return[e]});re.attr("transform",function(e){return e.innerRadius=q,e.outerRadius=z,"translate("+Q.centroid(e)+")"}).attr("fill",function(e){return zo.white(V(e.data,e.index))?_o.text.white:_o.text.black}).text(function(e){var a=H[e.index].l||F(e.value);return e.endAngle-e.startAngle<.1?null:a})})}var o="chart-pies",s="light",u=null,m=Co,d=null,l=Po,c=Xo,g=1,v=Jo,b=null,N=-1,M=[],S=null,k=null,j=null,A=0,z=null,w=0,x=2*Math.PI,D=0,O=null,_=function(e){return Array.isArray(e)?e:"object"==typeof e?e.v:e};return i.self=function(){return"g"+(e?"#"+e:"."+o)},i.id=function(){return e},i.classed=function(e){return arguments.length?(o=e,i):o},i.background=function(e){return arguments.length?(u=e,i):u},i.theme=function(e){return arguments.length?(s=e,i):s},i.size=function(e){return arguments.length?(m=e,d=null,i):m},i.width=function(e){return arguments.length?(m=e,i):m},i.height=function(e){return arguments.length?(d=e,i):d},i.scale=function(e){return arguments.length?(g=e,i):g},i.margin=function(e){return arguments.length?(l=e,i):l},i.inset=function(e){return arguments.length?(v=e,i):v},i.style=function(e){return arguments.length?(c=e,i):c},i.value=function(e){return arguments.length?(_=e,i):_},i.language=function(e){return arguments.length?(b=e,i):b},i.legend=function(e){return arguments.length?(M=n(e),i):M},i.displayTip=function(e){return arguments.length?(N=e,i):N},i.fill=function(e){return arguments.length?(S=e,i):S},i.startAngle=function(e){return arguments.length?(w=e,i):w},i.endAngle=function(e){return arguments.length?(x=e,i):x},i.padAngle=function(e){return arguments.length?(D=e,i):D},i.cornerRadius=function(e){return arguments.length?(O=e,i):O},i.outerRadius=function(e){return arguments.length?(z=e,i):z},i.innerRadius=function(e){return arguments.length?(A=e,i):A},i.displayValue=function(e){return arguments.length?(k=e,i):k},i.displayFormatValue=function(e){return arguments.length?(j=e,i):j},i}var j,A="0.0.2",z={"":o,"%":function(e,a){return(100*e).toFixed(a)},b:function(e){return Math.round(e).toString(2)},c:function(e){return e+""},d:function(e){return Math.round(e).toString(10)},e:function(e,a){return e.toExponential(a)},f:function(e,a){return e.toFixed(a)},g:function(e,a){return e.toPrecision(a)},o:function(e){return Math.round(e).toString(8)},p:function(e,a){return u(100*e,a)},r:u,s:s,X:function(e){return Math.round(e).toString(16).toUpperCase()},x:function(e){return Math.round(e).toString(16)}},w=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;d.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var x,T,D,O=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];h({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var _={ab:{name:"Abkhaz",nativeName:"аҧсуа"},aa:{name:"Afar",nativeName:"Afaraf"},af:{name:"Afrikaans",nativeName:"Afrikaans"},ak:{name:"Akan",nativeName:"Akan"},sq:{name:"Albanian",nativeName:"Shqip"},am:{name:"Amharic",nativeName:"አማርኛ"},ar:{name:"Arabic",nativeName:"العربية"},an:{name:"Aragonese",nativeName:"Aragonés"},hy:{name:"Armenian",nativeName:"Հայերեն"},as:{name:"Assamese",nativeName:"অসমীয়া"},av:{name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},ae:{name:"Avestan",nativeName:"avesta"},ay:{name:"Aymara",nativeName:"aymar aru"},az:{name:"Azerbaijani",nativeName:"azərbaycan dili"},bm:{name:"Bambara",nativeName:"bamanankan"},ba:{name:"Bashkir",nativeName:"башҡорт теле"},eu:{name:"Basque",nativeName:"euskara, euskera"},be:{name:"Belarusian",nativeName:"Беларуская"},bn:{name:"Bengali",nativeName:"বাংলা"},bh:{name:"Bihari",nativeName:"भोजपुरी"},bi:{name:"Bislama",nativeName:"Bislama"},bs:{name:"Bosnian",nativeName:"bosanski jezik"},br:{name:"Breton",nativeName:"brezhoneg"},bg:{name:"Bulgarian",nativeName:"български език"},my:{name:"Burmese",nativeName:"ဗမာစာ"},ca:{name:"Catalan; Valencian",nativeName:"Català"},ch:{name:"Chamorro",nativeName:"Chamoru"},ce:{name:"Chechen",nativeName:"нохчийн мотт"},ny:{name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},zh:{name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},cv:{name:"Chuvash",nativeName:"чӑваш чӗлхи"},kw:{name:"Cornish",nativeName:"Kernewek"},co:{name:"Corsican",nativeName:"corsu, lingua corsa"},cr:{name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},hr:{name:"Croatian",nativeName:"hrvatski"},cs:{name:"Czech",nativeName:"česky, čeština"},da:{name:"Danish",nativeName:"dansk"},dv:{name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},nl:{name:"Dutch",nativeName:"Nederlands, Vlaams"},en:{name:"English",nativeName:"English"},eo:{name:"Esperanto",nativeName:"Esperanto"},et:{name:"Estonian",nativeName:"eesti, eesti keel"},ee:{name:"Ewe",nativeName:"Eʋegbe"},fo:{name:"Faroese",nativeName:"føroyskt"},fj:{name:"Fijian",nativeName:"vosa Vakaviti"},fi:{name:"Finnish",nativeName:"suomi, suomen kieli"},fr:{name:"French",nativeName:"français, langue française"},ff:{name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},gl:{name:"Galician",nativeName:"Galego"},ka:{name:"Georgian",nativeName:"ქართული"},de:{name:"German",nativeName:"Deutsch"},el:{name:"Greek, Modern",nativeName:"Ελληνικά"},gn:{name:"Guaraní",nativeName:"Avañeẽ"},gu:{name:"Gujarati",nativeName:"ગુજરાતી"},ht:{name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},ha:{name:"Hausa",nativeName:"Hausa, هَوُسَ"},he:{name:"Hebrew (modern)",nativeName:"עברית"},hz:{name:"Herero",nativeName:"Otjiherero"},hi:{name:"Hindi",nativeName:"हिन्दी, हिंदी"},ho:{name:"Hiri Motu",nativeName:"Hiri Motu"},hu:{name:"Hungarian",nativeName:"Magyar"},ia:{name:"Interlingua",nativeName:"Interlingua"},id:{name:"Indonesian",nativeName:"Bahasa Indonesia"},ie:{name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},ga:{name:"Irish",nativeName:"Gaeilge"},ig:{name:"Igbo",nativeName:"Asụsụ Igbo"},ik:{name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},io:{name:"Ido",nativeName:"Ido"},is:{name:"Icelandic",nativeName:"Íslenska"},it:{name:"Italian",nativeName:"Italiano"},iu:{name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},ja:{name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},jv:{name:"Javanese",nativeName:"basa Jawa"},kl:{name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},kn:{name:"Kannada",nativeName:"ಕನ್ನಡ"},kr:{name:"Kanuri",nativeName:"Kanuri"},ks:{name:"Kashmiri",nativeName:"कश्मीरी, كشميري‎"},kk:{name:"Kazakh",nativeName:"Қазақ тілі"},km:{name:"Khmer",nativeName:"ភាសាខ្មែរ"},ki:{name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},rw:{name:"Kinyarwanda",nativeName:"Ikinyarwanda"},ky:{name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},kv:{name:"Komi",nativeName:"коми кыв"},kg:{name:"Kongo",nativeName:"KiKongo"},ko:{name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},ku:{name:"Kurdish",nativeName:"Kurdî, كوردی‎"},kj:{name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},la:{name:"Latin",nativeName:"latine, lingua latina"},lb:{name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},lg:{name:"Luganda",nativeName:"Luganda"},li:{name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},ln:{name:"Lingala",nativeName:"Lingála"},lo:{name:"Lao",nativeName:"ພາສາລາວ"},lt:{name:"Lithuanian",nativeName:"lietuvių kalba"},lu:{name:"Luba-Katanga",nativeName:""},lv:{name:"Latvian",nativeName:"latviešu valoda"},gv:{name:"Manx",nativeName:"Gaelg, Gailck"},mk:{name:"Macedonian",nativeName:"македонски јазик"},mg:{name:"Malagasy",nativeName:"Malagasy fiteny"},ms:{name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو‎"},ml:{name:"Malayalam",nativeName:"മലയാളം"},mt:{name:"Maltese",nativeName:"Malti"},mi:{name:"Māori",nativeName:"te reo Māori"},mr:{name:"Marathi (Marāṭhī)",nativeName:"मराठी"},mh:{name:"Marshallese",nativeName:"Kajin M̧ajeļ"},mn:{name:"Mongolian",nativeName:"монгол"},na:{name:"Nauru",nativeName:"Ekakairũ Naoero"},nv:{name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},nb:{name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},nd:{name:"North Ndebele",nativeName:"isiNdebele"},ne:{name:"Nepali",nativeName:"नेपाली"},ng:{name:"Ndonga",nativeName:"Owambo"},nn:{name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},no:{name:"Norwegian",nativeName:"Norsk"},ii:{name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},nr:{name:"South Ndebele",nativeName:"isiNdebele"},oc:{name:"Occitan",nativeName:"Occitan"},oj:{name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},cu:{name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},om:{name:"Oromo",nativeName:"Afaan Oromoo"},or:{name:"Oriya",nativeName:"ଓଡ଼ିଆ"},os:{name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},pa:{name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی‎"},pi:{name:"Pāli",nativeName:"पाऴि"},fa:{name:"Persian",nativeName:"فارسی"},pl:{name:"Polish",nativeName:"polski"},ps:{name:"Pashto, Pushto",nativeName:"پښتو"},pt:{name:"Portuguese",nativeName:"Português"},qu:{name:"Quechua",nativeName:"Runa Simi, Kichwa"},rm:{name:"Romansh",nativeName:"rumantsch grischun"},rn:{name:"Kirundi",nativeName:"kiRundi"},ro:{name:"Romanian, Moldavian, Moldovan",nativeName:"română"},ru:{name:"Russian",nativeName:"русский язык"},sa:{name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},sc:{name:"Sardinian",nativeName:"sardu"},sd:{name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی‎"},se:{name:"Northern Sami",nativeName:"Davvisámegiella"},sm:{name:"Samoan",nativeName:"gagana faa Samoa"},sg:{name:"Sango",nativeName:"yângâ tî sängö"},sr:{name:"Serbian",nativeName:"српски језик"},gd:{name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},sn:{name:"Shona",nativeName:"chiShona"},si:{name:"Sinhala, Sinhalese",nativeName:"සිංහල"},sk:{name:"Slovak",nativeName:"slovenčina"},sl:{name:"Slovene",nativeName:"slovenščina"},so:{name:"Somali",nativeName:"Soomaaliga, af Soomaali"},st:{name:"Southern Sotho",nativeName:"Sesotho"},es:{name:"Spanish; Castilian",nativeName:"español, castellano"},su:{name:"Sundanese",nativeName:"Basa Sunda"},sw:{name:"Swahili",nativeName:"Kiswahili"},ss:{name:"Swati",nativeName:"SiSwati"},sv:{name:"Swedish",nativeName:"svenska"},ta:{name:"Tamil",nativeName:"தமிழ்"},te:{name:"Telugu",nativeName:"తెలుగు"},tg:{name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی‎"},th:{name:"Thai",nativeName:"ไทย"},ti:{name:"Tigrinya",nativeName:"ትግርኛ"},bo:{name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},tk:{name:"Turkmen",nativeName:"Türkmen, Түркмен"},tl:{name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},tn:{name:"Tswana",nativeName:"Setswana"},to:{name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},tr:{name:"Turkish",nativeName:"Türkçe"},ts:{name:"Tsonga",nativeName:"Xitsonga"},tt:{name:"Tatar",nativeName:"татарча, tatarça, تاتارچا‎"},tw:{name:"Twi",nativeName:"Twi"},ty:{name:"Tahitian",nativeName:"Reo Tahiti"},ug:{name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە‎"},uk:{name:"Ukrainian",nativeName:"українська"},ur:{name:"Urdu",nativeName:"اردو"},uz:{name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك‎"},ve:{name:"Venda",nativeName:"Tshivenḓa"},vi:{name:"Vietnamese",nativeName:"Tiếng Việt"},vo:{name:"Volapük",nativeName:"Volapük"},wa:{name:"Walloon",nativeName:"Walon"},cy:{name:"Welsh",nativeName:"Cymraeg"},wo:{name:"Wolof",nativeName:"Wollof"},fy:{name:"Western Frisian",nativeName:"Frysk"},xh:{name:"Xhosa",nativeName:"isiXhosa"},yi:{name:"Yiddish",nativeName:"ייִדיש"},yo:{name:"Yoruba",nativeName:"Yorùbá"},za:{name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}},C=(Object.keys(_).map(function(e){return[e,_[e].name.toLowerCase()]}),{ca:"ca_ES",cs:"cs_CZ",en:"en_US",he:"he_IL",ja:"ja_JP",ko:"ko_KR",pt:"pt_BR",sv:"sv_SE",zh:"zh_CN"}),F="%A, %e de %B de %Y, %X",P="%d/%m/%Y",J="%H:%M:%S",H=["AM","PM"],Y=["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],B=["dg.","dl.","dt.","dc.","dj.","dv.","ds."],L=["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],K=["gen.","febr.","març","abr.","maig","juny","jul.","ag.","set.","oct.","nov.","des."],E={dateTime:F,date:P,time:J,periods:H,days:Y,shortDays:B,months:L,shortMonths:K},I=Object.freeze({dateTime:F,date:P,time:J,periods:H,days:Y,shortDays:B,months:L,shortMonths:K,"default":E}),G="%A, der %e. %B %Y, %X",X="%d.%m.%Y",R="%H:%M:%S",W=["AM","PM"],U=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],V=["So","Mo","Di","Mi","Do","Fr","Sa"],$=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],q=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],Q={dateTime:G,date:X,time:R,periods:W,days:U,shortDays:V,months:$,shortMonths:q},Z=Object.freeze({dateTime:G,date:X,time:R,periods:W,days:U,shortDays:V,months:$,shortMonths:q,"default":Q}),ee="%A, der %e. %B %Y, %X",ae="%d.%m.%Y",te="%H:%M:%S",ne=["AM","PM"],re=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],ie=["So","Mo","Di","Mi","Do","Fr","Sa"],oe=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],se=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],ue={dateTime:ee,date:ae,time:te,periods:ne,days:re,shortDays:ie,months:oe,shortMonths:se},me=Object.freeze({dateTime:ee,date:ae,time:te,periods:ne,days:re,shortDays:ie,months:oe,shortMonths:se,"default":ue}),de="%a %b %e %X %Y",le="%Y-%m-%d",ce="%H:%M:%S",he=["AM","PM"],fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ge=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ve=["January","February","March","April","May","June","July","August","September","October","November","December"],pe=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ye={dateTime:de,date:le,time:ce,periods:he,days:fe,shortDays:ge,months:ve,shortMonths:pe},be=Object.freeze({dateTime:de,date:le,time:ce,periods:he,days:fe,shortDays:ge,months:ve,shortMonths:pe,"default":ye}),Ne="%a %e %b %X %Y",Me="%d/%m/%Y",Se="%H:%M:%S",ke=["AM","PM"],je=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Ae=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ze=["January","February","March","April","May","June","July","August","September","October","November","December"],we=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],xe={dateTime:Ne,date:Me,time:Se,periods:ke,days:je,shortDays:Ae,months:ze,shortMonths:we},Te=Object.freeze({dateTime:Ne,date:Me,time:Se,periods:ke,days:je,shortDays:Ae,months:ze,shortMonths:we,"default":xe}),De="%a %b %e %X %Y",Oe="%m/%d/%Y",_e="%H:%M:%S",Ce=["AM","PM"],Fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Pe=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Je=["January","February","March","April","May","June","July","August","September","October","November","December"],He=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ye={dateTime:De,date:Oe,time:_e,periods:Ce,days:Fe,shortDays:Pe,months:Je,shortMonths:He},Be=Object.freeze({dateTime:De,date:Oe,time:_e,periods:Ce,days:Fe,shortDays:Pe,months:Je,shortMonths:He,"default":Ye}),Le="%A, %e de %B de %Y, %X",Ke="%d/%m/%Y",Ee="%H:%M:%S",Ie=["AM","PM"],Ge=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],Xe=["dom","lun","mar","mié","jue","vie","sáb"],Re=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],We=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],Ue={dateTime:Le,date:Ke,time:Ee,periods:Ie,days:Ge,shortDays:Xe,months:Re,shortMonths:We},Ve=Object.freeze({dateTime:Le,date:Ke,time:Ee,periods:Ie,days:Ge,shortDays:Xe,months:Re,shortMonths:We,"default":Ue}),$e="%A, %-d. %Bta %Y klo %X",qe="%-d.%-m.%Y",Qe="%H:%M:%S",Ze=["a.m.","p.m."],ea=["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],aa=["Su","Ma","Ti","Ke","To","Pe","La"],ta=["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],na=["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"],ra={dateTime:$e,date:qe,time:Qe,periods:Ze,days:ea,shortDays:aa,months:ta,shortMonths:na},ia=Object.freeze({dateTime:$e,date:qe,time:Qe,periods:Ze,days:ea,shortDays:aa,months:ta,shortMonths:na,"default":ra}),oa="%a %e %b %Y %X",sa="%Y-%m-%d",ua="%H:%M:%S",ma=["",""],da=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],la=["dim","lun","mar","mer","jeu","ven","sam"],ca=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ha=["jan","fév","mar","avr","mai","jui","jul","aoû","sep","oct","nov","déc"],fa={dateTime:oa,date:sa,time:ua,periods:ma,days:da,shortDays:la,months:ca,shortMonths:ha},ga=Object.freeze({dateTime:oa,date:sa,time:ua,periods:ma,days:da,shortDays:la,months:ca,shortMonths:ha,"default":fa}),va="%A, le %e %B %Y, %X",pa="%d/%m/%Y",ya="%H:%M:%S",ba=["AM","PM"],Na=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],Ma=["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],Sa=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],ka=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],ja={dateTime:va,date:pa,time:ya,periods:ba,days:Na,shortDays:Ma,months:Sa,shortMonths:ka},Aa=Object.freeze({dateTime:va,date:pa,time:ya,periods:ba,days:Na,shortDays:Ma,months:Sa,shortMonths:ka,"default":ja}),za="%A, %e ב%B %Y %X",wa="%d.%m.%Y",xa="%H:%M:%S",Ta=["AM","PM"],Da=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],Oa=["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],_a=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],Ca=["ינו׳","פבר׳","מרץ","אפר׳","מאי","יוני","יולי","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"],Fa={dateTime:za,date:wa,time:xa,periods:Ta,days:Da,shortDays:Oa,months:_a,shortMonths:Ca},Pa=Object.freeze({dateTime:za,date:wa,time:xa,periods:Ta,days:Da,shortDays:Oa,months:_a,shortMonths:Ca,"default":Fa}),Ja="%Y. %B %-e., %A %X",Ha="%Y. %m. %d.",Ya="%H:%M:%S",Ba=["de.","du."],La=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],Ka=["V","H","K","Sze","Cs","P","Szo"],Ea=["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],Ia=["jan.","feb.","már.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."],Ga={dateTime:Ja,date:Ha,time:Ya,periods:Ba,days:La,shortDays:Ka,months:Ea,shortMonths:Ia},Xa=Object.freeze({dateTime:Ja,date:Ha,time:Ya,periods:Ba,days:La,shortDays:Ka,months:Ea,shortMonths:Ia,"default":Ga}),Ra="%A %e %B %Y, %X",Wa="%d/%m/%Y",Ua="%H:%M:%S",Va=["AM","PM"],$a=["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],qa=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],Qa=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],Za=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],et={
	dateTime:Ra,date:Wa,time:Ua,periods:Va,days:$a,shortDays:qa,months:Qa,shortMonths:Za},at=Object.freeze({dateTime:Ra,date:Wa,time:Ua,periods:Va,days:$a,shortDays:qa,months:Qa,shortMonths:Za,"default":et}),tt="%Y %b %e %a %X",nt="%Y/%m/%d",rt="%H:%M:%S",it=["AM","PM"],ot=["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],st=["日","月","火","水","木","金","土"],ut=["睦月","如月","弥生","卯月","皐月","水無月","文月","葉月","長月","神無月","霜月","師走"],mt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dt={dateTime:tt,date:nt,time:rt,periods:it,days:ot,shortDays:st,months:ut,shortMonths:mt},lt=Object.freeze({dateTime:tt,date:nt,time:rt,periods:it,days:ot,shortDays:st,months:ut,shortMonths:mt,"default":dt}),ct="%Y/%m/%d %a %X",ht="%Y/%m/%d",ft="%H:%M:%S",gt=["오전","오후"],vt=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],pt=["일","월","화","수","목","금","토"],yt=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],bt=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],Nt={dateTime:ct,date:ht,time:ft,periods:gt,days:vt,shortDays:pt,months:yt,shortMonths:bt},Mt=Object.freeze({dateTime:ct,date:ht,time:ft,periods:gt,days:vt,shortDays:pt,months:yt,shortMonths:bt,"default":Nt}),St="%A, %e %B %Y г. %X",kt="%d.%m.%Y",jt="%H:%M:%S",At=["AM","PM"],zt=["недела","понеделник","вторник","среда","четврток","петок","сабота"],wt=["нед","пон","вто","сре","чет","пет","саб"],xt=["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],Tt=["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек"],Dt={dateTime:St,date:kt,time:jt,periods:At,days:zt,shortDays:wt,months:xt,shortMonths:Tt},Ot=Object.freeze({dateTime:St,date:kt,time:jt,periods:At,days:zt,shortDays:wt,months:xt,shortMonths:Tt,"default":Dt}),_t="%a %e %B %Y %T",Ct="%d-%m-%Y",Ft="%H:%M:%S",Pt=["AM","PM"],Jt=["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],Ht=["zo","ma","di","wo","do","vr","za"],Yt=["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],Bt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Lt={dateTime:_t,date:Ct,time:Ft,periods:Pt,days:Jt,shortDays:Ht,months:Yt,shortMonths:Bt},Kt=Object.freeze({dateTime:_t,date:Ct,time:Ft,periods:Pt,days:Jt,shortDays:Ht,months:Yt,shortMonths:Bt,"default":Lt}),Et="%A, %e %B %Y, %X",It="%d/%m/%Y",Gt="%H:%M:%S",Xt=["AM","PM"],Rt=["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],Wt=["Niedz.","Pon.","Wt.","Śr.","Czw.","Pt.","Sob."],Ut=["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],Vt=["Stycz.","Luty","Marz.","Kwie.","Maj","Czerw.","Lipc.","Sierp.","Wrz.","Paźdz.","Listop.","Grudz."],$t={dateTime:Et,date:It,time:Gt,periods:Xt,days:Rt,shortDays:Wt,months:Ut,shortMonths:Vt},qt=Object.freeze({dateTime:Et,date:It,time:Gt,periods:Xt,days:Rt,shortDays:Wt,months:Ut,shortMonths:Vt,"default":$t}),Qt="%A, %e de %B de %Y. %X",Zt="%d/%m/%Y",en="%H:%M:%S",an=["AM","PM"],tn=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],nn=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],rn=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],on=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],sn={dateTime:Qt,date:Zt,time:en,periods:an,days:tn,shortDays:nn,months:rn,shortMonths:on},un=Object.freeze({dateTime:Qt,date:Zt,time:en,periods:an,days:tn,shortDays:nn,months:rn,shortMonths:on,"default":sn}),mn="%A, %e %B %Y г. %X",dn="%d.%m.%Y",ln="%H:%M:%S",cn=["AM","PM"],hn=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],fn=["вс","пн","вт","ср","чт","пт","сб"],gn=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],vn=["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],pn={dateTime:mn,date:dn,time:ln,periods:cn,days:hn,shortDays:fn,months:gn,shortMonths:vn},yn=Object.freeze({dateTime:mn,date:dn,time:ln,periods:cn,days:hn,shortDays:fn,months:gn,shortMonths:vn,"default":pn}),bn="%A den %d %B %Y %X",Nn="%Y-%m-%d",Mn="%H:%M:%S",Sn=["fm","em"],kn=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],jn=["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],An=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],zn=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],wn={dateTime:bn,date:Nn,time:Mn,periods:Sn,days:kn,shortDays:jn,months:An,shortMonths:zn},xn=Object.freeze({dateTime:bn,date:Nn,time:Mn,periods:Sn,days:kn,shortDays:jn,months:An,shortMonths:zn,"default":wn}),Tn="%x %A %X",Dn="%Y年%-m月%-d日",On="%H:%M:%S",_n=["上午","下午"],Cn=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],Fn=["周日","周一","周二","周三","周四","周五","周六"],Pn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],Jn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],Hn={dateTime:Tn,date:Dn,time:On,periods:_n,days:Cn,shortDays:Fn,months:Pn,shortMonths:Jn},Yn=Object.freeze({dateTime:Tn,date:Dn,time:On,periods:_n,days:Cn,shortDays:Fn,months:Pn,shortMonths:Jn,"default":Hn}),Bn={ca_ES:I,de_CH:Z,de_DE:me,en_CA:be,en_GB:Te,en_US:Be,es_ES:Ve,fi_FI:ia,fr_CA:ga,fr_FR:Aa,he_IL:Pa,hu_HU:Xa,it_IT:at,ja_JP:lt,ko_KR:Mt,mk_MK:Ot,nl_NL:Kt,pl_PL:qt,pt_BR:un,ru_RU:yn,sv_SE:xn,zh_CN:Yn},Ln=(g(Bn),","),Kn=".",En=[3],In=[""," €"],Gn={decimal:Ln,thousands:Kn,grouping:En,currency:In},Xn=Object.freeze({decimal:Ln,thousands:Kn,grouping:En,currency:In,"default":Gn}),Rn=",",Wn=" ",Un=[3],Vn=[""," Kč"],$n={decimal:Rn,thousands:Wn,grouping:Un,currency:Vn},qn=Object.freeze({decimal:Rn,thousands:Wn,grouping:Un,currency:Vn,"default":$n}),Qn=",",Zn="'",er=[3],ar=[""," CHF"],tr={decimal:Qn,thousands:Zn,grouping:er,currency:ar},nr=Object.freeze({decimal:Qn,thousands:Zn,grouping:er,currency:ar,"default":tr}),rr=",",ir=".",or=[3],sr=[""," €"],ur={decimal:rr,thousands:ir,grouping:or,currency:sr},mr=Object.freeze({decimal:rr,thousands:ir,grouping:or,currency:sr,"default":ur}),dr=".",lr=",",cr=[3],hr=["$",""],fr={decimal:dr,thousands:lr,grouping:cr,currency:hr},gr=Object.freeze({decimal:dr,thousands:lr,grouping:cr,currency:hr,"default":fr}),vr=".",pr=",",yr=[3],br=["£",""],Nr={decimal:vr,thousands:pr,grouping:yr,currency:br},Mr=Object.freeze({decimal:vr,thousands:pr,grouping:yr,currency:br,"default":Nr}),Sr=".",kr=",",jr=[3],Ar=["$",""],zr={decimal:Sr,thousands:kr,grouping:jr,currency:Ar},wr=Object.freeze({decimal:Sr,thousands:kr,grouping:jr,currency:Ar,"default":zr}),xr=",",Tr=".",Dr=[3],Or=[""," €"],_r={decimal:xr,thousands:Tr,grouping:Dr,currency:Or},Cr=Object.freeze({decimal:xr,thousands:Tr,grouping:Dr,currency:Or,"default":_r}),Fr=".",Pr=",",Jr=[3],Hr=["$",""],Yr={decimal:Fr,thousands:Pr,grouping:Jr,currency:Hr},Br=Object.freeze({decimal:Fr,thousands:Pr,grouping:Jr,currency:Hr,"default":Yr}),Lr=",",Kr=" ",Er=[3],Ir=[""," €"],Gr={decimal:Lr,thousands:Kr,grouping:Er,currency:Ir},Xr=Object.freeze({decimal:Lr,thousands:Kr,grouping:Er,currency:Ir,"default":Gr}),Rr=",",Wr=" ",Ur=[3],Vr=["","$"],$r={decimal:Rr,thousands:Wr,grouping:Ur,currency:Vr},qr=Object.freeze({decimal:Rr,thousands:Wr,grouping:Ur,currency:Vr,"default":$r}),Qr=",",Zr=".",ei=[3],ai=[""," €"],ti={decimal:Qr,thousands:Zr,grouping:ei,currency:ai},ni=Object.freeze({decimal:Qr,thousands:Zr,grouping:ei,currency:ai,"default":ti}),ri=".",ii=",",oi=[3],si=["₪",""],ui={decimal:ri,thousands:ii,grouping:oi,currency:si},mi=Object.freeze({decimal:ri,thousands:ii,grouping:oi,currency:si,"default":ui}),di=",",li=" ",ci=[3],hi=[""," Ft"],fi={decimal:di,thousands:li,grouping:ci,currency:hi},gi=Object.freeze({decimal:di,thousands:li,grouping:ci,currency:hi,"default":fi}),vi=",",pi=".",yi=[3],bi=["€",""],Ni={decimal:vi,thousands:pi,grouping:yi,currency:bi},Mi=Object.freeze({decimal:vi,thousands:pi,grouping:yi,currency:bi,"default":Ni}),Si=".",ki=",",ji=[3],Ai=["","円"],zi={decimal:Si,thousands:ki,grouping:ji,currency:Ai},wi=Object.freeze({decimal:Si,thousands:ki,grouping:ji,currency:Ai,"default":zi}),xi=".",Ti=",",Di=[3],Oi=["₩",""],_i={decimal:xi,thousands:Ti,grouping:Di,currency:Oi},Ci=Object.freeze({decimal:xi,thousands:Ti,grouping:Di,currency:Oi,"default":_i}),Fi=",",Pi=".",Ji=[3],Hi=[""," ден."],Yi={decimal:Fi,thousands:Pi,grouping:Ji,currency:Hi},Bi=Object.freeze({decimal:Fi,thousands:Pi,grouping:Ji,currency:Hi,"default":Yi}),Li=",",Ki=".",Ei=[3],Ii=["€ ",""],Gi={decimal:Li,thousands:Ki,grouping:Ei,currency:Ii},Xi=Object.freeze({decimal:Li,thousands:Ki,grouping:Ei,currency:Ii,"default":Gi}),Ri=",",Wi=".",Ui=[3],Vi=["","zł"],$i={decimal:Ri,thousands:Wi,grouping:Ui,currency:Vi},qi=Object.freeze({decimal:Ri,thousands:Wi,grouping:Ui,currency:Vi,"default":$i}),Qi=",",Zi=".",eo=[3],ao=["R$",""],to={decimal:Qi,thousands:Zi,grouping:eo,currency:ao},no=Object.freeze({decimal:Qi,thousands:Zi,grouping:eo,currency:ao,"default":to}),ro=",",io=" ",oo=[3],so=[""," руб."],uo={decimal:ro,thousands:io,grouping:oo,currency:so},mo=Object.freeze({decimal:ro,thousands:io,grouping:oo,currency:so,"default":uo}),lo=",",co=" ",ho=[3],fo=["","SEK"],go={decimal:lo,thousands:co,grouping:ho,currency:fo},vo=Object.freeze({decimal:lo,thousands:co,grouping:ho,currency:fo,"default":go}),po=".",yo=",",bo=[3],No=["¥",""],Mo={decimal:po,thousands:yo,grouping:bo,currency:No},So=Object.freeze({decimal:po,thousands:yo,grouping:bo,currency:No,"default":Mo}),ko={ca_ES:Xn,cs_CZ:qn,de_CH:nr,de_DE:mr,en_CA:gr,en_GB:Mr,en_US:wr,es_ES:Cr,es_MX:Br,fi_FI:Xr,fr_CA:qr,fr_FR:ni,he_IL:mi,hu_HU:gi,it_IT:Mi,ja_JP:wi,ko_KR:Ci,mk_MK:Bi,nl_NL:Xi,pl_PL:qi,pt_BR:no,ru_RU:mo,sv_SE:vo,zh_CN:So},jo=g(ko),Ao=64,zo={white:function(e){("string"==typeof e||e instanceof String)&&(e=M(e));var a=N(e);return a[0]<Ao}},wo=["#00ce5c","#d800a2","#00d9d2","#AF5100","#bfbfbf","#DE0000","#F0DE00","#9200ff","#ED9200","#00aeff"],xo=["#56d58e","#d95cba","#63eae4","#C78348","#d6d6d6","#E06363","#FFF741","#965ede","#FCBB54","#73c5eb"],To=["#a5e6c3","#eda3da","#9af8f4","#EDC19C","#e5e5e5","#F5AAAA","#F7EFC3","#c6a8ef","#F8D296","#addbf0"],Do={green:0,pink:1,aqua:2,brown:3,grey:4,red:5,yellow:6,purple:7,orange:8,blue:9},Oo={standard:xo,dark:wo,light:To,names:Do},_o={text:{white:"#ffffff",black:"#262626"},lines:{seperator:"#EFF0F0"}},Co=(S(function(e){function a(e,a){return 1-3*a+3*e}function t(e,a){return 3*a-6*e}function n(e){return 3*e}function r(e,r,i){return((a(r,i)*e+t(r,i))*e+n(r))*e}function i(e,r,i){return 3*a(r,i)*e*e+2*t(r,i)*e+n(r)}function o(e,a,t,n,i){var o,s,u=0;do s=a+(t-a)/2,o=r(s,n,i)-e,o>0?t=s:a=s;while(Math.abs(o)>d&&++u<l);return s}function s(e,a,t,n){for(var o=0;o<u;++o){var s=i(a,t,n);if(0===s)return a;var m=r(a,t,n)-e;a-=m/s}return a}var u=4,m=.001,d=1e-7,l=10,c=11,h=1/(c-1),f="function"==typeof Float32Array;e.exports=function(e,a,t,n){function u(a){for(var n=0,r=1,u=c-1;r!==u&&d[r]<=a;++r)n+=h;--r;var l=(a-d[r])/(d[r+1]-d[r]),f=n+l*h,g=i(f,e,t);return g>=m?s(a,f,e,t):0===g?f:o(a,n,n+h,e,t)}if(!(0<=e&&e<=1&&0<=t&&t<=1))throw new Error("bezier x values must be in [0, 1] range");var d=f?new Float32Array(c):new Array(c);if(e!==a||t!==n)for(var l=0;l<c;++l)d[l]=r(l*h,e,t);return function(i){return e===a&&t===n?i:0===i?0:1===i?1:r(u(i),a,n)}}}),270),Fo=1,Po=12,Jo=0,Ho=10,Yo=8,Bo=24,Lo=8,Ko=3,Eo=",.0f",Io=".2s",Go=".3f",Xo=["@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300);","text{ font-family: 'Source Code Pro', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-weight: 300; }",".legend text { font-size: 12px }"].join(" \n");e.version=A,e.html=k,Object.defineProperty(e,"__esModule",{value:!0})});
	//# sourceMappingURL=d3-rs-pies.umd-es2015.min.js.map


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.0.4. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(131)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';
	
	var constant$1 = function(x) {
	  return function constant() {
	    return x;
	  };
	};
	
	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;
	
	function arcInnerRadius(d) {
	  return d.innerRadius;
	}
	
	function arcOuterRadius(d) {
	  return d.outerRadius;
	}
	
	function arcStartAngle(d) {
	  return d.startAngle;
	}
	
	function arcEndAngle(d) {
	  return d.endAngle;
	}
	
	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}
	
	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}
	
	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}
	
	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;
	
	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}
	
	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant$1(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;
	
	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = Math.abs(a1 - a0),
	        cw = a1 > a0;
	
	    if (!context) context = buffer = d3Path.path();
	
	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);
	
	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }
	
	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
	          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;
	
	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * Math.sin(ap)),
	            p1 = asin(rp / r1 * Math.sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }
	
	      var x01 = r1 * Math.cos(a01),
	          y01 = r1 * Math.sin(a01),
	          x10 = r0 * Math.cos(a10),
	          y10 = r0 * Math.sin(a10);
	
	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * Math.cos(a11),
	            y11 = r1 * Math.sin(a11),
	            x00 = r0 * Math.cos(a00),
	            y00 = r0 * Math.sin(a00);
	
	        // Restrict the corner radius according to the sector angle.
	        if (da < pi) {
	          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
	              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	        }
	      }
	
	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);
	
	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);
	
	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }
	
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [Math.cos(a) * r, Math.sin(a) * r];
	  };
	
	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : innerRadius;
	  };
	
	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : outerRadius;
	  };
	
	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : cornerRadius;
	  };
	
	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), arc) : padRadius;
	  };
	
	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : startAngle;
	  };
	
	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : endAngle;
	  };
	
	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : padAngle;
	  };
	
	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };
	
	  return arc;
	};
	
	function Linear(context) {
	  this._context = context;
	}
	
	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};
	
	var curveLinear = function(context) {
	  return new Linear(context);
	};
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$$1;
	  };
	
	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$$1;
	  };
	
	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
	  };
	
	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	};
	
	var area = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant$1(0),
	      y1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }
	
	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
	  };
	
	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
	  };
	
	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
	  };
	
	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
	  };
	
	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
	  };
	
	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
	  };
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };
	
	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
	  };
	
	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };
	
	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };
	
	  return area;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var identity = function(d) {
	  return d;
	};
	
	var pie = function() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant$1(0),
	      endAngle = constant$1(tau),
	      padAngle = constant$1(0);
	
	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;
	
	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }
	
	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }
	
	    return arcs;
	  }
	
	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), pie) : value;
	  };
	
	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };
	
	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };
	
	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : startAngle;
	  };
	
	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : endAngle;
	  };
	
	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : padAngle;
	  };
	
	  return pie;
	};
	
	var curveRadialLinear = curveRadial(curveLinear);
	
	function Radial(curve) {
	  this._curve = curve;
	}
	
	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};
	
	function curveRadial(curve) {
	
	  function radial(context) {
	    return new Radial(curve(context));
	  }
	
	  radial._curve = curve;
	
	  return radial;
	}
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};
	
	var radialArea = function() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
	};
	
	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau);
	  }
	};
	
	var cross = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};
	
	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;
	
	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};
	
	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	var kx = Math.sin(tau / 10) * kr;
	var ky = -Math.cos(tau / 10) * kr;
	
	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};
	
	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};
	
	var sqrt3 = Math.sqrt(3);
	
	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};
	
	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;
	
	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};
	
	var symbols = [
	  circle,
	  cross,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];
	
	var symbol = function() {
	  var type = constant$1(circle),
	      size = constant$1(64),
	      context = null;
	
	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = d3Path.path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
	  };
	
	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
	  };
	
	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };
	
	  return symbol;
	};
	
	var noop = function() {};
	
	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}
	
	function Basis(context) {
	  this._context = context;
	}
	
	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basis = function(context) {
	  return new Basis(context);
	};
	
	function BasisClosed(context) {
	  this._context = context;
	}
	
	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};
	
	function BasisOpen(context) {
	  this._context = context;
	}
	
	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};
	
	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}
	
	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;
	
	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;
	
	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }
	
	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	var bundle = (function custom(beta) {
	
	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }
	
	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };
	
	  return bundle;
	})(0.85);
	
	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}
	
	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinal = (function custom(tension) {
	
	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalClosed = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalOpen = (function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	})(0);
	
	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;
	
	  if (that._l01_a > epsilon) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }
	
	  if (that._l23_a > epsilon) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }
	
	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}
	
	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRom = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomClosed = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomOpen = (function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	})(0.5);
	
	function LinearClosed(context) {
	  this._context = context;
	}
	
	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};
	
	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};
	
	function sign(x) {
	  return x < 0 ? -1 : 1;
	}
	
	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}
	
	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}
	
	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}
	
	function MonotoneX(context) {
	  this._context = context;
	}
	
	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;
	
	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }
	
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};
	
	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}
	
	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};
	
	function ReflectContext(context) {
	  this._context = context;
	}
	
	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};
	
	function monotoneX(context) {
	  return new MonotoneX(context);
	}
	
	function monotoneY(context) {
	  return new MonotoneY(context);
	}
	
	function Natural(context) {
	  this._context = context;
	}
	
	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;
	
	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }
	
	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}
	
	var natural = function(context) {
	  return new Natural(context);
	};
	
	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}
	
	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};
	
	var step = function(context) {
	  return new Step(context, 0.5);
	};
	
	function stepBefore(context) {
	  return new Step(context, 0);
	}
	
	function stepAfter(context) {
	  return new Step(context, 1);
	}
	
	var slice = Array.prototype.slice;
	
	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (var j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};
	
	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};
	
	function stackValue(d, key) {
	  return d[key];
	}
	
	var stack = function() {
	  var keys = constant$1([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;
	
	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;
	
	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }
	
	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }
	
	    offset(sz, oz);
	    return sz;
	  }
	
	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : keys;
	  };
	
	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
	  };
	
	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : order;
	  };
	
	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };
	
	  return stack;
	};
	
	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};
	
	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};
	
	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};
	
	var ascending = function(series) {
	  var sums = series.map(sum);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};
	
	function sum(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}
	
	var descending$1 = function(series) {
	  return ascending(series).reverse();
	};
	
	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];
	
	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }
	
	  return bottoms.reverse().concat(tops);
	};
	
	var reverse = function(series) {
	  return none$1(series).reverse();
	};
	
	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending;
	exports.stackOrderDescending = descending$1;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var pi = Math.PI;
	var tau = 2 * pi;
	var epsilon = 1e-6;
	var tauEpsilon = tau - epsilon;
	
	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}
	
	function path() {
	  return new Path;
	}
	
	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}
	
	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;
	
	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }
	
	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }
	
	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }
	
	    // Is this arc empty? We’re done.
	    if (!r) return;
	
	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      if (da < 0) da = da % tau + tau;
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	exports.path = path;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(console) {!function(t,o){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (o), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=o():t.tingle=o()}(this,function(){function t(t){this.modal,this.modalCloseBtn,this.modalWrapper,this.modalBox,this.modalBoxContent,this.modalBoxFooter,this.modalContent;var o={onClose:null,onOpen:null,stickyFooter:!1,footer:!1,cssClass:[]};this.opts=h({},o,t),this.init()}function o(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(i.call(this),this.setStickyFooter(!0)))}function i(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}function e(){this.modal=f("div","tingle-modal"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),this.modalCloseBtn=f("button","tingle-modal__close"),this.modalCloseBtn.innerHTML="×",this.modalBox=f("div","tingle-modal-box"),this.modalBoxContent=f("div","tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),this.modal.appendChild(this.modalCloseBtn),this.modal.appendChild(this.modalBox)}function n(){this.modalBoxFooter=f("div","tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}function s(){c(this.modalCloseBtn,"click",this.close.bind(this)),c(this.modal,"mousedown",l.bind(this)),window.addEventListener("resize",o.bind(this))}function l(t){!a(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}function d(t){t.stopPropagation()}function a(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}function r(){p(this.modalCloseBtn,"click",this.close.bind(this)),p(this.modal,"mousedown",_handleClickProcedure.bind(this))}function h(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}function m(t){return"undefined"!=typeof t.length&&"undefined"!=typeof t.item}function c(t,o,i){m(t)?[].forEach.call(t,function(t){t.addEventListener(o,i)}):t.addEventListener(o,i)}function p(t,o,i){m(t)?[].forEach.call(t,function(t){t.removeEventListener(o,i)}):t.removeEventListener(o,i)}function f(t,o){var t=document.createElement(t);return o&&t.classList.add(o),t}function u(){var t,o=document.createElement("tingle-test-transition"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(void 0!==o.style[t])return i[t]}var y=u();return t.prototype.init=function(){this.modal||(e.call(this),s.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter())},t.prototype.destroy=function(){null!==this.modal&&(r.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.open=function(t){this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.body.classList.add("tingle-enabled"),this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible");var i=this;y&&this.modal.addEventListener(y,function t(){"function"==typeof i.opts.onOpen&&i.opts.onOpen.call(i),i.modal.removeEventListener(y,t,!1)},!1),o.call(this)},t.prototype.close=function(t){this.modal.style.display="none",document.body.classList.remove("tingle-enabled"),this.modal.classList.remove("tingle-modal--visible"),"function"==typeof this.opts.onClose&&this.opts.onClose.call(this)},t.prototype.setContent=function(t){"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t))},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){n.call(this)},t.prototype.setFooterContent=function(t){this.modalBoxFooter.innerHTML=t},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),i.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px",c(this.modalBoxFooter,"click",d)):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky")))},t.prototype.addFooterBtn=function(t,o,i){var e=document.createElement("button");return e.innerHTML=t,e.addEventListener("click",i),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){e.classList.add(t)}),this.modalBoxFooter.appendChild(e),e},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){var t=window.innerHeight,o=this.modalBox.clientHeight,i=!(o<t);return i},{modal:t}});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Webhook sending utility class
	 *
	 * Copyright (c) 2016 Redsift Limited
	 */
	var Webhook = function () {
	  function Webhook(url) {
	    _classCallCheck(this, Webhook);
	
	    this.url = url;
	  }
	
	  _createClass(Webhook, [{
	    key: 'send',
	    value: function send(key, value) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        var wh = new XMLHttpRequest();
	        var whurl = _this.url;
	        if (key) {
	          whurl = whurl.replace('{key}', encodeURIComponent(key));
	        }
	        if (value) {
	          whurl = whurl.replace('{value}', encodeURIComponent(value));
	        }
	        wh.addEventListener('load', function (event) {
	          resolve();
	        });
	        wh.addEventListener('error', function (event) {
	          console.error('[Webhook::send]: error: ', event);
	          reject();
	        });
	        wh.open('GET', whurl, true);
	        wh.send();
	      });
	    }
	  }]);
	
	  return Webhook;
	}();
	
	exports.default = Webhook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.RedsiftHero = global.RedsiftHero || {})));
	}(this, function (exports) {
	
	    var SCROLL_DURATION = 200;
	
	    // Adapted from https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
	    function smooth_scroll_to(element, target, duration) {
	        target = Math.round(target);
	        duration = Math.round(duration);
	        if (duration < 0) {
	            return Promise.reject('bad duration');
	        }
	        if (duration === 0) {
	            element.scrollTop = target;
	            return Promise.resolve('no-duration');
	        }
	
	        var start_time = Date.now();
	        var end_time = start_time + duration;
	
	        var start_top = element.scrollTop;
	        var distance = target - start_top;
	
	        // based on http://en.wikipedia.org/wiki/Smoothstep
	        var smooth_step = function(start, end, point) {
	            if (point <= start) {
	                return 0;
	            }
	            if (point >= end) {
	                return 1;
	            }
	            var x = (point - start) / (end - start); // interpolation
	            return x * x * (3 - 2 * x);
	        }
	
	        return new Promise(function(resolve, reject) {
	            // This is to keep track of where the element's scrollTop is
	            // supposed to be, based on what we're doing
	            var previous_top = element.scrollTop;
	
	            var timer = null;
	            // This is like a think function from a game loop
	            var scroll_frame = function() {
	                /*
	                // This logic is too fragile
	                if(element.scrollTop != previous_top) {
	                    window.clearInterval(timer);
	                    reject('interrupted');
	                    return;
	                }
	                */
	                // set the scrollTop for this frame
	                var now = Date.now();
	                var point = smooth_step(start_time, end_time, now);
	                var frameTop = Math.round(start_top + (distance * point));
	                element.scrollTop = frameTop;
	
	                // check if we're done!
	                if (now >= end_time) {
	                    window.clearInterval(timer);
	                    resolve('done');
	                    return;
	                }
	
	                // If we were supposed to scroll but didn't, then we
	                // probably hit the limit, so consider it done; not
	                // interrupted.
	                if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
	                    window.clearInterval(timer);
	                    resolve('limit');
	                    return;
	                }
	                previous_top = element.scrollTop;
	            }
	
	            // boostrap the animation process
	            timer = setInterval(scroll_frame, 10);
	        });
	    }
	
	    function clickFor(to, offset) {
	        return function(evt) {
	            var target = document.getElementById(to);
	            if (target === undefined) {
	                return true;
	            }
	            offset = offset || 0;
	            var delta = getAbsoluteBoundingRect(target).top + offset;
	            smooth_scroll_to(document.body, delta, SCROLL_DURATION).catch(function(e) {
	                console.error(e);
	            });
	            evt.preventDefault();
	            return false;
	        }
	    }
	
	    var scrollNodes = [];
	
	    function throttle(type, name, obj) {
	        obj = obj || window;
	        var running = false;
	        var func = function() {
	            if (running) {
	                return;
	            }
	            running = true;
	            requestAnimationFrame(function() {
	                obj.dispatchEvent(new CustomEvent(name));
	                running = false;
	            });
	        };
	        obj.addEventListener(type, func);
	    }
	
	    function onScroll() {
	        var pos = window.scrollY;
	        scrollNodes.forEach(function(params) {
	            var node = params[0];
	            var current = params[1];
	            var cls = params[2];
	            var extents = params[4];
	
	            var state = false;
	            for (var i = 0; i < extents.length; i++) {
	                var extent = extents[i];
	                state = (pos > extent.start && pos < extent.end);
	                if (state) {
	                    break;
	                }
	            }
	
	            if (state === current) {
	                return;
	            }
	            params[1] = state;
	            if (state) {
	                node.classList.add(cls);
	            } else {
	                node.classList.remove(cls);
	            }
	        });
	    }
	
	    function getAbsoluteBoundingRect(el) {
	        var doc = document,
	            win = window,
	            body = doc.body,
	
	            // pageXOffset and pageYOffset work everywhere except IE <9.
	            offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
	            (doc.documentElement || body.parentNode || body).scrollLeft,
	            offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
	            (doc.documentElement || body.parentNode || body).scrollTop,
	
	            rect = el.getBoundingClientRect();
	
	        if (el !== body) {
	            var parent = el.parentNode;
	
	            // The element's rect will be affected by the scroll positions of
	            // *all* of its scrollable parents, not just the window, so we have
	            // to walk up the tree and collect every scroll offset. Good times.
	            while (parent !== body) {
	                offsetX += parent.scrollLeft;
	                offsetY += parent.scrollTop;
	                parent = parent.parentNode;
	            }
	        }
	
	        return {
	            bottom: rect.bottom + offsetY,
	            height: rect.height,
	            left: rect.left + offsetX,
	            right: rect.right + offsetX,
	            top: rect.top + offsetY,
	            width: rect.width
	        };
	    }
	
	    function updateRegions() {
	        scrollNodes.forEach(function(params) {
	            var target = params[0].getBoundingClientRect();
	            var overlap = params[3];
	
	            var nodes = document.querySelectorAll(overlap);
	            var all = [];
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var ext = getAbsoluteBoundingRect(node);
	                all.push({
	                    start: ext.top - target.height,
	                    end: ext.bottom
	                });
	            }
	            params[4] = all;
	        });
	    }
	
	    var Scroll = {
	        initSmooth: function initSmooth(selector, offset) {
	            var nodes = document.querySelectorAll(selector);
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var href = node.attributes.href;
	                if (href === undefined || href.length === 0) {
	                    continue;
	                }
	                var to = href.nodeValue.toString();
	                if (to.substr(0, 1) !== '#') {
	                    continue;
	                }
	
	                node.addEventListener('click', clickFor(to.substr(1), offset), false);
	            }
	        },
	        toggleClass: function toggleClass(selector, cls, overlap) {
	            var nodes = document.querySelectorAll(selector);
	            if (nodes.length > 0) {
	                window.addEventListener('optimizedResize', updateRegions);
	                window.addEventListener('optimizedScroll', onScroll);
	            }
	            for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var param = [node, null, cls, overlap, []];
	
	                // check for this node
	                var found = false;
	                for (var ii = 0; i < scrollNodes.length; i++) {
	                    if (scrollNodes[ii][0] == node) {
	                        scrollNodes[ii] = param;
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found) {
	                    scrollNodes.push(param);
	                }
	            }
	            updateRegions();
	            onScroll();
	        },
	        updateRegions: updateRegions
	    };
	
	    throttle('scroll', 'optimizedScroll');
	    throttle('resize', 'optimizedResize');
	
	    var style = document.createElement("style");
	    document.head.appendChild(style);
	    var sheet = style.sheet;
	
	    var heroTmpl = "<div class=\"hero\">\n    <div class=\"hero__header\">\n        <h3 class=\"hero__header__content\"><!-- yields header --></h3>\n    </div>\n    <div class=\"hero__container\">\n        <div class=\"hero__content\"><!-- yields content --></div>\n    </div>\n</div>\n";
	
	    var RedsiftHero = function RedsiftHero(el, opts) {
	      this.locators = {
	        hero: '.hero',
	        heroContainer: '.hero__container',
	        heroContent: '.hero__content',
	        heroHeader: '.hero__header',
	        heroHeaderContent: '.hero__header__content',
	        heroStickyHeader: '.hero-sticky-header',
	        heroStickyHeaderActive: '.hero-sticky-header--active',
	        scrollDownArrow: '#smooth'
	      }
	
	      this.downArrowHtml = '<div class="down-arrow"></div>';
	      this.hasStickyHeader = false;
	
	      this._setupElement(el, heroTmpl, opts);
	    };
	
	    RedsiftHero.prototype.setHeader = function setHeader(text) {
	      this.$headerContent.innerHTML = text;
	    };
	
	    RedsiftHero.prototype.setBgClass = function setBgClass(bgClass) {
	      this.$hero.className += " " + bgClass;
	    };
	
	    RedsiftHero.prototype.enableStickyHeader = function enableStickyHeader(flag, triggerElSelector) {
	        // NOTE: Do NOT use cached element here. For the first run these elements
	        // are only cached after this feature is handled!
	
	        if (flag) {
	            var $header = document.querySelector(this.locators.heroHeader),
	                $hero = document.querySelector(this.locators.hero);
	
	            if ($header) {
	              $header.classList.remove(this.locators.heroHeader.substr(1));
	              $header.classList.add(this.locators.heroStickyHeader.substr(1));
	              $hero.parentNode.parentNode.appendChild($header);
	            } // else the sticky-header is already present on the page
	
	            if (triggerElSelector && triggerElSelector != '') {
	                try {
	                    // TODO: change toggleClass signature to provide element list instead of selector
	                    //     for '.content' to be more flexible (i.e. provide first element after hero
	                    //     without having to know the name)
	                    Scroll.toggleClass(
	                        this.locators.heroStickyHeader,
	                        this.locators.heroStickyHeaderActive.substr(1),
	                        // FIXXME: replace hardcoded '.content' with something appropriate (based on aboves TODO)!
	                        triggerElSelector
	                    );
	                } catch (err) {
	                    console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
	                }
	            }
	
	            this.hasStickyHeader = true;
	        } else {
	            var $header$1 = document.querySelector(this.locators.heroStickyHeader),
	                $hero$1 = document.querySelector(this.locators.hero);
	
	            if ($header$1) {
	                $header$1.classList.add(this.locators.heroHeader.substr(1));
	                $header$1.classList.remove(this.locators.heroStickyHeader.substr(1));
	                $hero$1.insertBefore($header$1, $hero$1.firstChild);
	
	                // TODO: remove toggleClass callback!
	
	                this.hasStickyHeader = false;
	            }
	        }
	    };
	
	    RedsiftHero.prototype.enableScrollFeature = function enableScrollFeature(flag, scrollTarget) {
	      if (flag) {
	        this.$scrollFeature = this._createScrollFeatureElement(scrollTarget);
	        this.$container.appendChild(this.$scrollFeature);
	
	        var offset = this._getStickyHeaderHeight();
	        Scroll.initSmooth(this.locators.scrollDownArrow, -offset);
	      } else if (this.$scrollFeature && this.$scrollFeature.parentNode) {
	        this.$scrollFeature.parentNode.removeChild(this.$scrollFeature);
	      }
	    };
	
	    //----------------------------------------------------------
	    // Private API:
	    //----------------------------------------------------------
	
	    RedsiftHero.prototype._setupElement = function _setupElement(el, heroTmpl, opts) {
	      // Get the user provided inner block of the element, replace the elements
	      // content with the hero tree and insert the content at the correct place.
	      var userTmpl = el.innerHTML;
	      el.innerHTML = heroTmpl;
	
	      var content = document.querySelector(this.locators.heroContent);
	      content.innerHTML = userTmpl;
	
	      // NOTE: handle sticky header before caching, as this.$header is set
	      // differently depending this feature:
	      if (opts.hasStickyHeader) {
	        this.enableStickyHeader(true, opts.stickyHeaderTrigger);
	      }
	
	      this._cacheElements(opts.hasStickyHeader);
	
	      if (opts.header) {
	        this.setHeader(opts.header);
	      }
	
	      if (opts.bgClass) {
	        this.setBgClass(opts.bgClass);
	      }
	
	      if (opts.scrollTarget) {
	        this.enableScrollFeature(true, opts.scrollTarget);
	      }
	    };
	
	    RedsiftHero.prototype._createScrollFeatureElement = function _createScrollFeatureElement(scrollTarget) {
	      var a = document.createElement('a');
	
	      a.id = this.locators.scrollDownArrow.substr(1);
	      a.href = scrollTarget;
	      a.innerHTML = this.downArrowHtml;
	
	      // FIXXME: If the arrow is on the same height as the header it is not
	      // clickable due to the z-index.
	
	      return a;
	    };
	
	    RedsiftHero.prototype._getStickyHeaderHeight = function _getStickyHeaderHeight() {
	        var height = 0;
	
	        try {
	            if (this.hasStickyHeader) {
	                height = this.$header.getBoundingClientRect().height
	            }
	        } catch (err) {
	            console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
	        }
	    };
	
	    // TODO: implement generic caching functionality, e.g. this.querySelector(selector, useCache)
	    RedsiftHero.prototype._cacheElements = function _cacheElements(hasStickyHeader) {
	      this.$hero = document.querySelector(this.locators.hero);
	      if (hasStickyHeader) {
	        this.$header = document.querySelector(this.locators.heroStickyHeader);
	      } else {
	        this.$header = document.querySelector(this.locators.heroHeader);
	      }
	      this.$headerContent = document.querySelector(this.locators.heroHeaderContent);
	      this.$container = document.querySelector(this.locators.heroContainer);
	      this.$content = document.querySelector(this.locators.heroContent);
	      this.$scrollFeature = undefined;
	    };
	
	    var RedsiftHeroWebComponent = (function (HTMLElement) {
	      function RedsiftHeroWebComponent () {
	        HTMLElement.apply(this, arguments);
	      }
	
	      RedsiftHeroWebComponent.prototype = Object.create( HTMLElement && HTMLElement.prototype );
	      RedsiftHeroWebComponent.prototype.constructor = RedsiftHeroWebComponent;
	
	      var prototypeAccessors = { header: {},bgClass: {},hasStickyHeader: {},stickyHeader: {},scrollTarget: {} };
	
	      RedsiftHeroWebComponent.prototype.attachedCallback = function attachedCallback() {
	        var stickyHeaderTrigger = this.stickyHeader;
	
	        this.rsHero = new RedsiftHero(this, {
	          hasStickyHeader: this.hasStickyHeader,
	          stickyHeaderTrigger: stickyHeaderTrigger,
	          header: this.header,
	          bgClass: this.bgClass,
	          scrollTarget: this.scrollTarget
	        });
	      };
	
	      RedsiftHeroWebComponent.prototype.attributeChangedCallback = function attributeChangedCallback(attributeName, oldValue, newValue) {
	        if (attributeName === 'scroll-target') {
	          if (!newValue) {
	            this.rsHero.enableScrollFeature(false);
	          }
	
	          if (newValue && !oldValue) {
	            this.rsHero.enableScrollFeature(true, this.scrollTarget);
	          }
	        }
	
	        if (attributeName === 'sticky-header') {
	          if (this.hasStickyHeader) {
	            if (!newValue || newValue == '') {
	              console.log('[redsift-ui] WARNING: No selector specified with "sticky-header" attribute. No "hero-sticky-header--active" class will be added!');
	            }
	            this.rsHero.enableStickyHeader(true, this.stickyHeader);
	          } else {
	            this.rsHero.enableStickyHeader(false);
	          }
	        }
	      };
	
	      //----------------------------------------------------------------------------
	      // Attributes:
	      //----------------------------------------------------------------------------
	
	      prototypeAccessors.header.get = function() {
	        return this.getAttribute('header');
	      };
	
	      prototypeAccessors.header.set = function(val) {
	        this.setAttribute('header', val);
	      };
	
	      prototypeAccessors.bgClass.get = function() {
	        return this.getAttribute('bg-class');
	      };
	
	      prototypeAccessors.bgClass.set = function(val) {
	        this.setAttribute('bg-class', val);
	      };
	
	      prototypeAccessors.hasStickyHeader.get = function() {
	        var a = this.getAttribute('sticky-header');
	        if (a == '' || a) {
	          return true;
	        }
	
	        return false;
	      };
	
	      prototypeAccessors.stickyHeader.get = function() {
	          return this.getAttribute('sticky-header');
	      };
	
	      prototypeAccessors.stickyHeader.set = function(val) {
	        return this.setAttribute('sticky-header', val);
	      };
	
	      prototypeAccessors.scrollTarget.get = function() {
	        return this.getAttribute('scroll-target');
	      };
	
	      prototypeAccessors.scrollTarget.set = function(val) {
	        return this.setAttribute('scroll-target', val);
	      };
	
	      Object.defineProperties( RedsiftHeroWebComponent.prototype, prototypeAccessors );
	
	      return RedsiftHeroWebComponent;
	    }(HTMLElement));
	
	    function registerHeroElement () {
	        try {
	            document.registerElement('rs-hero', RedsiftHeroWebComponent);
	        } catch (e) {
	            console.log('[redsift-ui] Element already exists: ', e);
	        }
	    }
	
	    (function() {
	      if ('registerElement' in document
	          && 'import' in document.createElement('link')
	          && 'content' in document.createElement('template')) {
	        // platform is good!
	        // register the element per default:
	        registerHeroElement();
	      } else {
	        // polyfill the platform!
	        var e = document.createElement('script');
	        e.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/CustomElements.js';
	        document.body.appendChild(e);
	
	        window.addEventListener('WebComponentsReady', function(e) {
	          // register the element per default:
	          registerHeroElement();
	        });
	      }
	    })();
	
	    exports.registerHeroElement = registerHeroElement;
	    exports.RedsiftHero = RedsiftHero;
	
	    Object.defineProperty(exports, '__esModule', { value: true });
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = {
		"AED": "United Arab Emirates Dirham",
		"AFN": "Afghan Afghani",
		"ALL": "Albanian Lek",
		"AMD": "Armenian Dram",
		"ANG": "Netherlands Antillean Guilder",
		"AOA": "Angolan Kwanza",
		"ARS": "Argentine Peso",
		"AUD": "Australian Dollar",
		"AWG": "Aruban Florin",
		"AZN": "Azerbaijani Manat",
		"BAM": "Bosnia-Herzegovina Convertible Mark",
		"BBD": "Barbadian Dollar",
		"BDT": "Bangladeshi Taka",
		"BGN": "Bulgarian Lev",
		"BHD": "Bahraini Dinar",
		"BIF": "Burundian Franc",
		"BMD": "Bermudan Dollar",
		"BND": "Brunei Dollar",
		"BOB": "Bolivian Boliviano",
		"BRL": "Brazilian Real",
		"BSD": "Bahamian Dollar",
		"BTC": "Bitcoin",
		"BTN": "Bhutanese Ngultrum",
		"BWP": "Botswanan Pula",
		"BYN": "Belarusian Ruble",
		"BYR": "Belarusian Ruble (pre-2016)",
		"BZD": "Belize Dollar",
		"CAD": "Canadian Dollar",
		"CDF": "Congolese Franc",
		"CHF": "Swiss Franc",
		"CLF": "Chilean Unit of Account (UF)",
		"CLP": "Chilean Peso",
		"CNY": "Chinese Yuan",
		"COP": "Colombian Peso",
		"CRC": "Costa Rican Colón",
		"CUC": "Cuban Convertible Peso",
		"CUP": "Cuban Peso",
		"CVE": "Cape Verdean Escudo",
		"CZK": "Czech Republic Koruna",
		"DJF": "Djiboutian Franc",
		"DKK": "Danish Krone",
		"DOP": "Dominican Peso",
		"DZD": "Algerian Dinar",
		"EEK": "Estonian Kroon",
		"EGP": "Egyptian Pound",
		"ERN": "Eritrean Nakfa",
		"ETB": "Ethiopian Birr",
		"EUR": "Euro",
		"FJD": "Fijian Dollar",
		"FKP": "Falkland Islands Pound",
		"GBP": "British Pound Sterling",
		"GEL": "Georgian Lari",
		"GGP": "Guernsey Pound",
		"GHS": "Ghanaian Cedi",
		"GIP": "Gibraltar Pound",
		"GMD": "Gambian Dalasi",
		"GNF": "Guinean Franc",
		"GTQ": "Guatemalan Quetzal",
		"GYD": "Guyanaese Dollar",
		"HKD": "Hong Kong Dollar",
		"HNL": "Honduran Lempira",
		"HRK": "Croatian Kuna",
		"HTG": "Haitian Gourde",
		"HUF": "Hungarian Forint",
		"IDR": "Indonesian Rupiah",
		"ILS": "Israeli New Sheqel",
		"IMP": "Manx pound",
		"INR": "Indian Rupee",
		"IQD": "Iraqi Dinar",
		"IRR": "Iranian Rial",
		"ISK": "Icelandic Króna",
		"JEP": "Jersey Pound",
		"JMD": "Jamaican Dollar",
		"JOD": "Jordanian Dinar",
		"JPY": "Japanese Yen",
		"KES": "Kenyan Shilling",
		"KGS": "Kyrgystani Som",
		"KHR": "Cambodian Riel",
		"KMF": "Comorian Franc",
		"KPW": "North Korean Won",
		"KRW": "South Korean Won",
		"KWD": "Kuwaiti Dinar",
		"KYD": "Cayman Islands Dollar",
		"KZT": "Kazakhstani Tenge",
		"LAK": "Laotian Kip",
		"LBP": "Lebanese Pound",
		"LKR": "Sri Lankan Rupee",
		"LRD": "Liberian Dollar",
		"LSL": "Lesotho Loti",
		"LTL": "Lithuanian Litas",
		"LVL": "Latvian Lats",
		"LYD": "Libyan Dinar",
		"MAD": "Moroccan Dirham",
		"MDL": "Moldovan Leu",
		"MGA": "Malagasy Ariary",
		"MKD": "Macedonian Denar",
		"MMK": "Myanma Kyat",
		"MNT": "Mongolian Tugrik",
		"MOP": "Macanese Pataca",
		"MRO": "Mauritanian Ouguiya",
		"MTL": "Maltese Lira",
		"MUR": "Mauritian Rupee",
		"MVR": "Maldivian Rufiyaa",
		"MWK": "Malawian Kwacha",
		"MXN": "Mexican Peso",
		"MYR": "Malaysian Ringgit",
		"MZN": "Mozambican Metical",
		"NAD": "Namibian Dollar",
		"NGN": "Nigerian Naira",
		"NIO": "Nicaraguan Córdoba",
		"NOK": "Norwegian Krone",
		"NPR": "Nepalese Rupee",
		"NZD": "New Zealand Dollar",
		"OMR": "Omani Rial",
		"PAB": "Panamanian Balboa",
		"PEN": "Peruvian Nuevo Sol",
		"PGK": "Papua New Guinean Kina",
		"PHP": "Philippine Peso",
		"PKR": "Pakistani Rupee",
		"PLN": "Polish Zloty",
		"PYG": "Paraguayan Guarani",
		"QAR": "Qatari Rial",
		"RON": "Romanian Leu",
		"RSD": "Serbian Dinar",
		"RUB": "Russian Ruble",
		"RWF": "Rwandan Franc",
		"SAR": "Saudi Riyal",
		"SBD": "Solomon Islands Dollar",
		"SCR": "Seychellois Rupee",
		"SDG": "Sudanese Pound",
		"SEK": "Swedish Krona",
		"SGD": "Singapore Dollar",
		"SHP": "Saint Helena Pound",
		"SLL": "Sierra Leonean Leone",
		"SOS": "Somali Shilling",
		"SRD": "Surinamese Dollar",
		"STD": "São Tomé and Príncipe Dobra",
		"SVC": "Salvadoran Colón",
		"SYP": "Syrian Pound",
		"SZL": "Swazi Lilangeni",
		"THB": "Thai Baht",
		"TJS": "Tajikistani Somoni",
		"TMT": "Turkmenistani Manat",
		"TND": "Tunisian Dinar",
		"TOP": "Tongan Pa'anga",
		"TRY": "Turkish Lira",
		"TTD": "Trinidad and Tobago Dollar",
		"TWD": "New Taiwan Dollar",
		"TZS": "Tanzanian Shilling",
		"UAH": "Ukrainian Hryvnia",
		"UGX": "Ugandan Shilling",
		"USD": "United States Dollar",
		"UYU": "Uruguayan Peso",
		"UZS": "Uzbekistan Som",
		"VEF": "Venezuelan Bolívar Fuerte",
		"VND": "Vietnamese Dong",
		"VUV": "Vanuatu Vatu",
		"WST": "Samoan Tala",
		"XAF": "CFA Franc BEAC",
		"XAG": "Silver Ounce",
		"XAU": "Gold Ounce",
		"XCD": "East Caribbean Dollar",
		"XDR": "Special Drawing Rights",
		"XOF": "CFA Franc BCEAO",
		"XPD": "Palladium Ounce",
		"XPF": "CFP Franc",
		"XPT": "Platinum Ounce",
		"YER": "Yemeni Rial",
		"ZAR": "South African Rand",
		"ZMK": "Zambian Kwacha (pre-2013)",
		"ZMW": "Zambian Kwacha",
		"ZWL": "Zimbabwean Dollar"
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = {
		"AED": "د.إ;",
		"AFN": "Afs",
		"ALL": "L",
		"AMD": "AMD",
		"ANG": "NAƒ",
		"AOA": "Kz",
		"ARS": "$",
		"AUD": "$",
		"AWG": "ƒ",
		"AZN": "AZN",
		"BAM": "KM",
		"BBD": "Bds$",
		"BDT": "৳",
		"BGN": "BGN",
		"BHD": ".د.ب",
		"BIF": "FBu",
		"BMD": "BD$",
		"BND": "B$",
		"BOB": "Bs.",
		"BRL": "R$",
		"BSD": "R$",
		"BTC": "BTC",
		"BTN": "Nu.",
		"BWP": "P",
		"BYN": "Br",
		"BYR": "BYR",
		"BZD": "BZ$",
		"CAD": "$",
		"CDF": "F",
		"CHF": "Fr.",
		"CLF": "CLF",
		"CLP": "$",
		"CNY": "¥",
		"COP": "Col$",
		"CRC": "₡",
		"CUC": "CUC",
		"CUP": "$",
		"CVE": "Esc",
		"CZK": "Kč",
		"DJF": "Fdj",
		"DKK": "Kr",
		"DOP": "RD$",
		"DZD": "د.ج",
		"EEK": "KR",
		"EGP": "£",
		"ERN": "Nfa",
		"ETB": "Br",
		"EUR": "€",
		"FJD": "FJ$",
		"FKP": "£",
		"GBP": "£",
		"GEL": "GEL",
		"GGP": "£",
		"GHS": "GH₵",
		"GIP": "£",
		"GMD": "D",
		"GNF": "FG",
		"GTQ": "Q",
		"GYD": "GY$",
		"HKD": "HK$",
		"HNL": "L",
		"HRK": "kn",
		"HTG": "G",
		"HUF": "Ft",
		"IDR": "Rp",
		"ILS": "₪",
		"IMP": "£",
		"INR": "₹",
		"IQD": "د.ع",
		"IRR": "IRR",
		"ISK": "kr",
		"JEP": "£",
		"JMD": "J$",
		"JOD": "JOD",
		"JPY": "¥",
		"KES": "KSh",
		"KGS": "сом",
		"KHR": "៛",
		"KMF": "KMF",
		"KPW": "W",
		"KRW": "W",
		"KWD": "KWD",
		"KYD": "KY$",
		"KZT": "T",
		"LAK": "KN",
		"LBP": "£",
		"LKR": "Rs",
		"LRD": "L$",
		"LSL": "M",
		"LTL": "Lt",
		"LVL": "Ls",
		"LYD": "LD",
		"MAD": "MAD",
		"MDL": "MDL",
		"MGA": "FMG",
		"MKD": "MKD",
		"MMK": "K",
		"MNT": "₮",
		"MOP": "P",
		"MRO": "UM",
		"MTL": "MTL",
		"MUR": "Rs",
		"MVR": "Rf",
		"MWK": "MK",
		"MXN": "$",
		"MYR": "RM",
		"MZN": "MTn",
		"NAD": "N$",
		"NGN": "₦",
		"NIO": "C$",
		"NOK": "kr",
		"NPR": "NRs",
		"NZD": "NZ$",
		"OMR": "OMR",
		"PAB": "B./",
		"PEN": "S/.",
		"PGK": "K",
		"PHP": "₱",
		"PKR": "Rs.",
		"PLN": "zł",
		"PYG": "₲",
		"QAR": "QR",
		"RON": "L",
		"RSD": "din.",
		"RUB": "R",
		"RWF": "RWF",
		"SAR": "SR",
		"SBD": "SI$",
		"SCR": "SR",
		"SDG": "SDG",
		"SEK": "kr",
		"SGD": "S$",
		"SHP": "£",
		"SLL": "Le",
		"SOS": "Sh.",
		"SRD": "$",
		"STD": "STD",
		"SVC": "SVC",
		"SYP": "LS",
		"SZL": "E",
		"THB": "฿",
		"TJS": "TJS",
		"TMT": "m",
		"TND": "DT",
		"TOP": "TOP",
		"TRY": "TRY",
		"TTD": "TT$",
		"TWD": "NT$",
		"TZS": "TZS",
		"UAH": "UAH",
		"UGX": "USh",
		"USD": "US$",
		"UYU": "$U",
		"UZS": "UZS",
		"VEF": "Bs",
		"VND": "₫",
		"VUV": "VT",
		"WST": "WS$",
		"XAF": "CFA",
		"XAG": "XAG",
		"XAU": "XAU",
		"XCD": "EC$",
		"XDR": "SDR",
		"XOF": "CFA",
		"XPD": "XPD",
		"XPF": "F",
		"XPT": "Platinum Ounce",
		"YER": "YER",
		"ZAR": "R",
		"ZMK": "ZK",
		"ZMW": "ZMW",
		"ZWL": "Z$"
	};

/***/ }
/******/ ]);
//# sourceMappingURL=view.umd-es2015.js.map