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
// CONCATENATED MODULE: ../node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_t,
    hooks_module_r,
    hooks_module_u,
    i = [],
    hooks_module_o = preact_min["options"].__r,
    f = preact_min["options"].diffed,
    c = preact_min["options"].__c,
    e = preact_min["options"].unmount;function a(t) {
  preact_min["options"].__h && preact_min["options"].__h(hooks_module_r);var u = hooks_module_r.__H || (hooks_module_r.__H = { __: [], __h: [] });return t >= u.__.length && u.__.push({}), u.__[t];
}function v(n) {
  return m(x, n);
}function m(n, u, i) {
  var o = a(hooks_module_t++);return o.__c || (o.__c = hooks_module_r, o.__ = [i ? i(u) : x(void 0, u), function (t) {
    var r = n(o.__[0], t);o.__[0] !== r && (o.__[0] = r, o.__c.setState({}));
  }]), o.__;
}function p(n, u) {
  var i = a(hooks_module_t++);q(i.__H, u) && (i.__ = n, i.__H = u, hooks_module_r.__H.__h.push(i));
}function l(n, u) {
  var i = a(hooks_module_t++);q(i.__H, u) && (i.__ = n, i.__H = u, hooks_module_r.__h.push(i));
}function y(n) {
  return s(function () {
    return { current: n };
  }, []);
}function d(n, t, r) {
  l(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == r ? r : r.concat(n));
}function s(n, r) {
  var u = a(hooks_module_t++);return q(u.__H, r) ? (u.__H = r, u.__h = n, u.__ = n()) : u.__;
}function h(n, t) {
  return s(function () {
    return n;
  }, t);
}function T(n) {
  var u = hooks_module_r.context[n.__c];if (!u) return n.__;var i = a(hooks_module_t++);return null == i.__ && (i.__ = !0, u.sub(hooks_module_r)), u.props.value;
}function w(t, r) {
  preact_min["options"].useDebugValue && preact_min["options"].useDebugValue(r ? r(t) : t);
}function A(n) {
  var u = a(hooks_module_t++),
      i = v();return u.__ = n, hooks_module_r.componentDidCatch || (hooks_module_r.componentDidCatch = function (n) {
    u.__ && u.__(n), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}function F() {
  i.some(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(_), t.__H.__h.forEach(g), t.__H.__h = [];
    } catch (r) {
      return t.__H.__h = [], preact_min["options"].__e(r, t.__v), !0;
    }
  }), i = [];
}function _(n) {
  n.t && n.t();
}function g(n) {
  var t = n.__();"function" == typeof t && (n.t = t);
}function q(n, t) {
  return !n || t.some(function (t, r) {
    return t !== n[r];
  });
}function x(n, t) {
  return "function" == typeof t ? t(n) : t;
}preact_min["options"].__r = function (n) {
  hooks_module_o && hooks_module_o(n), hooks_module_t = 0, (hooks_module_r = n.__c).__H && (hooks_module_r.__H.__h.forEach(_), hooks_module_r.__H.__h.forEach(g), hooks_module_r.__H.__h = []);
}, preact_min["options"].diffed = function (t) {
  f && f(t);var r = t.__c;if (r) {
    var o = r.__H;o && o.__h.length && (1 !== i.push(r) && hooks_module_u === preact_min["options"].requestAnimationFrame || ((hooks_module_u = preact_min["options"].requestAnimationFrame) || function (n) {
      var t,
          r = function r() {
        clearTimeout(u), cancelAnimationFrame(t), setTimeout(n);
      },
          u = setTimeout(r, 100);"undefined" != typeof window && (t = requestAnimationFrame(r));
    })(F));
  }
}, preact_min["options"].__c = function (t, r) {
  r.some(function (t) {
    try {
      t.__h.forEach(_), t.__h = t.__h.filter(function (n) {
        return !n.__ || g(n);
      });
    } catch (u) {
      r.some(function (n) {
        n.__h && (n.__h = []);
      }), r = [], preact_min["options"].__e(u, t.__v);
    }
  }), c && c(t, r);
}, preact_min["options"].unmount = function (t) {
  e && e(t);var r = t.__c;if (r) {
    var u = r.__H;if (u) try {
      u.__.forEach(function (n) {
        return n.t && n.t();
      });
    } catch (t) {
      preact_min["options"].__e(t, r.__v);
    }
  }
};
//# sourceMappingURL=hooks.module.js.map
// EXTERNAL MODULE: ./assets/ENS_Full-logo_Color.png
var ENS_Full_logo_Color = __webpack_require__("K7ic");
var ENS_Full_logo_Color_default = /*#__PURE__*/__webpack_require__.n(ENS_Full_logo_Color);

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

var checkRenewal = function () {
  var _ref = _asyncToGenerator(function* (userAddress, referrerAddress, _ref2) {
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

    var count = account.registrations.length;
    var firstExpiryDate = account.registrations[0] && account.registrations[0].expiryDate;
    if (debug) {
      console.log(account.registrations.map(function (r) {
        return [r.domain.labelName, new Date(r.expiryDate * 1000)];
      }));
    }
    var res = {
      numExpiringDomains: count,
      firstExpiryDate: firstExpiryDate && new Date(firstExpiryDate * 1000),
      renewalUrl: 'https://app.ens.domains/address/' + userAddress + '?referrer=' + referrerAddress
    };
    return res;
  });

  return function checkRenewal(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
// CONCATENATED MODULE: ./components/hello-world/index.js
var _closeStyle;




function hello_world__asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var closeStyle = (_closeStyle = {
  color: "#ADBBCD",
  "padding-left": "1em"
}, _closeStyle['color'] = "rgb(173, 187, 205)", _closeStyle.float = "left", _closeStyle.width = "100%", _closeStyle["text-align"] = "left", _closeStyle.cursor = "pointer", _closeStyle);

var imageStyles = {
  width: '50%',
  height: '50%',
  display: 'block',
  marginTop: '15px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

var styles = {
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
  fontFamily: 'Helvetica',
  fontWeight: '300',
  fontSize: '24px',
  color: '#2B2B2B',
  letterSpacing: '0',
  textAlign: 'center',
  lineHeight: '30px'
};

var buttonStyle = {
  "background": "#5384FE",
  // "border":"2px solid #5384FE",
  // "borderRadius":"90.72px",
  // "fontFamily":"Helvetica",
  // "fontSize":"14px",
  "color": "#FFFFFF",
  "font-size": "14px",
  "font-weight": "700",
  "font-familyv": "Overpass",
  "text-transform": "capitalize",
  "letter-spacingv": "1.5px",
  "text-decoration": "none",
  "padding": "10px 25px",
  "border-radius": "25px",
  "transition": "all 0.2s ease 0s",
  "border-width": "2px",
  "border-style": "solid",
  "border-color": "rgb(83, 132, 254)",
  "border-image": "initial"
};

var doNotShowStyle = {
  "fontFamily": "Helvetica",
  "fontSize": "12px",
  "color": "#ADBBCD",
  "letterSpacing": "0",
  "textAlign": "center"
};

var dateDiff = function dateDiff(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
};

var _ref5 = Object(preact_min["h"])('img', { style: imageStyles, src: ENS_Full_logo_Color_default.a });

var _ref6 = Object(preact_min["h"])('br', null);

var hello_world_App = function (_Component) {
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

  // constructor(){
  //   console.log('constructor')
  //   super()
  //   // this.input = useRef(null);
  // }
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate')
  //   // do not re-render via diff:
  //   // return false;
  // }

  // componentWillReceiveProps(a, b) {
  //   console.log('componentWillReceiveProps')
  //   console.log({a, b})
  //   // you can do something with incoming props here if you need
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnmount')
  //   // component is about to be removed from the DOM, perform any cleanup.
  // }

  App.prototype.componentDidMount = function () {
    var _ref = hello_world__asyncToGenerator(function* () {
      var callCheckRenewal = function () {
        var _ref3 = hello_world__asyncToGenerator(function* () {
          if (!userAddress) {
            var addresses = yield window.ethereum.enable();
            if (addresses.length > 0) {
              userAddress = addresses[0];
            }
          }
          if (userAddress && referrerAddress) {
            console.log('call checkRenweal');

            var _ref4 = yield checkRenewal(userAddress, referrerAddress, {}),
                numExpiringDomains = _ref4.numExpiringDomains,
                renewalUrl = _ref4.renewalUrl,
                firstExpiryDate = _ref4.firstExpiryDate;

            var days = dateDiff(new Date(), firstExpiryDate);
            if (numExpiringDomains > 0) {
              self.setState({ numExpiringDomains: numExpiringDomains, days: days, renewalUrl: renewalUrl });
            }
          } else {
            setTimeout(callCheckRenewal, 1000);
          }
        });

        return function callCheckRenewal() {
          return _ref3.apply(this, arguments);
        };
      }();

      var _ref2 = this.props || {},
          userAddress = _ref2.userAddress,
          referrerAddress = _ref2.referrerAddress;

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
    console.log('render', this.state);
    if (this.state.numExpiringDomains && !this.state.closed && !window.localStorage.getItem('neverShow')) {
      var _state = this.state,
          numExpiringDomains = _state.numExpiringDomains,
          days = _state.days,
          renewalUrl = _state.renewalUrl;

      return Object(preact_min["h"])(
        'div',
        { style: styles, ref: this.ref },
        Object(preact_min["h"])(
          'span',
          { style: closeStyle, onClick: this.close },
          'x'
        ),
        _ref5,
        Object(preact_min["h"])(
          'p',
          null,
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






var _habitat = preact_habitat_es(hello_world_App);

_habitat.render({
  selector: '[data-widget-host="ensdomains-renewal-widget"]',
  clean: true
});

/***/ }),

/***/ "K7ic":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "039a4c41b0340f9174184efb5e26e217.png";

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