(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "pwNi");
/******/ })
/************************************************************************/
/******/ ({

/***/ "09Cu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var ClientError = /** @class */function (_super) {
    __extends(ClientError, _super);
    function ClientError(response, request) {
        var _this = this;
        var message = ClientError.extractMessage(response) + ": " + JSON.stringify({ response: response, request: request });
        _this = _super.call(this, message) || this;
        _this.response = response;
        _this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        /* tslint:disable-next-line */
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, ClientError);
        }
        return _this;
    }
    ClientError.extractMessage = function (response) {
        try {
            return response.errors[0].message;
        } catch (e) {
            return "GraphQL Error (Code: " + response.status + ")";
        }
    };
    return ClientError;
}(Error);
exports.ClientError = ClientError;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "2JGW":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("cvSJ");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("BMrJ")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-2!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/preact-cli/lib/lib/webpack/proxy-loader.js??ref--2-0!./style.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-2!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/preact-cli/lib/lib/webpack/proxy-loader.js??ref--2-0!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "BMrJ":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var memoize = function memoize(fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = function (fn) {
	var memo = {};

	return function (selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector];
	};
}(function (target) {
	return document.querySelector(target);
});

var singleton = null;
var singletonCounter = 0;
var stylesInsertedAtTop = [];

var fixUrls = __webpack_require__("DRTY");

module.exports = function (list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if (newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if (domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j]();
				}delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if (domStyle) {
			domStyle.refs++;

			for (var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for (; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for (var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = { css: css, media: media, sourceMap: sourceMap };

		if (!newStyles[id]) styles.push(newStyles[id] = { id: id, parts: [part] });else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement(options, style) {
	var target = getElement(options.insertInto);

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if (idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement(options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs(el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
		result = options.transform(obj.css);

		if (result) {
			// If transform returns a value, use that instead of the original css.
			// This allows running runtime transformations on the css.
			obj.css = result;
		} else {
			// If the transform function returns a falsy value, don't add this css.
			// This allows conditional loading of css
			return function () {
				// noop
			};
		}
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);
	} else if (obj.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function remove() {
			removeStyleElement(style);

			if (style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function remove() {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if (newObj) {
			if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
}();

function applyToSingletonTag(style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag(style, obj) {
	var css = obj.css;
	var media = obj.media;

	if (media) {
		style.setAttribute("media", media);
	}

	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while (style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink(link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
 	If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
 	and there is no publicPath defined then lets turn convertToAbsoluteUrls
 	on by default.  Otherwise default to the convertToAbsoluteUrls option
 	directly
 */
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if (oldSrc) URL.revokeObjectURL(oldSrc);
}

/***/ }),

/***/ "BtxX":
/***/ (function(module, exports) {

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }
})(this);

/***/ }),

/***/ "CQH0":
/***/ (function(module, exports) {

(function (self) {

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : this);

/***/ }),

/***/ "DRTY":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-habitat/dist/preact-habitat.es.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Removes `-` fron a string and capetalize the letter after
 * example: data-props-hello-world =>  dataPropsHelloWorld
 * Used for props passed from host DOM element
 * @param  {String} str string
 * @return {String} Capetalized string
 */
var camelcasize = function camelcasize(str) {
  return str.replace(/-([a-z])/gi, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * [getExecutedScript internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
var getExecutedScript = function getExecutedScript() {
  return document.currentScript || function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  }();
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}  props object to be passed to the component
 */
var collectPropsFromElement = function collectPropsFromElement(element, defaultProps) {
  if (defaultProps === void 0) defaultProps = {};

  var attrs = element.attributes;

  var props = _extends({}, defaultProps);

  // collect from element
  Object.keys(attrs).forEach(function (key) {
    if (attrs.hasOwnProperty(key)) {
      var dataAttrName = attrs[key].name;
      if (!dataAttrName || typeof dataAttrName !== "string") {
        return false;
      }
      var propName = dataAttrName.split(/(data-props?-)/).pop() || '';
      propName = camelcasize(propName);
      if (dataAttrName !== propName) {
        var propValue = attrs[key].nodeValue;
        props[propName] = propValue;
      }
    }
  });

  // check for child script text/props or application/json
  [].forEach.call(element.getElementsByTagName('script'), function (scrp) {
    var propsObj = {};
    if (scrp.hasAttribute('type')) {
      if (scrp.getAttribute("type") !== "text/props" && scrp.getAttribute("type") !== "application/json") {
        return;
      }
      try {
        propsObj = JSON.parse(scrp.innerHTML);
      } catch (e) {
        throw new Error(e);
      }
      _extends(props, propsObj);
    }
  });

  return props;
};

var getHabitatSelectorFromClient = function getHabitatSelectorFromClient(currentScript) {
  var scriptTagAttrs = currentScript.attributes;
  var selector = null;
  // check for another props attached to the tag
  Object.keys(scriptTagAttrs).forEach(function (key) {
    if (scriptTagAttrs.hasOwnProperty(key)) {
      var dataAttrName = scriptTagAttrs[key].name;
      if (dataAttrName === 'data-mount-in') {
        selector = scriptTagAttrs[key].nodeValue;
      }
    }
  });
  return selector;
};

/**
 * Return array of 0 or more elements that will host our widget
 * @param  {id} attrId the data widget id attribute the host should have
 * @param  {document} scope  Docuemnt object or DOM Element as a scope
 * @return {Array}        Array of matching habitats
 */
var widgetDOMHostElements = function widgetDOMHostElements(ref) {
  var selector = ref.selector;
  var inline = ref.inline;
  var clientSpecified = ref.clientSpecified;

  var hostNodes = [];
  var currentScript = getExecutedScript();

  if (inline === true) {
    var parentNode = currentScript.parentNode;
    hostNodes.push(parentNode);
  }
  if (clientSpecified === true && !selector) {
    // user did not specify where to mount - get it from script tag attributes
    selector = getHabitatSelectorFromClient(currentScript);
  }
  if (selector) {
    [].forEach.call(document.querySelectorAll(selector), function (queriedTag) {
      hostNodes.push(queriedTag);
    });
  }
  return hostNodes;
};

/**
 * preact render function that will be queued if the DOM is not ready
 * and executed immeidatly if DOM is ready
 */
var preact_habitat_es_preactRender = function preactRender(widget, hostElements, root, cleanRoot, defaultProps) {
  hostElements.forEach(function (elm) {
    var hostNode = elm;
    if (hostNode._habitat) {
      return;
    }
    hostNode._habitat = true;
    var props = collectPropsFromElement(elm, defaultProps) || defaultProps;
    if (cleanRoot) {
      hostNode.innerHTML = "";
    }
    return Object(preact_min["render"])(Object(preact_min["h"])(widget, props), hostNode, root);
  });
};

var habitat = function habitat(Widget) {
  // Widget represents the Preact component we need to mount
  var widget = Widget;
  // preact root render helper
  var root = null;

  var render$$1 = function render$$1(ref) {
    if (ref === void 0) ref = {};
    var selector = ref.selector;if (selector === void 0) selector = null;
    var inline = ref.inline;if (inline === void 0) inline = false;
    var clean = ref.clean;if (clean === void 0) clean = false;
    var clientSpecified = ref.clientSpecified;if (clientSpecified === void 0) clientSpecified = false;
    var defaultProps = ref.defaultProps;if (defaultProps === void 0) defaultProps = {};

    var elements = widgetDOMHostElements({
      selector: selector,
      inline: inline,
      clientSpecified: clientSpecified
    });
    var loaded = function loaded() {
      if (elements.length > 0) {
        var elements$1 = widgetDOMHostElements({
          selector: selector,
          inline: inline,
          clientSpecified: clientSpecified
        });

        return preact_habitat_es_preactRender(widget, elements$1, root, clean, defaultProps);
      }
    };
    loaded();
    document.addEventListener("DOMContentLoaded", loaded);
    document.addEventListener("load", loaded);
  };

  return { render: render$$1 };
};

/* harmony default export */ var preact_habitat_es = (habitat);
//# sourceMappingURL=preact-habitat.es.js.map
// CONCATENATED MODULE: ./components/widget/logo.js
var logo = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOiM4MjgyODI7fS5jbHMtM3tjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpO30uY2xzLTR7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCk7fS5jbHMtNXtjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgtMik7fS5jbHMtNntmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50LTIpO30uY2xzLTd7Y2xpcC1wYXRoOnVybCgjY2xpcC1wYXRoLTMpO30uY2xzLTh7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudC0zKTt9LmNscy05e2NsaXAtcGF0aDp1cmwoI2NsaXAtcGF0aC00KTt9LmNscy0xMHtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50LTQpO308L3N0eWxlPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xODcuNDUsOTEuOTRjLTguMjMsNi4xNS0xMi4zNCwxMS4xNi0xNSwxNi40OC0xNC4zNSwyOC45MS00LjQ5LDU2LjM0LS43LDY0LjQyczEzLjEzLDI0LDEzLjEzLDI0TDI5Mi44MiwxOC4zNVoiLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iLTc2MC44OCIgeTE9IjYwNC45IiB4Mj0iLTc1My43OCIgeTI9IjYwNC45IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0yOC43OSwgMCwgMCwgMjguNzksIC0yMTU3MS4xOCwgLTE3MzA5LjA5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2EzYTFmYyIvPjxzdG9wIG9mZnNldD0iMC40OSIgc3RvcC1jb2xvcj0iI2EzYTFmYyIvPjxzdG9wIG9mZnNldD0iMC41NiIgc3RvcC1jb2xvcj0iIzliOWRmYiIvPjxzdG9wIG9mZnNldD0iMC42NiIgc3RvcC1jb2xvcj0iIzg1OTRmOCIvPjxzdG9wIG9mZnNldD0iMC43OSIgc3RvcC1jb2xvcj0iIzYxODRmMyIvPjxzdG9wIG9mZnNldD0iMC44NyIgc3RvcC1jb2xvcj0iIzQ2NzhmMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQ2NzhmMCIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtMiI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTQ2LjEzLDE0Mi45M0MxNDAuNzUsMTU1LDEzNS4yNSwxNjguODQsMTMzLjkxLDE4MmMtLjk0LDkuMzEtMS41MSwyMC4zNywwLDQzLjE0LDIuNzgsMzUuMDUsMjAuNTgsNjYuNTcsNDUuNjYsODQuNjZsMTEzLjEyLDc4LjgxUzIyMiwyODYuNzEsMTYyLjMyLDE4NS4zYTEwMi4zNiwxMDIuMzYsMCwwLDEtMTItMzQuNTgsNTUuNjEsNTUuNjEsMCwwLDEsLjEzLTE2LjU5Yy0xLjU1LDIuODctNC4zNiw4LjgtNC4zNiw4LjgiLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTIiIHgxPSItNzM2LjMyIiB5MT0iNjA2LjMyIiB4Mj0iLTcyOS4yMiIgeTI9IjYwNi4zMiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLCA1Mi4yMywgNTIuMjMsIDAsIC0zMTQ1My41MSwgMzg1NjEuNzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYTNhMWZjIi8+PHN0b3Agb2Zmc2V0PSIwLjE5IiBzdG9wLWNvbG9yPSIjYTNhMWZjIi8+PHN0b3Agb2Zmc2V0PSIwLjM2IiBzdG9wLWNvbG9yPSIjOGFiMGY5Ii8+PHN0b3Agb2Zmc2V0PSIwLjY3IiBzdG9wLWNvbG9yPSIjNTRjZmYzIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTRjZmYzIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC0zIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMDQuODUsMzg4LjYsNDEwLjIyLDMxNWM4LjIzLTYuMTcsMTIuMzUtMTEuMTcsMTUtMTYuNSwxNC4zNS0yOC45LDQuNDktNTYuMzMuNzEtNjQuNDFzLTEzLjEzLTI0LTEzLjEzLTI0WiIvPjwvY2xpcFBhdGg+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtMyIgeDE9Ii03MjYuNjUiIHkxPSI1ODEuNzEiIHgyPSItNzE5LjU1IiB5Mj0iNTgxLjcxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDI4LjQzLCAwLCAwLCAtMjguNDMsIDIwOTI0LjYyLCAxNjgzNi41MykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1NGNmZjMiLz48c3RvcCBvZmZzZXQ9IjAuMzYiIHN0b3AtY29sb3I9IiM1NGNmZjMiLz48c3RvcCBvZmZzZXQ9IjAuNDYiIHN0b3AtY29sb3I9IiM1M2M5ZjMiLz48c3RvcCBvZmZzZXQ9IjAuNTkiIHN0b3AtY29sb3I9IiM1MGI4ZjIiLz48c3RvcCBvZmZzZXQ9IjAuNzQiIHN0b3AtY29sb3I9IiM0YzljZjEiLz48c3RvcCBvZmZzZXQ9IjAuOSIgc3RvcC1jb2xvcj0iIzQ2NzhmMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQ2NzhmMCIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtNCI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDM1LjM1LDIyMS42N2M2LjQ3LDExLDEwLjg2LDI1Ljc2LDEyLDM0LjU4YTU1LjQ0LDU1LjQ0LDAsMCwxLS4xMywxNi41OWMxLjU1LTIuODcsNC4zNi04LjgsNC4zNi04LjgsNS4zOS0xMi4xLDEwLjktMjUuOTEsMTIuMjItMzkuMDkuOTQtOS4zMSwxLjUxLTIwLjM3LDAtNDMuMTMtMi43OC0zNS4wNS0yMC41OS02Ni41OC00NS42NS04NC42N0wzMDUsMTguMzRzNzAuNjgsMTAxLjkxLDEzMC4zNywyMDMuMzMiLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTQiIHgxPSItNzMwLjU1IiB5MT0iNjA5LjA3IiB4Mj0iLTcyMy40NSIgeTI9IjYwOS4wNyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLCA0My43NywgNDMuNzcsIDAsIC0yNjI3NS4yNiwgMzE5OTIuMTEpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYTNhMWZjIi8+PHN0b3Agb2Zmc2V0PSIwLjQiIHN0b3AtY29sb3I9IiNhM2ExZmMiLz48c3RvcCBvZmZzZXQ9IjAuNjEiIHN0b3AtY29sb3I9IiM4YWI2ZmQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MmU1ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+RU5TX0Z1bGwtbG9nb19Db2xvcjwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNC44Niw1MDIuNTNWNDM0YS4zNC4zNCwwLDAsMSwuMzUtLjM1SDQ4LjcyYS4zNS4zNSwwLDAsMSwuMzYuMzV2OC43MmEuMzYuMzYsMCwwLDEtLjM2LjM1SDE1LjM1djIwLjIxSDQzLjc2YS4zNC4zNCwwLDAsMSwuMzUuMzR2OC42M2EuMzQuMzQsMCwwLDEtLjM1LjM1SDE1LjM1djIwLjhINDguNzJhLjM1LjM1LDAsMCwxLC4zNi4zNXY4LjcyYS4zNS4zNSwwLDAsMS0uMzYuMzVINS4yMWEuMzQuMzQsMCwwLDEtLjM1LS4zNSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEwMC40NSw0NDMuMTN2NTkuNGEuMzQuMzQsMCwwLDEtLjM1LjM1aC05LjhhLjM1LjM1LDAsMCwxLS4zNS0uMzV2LTU5LjRINzEuMjdhLjM1LjM1LDAsMCwxLS4zNS0uMzVWNDM0YS4zNS4zNSwwLDAsMSwuMzUtLjM1aDQ3Ljg4YS4zNS4zNSwwLDAsMSwuMzUuMzV2OC43MmEuMzUuMzUsMCwwLDEtLjM1LjM1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIyNC41MSw1MDIuNTNWNDM0YS4zNC4zNCwwLDAsMSwuMzUtLjM1aDQzLjUyYS4zNC4zNCwwLDAsMSwuMzUuMzV2OC43MmEuMzUuMzUsMCwwLDEtLjM1LjM1SDIzNXYyMC4yMWgyOC40YS4zNC4zNCwwLDAsMSwuMzUuMzR2OC42M2EuMzQuMzQsMCwwLDEtLjM1LjM1SDIzNXYyMC44aDMzLjM3YS4zNC4zNCwwLDAsMSwuMzUuMzV2OC43MmEuMzUuMzUsMCwwLDEtLjM1LjM1SDIyNC44NmEuMzQuMzQsMCwwLDEtLjM1LS4zNSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE4Mi4zNSw1MDIuNTdWNDcyLjY5SDE1NC4yOHYyOS44N2EuMzUuMzUsMCwwLDEtLjM1LjM1aC05LjhhLjM1LjM1LDAsMCwxLS4zNi0uMzVWNDM0LjA4YS4zNS4zNSwwLDAsMSwuMzYtLjM1aDkuOGEuMzUuMzUsMCwwLDEsLjM1LjM1djI5LjE5aDI4LjA4VjQzNC4wOGEuMzUuMzUsMCwwLDEsLjM1LS4zNWg5LjhhLjM1LjM1LDAsMCwxLC4zNS4zNXY2OC40OGEuMzUuMzUsMCwwLDEtLjM1LjM1aC05LjhhLjM1LjM1LDAsMCwxLS4zNS0uMzUiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik00NzYuMzMsNTA0LjM4YTYzLjMxLDYzLjMxLDAsMCwxLTI0LjU5LTUuNDQuMzMuMzMsMCwwLDEtLjE4LS4zMVY0MzQuMDhhLjM1LjM1LDAsMCwxLC4zNS0uMzVoOS43OWEuMzUuMzUsMCwwLDEsLjM1LjM1djU2LjgzczUuMiwyLjQ4LDE0LjI4LDIuNDgsMTQuMzgtMi40OCwxNC4zOC0yLjQ4VjQzNC4wOGEuMzUuMzUsMCwwLDEsLjM1LS4zNWg5LjhhLjM1LjM1LDAsMCwxLC4zNS4zNXY2NC41NGEuMzIuMzIsMCwwLDEtLjE4LjMxLDY0LjExLDY0LjExLDAsMCwxLTI0LjcsNS40NCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTU4Mi4zMiw1MDIuNTd2LTQ1LjlsLTE1Ljg0LDMzLjUxYS4zNi4zNiwwLDAsMS0uMzIuMmgtNy4zM2EuMzYuMzYsMCwwLDEtLjMxLS4xOWwtMTYuMjMtMzMuNTJ2NDUuOWEuMzUuMzUsMCwwLDEtLjM1LjM1aC05LjhhLjM1LjM1LDAsMCwxLS4zNS0uMzVWNDM0LjA4YS4zNS4zNSwwLDAsMSwuMzUtLjM1aDkuOTJhLjMzLjMzLDAsMCwxLC4zMS4ybDIwLjEyLDQyLjg0LDE5LjczLTQyLjg0YS4zNC4zNCwwLDAsMSwuMzEtLjJoOS45MmEuMzUuMzUsMCwwLDEsLjM1LjM1djY4LjQ4YS4zNS4zNSwwLDAsMS0uMzUuMzVoLTkuOGEuMzUuMzUsMCwwLDEtLjM1LS4zNSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTM0MC4wNiw1MDIuOTFoMTAuODhhLjM1LjM1LDAsMCwwLC4yOS0uNTRMMzMyLDQ3My4xNmgxMS41NWEuMzEuMzEsMCwwLDAsLjI4LS4xNkEzNi43NywzNi43NywwLDAsMCwzNDkuNDQsNDU0YzAtMTAuMjItNS4xOS0xOC44MS02LTIwLjA2YS4zNC4zNCwwLDAsMC0uMjktLjE2aC00NC42YS4zNS4zNSwwLDAsMC0uMzUuMzV2NjguNDhhLjM1LjM1LDAsMCwwLC4zNS4zNWg5LjhhLjM1LjM1LDAsMCwwLC4zNi0uMzV2LTU5LjRoMjcuNDRzMy4xLDMuNywzLjEsMTAuODgtMi44LDEwLjc5LTIuOCwxMC43OUgzMTYuMTVhLjM1LjM1LDAsMCwwLS4yOS41NGwyMy45MSwzNy4zOWEuMzQuMzQsMCwwLDAsLjI5LjE2Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDI0LjMxLDQ5My40OUgzOTAuOTR2LTIwLjhoMjguNDFhLjM0LjM0LDAsMCwwLC4zNS0uMzV2LTguNjNhLjM0LjM0LDAsMCwwLS4zNS0uMzVIMzkwLjk0VjQ0My4xNmgzMy4zN2EuMzUuMzUsMCwwLDAsLjM1LS4zNXYtOC43MmEuMzUuMzUsMCwwLDAtLjM1LS4zNUgzODAuNzlhLjM1LjM1LDAsMCwwLS4zNS4zNXY2OC40OGEuMzQuMzQsMCwwLDAsLjM1LjM1aDQzLjUyYS4zNC4zNCwwLDAsMCwuMzUtLjM1di04LjcyYS4zNC4zNCwwLDAsMC0uMzUtLjM1Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNzEsNTgzLjUzSDY0LjNhLjMyLjMyLDAsMCwxLS4yOC0uMTVsLTE5LTI5djI4LjhhLjMzLjMzLDAsMCwxLS4zMy4zM0gzNy4yNGEuMzMuMzMsMCwwLDEtLjMzLS4zM1Y1MzguNjJhLjMzLjMzLDAsMCwxLC4zMy0uMzNoNi42OWEuMzUuMzUsMCwwLDEsLjI4LjE1bDE5LDI4LjkzVjUzOC42MmEuMzQuMzQsMCwwLDEsLjMzLS4zM0g3MWEuMzQuMzQsMCwwLDEsLjMzLjMzVjU4My4yYS4zNC4zNCwwLDAsMS0uMzMuMzMiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xMjMuNDcsNTgzLjUzaC03LjkyYS4zNC4zNCwwLDAsMS0uMzEtLjIybC0yLjk0LTguNThIOTZsLTIuOTMsOC41OGEuMzMuMzMsMCwwLDEtLjMxLjIySDg0Ljg3YS4zMi4zMiwwLDAsMS0uMzEtLjQ0bDE2LjM1LTQ0LjZhLjM0LjM0LDAsMCwxLC4zMS0uMjFoNS44OWEuMzUuMzUsMCwwLDEsLjMxLjIxbDE2LjM1LDQ0LjZhLjMzLjMzLDAsMCwxLS4zMS40NG0tMjUtMTUuOUgxMTBsLTUuNjQtMTYuNTFaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTc2Ljc3LDU4My41M2gtNy40M2EuMzMuMzMsMCwwLDEtLjMzLS4zM1Y1NTYuNzRMMTYwLjIsNTc1LjRhLjM0LjM0LDAsMCwxLS4zLjE5aC01LjQyYS4zNS4zNSwwLDAsMS0uMy0uMTlsLTkuMDctMTguNzNWNTgzLjJhLjMzLjMzLDAsMCwxLS4zMy4zM2gtNy40M2EuMzMuMzMsMCwwLDEtLjMzLS4zM1Y1MzguNjJhLjMzLjMzLDAsMCwxLC4zMy0uMzNoNy4yOGEuMzMuMzMsMCwwLDEsLjMuMTlsMTIuMjQsMjYuMDcsMTItMjYuMDdhLjMzLjMzLDAsMCwxLC4zLS4xOWg3LjI4YS4zMy4zMywwLDAsMSwuMzMuMzNWNTgzLjJhLjMzLjMzLDAsMCwxLS4zMy4zMyIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIyNC43Nyw1ODMuNTNIMTk2YS4zNC4zNCwwLDAsMS0uMzMtLjMzVjUzOC42MmEuMzQuMzQsMCwwLDEsLjMzLS4zM2gyOC43N2EuMzMuMzMsMCwwLDEsLjMzLjMzdjYuNzRhLjMzLjMzLDAsMCwxLS4zMy4zM2gtMjF2MTEuMzZoMTcuODhhLjMzLjMzLDAsMCwxLC4zMy4zM3Y2LjY5YS4zNC4zNCwwLDAsMS0uMzMuMzNIMjAzLjc2djExLjcyaDIxYS4zMy4zMywwLDAsMSwuMzMuMzN2Ni43NGEuMzMuMzMsMCwwLDEtLjMzLjMzIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzQ1Ljc1LDU4My41M0gzMTdhLjMzLjMzLDAsMCwxLS4zMy0uMzNWNTM4LjYyYS4zMy4zMywwLDAsMSwuMzMtLjMzaDI4Ljc4YS4zMy4zMywwLDAsMSwuMzMuMzN2Ni43NGEuMzMuMzMsMCwwLDEtLjMzLjMzaC0yMXYxMS4zNmgxNy44OGEuMzIuMzIsMCwwLDEsLjMzLjMzdjYuNjlhLjMzLjMzLDAsMCwxLS4zMy4zM0gzMjQuNzN2MTEuNzJoMjFhLjMzLjMzLDAsMCwxLC4zMy4zM3Y2Ljc0YS4zMy4zMywwLDAsMS0uMzMuMzMiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik00MjguNjYsNTgzLjUzaC01Ljc0YS4zNC4zNCwwLDAsMS0uMzEtLjIzTDQwOCw1MzguNzJhLjMzLjMzLDAsMCwxLC4zMS0uNDRINDE2YS4zNC4zNCwwLDAsMSwuMzEuMjNsOS40OSwzMCw5LjQ5LTMwYS4zMi4zMiwwLDAsMSwuMzEtLjIzaDcuODRhLjMzLjMzLDAsMCwxLC4zMS40NEw0MjksNTgzLjNhLjMyLjMyLDAsMCwxLS4zMS4yMyIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTQ2NC41OSw1ODMuNTNoLTcuNDNhLjMzLjMzLDAsMCwxLS4zMy0uMzNWNTM4LjYyYS4zMy4zMywwLDAsMSwuMzMtLjMzaDcuNDNhLjMzLjMzLDAsMCwxLC4zMy4zM1Y1ODMuMmEuMzMuMzMsMCwwLDEtLjMzLjMzIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTU4LjE5LDU4My41M0g1MjkuNDFhLjMzLjMzLDAsMCwxLS4zMy0uMzNWNTM4LjYyYS4zMy4zMywwLDAsMSwuMzMtLjMzaDI4Ljc4YS4zMy4zMywwLDAsMSwuMzMuMzN2Ni43NGEuMzMuMzMsMCwwLDEtLjMzLjMzaC0yMXYxMS4zNmgxNy44OGEuMzIuMzIsMCwwLDEsLjMzLjMzdjYuNjlhLjMzLjMzLDAsMCwxLS4zMy4zM0g1MzcuMTd2MTEuNzJoMjFhLjMzLjMzLDAsMCwxLC4zMy4zM3Y2Ljc0YS4zMy4zMywwLDAsMS0uMzMuMzMiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik01MTEuODcsNTgzLjZINDg2LjMxYS4zMS4zMSwwLDAsMS0uMy0uMThjLS41NS0xLjMxLTMuNzEtOS40NS0zLjcxLTIyLjU2czMuMTYtMjEuMTYsMy43LTIyLjQ1YS4zMS4zMSwwLDAsMSwuMy0uMTloMjUuNTdhLjMzLjMzLDAsMCwxLC4zMy4zM3Y2LjlhLjMzLjMzLDAsMCwxLS4zMy4zM2gtMjAuMWE2Mi4xMiw2Mi4xMiwwLDAsMC0xLjU4LDE1LjA3QTY0LDY0LDAsMCwwLDQ5MS43Nyw1NzZoMjAuMWEuMzMuMzMsMCwwLDEsLjMzLjMzdjYuOWEuMzMuMzMsMCwwLDEtLjMzLjMzIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDAwLDU4My41OWgtOC4yMWEuMzMuMzMsMCwwLDEtLjI4LS4xNWwtMTYuMDYtMjUuMTFhLjMzLjMzLDAsMCwxLC4yOC0uNUgzODcuM2ExMS41MSwxMS41MSwwLDAsMCwxLjU0LTYuMiwxMC44OCwxMC44OCwwLDAsMC0xLjcyLTYuMjdIMzcwLjgxdjM3LjlhLjMzLjMzLDAsMCwxLS4zMy4zM2gtNy40MmEuMzMuMzMsMCwwLDEtLjMzLS4zM1Y1MzguNWEuMzMuMzMsMCwwLDEsLjMzLS4zMmgyOS42bC4wOS4xMmEyNy4yMiwyNy4yMiwwLDAsMSw0LDEzLjI3LDI2LjU4LDI2LjU4LDAsMCwxLTMuNzMsMTNsLS4wOS4xM2gtNS4zNloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODIuMiw1ODQuODZhNTkuNzQsNTkuNzQsMCwwLDEtMTUuNjItMi4yOS4zMS4zMSwwLDAsMS0uMjEtLjMxdi03Ljk0YS4zMi4zMiwwLDAsMSwuMzMtLjMzaDcuNjd2Mi40OGEzMC44NywzMC44NywwLDAsMCwxNS42LDB2LTkuMjFsLTIzLjM3LTguMTlhLjMyLjMyLDAsMCwxLS4yMi0uMzFWNTM5Ljg4YS4zMS4zMSwwLDAsMSwuMjEtLjMxLDU4LjczLDU4LjczLDAsMCwxLDE1LjU1LTIuMjksNTkuMzQsNTkuMzQsMCwwLDEsMTUuNiwyLjI5LjMxLjMxLDAsMCwxLC4yMy4zMXY3Ljk0YS4zMy4zMywwLDAsMS0uMzMuMzNIMjkwdi0yLjQ4YTMzLjU0LDMzLjU0LDAsMCwwLTcuODQtMSwzMi44MywzMi44MywwLDAsMC03Ljc1LDFsMCw4LjYzLDIzLjM0LDguMTlhLjM0LjM0LDAsMCwxLC4yMi4zMXYxOS40N2EuMzEuMzEsMCwwLDEtLjIyLjMxLDU5LDU5LDAsMCwxLTE1LjU1LDIuMjkiLz48ZyBjbGFzcz0iY2xzLTMiPjxyZWN0IGNsYXNzPSJjbHMtNCIgeD0iMTE0LjE4IiB5PSItMi40MyIgd2lkdGg9IjIyMi41NSIgaGVpZ2h0PSIyMjAuMDciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02LjUyIDIwMC4zMykgcm90YXRlKC00Ny4zKSIvPjwvZz48ZyBjbGFzcz0iY2xzLTUiPjxyZWN0IGNsYXNzPSJjbHMtNiIgeD0iNjUuMDYiIHk9IjExNS42NiIgd2lkdGg9IjI5NC45NiIgaGVpZ2h0PSIyOTEuNDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjMuMzYgMjM1LjcpIHJvdGF0ZSgtNDYuNTEpIi8+PC9nPjxnIGNsYXNzPSJjbHMtNyI+PHJlY3QgY2xhc3M9ImNscy04IiB4PSIyNjAuNDUiIHk9IjE5Mi45MSIgd2lkdGg9IjIyMy41MSIgaGVpZ2h0PSIyMTIuODciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04Ni43NCA0MzEuNykgcm90YXRlKC01NC44OSkiLz48L2c+PGcgY2xhc3M9ImNscy05Ij48cmVjdCBjbGFzcz0iY2xzLTEwIiB4PSIyMzUuNjgiIHk9IjE4LjA1IiB3aWR0aD0iMjk4Ljg5IiBoZWlnaHQ9IjI1NS4wOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODYuNDEgNDI4Ljk0KSByb3RhdGUoLTY0LjIpIi8+PC9nPjwvc3ZnPg==";

/* harmony default export */ var widget_logo = (logo);
// EXTERNAL MODULE: ../node_modules/graphql-request/dist/src/index.js
var src = __webpack_require__("jVFm");
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// CONCATENATED MODULE: ../node_modules/@ensdomains/renewal/dist/index.js
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var GET_DOMAINS_OWNED_BY_ADDRESS_FROM_SUBGRAPH = '\n  query getDomains($userAddress: String!, $expiryDate: Int!) {\n    account(id: $userAddress) {\n      registrations(\n        orderBy:expiryDate, orderDirection:asc,\n        where:{ expiryDate_lt: $expiryDate }\n      ) {\n        expiryDate\n        domain {\n          labelName\n        }\n      }\n    }\n  }\n';

var endpoint = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
var client = new src["GraphQLClient"](endpoint, {
  headers: {
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
  }
});

var jsonToQueryString = function jsonToQueryString(json) {
  if (!json) return '';
  return '?' + Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&');
};

// const host = 'https://app.ens.domains'
// Test site for bulk renewal
var host = 'http://craven-cup.surge.sh';

var checkRenewal = function () {
  var _ref = _asyncToGenerator(function* (userAddress, utmParams, _ref2) {
    var expiryDate = _ref2.expiryDate,
        debug = _ref2.debug;

    if (!expiryDate) {
      var date = new Date();
      expiryDate = date.setDate(date.getDate() + 30);
    } else {
      expiryDate = expiryDate.getTime();
    }

    var _ref3 = yield client.request(GET_DOMAINS_OWNED_BY_ADDRESS_FROM_SUBGRAPH, {
      userAddress: userAddress.toLowerCase(),
      expiryDate: parseInt(expiryDate / 1000)
    }),
        account = _ref3.account;

    var count = account ? account.registrations.length : 0;
    var firstExpiryDate = account && account.registrations[0] && account.registrations[0].expiryDate;
    if (debug) {
      console.log(account.registrations.map(function (r) {
        return [r.domain.labelName, new Date(r.expiryDate * 1000)];
      }));
    }
    var res = {
      numExpiringDomains: count,
      firstExpiryDate: firstExpiryDate && new Date(firstExpiryDate * 1000),
      renewalUrl: host + '/address/' + userAddress + jsonToQueryString(utmParams)
    };
    return res;
  });

  return function checkRenewal(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
// EXTERNAL MODULE: ./components/widget/style.scss
var style = __webpack_require__("2JGW");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./components/widget/index.js
var _closeStyle;




function widget__asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var closeStyle = (_closeStyle = {
  color: "#ADBBCD",
  "padding-left": "1em"
}, _closeStyle['color'] = "rgb(173, 187, 205)", _closeStyle.float = "left", _closeStyle.width = "100%", _closeStyle["text-align"] = "left", _closeStyle.cursor = "pointer", _closeStyle);

var imageStyle = {
  width: '44%',
  display: 'block',
  marginTop: '15px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

var containerStyle = {
  backgroundColor: 'white',
  boxShadow: '-4px 18px 108px 20px rgba(84,112,130,0.61)',
  borderRadius: '6px',
  paddingTop: '15px',
  width: '337px',
  height: '417px',
  position: 'fixed',
  zIndex: 1111111,
  bottom: 0,
  right: 0,
  "font-family": "Overpass",
  fontWeight: '300',
  fontSize: '24px',
  color: '#2B2B2B',
  letterSpacing: '0',
  textAlign: 'center',
  lineHeight: '30px'
};

var buttonStyle = {
  "display": "inline-block",
  "background": "#5384FE",
  "color": "#FFFFFF",
  "font-size": "14px",
  "font-weight": "700",
  "font-family": "Overpass",
  "text-transform": "capitalize",
  "letter-spacingv": "1.5px",
  "text-decoration": "none",
  "padding": "0.5em 25px",
  "border-radius": "25px",
  "transition": "all 0.2s ease 0s",
  "border-width": "2px",
  "border-style": "solid",
  "border-color": "rgb(83, 132, 254)",
  "border-image": "initial",
  "margin-bottom": "1em"
};

var doNotShowStyle = {
  "fontFamily": "Helvetica",
  "fontSize": "12px",
  "color": "#ADBBCD",
  "letterSpacing": "0",
  "textAlign": "center"
};

var messageStyle = {
  "padding": "0 1em"
};

var dateDiff = function dateDiff(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
};

var _ref5 = Object(preact_min["h"])('img', { style: imageStyle, src: widget_logo });

var _ref6 = Object(preact_min["h"])('br', null);

var widget_App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.ref = Object(preact_min["createRef"])(), _this.close = function (e) {
      _this.setState({ closed: true });
    }, _this.neverShow = function (e) {
      window.localStorage.setItem('neverShow', true);
      _this.close();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  App.prototype.componentDidMount = function () {
    var _ref = widget__asyncToGenerator(function* () {
      var callCheckRenewal = function () {
        var _ref3 = widget__asyncToGenerator(function* () {
          console.log('Widget2');
          if (!userAddress) {
            if (window.ethereum) {
              var addresses = yield window.ethereum.enable();
              if (addresses.length > 0) {
                userAddress = addresses[0];
              }
            } else {
              console.log('Failing to get Ethereum address. window.ethereum does not exist.');
            }
          }
          if (userAddress) {
            console.log('call checkRenweal');

            var _ref4 = yield checkRenewal(userAddress, utmParams, {}),
                numExpiringDomains = _ref4.numExpiringDomains,
                renewalUrl = _ref4.renewalUrl,
                firstExpiryDate = _ref4.firstExpiryDate;

            var days = dateDiff(new Date(), firstExpiryDate);
            if (numExpiringDomains > 0) {
              self.setState({ numExpiringDomains: numExpiringDomains, days: days, renewalUrl: renewalUrl });
            }
          } else {
            if (window.ethereum) {
              setTimeout(callCheckRenewal, 1000);
            }
          }
        });

        return function callCheckRenewal() {
          return _ref3.apply(this, arguments);
        };
      }();

      console.log('Widget1', this.props);

      var _ref2 = this.props || {},
          userAddress = _ref2.userAddress,
          utmParams = _ref2.utmParams;

      if (utmParams) utmParams = JSON.parse(utmParams);

      var self = this;

      setTimeout(callCheckRenewal, 2000);
      console.log('componentDidMount2');
    });

    function componentDidMount() {
      return _ref.apply(this, arguments);
    }

    return componentDidMount;
  }();

  App.prototype.render = function render(props) {
    console.log('Widget 3 render', this.state);
    if (this.state.numExpiringDomains && !this.state.closed && !window.localStorage.getItem('neverShow')) {
      var _state = this.state,
          numExpiringDomains = _state.numExpiringDomains,
          days = _state.days,
          renewalUrl = _state.renewalUrl;

      return Object(preact_min["h"])(
        'div',
        { style: containerStyle, ref: this.ref },
        Object(preact_min["h"])(
          'span',
          { style: closeStyle, onClick: this.close },
          'x'
        ),
        _ref5,
        Object(preact_min["h"])(
          'p',
          { style: messageStyle },
          'You have ',
          numExpiringDomains,
          ' ENS names expiring in ',
          days,
          ' days '
        ),
        Object(preact_min["h"])(
          'a',
          { style: buttonStyle, href: renewalUrl, target: '_blank' },
          'Renew Now'
        ),
        _ref6,
        Object(preact_min["h"])('input', { type: 'checkbox', id: 'vehicle1', name: 'vehicle1', value: 'Bike', onClick: this.neverShow }),
        Object(preact_min["h"])(
          'span',
          { style: doNotShowStyle, onClick: this.neverShoww },
          'Don\'t show this message again'
        )
      );
    } else {
      return null;
    }
  };

  return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js
var poly = __webpack_require__("m+Gh");






var _habitat = preact_habitat_es(widget_App);

_habitat.render({
  selector: '[data-widget-host="ensdomains-renewal-widget"]',
  clean: true
});

/***/ }),

/***/ "KM04":
/***/ (function(module, exports) {

var n,
    l,
    u,
    t,
    i,
    o,
    r,
    f,
    e = {},
    c = [],
    s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function a(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }return n;
}function p(n) {
  var l = n.parentNode;l && l.removeChild(n);
}function v(n, l, u) {
  var t,
      i = arguments,
      o = {};for (t in l) {
    "key" !== t && "ref" !== t && (o[t] = l[t]);
  }if (arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) {
    u.push(i[t]);
  }if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (t in n.defaultProps) {
    void 0 === o[t] && (o[t] = n.defaultProps[t]);
  }return h(n, o, l && l.key, l && l.ref, null);
}function h(l, u, t, i, o) {
  var r = { type: l, props: u, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: o };return null == o && (r.__v = r), n.vnode && n.vnode(r), r;
}function y(n) {
  return n.children;
}function d(n, l) {
  this.props = n, this.context = l;
}function x(n, l) {
  if (null == l) return n.__ ? x(n.__, n.__.__k.indexOf(n) + 1) : null;for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }return "function" == typeof n.type ? x(n) : null;
}function m(n) {
  var l, u;if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;break;
      }
    }return m(n);
  }
}function w(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !t++ || o !== n.debounceRendering) && ((o = n.debounceRendering) || i)(g);
}function g() {
  for (var n; t = u.length;) {
    n = u.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), u = [], n.some(function (n) {
      var l, u, t, i, o, r, f;n.__d && (r = (o = (l = n).__v).__e, (f = l.__P) && (u = [], (t = a({}, o)).__v = t, i = z(f, o, t, l.__n, void 0 !== f.ownerSVGElement, null, u, null == r ? x(o) : r), A(u, o), i != r && m(o)));
    });
  }
}function k(n, l, u, t, i, o, r, f, s) {
  var a,
      v,
      h,
      y,
      d,
      m,
      w,
      g = u && u.__k || c,
      k = g.length;if (f == e && (f = null != o ? o[0] : k ? x(u, 0) : null), a = 0, l.__k = _(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (h = g[a]) || h && u.key == h.key && u.type === h.type) g[a] = void 0;else for (v = 0; v < k; v++) {
        if ((h = g[v]) && u.key == h.key && u.type === h.type) {
          g[v] = void 0;break;
        }h = null;
      }if (y = z(n, u, h = h || e, t, i, o, r, f, s), (v = u.ref) && h.ref != v && (w || (w = []), h.ref && w.push(h.ref, null, u), w.push(v, u.__c || y, u)), null != y) {
        var c;if (null == m && (m = y), void 0 !== u.__d) c = u.__d, u.__d = void 0;else if (o == h || y != f || null == y.parentNode) {
          n: if (null == f || f.parentNode !== n) n.appendChild(y), c = null;else {
            for (d = f, v = 0; (d = d.nextSibling) && v < k; v += 2) {
              if (d == y) break n;
            }n.insertBefore(y, f), c = f;
          }"option" == l.type && (n.value = "");
        }f = void 0 !== c ? c : y.nextSibling, "function" == typeof l.type && (l.__d = f);
      } else f && h.__e == f && f.parentNode != n && (f = x(h));
    }return a++, u;
  }), l.__e = m, null != o && "function" != typeof l.type) for (a = o.length; a--;) {
    null != o[a] && p(o[a]);
  }for (a = k; a--;) {
    null != g[a] && j(g[a], g[a]);
  }if (w) for (a = 0; a < w.length; a++) {
    $(w[a], w[++a], w[++a]);
  }
}function _(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) {
    _(n[t], l, u);
  } else u.push(l ? l("string" == typeof n || "number" == typeof n ? h(null, n, null, null, n) : null != n.__e || null != n.__c ? h(n.type, n.props, n.key, null, n.__v) : n) : n);return u;
}function b(n, l, u, t, i) {
  var o;for (o in u) {
    "children" === o || "key" === o || o in l || C(n, o, null, u[o], t);
  }for (o in l) {
    i && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], t);
  }
}function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === s.test(l) ? u + "px" : null == u ? "" : u;
}function C(n, l, u, t, i) {
  var o, r, f, e, c;if (i ? "className" === l && (l = "class") : "class" === l && (l = "className"), "style" === l) {
    if (o = n.style, "string" == typeof u) o.cssText = u;else {
      if ("string" == typeof t && (o.cssText = "", t = null), t) for (e in t) {
        u && e in u || P(o, e, "");
      }if (u) for (c in u) {
        t && u[c] === t[c] || P(o, c, u[c]);
      }
    }
  } else "o" === l[0] && "n" === l[1] ? (r = l !== (l = l.replace(/Capture$/, "")), f = l.toLowerCase(), l = (f in n ? f : l).slice(2), u ? (t || n.addEventListener(l, N, r), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, N, r)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
}function N(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}function z(l, u, t, i, o, r, f, e, c) {
  var s,
      p,
      v,
      h,
      x,
      m,
      w,
      g,
      _,
      b,
      P = u.type;if (void 0 !== u.constructor) return null;(s = n.__b) && s(u);try {
    n: if ("function" == typeof P) {
      if (g = u.props, _ = (s = P.contextType) && i[s.__c], b = s ? _ ? _.props.value : s.__ : i, t.__c ? w = (p = u.__c = t.__c).__ = p.__E : ("prototype" in P && P.prototype.render ? u.__c = p = new P(g, b) : (u.__c = p = new d(g, b), p.constructor = P, p.render = D), _ && _.sub(p), p.props = g, p.state || (p.state = {}), p.context = b, p.__n = i, v = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), null != P.getDerivedStateFromProps && (p.__s == p.state && (p.__s = a({}, p.__s)), a(p.__s, P.getDerivedStateFromProps(g, p.__s))), h = p.props, x = p.state, v) null == P.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== h && null != p.componentWillReceiveProps && p.componentWillReceiveProps(g, b), !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(g, p.__s, b) || u.__v === t.__v && !p.__) {
          for (p.props = g, p.state = p.__s, u.__v !== t.__v && (p.__d = !1), p.__v = u, u.__e = t.__e, u.__k = t.__k, p.__h.length && f.push(p), s = 0; s < u.__k.length; s++) {
            u.__k[s] && (u.__k[s].__ = u);
          }break n;
        }null != p.componentWillUpdate && p.componentWillUpdate(g, p.__s, b), null != p.componentDidUpdate && p.__h.push(function () {
          p.componentDidUpdate(h, x, m);
        });
      }p.context = b, p.props = g, p.state = p.__s, (s = n.__r) && s(u), p.__d = !1, p.__v = u, p.__P = l, s = p.render(p.props, p.state, p.context), u.__k = null != s && s.type == y && null == s.key ? s.props.children : Array.isArray(s) ? s : [s], null != p.getChildContext && (i = a(a({}, i), p.getChildContext())), v || null == p.getSnapshotBeforeUpdate || (m = p.getSnapshotBeforeUpdate(h, x)), k(l, u, t, i, o, r, f, e, c), p.base = u.__e, p.__h.length && f.push(p), w && (p.__E = p.__ = null), p.__e = !1;
    } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = T(t.__e, u, t, i, o, r, f, c);(s = n.diffed) && s(u);
  } catch (l) {
    u.__v = null, n.__e(l, u, t);
  }return u.__e;
}function A(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}function T(n, l, u, t, i, o, r, f) {
  var s,
      a,
      p,
      v,
      h,
      y = u.props,
      d = l.props;if (i = "svg" === l.type || i, null != o) for (s = 0; s < o.length; s++) {
    if (null != (a = o[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
      n = a, o[s] = null;break;
    }
  }if (null == n) {
    if (null === l.type) return document.createTextNode(d);n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && { is: d.is }), o = null, f = !1;
  }if (null === l.type) y !== d && n.data != d && (n.data = d);else {
    if (null != o && (o = c.slice.call(n.childNodes)), p = (y = u.props || e).dangerouslySetInnerHTML, v = d.dangerouslySetInnerHTML, !f) {
      if (y === e) for (y = {}, h = 0; h < n.attributes.length; h++) {
        y[n.attributes[h].name] = n.attributes[h].value;
      }(v || p) && (v && p && v.__html == p.__html || (n.innerHTML = v && v.__html || ""));
    }b(n, d, y, i, f), l.__k = l.props.children, v || k(n, l, u, t, "foreignObject" !== l.type && i, o, r, e, f), f || ("value" in d && void 0 !== d.value && d.value !== n.value && (n.value = null == d.value ? "" : d.value), "checked" in d && void 0 !== d.checked && d.checked !== n.checked && (n.checked = d.checked));
  }return n;
}function $(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}function j(l, u, t) {
  var i, o, r;if (n.unmount && n.unmount(l), (i = l.ref) && (i.current && i.current !== l.__e || $(i, null, u)), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = void 0, null != (i = l.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }i.base = i.__P = null;
  }if (i = l.__k) for (r = 0; r < i.length; r++) {
    i[r] && j(i[r], u, t);
  }null != o && p(o);
}function D(n, l, u) {
  return this.constructor(n, u);
}function E(l, u, t) {
  var i, o, f;n.__ && n.__(l, u), o = (i = t === r) ? null : t && t.__k || u.__k, l = v(y, null, [l]), f = [], z(u, (i ? u : t || u).__k = l, o || e, e, void 0 !== u.ownerSVGElement, t && !i ? [t] : o ? null : c.slice.call(u.childNodes), f, t || e, i), A(f, l);
}n = { __e: function __e(n, l) {
    for (var u, t; l = l.__;) {
      if ((u = l.__c) && !u.__) try {
        if (u.constructor && null != u.constructor.getDerivedStateFromError && (t = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (t = !0, u.componentDidCatch(n)), t) return w(u.__E = u);
      } catch (l) {
        n = l;
      }
    }throw n;
  } }, l = function l(n) {
  return null != n && void 0 === n.constructor;
}, d.prototype.setState = function (n, l) {
  var u;u = this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && a(u, n), null != n && this.__v && (l && this.__h.push(l), w(this));
}, d.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), w(this));
}, d.prototype.render = y, u = [], t = 0, i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, r = e, f = 0, exports.render = E, exports.hydrate = function (n, l) {
  E(n, l, r);
}, exports.createElement = v, exports.h = v, exports.Fragment = y, exports.createRef = function () {
  return {};
}, exports.isValidElement = l, exports.Component = d, exports.cloneElement = function (n, l) {
  return l = a(a({}, n.props), l), arguments.length > 2 && (l.children = c.slice.call(arguments, 2)), h(n.type, l, l.key || n.key, l.ref || n.ref, null);
}, exports.createContext = function (n) {
  var l = {},
      u = { __c: "__cC" + f++, __: n, Consumer: function Consumer(n, l) {
      return n.children(l);
    }, Provider: function Provider(n) {
      var t,
          i = this;return this.getChildContext || (t = [], this.getChildContext = function () {
        return l[u.__c] = i, l;
      }, this.shouldComponentUpdate = function (n) {
        i.props.value !== n.value && t.some(function (l) {
          l.context = n.value, w(l);
        });
      }, this.sub = function (n) {
        t.push(n);var l = n.componentWillUnmount;n.componentWillUnmount = function () {
          t.splice(t.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    } };return u.Consumer.contextType = u, u;
}, exports.toChildArray = _, exports._e = j, exports.options = n;
//# sourceMappingURL=preact.js.map

/***/ }),

/***/ "QAmr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch == 'function' ? fetch.bind() : function (url, options) {
	options = options || {};
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url, true);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials == 'include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body || null);

		function response() {
			var _keys = [],
			    all = [],
			    headers = {},
			    header;

			request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (m, key, value) {
				_keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? header + "," + value : value;
			});

			return {
				ok: (request.status / 100 | 0) == 2, // 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function text() {
					return Promise.resolve(request.responseText);
				},
				json: function json() {
					return Promise.resolve(request.responseText).then(JSON.parse);
				},
				blob: function blob() {
					return Promise.resolve(new Blob([request.response]));
				},
				headers: {
					keys: function keys() {
						return _keys;
					},
					entries: function entries() {
						return all;
					},
					get: function get(n) {
						return headers[n.toLowerCase()];
					},
					has: function has(n) {
						return n.toLowerCase() in headers;
					}
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map

/***/ }),

/***/ "VS7n":
/***/ (function(module, exports, __webpack_require__) {

module.exports = window.fetch || (window.fetch = __webpack_require__("QAmr").default || __webpack_require__("QAmr"));

/***/ }),

/***/ "cvSJ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("lcwS")(true);
// imports


// module
exports.push([module.i, "@font-face{font-family:Overpass;font-style:normal;font-weight:400;src:local(\"Overpass Regular\"),local(\"Overpass-Regular\"),url(https://fonts.gstatic.com/s/overpass/v4/qFdH35WCmI96Ajtm81GrU9vgwBcIs1s.woff2) format(\"woff2\");unicode-range:u+0100-024f,u+0259,u+1e??,u+2020,u+20a0-20ab,u+20ad-20cf,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:Overpass;font-style:normal;font-weight:400;src:local(\"Overpass Regular\"),local(\"Overpass-Regular\"),url(https://fonts.gstatic.com/s/overpass/v4/qFdH35WCmI96Ajtm81GlU9vgwBcI.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+2000-206f,u+2074,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}", "", {"version":3,"sources":["/Users/makoto/work/ens/tmp/renewal-widget/src/components/widget/style.scss"],"names":[],"mappings":"AACA,WACI,qBACA,kBACA,gBACA,2JACA,qGAAmH,CAGvH,WACI,qBACA,kBACA,gBACA,wJACA,mJAAyK,CAAA","file":"style.scss","sourcesContent":["/* latin-ext */\n@font-face {\n    font-family: 'Overpass';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Overpass Regular'), local('Overpass-Regular'), url(https://fonts.gstatic.com/s/overpass/v4/qFdH35WCmI96Ajtm81GrU9vgwBcIs1s.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n    font-family: 'Overpass';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Overpass Regular'), local('Overpass-Regular'), url(https://fonts.gstatic.com/s/overpass/v4/qFdH35WCmI96Ajtm81GlU9vgwBcI.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "h6ac":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "jVFm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__("09Cu");
var types_2 = __webpack_require__("09Cu");
exports.ClientError = types_2.ClientError;
__webpack_require__("CQH0");
var GraphQLClient = /** @class */function () {
    function GraphQLClient(url, options) {
        this.url = url;
        this.options = options || {};
    }
    GraphQLClient.prototype.rawRequest = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, headers, others, body, response, result, headers_1, status_1, errorResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, headers = _a.headers, others = __rest(_a, ["headers"]);
                        body = JSON.stringify({
                            query: query,
                            variables: variables ? variables : undefined
                        });
                        return [4 /*yield*/, fetch(this.url, __assign({ method: 'POST', headers: _extends({ 'Content-Type': 'application/json' }, headers), body: body }, others))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, getResult(response)];
                    case 2:
                        result = _b.sent();
                        if (response.ok && !result.errors && result.data) {
                            headers_1 = response.headers, status_1 = response.status;
                            return [2 /*return*/, __assign({}, result, { headers: headers_1, status: status_1 })];
                        } else {
                            errorResult = typeof result === 'string' ? { error: result } : result;
                            throw new types_1.ClientError(__assign({}, errorResult, { status: response.status, headers: response.headers }), { query: query, variables: variables });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphQLClient.prototype.request = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, headers, others, body, response, result, errorResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, headers = _a.headers, others = __rest(_a, ["headers"]);
                        body = JSON.stringify({
                            query: query,
                            variables: variables ? variables : undefined
                        });
                        return [4 /*yield*/, fetch(this.url, __assign({ method: 'POST', headers: _extends({ 'Content-Type': 'application/json' }, headers), body: body }, others))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, getResult(response)];
                    case 2:
                        result = _b.sent();
                        if (response.ok && !result.errors && result.data) {
                            return [2 /*return*/, result.data];
                        } else {
                            errorResult = typeof result === 'string' ? { error: result } : result;
                            throw new types_1.ClientError(__assign({}, errorResult, { status: response.status }), { query: query, variables: variables });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphQLClient.prototype.setHeaders = function (headers) {
        this.options.headers = headers;
        return this;
    };
    GraphQLClient.prototype.setHeader = function (key, value) {
        var headers = this.options.headers;
        if (headers) {
            headers[key] = value;
        } else {
            this.options.headers = (_a = {}, _a[key] = value, _a);
        }
        return this;
        var _a;
    };
    return GraphQLClient;
}();
exports.GraphQLClient = GraphQLClient;
function rawRequest(url, query, variables) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new GraphQLClient(url);
            return [2 /*return*/, client.rawRequest(query, variables)];
        });
    });
}
exports.rawRequest = rawRequest;
function request(url, query, variables) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new GraphQLClient(url);
            return [2 /*return*/, client.request(query, variables)];
        });
    });
}
exports.request = request;
exports.default = request;
function getResult(response) {
    return __awaiter(this, void 0, void 0, function () {
        var contentType;
        return __generator(this, function (_a) {
            contentType = response.headers.get('Content-Type');
            if (contentType && contentType.startsWith('application/json')) {
                return [2 /*return*/, response.json()];
            } else {
                return [2 /*return*/, response.text()];
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "lcwS":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ "m+Gh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

if (!global.Promise) global.Promise = __webpack_require__("BtxX");
if (!global.fetch) global.fetch = __webpack_require__("VS7n");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("h6ac")))

/***/ }),

/***/ "pwNi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__("KM04");

if (false) {
	require('preact/devtools');
} else if (false) {
	navigator.serviceWorker.register(__webpack_public_path__ + 'sw.js');
}

var interopDefault = function interopDefault(m) {
	return m && m.default ? m.default : m;
};

var app = interopDefault(__webpack_require__("JkW7"));

if (typeof app === 'function') {
	var root = document.body.firstElementChild;

	var init = function init() {
		var app = interopDefault(__webpack_require__("JkW7"));
		root = (0, _preact.render)((0, _preact.h)(app), document.body, root);
	};

	if (false) module.hot.accept('preact-cli-entrypoint', init);

	init();
}

/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map