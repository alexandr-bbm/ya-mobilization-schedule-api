(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScheduleLib"] = factory();
	else
		root["ScheduleLib"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*

The MIT License (MIT)

Original Library 
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var ansiStyles = colors.styles = __webpack_require__(25);
var defineProps = Object.defineProperties;

colors.supportsColor = __webpack_require__(26);

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor;
}

colors.stripColors = colors.strip = function (str) {
  return ("" + str).replace(/\x1B\[\d+m/g, '');
};

var stylize = colors.stylize = function stylize(str, style) {
  return ansiStyles[style].open + str + ansiStyles[style].close;
};

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = function () {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
}();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  if (!colors.enabled || !str) {
    return str;
  }

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
  }

  return str;
}

function applyTheme(theme) {
  for (var style in theme) {
    (function (style) {
      colors[style] = function (str) {
        return colors[theme[style]](str);
      };
    })(style);
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
      applyTheme(colors.themes[theme]);
      return colors.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name]);
      }
    };
  });
  return ret;
}

var sequencer = function sequencer(map, str) {
  var exploded = str.split(""),
      i = 0;
  exploded = exploded.map(map);
  return exploded.join("");
};

// custom formatter methods
colors.trap = __webpack_require__(19);
colors.zalgo = __webpack_require__(20);

// maps
colors.maps = {};
colors.maps.america = __webpack_require__(21);
colors.maps.zebra = __webpack_require__(24);
colors.maps.rainbow = __webpack_require__(22);
colors.maps.random = __webpack_require__(23);

for (var map in colors.maps) {
  (function (map) {
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str);
    };
  })(map);
}

defineProps(colors, init());

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["ScheduleLib"] = factory();else root["ScheduleLib"] = factory();
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/__webpack_require__.i = function (value) {
                return value;
            };
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 38);
            /******/
        }(
        /************************************************************************/
        /******/[,
        /* 0 */
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
            var ScheduleError = function (_super) {
                __extends(ScheduleError, _super);
                function ScheduleError(m) {
                    var _this = _super.call(this, m) || this;
                    Object.setPrototypeOf(_this, ScheduleError.prototype);
                    return _this;
                }
                return ScheduleError;
            }(Error);
            exports.ScheduleErrorMessages = {
                classroomCapacity: function (classroomId, classroomCapacity, requiredCapacity) {
                    return "The capacity of classroom with id=" + classroomId + " is " + classroomCapacity + " which is not enough for " + requiredCapacity + " students";
                },
                oneLessonForSchoolAtTime: "New lesson overlaps with existing lesson for school.",
                oneLessonInOneClassroomAtTime: function (classroomId, ocuppiedLessonId) {
                    return "Classroom with id=" + classroomId + " at this time is occupied by existing lesson with id=" + ocuppiedLessonId;
                },
                timeEndLessTimeStart: 'timeStart should be less than timeEnd.',
                parseHoursMinutes: function (time) {
                    return "Time should be hh:mm format. You passed " + time;
                },
                parseDate: function (date) {
                    return "Date should be dd.mm.yyyy format. You passed " + date;
                }
            };
            exports.default = ScheduleError;

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var randomFromSeed = __webpack_require__(33);

            var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            var alphabet;
            var previousSeed;

            var shuffled;

            function reset() {
                shuffled = false;
            }

            function setCharacters(_alphabet_) {
                if (!_alphabet_) {
                    if (alphabet !== ORIGINAL) {
                        alphabet = ORIGINAL;
                        reset();
                    }
                    return;
                }

                if (_alphabet_ === alphabet) {
                    return;
                }

                if (_alphabet_.length !== ORIGINAL.length) {
                    throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
                }

                var unique = _alphabet_.split('').filter(function (item, ind, arr) {
                    return ind !== arr.lastIndexOf(item);
                });

                if (unique.length) {
                    throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
                }

                alphabet = _alphabet_;
                reset();
            }

            function characters(_alphabet_) {
                setCharacters(_alphabet_);
                return alphabet;
            }

            function setSeed(seed) {
                randomFromSeed.seed(seed);
                if (previousSeed !== seed) {
                    reset();
                    previousSeed = seed;
                }
            }

            function shuffle() {
                if (!alphabet) {
                    setCharacters(ORIGINAL);
                }

                var sourceArray = alphabet.split('');
                var targetArray = [];
                var r = randomFromSeed.nextValue();
                var characterIndex;

                while (sourceArray.length > 0) {
                    r = randomFromSeed.nextValue();
                    characterIndex = Math.floor(r * sourceArray.length);
                    targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
                }
                return targetArray.join('');
            }

            function getShuffled() {
                if (shuffled) {
                    return shuffled;
                }
                shuffled = shuffle();
                return shuffled;
            }

            /**
             * lookup shuffled letter
             * @param index
             * @returns {string}
             */
            function lookup(index) {
                var alphabetShuffled = getShuffled();
                return alphabetShuffled[index];
            }

            module.exports = {
                characters: characters,
                seed: setSeed,
                lookup: lookup,
                shuffled: getShuffled
            };

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

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
            function defaultClearTimeout() {
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
            })();
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
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
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
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
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
                while (len) {
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

            process.cwd = function () {
                return '/';
            };
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function () {
                return 0;
            };

            /***/
        },
        /* 4 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = __webpack_require__(30);

            /***/
        },
        /* 5 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var errors_1 = __webpack_require__(1);
            function parseHoursMinutes(time) {
                var parsedTimeStart = time.match(/^(\d{2}):(\d{2})$/);
                if (!parsedTimeStart) {
                    throw new errors_1.default(errors_1.ScheduleErrorMessages.parseHoursMinutes(time));
                }
                var unused = parsedTimeStart[0],
                    hours = parsedTimeStart[1],
                    minutes = parsedTimeStart[2];
                return {
                    hours: +hours,
                    minutes: +minutes
                };
            }
            exports.parseHoursMinutes = parseHoursMinutes;
            function parseDate(date) {
                var parsedDate = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
                if (!parsedDate) {
                    throw new errors_1.default(errors_1.ScheduleErrorMessages.parseDate(date));
                }
                var unused = parsedDate[0],
                    day = parsedDate[1],
                    month = parsedDate[2],
                    year = parsedDate[3];
                return {
                    day: +day,
                    month: +month,
                    year: +year
                };
            }
            exports.parseDate = parseDate;
            function stringsToDate(date, time) {
                var _a = parseDate(date),
                    day = _a.day,
                    month = _a.month,
                    year = _a.year;
                var _b = parseHoursMinutes(time),
                    hours = _b.hours,
                    minutes = _b.minutes;
                var jsDate = new Date(year, month - 1, day, hours, minutes);
                // jsDate.setTime( jsDate.getTime() + jsDate.getTimezoneOffset() * 60 * 1000);
                if (isNaN(jsDate.getTime())) {
                    throw new errors_1.default("Can't create date with passed options " + JSON.stringify({ year: year, month: month, day: day, hours: hours, minutes: minutes }));
                }
                return jsDate;
            }
            exports.stringsToDate = stringsToDate;
            exports.inputDateRangeToDateRange = function (inputDateRange) {
                return {
                    min: stringsToDate(inputDateRange.min.date, inputDateRange.min.time || '00:00'),
                    max: stringsToDate(inputDateRange.max.date, inputDateRange.max.time || '23:59')
                };
            };

            /***/
        },
        /* 6 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var randomByte = __webpack_require__(32);

            function encode(lookup, number) {
                var loopCounter = 0;
                var done;

                var str = '';

                while (!done) {
                    str = str + lookup(number >> 4 * loopCounter & 0x0f | randomByte());
                    done = number < Math.pow(16, loopCounter + 1);
                    loopCounter++;
                }
                return str;
            }

            module.exports = encode;

            /***/
        },
        /* 7 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var schedule_1 = __webpack_require__(15);
            var errors_1 = __webpack_require__(1);
            module.exports = { Schedule: schedule_1.Schedule, ScheduleError: errors_1.default };

            /***/
        },,
        /* 8 */
        /* 9 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            /* WEBPACK VAR INJECTION */
            (function (global, process) {

                /**
                 * Copyright (c) 2014, Facebook, Inc.
                 * All rights reserved.
                 *
                 * This source code is licensed under the BSD-style license found in the
                 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
                 * additional grant of patent rights can be found in the PATENTS file in
                 * the same directory.
                 */

                !function (global) {
                    "use strict";

                    var hasOwn = Object.prototype.hasOwnProperty;
                    var undefined; // More compressible than void 0.
                    var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";

                    var inModule = typeof module === "object";
                    var runtime = global.regeneratorRuntime;
                    if (runtime) {
                        if (inModule) {
                            // If regeneratorRuntime is defined globally and we're in a module,
                            // make the exports object identical to regeneratorRuntime.
                            module.exports = runtime;
                        }
                        // Don't bother evaluating the rest of this file if the runtime was
                        // already defined globally.
                        return;
                    }

                    // Define the runtime globally (as expected by generated code) as either
                    // module.exports (if we're in a module) or a new, empty object.
                    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

                    function wrap(innerFn, outerFn, self, tryLocsList) {
                        // If outerFn provided, then outerFn.prototype instanceof Generator.
                        var generator = Object.create((outerFn || Generator).prototype);
                        var context = new Context(tryLocsList || []);

                        // The ._invoke method unifies the implementations of the .next,
                        // .throw, and .return methods.
                        generator._invoke = makeInvokeMethod(innerFn, self, context);

                        return generator;
                    }
                    runtime.wrap = wrap;

                    // Try/catch helper to minimize deoptimizations. Returns a completion
                    // record like context.tryEntries[i].completion. This interface could
                    // have been (and was previously) designed to take a closure to be
                    // invoked without arguments, but in all the cases we care about we
                    // already have an existing method we want to call, so there's no need
                    // to create a new function object. We can even get away with assuming
                    // the method takes exactly one argument, since that happens to be true
                    // in every case, so we don't have to touch the arguments object. The
                    // only additional allocation required is the completion record, which
                    // has a stable shape and so hopefully should be cheap to allocate.
                    function tryCatch(fn, obj, arg) {
                        try {
                            return { type: "normal", arg: fn.call(obj, arg) };
                        } catch (err) {
                            return { type: "throw", arg: err };
                        }
                    }

                    var GenStateSuspendedStart = "suspendedStart";
                    var GenStateSuspendedYield = "suspendedYield";
                    var GenStateExecuting = "executing";
                    var GenStateCompleted = "completed";

                    // Returning this object from the innerFn has the same effect as
                    // breaking out of the dispatch switch statement.
                    var ContinueSentinel = {};

                    // Dummy constructor functions that we use as the .constructor and
                    // .constructor.prototype properties for functions that return Generator
                    // objects. For full spec compliance, you may wish to configure your
                    // minifier not to mangle the names of these two functions.
                    function Generator() {}
                    function GeneratorFunction() {}
                    function GeneratorFunctionPrototype() {}

                    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
                    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
                    GeneratorFunctionPrototype.constructor = GeneratorFunction;
                    GeneratorFunction.displayName = "GeneratorFunction";

                    // Helper for defining the .next, .throw, and .return methods of the
                    // Iterator interface in terms of a single ._invoke method.
                    function defineIteratorMethods(prototype) {
                        ["next", "throw", "return"].forEach(function (method) {
                            prototype[method] = function (arg) {
                                return this._invoke(method, arg);
                            };
                        });
                    }

                    runtime.isGeneratorFunction = function (genFun) {
                        var ctor = typeof genFun === "function" && genFun.constructor;
                        return ctor ? ctor === GeneratorFunction ||
                        // For the native GeneratorFunction constructor, the best we can
                        // do is to check its .name property.
                        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
                    };

                    runtime.mark = function (genFun) {
                        if (Object.setPrototypeOf) {
                            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
                        } else {
                            genFun.__proto__ = GeneratorFunctionPrototype;
                        }
                        genFun.prototype = Object.create(Gp);
                        return genFun;
                    };

                    // Within the body of any async function, `await x` is transformed to
                    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
                    // `value instanceof AwaitArgument` to determine if the yielded value is
                    // meant to be awaited. Some may consider the name of this method too
                    // cutesy, but they are curmudgeons.
                    runtime.awrap = function (arg) {
                        return new AwaitArgument(arg);
                    };

                    function AwaitArgument(arg) {
                        this.arg = arg;
                    }

                    function AsyncIterator(generator) {
                        // This invoke function is written in a style that assumes some
                        // calling function (or Promise) will handle exceptions.
                        function invoke(method, arg) {
                            var result = generator[method](arg);
                            var value = result.value;
                            return value instanceof AwaitArgument ? Promise.resolve(value.arg).then(invokeNext, invokeThrow) : Promise.resolve(value).then(function (unwrapped) {
                                // When a yielded Promise is resolved, its final value becomes
                                // the .value of the Promise<{value,done}> result for the
                                // current iteration. If the Promise is rejected, however, the
                                // result for this iteration will be rejected with the same
                                // reason. Note that rejections of yielded Promises are not
                                // thrown back into the generator function, as is the case
                                // when an awaited Promise is rejected. This difference in
                                // behavior between yield and await is important, because it
                                // allows the consumer to decide what to do with the yielded
                                // rejection (swallow it and continue, manually .throw it back
                                // into the generator, abandon iteration, whatever). With
                                // await, by contrast, there is no opportunity to examine the
                                // rejection reason outside the generator function, so the
                                // only option is to throw it from the await expression, and
                                // let the generator function handle the exception.
                                result.value = unwrapped;
                                return result;
                            });
                        }

                        if (typeof process === "object" && process.domain) {
                            invoke = process.domain.bind(invoke);
                        }

                        var invokeNext = invoke.bind(generator, "next");
                        var invokeThrow = invoke.bind(generator, "throw");
                        var invokeReturn = invoke.bind(generator, "return");
                        var previousPromise;

                        function enqueue(method, arg) {
                            function callInvokeWithMethodAndArg() {
                                return invoke(method, arg);
                            }

                            return previousPromise =
                            // If enqueue has been called before, then we want to wait until
                            // all previous Promises have been resolved before calling invoke,
                            // so that results are always delivered in the correct order. If
                            // enqueue has not been called before, then it is important to
                            // call invoke immediately, without waiting on a callback to fire,
                            // so that the async generator function has the opportunity to do
                            // any necessary setup in a predictable way. This predictability
                            // is why the Promise constructor synchronously invokes its
                            // executor callback, and why async functions synchronously
                            // execute code before the first await. Since we implement simple
                            // async functions in terms of async generators, it is especially
                            // important to get this right, even though it requires care.
                            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
                            // Avoid propagating failures to Promises returned by later
                            // invocations of the iterator.
                            callInvokeWithMethodAndArg) : new Promise(function (resolve) {
                                resolve(callInvokeWithMethodAndArg());
                            });
                        }

                        // Define the unified helper method that is used to implement .next,
                        // .throw, and .return (see defineIteratorMethods).
                        this._invoke = enqueue;
                    }

                    defineIteratorMethods(AsyncIterator.prototype);

                    // Note that simple async functions are implemented on top of
                    // AsyncIterator objects; they just return a Promise for the value of
                    // the final result produced by the iterator.
                    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
                        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

                        return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
                        : iter.next().then(function (result) {
                            return result.done ? result.value : iter.next();
                        });
                    };

                    function makeInvokeMethod(innerFn, self, context) {
                        var state = GenStateSuspendedStart;

                        return function invoke(method, arg) {
                            if (state === GenStateExecuting) {
                                throw new Error("Generator is already running");
                            }

                            if (state === GenStateCompleted) {
                                if (method === "throw") {
                                    throw arg;
                                }

                                // Be forgiving, per 25.3.3.3.3 of the spec:
                                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                                return doneResult();
                            }

                            while (true) {
                                var delegate = context.delegate;
                                if (delegate) {
                                    if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                                        // A return or throw (when the delegate iterator has no throw
                                        // method) always terminates the yield* loop.
                                        context.delegate = null;

                                        // If the delegate iterator has a return method, give it a
                                        // chance to clean up.
                                        var returnMethod = delegate.iterator["return"];
                                        if (returnMethod) {
                                            var record = tryCatch(returnMethod, delegate.iterator, arg);
                                            if (record.type === "throw") {
                                                // If the return method threw an exception, let that
                                                // exception prevail over the original return or throw.
                                                method = "throw";
                                                arg = record.arg;
                                                continue;
                                            }
                                        }

                                        if (method === "return") {
                                            // Continue with the outer return, now that the delegate
                                            // iterator has been terminated.
                                            continue;
                                        }
                                    }

                                    var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                                    if (record.type === "throw") {
                                        context.delegate = null;

                                        // Like returning generator.throw(uncaught), but without the
                                        // overhead of an extra function call.
                                        method = "throw";
                                        arg = record.arg;
                                        continue;
                                    }

                                    // Delegate generator ran and handled its own exceptions so
                                    // regardless of what the method was, we continue as if it is
                                    // "next" with an undefined arg.
                                    method = "next";
                                    arg = undefined;

                                    var info = record.arg;
                                    if (info.done) {
                                        context[delegate.resultName] = info.value;
                                        context.next = delegate.nextLoc;
                                    } else {
                                        state = GenStateSuspendedYield;
                                        return info;
                                    }

                                    context.delegate = null;
                                }

                                if (method === "next") {
                                    context._sent = arg;

                                    if (state === GenStateSuspendedYield) {
                                        context.sent = arg;
                                    } else {
                                        context.sent = undefined;
                                    }
                                } else if (method === "throw") {
                                    if (state === GenStateSuspendedStart) {
                                        state = GenStateCompleted;
                                        throw arg;
                                    }

                                    if (context.dispatchException(arg)) {
                                        // If the dispatched exception was caught by a catch block,
                                        // then let that catch block handle the exception normally.
                                        method = "next";
                                        arg = undefined;
                                    }
                                } else if (method === "return") {
                                    context.abrupt("return", arg);
                                }

                                state = GenStateExecuting;

                                var record = tryCatch(innerFn, self, context);
                                if (record.type === "normal") {
                                    // If an exception is thrown from innerFn, we leave state ===
                                    // GenStateExecuting and loop back for another invocation.
                                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                                    var info = {
                                        value: record.arg,
                                        done: context.done
                                    };

                                    if (record.arg === ContinueSentinel) {
                                        if (context.delegate && method === "next") {
                                            // Deliberately forget the last sent value so that we don't
                                            // accidentally pass it on to the delegate.
                                            arg = undefined;
                                        }
                                    } else {
                                        return info;
                                    }
                                } else if (record.type === "throw") {
                                    state = GenStateCompleted;
                                    // Dispatch the exception by looping back around to the
                                    // context.dispatchException(arg) call above.
                                    method = "throw";
                                    arg = record.arg;
                                }
                            }
                        };
                    }

                    // Define Generator.prototype.{next,throw,return} in terms of the
                    // unified ._invoke helper method.
                    defineIteratorMethods(Gp);

                    Gp[iteratorSymbol] = function () {
                        return this;
                    };

                    Gp.toString = function () {
                        return "[object Generator]";
                    };

                    function pushTryEntry(locs) {
                        var entry = { tryLoc: locs[0] };

                        if (1 in locs) {
                            entry.catchLoc = locs[1];
                        }

                        if (2 in locs) {
                            entry.finallyLoc = locs[2];
                            entry.afterLoc = locs[3];
                        }

                        this.tryEntries.push(entry);
                    }

                    function resetTryEntry(entry) {
                        var record = entry.completion || {};
                        record.type = "normal";
                        delete record.arg;
                        entry.completion = record;
                    }

                    function Context(tryLocsList) {
                        // The root entry object (effectively a try statement without a catch
                        // or a finally block) gives us a place to store values thrown from
                        // locations where there is no enclosing try statement.
                        this.tryEntries = [{ tryLoc: "root" }];
                        tryLocsList.forEach(pushTryEntry, this);
                        this.reset(true);
                    }

                    runtime.keys = function (object) {
                        var keys = [];
                        for (var key in object) {
                            keys.push(key);
                        }
                        keys.reverse();

                        // Rather than returning an object with a next method, we keep
                        // things simple and return the next function itself.
                        return function next() {
                            while (keys.length) {
                                var key = keys.pop();
                                if (key in object) {
                                    next.value = key;
                                    next.done = false;
                                    return next;
                                }
                            }

                            // To avoid creating an additional object, we just hang the .value
                            // and .done properties off the next function object itself. This
                            // also ensures that the minifier will not anonymize the function.
                            next.done = true;
                            return next;
                        };
                    };

                    function values(iterable) {
                        if (iterable) {
                            var iteratorMethod = iterable[iteratorSymbol];
                            if (iteratorMethod) {
                                return iteratorMethod.call(iterable);
                            }

                            if (typeof iterable.next === "function") {
                                return iterable;
                            }

                            if (!isNaN(iterable.length)) {
                                var i = -1,
                                    next = function next() {
                                    while (++i < iterable.length) {
                                        if (hasOwn.call(iterable, i)) {
                                            next.value = iterable[i];
                                            next.done = false;
                                            return next;
                                        }
                                    }

                                    next.value = undefined;
                                    next.done = true;

                                    return next;
                                };

                                return next.next = next;
                            }
                        }

                        // Return an iterator with no values.
                        return { next: doneResult };
                    }
                    runtime.values = values;

                    function doneResult() {
                        return { value: undefined, done: true };
                    }

                    Context.prototype = {
                        constructor: Context,

                        reset: function (skipTempReset) {
                            this.prev = 0;
                            this.next = 0;
                            this.sent = undefined;
                            this.done = false;
                            this.delegate = null;

                            this.tryEntries.forEach(resetTryEntry);

                            if (!skipTempReset) {
                                for (var name in this) {
                                    // Not sure about the optimal order of these conditions:
                                    if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                                        this[name] = undefined;
                                    }
                                }
                            }
                        },

                        stop: function () {
                            this.done = true;

                            var rootEntry = this.tryEntries[0];
                            var rootRecord = rootEntry.completion;
                            if (rootRecord.type === "throw") {
                                throw rootRecord.arg;
                            }

                            return this.rval;
                        },

                        dispatchException: function (exception) {
                            if (this.done) {
                                throw exception;
                            }

                            var context = this;
                            function handle(loc, caught) {
                                record.type = "throw";
                                record.arg = exception;
                                context.next = loc;
                                return !!caught;
                            }

                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var entry = this.tryEntries[i];
                                var record = entry.completion;

                                if (entry.tryLoc === "root") {
                                    // Exception thrown outside of any try block that could handle
                                    // it, so set the completion value of the entire function to
                                    // throw the exception.
                                    return handle("end");
                                }

                                if (entry.tryLoc <= this.prev) {
                                    var hasCatch = hasOwn.call(entry, "catchLoc");
                                    var hasFinally = hasOwn.call(entry, "finallyLoc");

                                    if (hasCatch && hasFinally) {
                                        if (this.prev < entry.catchLoc) {
                                            return handle(entry.catchLoc, true);
                                        } else if (this.prev < entry.finallyLoc) {
                                            return handle(entry.finallyLoc);
                                        }
                                    } else if (hasCatch) {
                                        if (this.prev < entry.catchLoc) {
                                            return handle(entry.catchLoc, true);
                                        }
                                    } else if (hasFinally) {
                                        if (this.prev < entry.finallyLoc) {
                                            return handle(entry.finallyLoc);
                                        }
                                    } else {
                                        throw new Error("try statement without catch or finally");
                                    }
                                }
                            }
                        },

                        abrupt: function (type, arg) {
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var entry = this.tryEntries[i];
                                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                                    var finallyEntry = entry;
                                    break;
                                }
                            }

                            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                                // Ignore the finally entry if control is not jumping to a
                                // location outside the try/catch block.
                                finallyEntry = null;
                            }

                            var record = finallyEntry ? finallyEntry.completion : {};
                            record.type = type;
                            record.arg = arg;

                            if (finallyEntry) {
                                this.next = finallyEntry.finallyLoc;
                            } else {
                                this.complete(record);
                            }

                            return ContinueSentinel;
                        },

                        complete: function (record, afterLoc) {
                            if (record.type === "throw") {
                                throw record.arg;
                            }

                            if (record.type === "break" || record.type === "continue") {
                                this.next = record.arg;
                            } else if (record.type === "return") {
                                this.rval = record.arg;
                                this.next = "end";
                            } else if (record.type === "normal" && afterLoc) {
                                this.next = afterLoc;
                            }
                        },

                        finish: function (finallyLoc) {
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var entry = this.tryEntries[i];
                                if (entry.finallyLoc === finallyLoc) {
                                    this.complete(entry.completion, entry.afterLoc);
                                    resetTryEntry(entry);
                                    return ContinueSentinel;
                                }
                            }
                        },

                        "catch": function (tryLoc) {
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var entry = this.tryEntries[i];
                                if (entry.tryLoc === tryLoc) {
                                    var record = entry.completion;
                                    if (record.type === "throw") {
                                        var thrown = record.arg;
                                        resetTryEntry(entry);
                                    }
                                    return thrown;
                                }
                            }

                            // The context.catch method must only be called with a location
                            // argument that corresponds to a known catch block.
                            throw new Error("illegal catch attempt");
                        },

                        delegateYield: function (iterable, resultName, nextLoc) {
                            this.delegate = {
                                iterator: values(iterable),
                                resultName: resultName,
                                nextLoc: nextLoc
                            };

                            return ContinueSentinel;
                        }
                    };
                }(
                // Among the various tricks for obtaining a reference to the global
                // object, this seems to be the most reliable technique that does not
                // use indirect eval (which violates Content Security Policy).
                typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
                /* WEBPACK VAR INJECTION */
            }).call(exports, __webpack_require__(35), __webpack_require__(3));

            /***/
        },,
        /* 10 */
        /* 11 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var lessons_1 = __webpack_require__(12);
            exports.testClassrooms = [{
                id: '1',
                title: 'ауд. Синий кит',
                capacity: 63,
                locationDescription: 'Прямо направо по лестнице в синий кит'
            }, {
                id: '2',
                title: 'ауд. Серый карп',
                capacity: 44,
                locationDescription: 'Прямо направо по лестнице в Серый карп'
            }, {
                id: '3',
                title: 'ауд. Красный окунь',
                capacity: 65,
                locationDescription: 'Прямо направо по лестнице в Красный окунь'
            }, {
                id: '4',
                title: 'ауд. Желтый желтохвостик',
                capacity: 123,
                locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик'
            }];
            exports.testSchools = [{
                id: 'frontend',
                title: 'Школа разработки интерфейсов',
                studentsNumber: 43
            }, {
                id: 'design',
                title: 'Школа мобильного дизайна',
                studentsNumber: 25
            }, {
                id: 'backend',
                title: 'Школа мобильной разработки',
                studentsNumber: 12
            }];
            exports.mockData = {
                lessons: lessons_1.lessons,
                schools: exports.testSchools,
                classrooms: exports.testClassrooms
            };

            /***/
        },
        /* 12 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.lessons = [{
                "title": "Адаптивная вёрстка",
                "teacherName": "Дмитрий Душкин",
                "id": "BJie7ZKPfAx",
                "schoolIds": ["frontend"],
                "classroomId": "2",
                "date": "08.05.2017",
                "timeStart": "14:00",
                "timeEnd": "16:00"
            }, {
                "title": "Работа с сенсорным пользовательским вводом",
                "teacherName": "Дмитрий Душкин",
                "id": "rJ3xQWKDz0x",
                "schoolIds": ["frontend"],
                "classroomId": "1",
                "date": "10.05.2017",
                "timeStart": "17:00",
                "timeEnd": "19:00"
            }, {
                "title": "Мультимедиа: возможности браузера",
                "teacherName": "Максим Васильев",
                "id": "r1aem-YDMRx",
                "schoolIds": ["frontend"],
                "classroomId": "1",
                "date": "10.04.2017",
                "timeStart": "10:00",
                "timeEnd": "12:00"
            }, {
                "title": "Нативные приложения на веб-технологиях",
                "teacherName": "Сергей Бережной",
                "id": "r10lQbFDzAg",
                "schoolIds": ["frontend"],
                "classroomId": "1",
                "date": "18.05.2017",
                "timeStart": "15:00",
                "timeEnd": "17:00"
            }, {
                "title": "Клиентская оптимизация: базовые знания и лучшие практики",
                "teacherName": "Андрей Морозов",
                "id": "SkyW7WYDMAx",
                "schoolIds": ["frontend"],
                "classroomId": "1",
                "date": "04.06.2017",
                "timeStart": "13:00",
                "timeEnd": "15:00"
            }, {
                "title": "Клиентская оптимизация: мобильные устройства и инструменты",
                "teacherName": "Иван Карев",
                "id": "rklZX-YPG0l",
                "schoolIds": ["frontend"],
                "classroomId": "3",
                "date": "25.04.2017",
                "timeStart": "16:00",
                "timeEnd": "18:00"
            }, {
                "title": "Инфраструктура веб-проектов",
                "teacherName": "Прокопюк Андрей",
                "id": "B1WZmWKPfAx",
                "schoolIds": ["frontend"],
                "classroomId": "2",
                "date": "06.06.2017",
                "timeStart": "10:00",
                "timeEnd": "12:00"
            }, {
                "title": "Инструменты разработки мобильного фронтенда",
                "teacherName": "Прокопюк Андрей",
                "id": "HyM-X-KvfRe",
                "schoolIds": ["frontend"],
                "classroomId": "1",
                "date": "09.06.2017",
                "timeStart": "14:00",
                "timeEnd": "16:00"
            }, {
                "title": "Java Blitz (Часть 1)",
                "teacherName": "Эдуард Мацуков",
                "id": "rJmZFDzAl",
                "schoolIds": ["backend"],
                "classroomId": "4",
                "date": "01.05.2017",
                "timeStart": "11:00",
                "timeEnd": "13:00"
            }, {
                "title": "Git & Workflow",
                "teacherName": "Дмитрий Складнов",
                "id": "r1gXZYwGCg",
                "schoolIds": ["backend"],
                "classroomId": "4",
                "date": "24.05.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Java Blitz (Часть 2)",
                "teacherName": "Эдуард Мацуков",
                "id": "Sy-QWYwGCl",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "15.04.2017",
                "timeStart": "11:00",
                "timeEnd": "13:00"
            }, {
                "title": "MyFirstApp (Часть 1)",
                "teacherName": "Роман Григорьев",
                "id": "HyfQ-twfAx",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "15.05.2017",
                "timeStart": "15:00",
                "timeEnd": "17:00"
            }, {
                "title": "MyFirstApp (Часть 2)",
                "teacherName": "Роман Григорьев",
                "id": "SyQmbKwMRe",
                "schoolIds": ["backend"],
                "classroomId": "2",
                "date": "11.04.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "ViewGroup",
                "teacherName": "Алексей Щербинин",
                "id": "r1EQ-YvGCg",
                "schoolIds": ["backend"],
                "classroomId": "1",
                "date": "27.04.2017",
                "timeStart": "13:00",
                "timeEnd": "15:00"
            }, {
                "title": "Background",
                "teacherName": "Алексей Макаров",
                "id": "ryBXWKwzAe",
                "schoolIds": ["backend"],
                "classroomId": "2",
                "date": "11.05.2017",
                "timeStart": "13:00",
                "timeEnd": "15:00"
            }, {
                "title": "RecyclerView",
                "teacherName": "Владимир Тагаков",
                "id": "rkLX-FwfCg",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "26.05.2017",
                "timeStart": "10:00",
                "timeEnd": "12:00"
            }, {
                "title": "Service & Broadcasts",
                "teacherName": "Алексей Макаров",
                "id": "rJDQZYwzRl",
                "schoolIds": ["backend"],
                "classroomId": "1",
                "date": "01.06.2017",
                "timeStart": "11:00",
                "timeEnd": "13:00"
            }, {
                "title": "Drawing",
                "teacherName": "Алексей Щербинин",
                "id": "By_QZYvGCg",
                "schoolIds": ["backend"],
                "classroomId": "4",
                "date": "03.06.2017",
                "timeStart": "16:00",
                "timeEnd": "18:00"
            }, {
                "title": "Content provider",
                "teacherName": "Максим Хромцов",
                "id": "rkKmbKwMRl",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "06.05.2017",
                "timeStart": "11:00",
                "timeEnd": "13:00"
            }, {
                "title": "Fragments (Часть 1)",
                "teacherName": "Денис Загаевский",
                "id": "rJc7-YDzCe",
                "schoolIds": ["backend"],
                "classroomId": "2",
                "date": "05.06.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Fragments (Часть 2)",
                "teacherName": "Денис Загаевский",
                "id": "S1iQZYwG0l",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "13.04.2017",
                "timeStart": "16:00",
                "timeEnd": "18:00"
            }, {
                "title": "MVP&Co",
                "teacherName": "Дмитрий Попов",
                "id": "Hkh7bYPM0e",
                "schoolIds": ["backend"],
                "classroomId": "2",
                "date": "23.04.2017",
                "timeStart": "17:00",
                "timeEnd": "19:00"
            }, {
                "title": "Debugging & Polishing",
                "teacherName": "Илья Сергеев",
                "id": "BJp7WFDMAx",
                "schoolIds": ["backend"],
                "classroomId": "3",
                "date": "30.04.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Идея, исследование, концепт (Часть 1)",
                "teacherName": "Антон Тен",
                "id": "B1CXZKPfRg",
                "schoolIds": ["design"],
                "classroomId": "4",
                "date": "28.04.2017",
                "timeStart": "15:00",
                "timeEnd": "17:00"
            }, {
                "title": "Идея, исследование, концепт (Часть 2)",
                "teacherName": "Антон Тен",
                "id": "B1keXZFDGRx",
                "schoolIds": ["design"],
                "classroomId": "3",
                "date": "17.04.2017",
                "timeStart": "10:00",
                "timeEnd": "12:00"
            }, {
                "title": "Особенности проектирования мобильных интерфейсов",
                "teacherName": "Васюнин Николай",
                "id": "HkglXbYvMCx",
                "schoolIds": ["design"],
                "classroomId": "3",
                "date": "25.05.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Продукт и платформа",
                "teacherName": "Сергей Калабин",
                "id": "S1ZxQZYwMCl",
                "schoolIds": ["design"],
                "classroomId": "1",
                "date": "04.06.2017",
                "timeStart": "15:00",
                "timeEnd": "17:00"
            }, {
                "title": "Природа операционных систем",
                "teacherName": "Васюнин Николай",
                "id": "BkGxX-tPf0g",
                "schoolIds": ["design"],
                "classroomId": "1",
                "date": "25.04.2017",
                "timeStart": "14:00",
                "timeEnd": "16:00"
            }, {
                "title": "Прототипирование как процесс",
                "teacherName": "Сергей Томилов",
                "id": "S1mgQZFPG0x",
                "schoolIds": ["design"],
                "classroomId": "4",
                "date": "22.05.2017",
                "timeStart": "15:00",
                "timeEnd": "17:00"
            }, {
                "title": "Инструмент под задачи",
                "teacherName": "Сергей Томилов",
                "id": "BJVxm-FDf0g",
                "schoolIds": ["design"],
                "classroomId": "3",
                "date": "29.05.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Анимации",
                "teacherName": "Сергей Томилов",
                "id": "SJBeX-tvMRl",
                "schoolIds": ["design"],
                "classroomId": "2",
                "date": "24.05.2017",
                "timeStart": "18:00",
                "timeEnd": "20:00"
            }, {
                "title": "Дополнительная лекция. Design Everything",
                "teacherName": "Rijshouwer Krijn",
                "id": "rJ8lQWKDzRl",
                "schoolIds": ["design"],
                "classroomId": "1",
                "date": "22.04.2017",
                "timeStart": "17:00",
                "timeEnd": "19:00"
            }, {
                "title": "Развите продукта",
                "teacherName": "Андрей Гевак",
                "id": "rJPgXbFDMCg",
                "schoolIds": ["design"],
                "classroomId": "3",
                "date": "09.06.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Исследование интерфейсов",
                "teacherName": "Кондратьев Александр",
                "id": "rJulmbKPGCl",
                "schoolIds": ["design"],
                "classroomId": "1",
                "date": "15.04.2017",
                "timeStart": "12:00",
                "timeEnd": "14:00"
            }, {
                "title": "Работа в команде",
                "teacherName": "Юрий Подорожный",
                "id": "HyteX-twfCx",
                "schoolIds": ["design"],
                "classroomId": "1",
                "date": "31.05.2017",
                "timeStart": "10:00",
                "timeEnd": "12:00"
            }, {
                "title": "Дополнительная лекция. Айдентика",
                "teacherName": "Дмитрий Моруз",
                "id": "ryqxQZYDfRe",
                "schoolIds": ["design"],
                "classroomId": "4",
                "date": "18.04.2017",
                "timeStart": "18:00",
                "timeEnd": "20:00"
            }];

            /***/
        },
        /* 13 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var __assign = this && this.__assign || Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            Object.defineProperty(exports, "__esModule", { value: true });
            var shortid = __webpack_require__(4);
            var Classroom = function () {
                function Classroom(classroom) {
                    var id = classroom.id ? classroom.id : shortid.generate();
                    Object.assign(this, __assign({}, classroom, { id: id }));
                }
                return Classroom;
            }();
            exports.Classroom = Classroom;

            /***/
        },
        /* 14 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var errors_1 = __webpack_require__(1);
            var dates_1 = __webpack_require__(5);
            var shortid = __webpack_require__(4);
            var Lesson = function () {
                function Lesson(lesson) {
                    var title = lesson.title,
                        teacherName = lesson.teacherName,
                        date = lesson.date,
                        timeStart = lesson.timeStart,
                        timeEnd = lesson.timeEnd,
                        classroomId = lesson.classroomId,
                        schoolIds = lesson.schoolIds,
                        id = lesson.id;
                    var dateStart = dates_1.stringsToDate(date, timeStart);
                    var dateEnd = dates_1.stringsToDate(date, timeEnd);
                    if (dateStart.getTime() >= dateEnd.getTime()) {
                        throw new errors_1.default(errors_1.ScheduleErrorMessages.timeEndLessTimeStart);
                    }
                    Object.assign(this, {
                        title: title,
                        teacherName: teacherName,
                        id: id ? id : shortid.generate(),
                        schoolIds: schoolIds,
                        classroomId: classroomId,
                        date: date,
                        timeStart: timeStart,
                        timeEnd: timeEnd
                    });
                }
                Object.defineProperty(Lesson.prototype, "dateStart", {
                    get: function () {
                        return dates_1.stringsToDate(this.date, this.timeStart);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Lesson.prototype, "dateEnd", {
                    get: function () {
                        return dates_1.stringsToDate(this.date, this.timeEnd);
                    },
                    enumerable: true,
                    configurable: true
                });
                Lesson.isOverlap = function (lesson1, lesson2) {
                    var a = lesson1.dateStart.getTime();
                    var b = lesson1.dateEnd.getTime();
                    var c = lesson2.dateStart.getTime();
                    var d = lesson2.dateEnd.getTime();
                    return a >= c && a < d || b > c && b <= d;
                };
                ;
                return Lesson;
            }();
            exports.Lesson = Lesson;

            /***/
        },
        /* 15 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var __assign = this && this.__assign || Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            Object.defineProperty(exports, "__esModule", { value: true });
            var lesson_1 = __webpack_require__(14);
            var school_1 = __webpack_require__(16);
            var classroom_1 = __webpack_require__(13);
            var index_1 = __webpack_require__(11);
            var errors_1 = __webpack_require__(1);
            var dates_1 = __webpack_require__(5);
            var Schedule = function () {
                function Schedule(options) {
                    var _this = this;
                    this.lessons = [];
                    this.schools = [];
                    this.classrooms = [];
                    this.initialize = function (data) {
                        data.classrooms.forEach(_this.addClassroom);
                        data.schools.forEach(_this.addSchool);
                        data.lessons.forEach(_this.addLesson);
                    };
                    this.getScheduleForDateRange = function (inputDateRange, externalPredicate) {
                        var datePredicate = function (lesson) {
                            return true;
                        };
                        if (inputDateRange) {
                            var dateRange_1 = dates_1.inputDateRangeToDateRange(inputDateRange);
                            if (!dateRange_1.min && !dateRange_1.max) {
                                throw new errors_1.default("dateRange \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u043E\u043B\u044F min \u0438\u043B\u0438 max");
                            } else if (!dateRange_1.min) {
                                dateRange_1.min = new Date(0);
                            } else if (!dateRange_1.max) {
                                dateRange_1.max = {
                                    getTime: function () {
                                        return Infinity;
                                    }
                                };
                            }
                            if (dateRange_1.min.getTime() >= dateRange_1.max.getTime()) {
                                throw new errors_1.default('`dateRange.min` should be less `dateRange.max`');
                            }
                            datePredicate = function (lesson) {
                                return lesson.dateStart.getTime() > dateRange_1.min.getTime() && lesson.dateEnd.getTime() < dateRange_1.max.getTime();
                            };
                        }
                        var predicate = datePredicate;
                        if (typeof externalPredicate === 'function') {
                            predicate = function (lesson) {
                                return datePredicate(lesson) && externalPredicate(lesson);
                            };
                        }
                        var lessons = _this.lessons.filter(predicate).sort(function (a, b) {
                            return a.dateStart.getTime() - b.dateStart.getTime();
                        });
                        return _this.lessonsToData(lessons);
                    };
                    /**
                     * Просмотр расписания школы в заданный интервал дат.
                     */
                    this.getScheduleForSchool = function (schoolId, dateRange) {
                        if (schoolId === undefined) {
                            throw new errors_1.default("Required parameter schoolId is undefined");
                        }
                        var school = _this.schools.find(function (school) {
                            return school.id === schoolId;
                        });
                        if (!school) {
                            throw new errors_1.default("There is no school with id=" + schoolId + " ");
                        }
                        return _this.getScheduleForDateRange(dateRange, function (lesson) {
                            return lesson.schoolIds.includes(schoolId);
                        });
                    };
                    /**
                     * Просмотр графика лекций в аудитории в заданный интервал дат.
                     */
                    this.getScheduleForClassroom = function (classroomId, dateRange) {
                        if (classroomId === undefined) {
                            throw new errors_1.default("\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 classRoomId=" + classroomId);
                        }
                        var classroom = _this.classrooms.find(function (classroom) {
                            return classroom.id === classroomId;
                        });
                        if (!classroom) {
                            throw new errors_1.default("\u041D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0441 id=" + classroomId + " ");
                        }
                        return _this.getScheduleForDateRange(dateRange, function (lesson) {
                            return lesson.classroomId === classroomId;
                        });
                    };
                    this.getLessons = function () {
                        return _this.lessonsToData(_this.lessons);
                    };
                    this.getClassrooms = function () {
                        return _this.classrooms;
                    };
                    this.getSchools = function () {
                        return _this.schools;
                    };
                    this.addLesson = function (lesson) {
                        _this.checkClassroomIdExists(lesson.classroomId);
                        lesson.schoolIds.forEach(function (id) {
                            return _this.checkSchoolIdExists(id);
                        });
                        _this.checkDuplicateItemId(lesson.id, _this.lessons, 'Lesson');
                        var newLesson = new lesson_1.Lesson(lesson);
                        _this.checkClassroomCapacityForLesson(newLesson);
                        _this.checkOneLessonForSchoolAtTime(newLesson);
                        _this.checkOneLessonInOneClassroomAtTime(newLesson);
                        _this.lessons.push(new lesson_1.Lesson(lesson));
                    };
                    this.addSchool = function (school) {
                        _this.checkDuplicateItemId(school.id, _this.schools, 'School');
                        _this.schools.push(new school_1.School(school));
                    };
                    this.addClassroom = function (classroom) {
                        _this.checkDuplicateItemId(classroom.id, _this.classrooms, 'Classroom');
                        _this.classrooms.push(new classroom_1.Classroom(classroom));
                    };
                    this.checkClassroomIdExists = function (id) {
                        if (!_this.classroomsIds.includes(id)) {
                            throw new errors_1.default("Can't add Lesson with unknown classroomId=" + id);
                        }
                    };
                    this.checkSchoolIdExists = function (id) {
                        if (!_this.schoolsIds.includes(id)) {
                            throw new errors_1.default("Can't add Lesson with unknown schoolId=" + id);
                        }
                    };
                    /** Вместимость аудитории должна быть больше или равной количеству студентов на лекции. */
                    this.checkClassroomCapacityForLesson = function (newLesson) {
                        var requiredCapacity = newLesson.schoolIds.reduce(function (prev, next) {
                            return prev + _this.getSchoolById(next).studentsNumber;
                        }, 0);
                        var classroomCapacity = _this.getClassroomById(newLesson.classroomId).capacity;
                        if (requiredCapacity > classroomCapacity) {
                            throw new errors_1.default(errors_1.ScheduleErrorMessages.classroomCapacity(newLesson.classroomId, classroomCapacity, requiredCapacity));
                        }
                    };
                    /** Для одной школы не может быть двух лекций одновременно.*/
                    this.checkOneLessonForSchoolAtTime = function (newLesson) {
                        _this.lessons.filter(function (l) {
                            return l.schoolIds.some(function (id) {
                                return newLesson.schoolIds.includes(id);
                            });
                        }).forEach(function (existingLesson) {
                            if (lesson_1.Lesson.isOverlap(newLesson, existingLesson)) {
                                throw new errors_1.default(errors_1.ScheduleErrorMessages.oneLessonForSchoolAtTime);
                            }
                        });
                    };
                    /** В одной аудитории не может быть одновременно двух разных лекций. */
                    this.checkOneLessonInOneClassroomAtTime = function (newLesson) {
                        _this.lessons.filter(function (l) {
                            return l.classroomId === newLesson.classroomId;
                        }).forEach(function (existingLesson) {
                            if (lesson_1.Lesson.isOverlap(newLesson, existingLesson)) {
                                throw new errors_1.default(errors_1.ScheduleErrorMessages.oneLessonInOneClassroomAtTime(newLesson.classroomId, existingLesson.id));
                            }
                        });
                    };
                    this.getSchoolById = function (id) {
                        return _this.schools.find(function (school) {
                            return school.id === id;
                        });
                    };
                    this.getScheduleData = function () {
                        var _a = _this,
                            lessons = _a.lessons,
                            schools = _a.schools,
                            classrooms = _a.classrooms;
                        return { lessons: lessons, schools: schools, classrooms: classrooms };
                    };
                    this.lessonsToData = function (lessons) {
                        return lessons.map(function (lesson) {
                            var dataLesson = __assign({}, lesson, { classroom: _this.getClassroomById(lesson.classroomId), schools: lesson.schoolIds.map(_this.getSchoolById) });
                            delete dataLesson.classroomId;
                            delete dataLesson.schoolIds;
                            return dataLesson;
                        });
                    };
                    if (options && options.data) {
                        this.initialize(options.data);
                    } else if (options && options.mockMode) {
                        this.initialize(index_1.mockData);
                    }
                }
                Schedule.prototype.updateLesson = function (id, lesson) {
                    this.updateItem(id, lesson, this.lessons);
                };
                Schedule.prototype.updateSchool = function (id, school) {
                    this.updateItem(id, school, this.schools);
                };
                Schedule.prototype.updateClassroom = function (id, classroom) {
                    this.updateItem(id, classroom, this.classrooms);
                };
                Schedule.prototype.updateItem = function (id, patchItem, currentItems) {
                    var existingItem = currentItems.find(function (item) {
                        return item.id === id;
                    });
                    if (!existingItem) {
                        throw new errors_1.default("Item with id=" + id + " does not exist");
                    }
                    Object.keys(patchItem).forEach(function (key) {
                        if (!existingItem.hasOwnProperty(key)) {
                            throw new errors_1.default("Attempted to update unknown field " + key);
                        }
                        existingItem[key] = patchItem[key];
                    });
                };
                Schedule.prototype.checkDuplicateItemId = function (id, items, itemName) {
                    if (items.find(function (l) {
                        return l.id === id;
                    })) {
                        throw new errors_1.default(itemName + " with id=" + id + " exists.");
                    }
                };
                ;
                Schedule.prototype.reset = function (data) {
                    this.lessons = [];
                    this.classrooms = [];
                    this.schools = [];
                    if (data) {
                        this.initialize(data);
                    }
                };
                Object.defineProperty(Schedule.prototype, "classroomsIds", {
                    get: function () {
                        return this.classrooms.map(function (c) {
                            return c.id;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Schedule.prototype, "schoolsIds", {
                    get: function () {
                        return this.schools.map(function (c) {
                            return c.id;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Schedule.prototype.getClassroomById = function (id) {
                    return this.classrooms.find(function (classroom) {
                        return classroom.id === id;
                    });
                };
                return Schedule;
            }();
            exports.Schedule = Schedule;

            /***/
        },
        /* 16 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var __assign = this && this.__assign || Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            Object.defineProperty(exports, "__esModule", { value: true });
            var shortid = __webpack_require__(4);
            var School = function () {
                function School(school) {
                    var id = school.id ? school.id : shortid.generate();
                    Object.assign(this, __assign({}, school, { id: id }));
                }
                return School;
            }();
            exports.School = School;

            /***/
        },,,,,,,,,,,,
        /* 17 */
        /* 18 */
        /* 19 */
        /* 20 */
        /* 21 */
        /* 22 */
        /* 23 */
        /* 24 */
        /* 25 */
        /* 26 */
        /* 27 */
        /* 28 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var encode = __webpack_require__(6);
            var alphabet = __webpack_require__(2);

            // Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
            // This number should be updated every year or so to keep the generated id short.
            // To regenerate `new Date() - 0` and bump the version. Always bump the version!
            var REDUCE_TIME = 1459707606518;

            // don't change unless we change the algos or REDUCE_TIME
            // must be an integer and less than 16
            var version = 6;

            // Counter is used when shortid is called multiple times in one second.
            var counter;

            // Remember the last time shortid was called in case counter is needed.
            var previousSeconds;

            /**
             * Generate unique id
             * Returns string id
             */
            function build(clusterWorkerId) {

                var str = '';

                var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

                if (seconds === previousSeconds) {
                    counter++;
                } else {
                    counter = 0;
                    previousSeconds = seconds;
                }

                str = str + encode(alphabet.lookup, version);
                str = str + encode(alphabet.lookup, clusterWorkerId);
                if (counter > 0) {
                    str = str + encode(alphabet.lookup, counter);
                }
                str = str + encode(alphabet.lookup, seconds);

                return str;
            }

            module.exports = build;

            /***/
        },
        /* 29 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var alphabet = __webpack_require__(2);

            /**
             * Decode the id to get the version and worker
             * Mainly for debugging and testing.
             * @param id - the shortid-generated id.
             */
            function decode(id) {
                var characters = alphabet.shuffled();
                return {
                    version: characters.indexOf(id.substr(0, 1)) & 0x0f,
                    worker: characters.indexOf(id.substr(1, 1)) & 0x0f
                };
            }

            module.exports = decode;

            /***/
        },
        /* 30 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var alphabet = __webpack_require__(2);
            var encode = __webpack_require__(6);
            var decode = __webpack_require__(29);
            var build = __webpack_require__(28);
            var isValid = __webpack_require__(31);

            // if you are using cluster or multiple servers use this to make each instance
            // has a unique value for worker
            // Note: I don't know if this is automatically set when using third
            // party cluster solutions such as pm2.
            var clusterWorkerId = __webpack_require__(34) || 0;

            /**
             * Set the seed.
             * Highly recommended if you don't want people to try to figure out your id schema.
             * exposed as shortid.seed(int)
             * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
             */
            function seed(seedValue) {
                alphabet.seed(seedValue);
                return module.exports;
            }

            /**
             * Set the cluster worker or machine id
             * exposed as shortid.worker(int)
             * @param workerId worker must be positive integer.  Number less than 16 is recommended.
             * returns shortid module so it can be chained.
             */
            function worker(workerId) {
                clusterWorkerId = workerId;
                return module.exports;
            }

            /**
             *
             * sets new characters to use in the alphabet
             * returns the shuffled alphabet
             */
            function characters(newCharacters) {
                if (newCharacters !== undefined) {
                    alphabet.characters(newCharacters);
                }

                return alphabet.shuffled();
            }

            /**
             * Generate unique id
             * Returns string id
             */
            function generate() {
                return build(clusterWorkerId);
            }

            // Export all other functions as properties of the generate function
            module.exports = generate;
            module.exports.generate = generate;
            module.exports.seed = seed;
            module.exports.worker = worker;
            module.exports.characters = characters;
            module.exports.decode = decode;
            module.exports.isValid = isValid;

            /***/
        },
        /* 31 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var alphabet = __webpack_require__(2);

            function isShortId(id) {
                if (!id || typeof id !== 'string' || id.length < 6) {
                    return false;
                }

                var characters = alphabet.characters();
                var len = id.length;
                for (var i = 0; i < len; i++) {
                    if (characters.indexOf(id[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }

            module.exports = isShortId;

            /***/
        },
        /* 32 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

            function randomByte() {
                if (!crypto || !crypto.getRandomValues) {
                    return Math.floor(Math.random() * 256) & 0x30;
                }
                var dest = new Uint8Array(1);
                crypto.getRandomValues(dest);
                return dest[0] & 0x30;
            }

            module.exports = randomByte;

            /***/
        },
        /* 33 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            // Found this seed-based random generator somewhere
            // Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

            var seed = 1;

            /**
             * return a random number based on a seed
             * @param seed
             * @returns {number}
             */
            function getNextValue() {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280.0;
            }

            function setSeed(_seed_) {
                seed = _seed_;
            }

            module.exports = {
                nextValue: getNextValue,
                seed: setSeed
            };

            /***/
        },
        /* 34 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = 0;

            /***/
        },
        /* 35 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

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

            /***/
        },,,
        /* 36 */
        /* 37 */
        /* 38 */
        /***/function (module, exports, __webpack_require__) {

            __webpack_require__(9);
            module.exports = __webpack_require__(7);

            /***/
        }])
    );
});

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tablify = tablify;
const Table = __webpack_require__(17);

function tablify(data, options) {
  let keys = Object.keys(data[0]);

  if (options && options.include) {
    keys = keys.filter(key => options.include.includes(key));
  }

  const table = new Table({ head: keys });

  data.forEach(item => {
    const row = keys.map(key => {
      return item[key];
    });
    table.push(row);
  });

  return table.toString();
}

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var colors = __webpack_require__(27),
    utils = __webpack_require__(18),
    repeat = utils.repeat,
    truncate = utils.truncate,
    pad = utils.pad;

/**
 * Table constructor
 *
 * @param {Object} options
 * @api public
 */

function Table(options) {
  this.options = utils.options({
    chars: {
      'top': '─',
      'top-mid': '┬',
      'top-left': '┌',
      'top-right': '┐',
      'bottom': '─',
      'bottom-mid': '┴',
      'bottom-left': '└',
      'bottom-right': '┘',
      'left': '│',
      'left-mid': '├',
      'mid': '─',
      'mid-mid': '┼',
      'right': '│',
      'right-mid': '┤',
      'middle': '│'
    },
    truncate: '…',
    colWidths: [],
    colAligns: [],
    style: {
      'padding-left': 1,
      'padding-right': 1,
      head: ['red'],
      border: ['grey'],
      compact: false
    },
    head: []
  }, options);
};

/**
 * Inherit from Array.
 */

Table.prototype.__proto__ = Array.prototype;

/**
 * Width getter
 *
 * @return {Number} width
 * @api public
 */

Table.prototype.__defineGetter__('width', function () {
  var str = this.toString().split("\n");
  if (str.length) return str[0].length;
  return 0;
});

/**
 * Render to a string.
 *
 * @return {String} table representation
 * @api public
 */

Table.prototype.render;
Table.prototype.toString = function () {
  var ret = '',
      options = this.options,
      style = options.style,
      head = options.head,
      chars = options.chars,
      truncater = options.truncate,
      colWidths = options.colWidths || new Array(this.head.length),
      totalWidth = 0;

  if (!head.length && !this.length) return '';

  if (!colWidths.length) {
    var all_rows = this.slice(0);
    if (head.length) {
      all_rows = all_rows.concat([head]);
    };

    all_rows.forEach(function (cells) {
      // horizontal (arrays)
      if (typeof cells === 'object' && cells.length) {
        extractColumnWidths(cells);

        // vertical (objects)
      } else {
        var header_cell = Object.keys(cells)[0],
            value_cell = cells[header_cell];

        colWidths[0] = Math.max(colWidths[0] || 0, get_width(header_cell) || 0);

        // cross (objects w/ array values)
        if (typeof value_cell === 'object' && value_cell.length) {
          extractColumnWidths(value_cell, 1);
        } else {
          colWidths[1] = Math.max(colWidths[1] || 0, get_width(value_cell) || 0);
        }
      }
    });
  };

  totalWidth = (colWidths.length == 1 ? colWidths[0] : colWidths.reduce(function (a, b) {
    return a + b;
  })) + colWidths.length + 1;

  function extractColumnWidths(arr, offset) {
    var offset = offset || 0;
    arr.forEach(function (cell, i) {
      colWidths[i + offset] = Math.max(colWidths[i + offset] || 0, get_width(cell) || 0);
    });
  };

  function get_width(obj) {
    return typeof obj == 'object' && obj.width != undefined ? obj.width : (typeof obj == 'object' ? utils.strlen(obj.text) : utils.strlen(obj)) + (style['padding-left'] || 0) + (style['padding-right'] || 0);
  }

  // draws a line
  function line(line, left, right, intersection) {
    var width = 0,
        line = left + repeat(line, totalWidth - 2) + right;

    colWidths.forEach(function (w, i) {
      if (i == colWidths.length - 1) return;
      width += w + 1;
      line = line.substr(0, width) + intersection + line.substr(width + 1);
    });

    return applyStyles(options.style.border, line);
  };

  // draws the top line
  function lineTop() {
    var l = line(chars.top, chars['top-left'] || chars.top, chars['top-right'] || chars.top, chars['top-mid']);
    if (l) ret += l + "\n";
  };

  function generateRow(items, style) {
    var cells = [],
        max_height = 0;

    // prepare vertical and cross table data
    if (!Array.isArray(items) && typeof items === "object") {
      var key = Object.keys(items)[0],
          value = items[key],
          first_cell_head = true;

      if (Array.isArray(value)) {
        items = value;
        items.unshift(key);
      } else {
        items = [key, value];
      }
    }

    // transform array of item strings into structure of cells
    items.forEach(function (item, i) {
      var contents = item.toString().split("\n").reduce(function (memo, l) {
        memo.push(string(l, i));
        return memo;
      }, []);

      var height = contents.length;
      if (height > max_height) {
        max_height = height;
      };

      cells.push({ contents: contents, height: height });
    });

    // transform vertical cells into horizontal lines
    var lines = new Array(max_height);
    cells.forEach(function (cell, i) {
      cell.contents.forEach(function (line, j) {
        if (!lines[j]) {
          lines[j] = [];
        };
        if (style || first_cell_head && i === 0 && options.style.head) {
          line = applyStyles(options.style.head, line);
        }

        lines[j].push(line);
      });

      // populate empty lines in cell
      for (var j = cell.height, l = max_height; j < l; j++) {
        if (!lines[j]) {
          lines[j] = [];
        };
        lines[j].push(string('', i));
      }
    });
    var ret = "";
    lines.forEach(function (line, index) {
      if (ret.length > 0) {
        ret += "\n" + applyStyles(options.style.border, chars.left);
      }

      ret += line.join(applyStyles(options.style.border, chars.middle)) + applyStyles(options.style.border, chars.right);
    });

    return applyStyles(options.style.border, chars.left) + ret;
  };

  function applyStyles(styles, subject) {
    if (!subject) return '';
    styles.forEach(function (style) {
      subject = colors[style](subject);
    });
    return subject;
  };

  // renders a string, by padding it or truncating it
  function string(str, index) {
    var str = String(typeof str == 'object' && str.text ? str.text : str),
        length = utils.strlen(str),
        width = colWidths[index] - (style['padding-left'] || 0) - (style['padding-right'] || 0),
        align = options.colAligns[index] || 'left';

    return repeat(' ', style['padding-left'] || 0) + (length == width ? str : length < width ? pad(str, width + (str.length - length), ' ', align == 'left' ? 'right' : align == 'middle' ? 'both' : 'left') : truncater ? truncate(str, width, truncater) : str) + repeat(' ', style['padding-right'] || 0);
  };

  if (head.length) {
    lineTop();

    ret += generateRow(head, style.head) + "\n";
  }

  if (this.length) this.forEach(function (cells, i) {
    if (!head.length && i == 0) lineTop();else {
      if (!style.compact || i < !!head.length ? 1 : 0 || cells.length == 0) {
        var l = line(chars.mid, chars['left-mid'], chars['right-mid'], chars['mid-mid']);
        if (l) ret += l + "\n";
      }
    }

    if (cells.hasOwnProperty("length") && !cells.length) {
      return;
    } else {
      ret += generateRow(cells) + "\n";
    };
  });

  var l = line(chars.bottom, chars['bottom-left'] || chars.bottom, chars['bottom-right'] || chars.bottom, chars['bottom-mid']);
  if (l) ret += l;else
    // trim the last '\n' if we didn't add the bottom decoration
    ret = ret.slice(0, -1);

  return ret;
};

/**
 * Module exports.
 */

module.exports = Table;

module.exports.version = '0.0.1';

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Repeats a string.
 *
 * @param {String} char(s)
 * @param {Number} number of times
 * @return {String} repeated string
 */

exports.repeat = function (str, times) {
  return Array(times + 1).join(str);
};

/**
 * Pads a string
 *
 * @api public
 */

exports.pad = function (str, len, pad, dir) {
  if (len + 1 >= str.length) switch (dir) {
    case 'left':
      str = Array(len + 1 - str.length).join(pad) + str;
      break;

    case 'both':
      var right = Math.ceil((padlen = len - str.length) / 2);
      var left = padlen - right;
      str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
      break;

    default:
      str = str + Array(len + 1 - str.length).join(pad);
  };

  return str;
};

/**
 * Truncates a string
 *
 * @api public
 */

exports.truncate = function (str, length, chr) {
  chr = chr || '…';
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str;
};

/**
 * Copies and merges options with defaults.
 *
 * @param {Object} defaults
 * @param {Object} supplied options
 * @return {Object} new (merged) object
 */

function options(defaults, opts) {
  for (var p in opts) {
    if (opts[p] && opts[p].constructor && opts[p].constructor === Object) {
      defaults[p] = defaults[p] || {};
      options(defaults[p], opts[p]);
    } else {
      defaults[p] = opts[p];
    }
  }
  return defaults;
};
exports.options = options;

//
// For consideration of terminal "color" programs like colors.js,
// which can add ANSI escape color codes to strings,
// we destyle the ANSI color escape codes for padding calculations.
//
// see: http://en.wikipedia.org/wiki/ANSI_escape_code
//
exports.strlen = function (str) {
  var code = /\u001b\[(?:\d*;){0,5}\d*m/g;
  var stripped = ("" + str).replace(code, '');
  var split = stripped.split("\n");
  return split.reduce(function (memo, s) {
    return s.length > memo ? s.length : memo;
  }, 0);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module['exports'] = function runTheTrap(text, options) {
  var result = "";
  text = text || "Run the trap, drop the bass";
  text = text.split('');
  var trap = {
    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
    c: ["\u00a9", "\u023b", "\u03fe"],
    d: ["\u00d0", "\u018a", "\u0500", "\u0501", "\u0502", "\u0503"],
    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
    f: ["\u04fa"],
    g: ["\u0262"],
    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
    i: ["\u0f0f"],
    j: ["\u0134"],
    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
    l: ["\u0139"],
    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
    p: ["\u01f7", "\u048e"],
    q: ["\u09cd"],
    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
    t: ["\u0141", "\u0166", "\u0373"],
    u: ["\u01b1", "\u054d"],
    v: ["\u05d8"],
    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
    y: ["\u00a5", "\u04b0", "\u04cb"],
    z: ["\u01b5", "\u0240"]
  };
  text.forEach(function (c) {
    c = c.toLowerCase();
    var chars = trap[c] || [" "];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== "undefined") {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// please no
module['exports'] = function zalgo(text, options) {
  text = text || "   he is here   ";
  var soul = {
    "up": ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̓', '̔', '̽', '̉', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ', '̾', '͛', '͆', '̚'],
    "down": ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '̣'],
    "mid": ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷', '͡', ' ҉']
  },
      all = [].concat(soul.up, soul.down, soul.mid),
      zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = i === character;
    });
    return bool;
  }

  function heComes(text, options) {
    var result = '',
        counts,
        l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = { "up": 0, "down": 0, "mid": 0 };
      switch (options.size) {
        case 'mini':
          counts.up = randomNumber(8);
          counts.min = randomNumber(2);
          counts.down = randomNumber(8);
          break;
        case 'maxi':
          counts.up = randomNumber(16) + 3;
          counts.min = randomNumber(4) + 1;
          counts.down = randomNumber(64) + 3;
          break;
        default:
          counts.up = randomNumber(8) + 1;
          counts.mid = randomNumber(6) / 2;
          counts.down = randomNumber(8) + 1;
          break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colors = __webpack_require__(0);

module['exports'] = function () {
  return function (letter, i, exploded) {
    if (letter === " ") return letter;
    switch (i % 3) {
      case 0:
        return colors.red(letter);
      case 1:
        return colors.white(letter);
      case 2:
        return colors.blue(letter);
    }
  };
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colors = __webpack_require__(0);

module['exports'] = function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colors = __webpack_require__(0);

module['exports'] = function () {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
  return function (letter, i, exploded) {
    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
  };
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colors = __webpack_require__(0);

module['exports'] = function (letter, i, exploded) {
  return i % 2 === 0 ? letter : colors.inverse(letter);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49]

};

Object.keys(codes).forEach(function (key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var argv = process.argv;

module.exports = function () {
  if (argv.indexOf('--no-color') !== -1 || argv.indexOf('--color=false') !== -1) {
    return false;
  }

  if (argv.indexOf('--color') !== -1 || argv.indexOf('--color=true') !== -1 || argv.indexOf('--color=always') !== -1) {
    return true;
  }

  if (process.stdout && !process.stdout.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    return true;
  }

  if ('COLORTERM' in process.env) {
    return true;
  }

  if (process.env.TERM === 'dumb') {
    return false;
  }

  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return true;
  }

  return false;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
var colors = __webpack_require__(0);
module['exports'] = colors;

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tablify = __webpack_require__(10);

var _scheduleBundle = __webpack_require__(8);

const log = console.log;

const prepareLessonForDisplay = l => _extends({}, l, {
	classroom: l.classroom.title,
	schools: l.schools.map(s => s.title)
});

const displayLessons = lessons => {
	const displayLessons = lessons.map(prepareLessonForDisplay);
	log(`Результат:\n${(0, _tablify.tablify)(displayLessons)}\n`);
};

const runForSchool = schedule => {
	log('Получим лекции для Школы разработки интерфейсов');
	const frontendLessons = schedule.getScheduleForSchool('frontend');
	displayLessons(frontendLessons);

	const dateRange = {
		min: {
			date: '10.04.2017'
		},
		max: {
			date: '25.04.2017'
		}
	};
	log('Получим лекции для Школы разработки интерфейсов в период с 10.04.2017 по 25.04.2017');
	const frontendLessonsForDate = schedule.getScheduleForSchool('frontend', dateRange);
	displayLessons(frontendLessonsForDate);
};

const runForClassroom = schedule => {
	log('Получим лекции для аудитории с id=1');
	const lessonsForClassroom = schedule.getScheduleForClassroom('1');
	displayLessons(lessonsForClassroom);

	const dateRange = {
		min: {
			date: '25.04.2017'
		},
		max: {
			date: '18.05.2017'
		}
	};
	log('Получим лекции для аудитории с id=1 в период с 25.04.2017 по 18.05.2017');
	const lessonsForClassroomAndDate = schedule.getScheduleForClassroom('1', dateRange);
	displayLessons(lessonsForClassroomAndDate);
};

const runLesson = () => {
	const schedule = new _scheduleBundle.Schedule();
	const newClassroom = {
		id: '1',
		title: 'ауд. Синий кит',
		capacity: 63,
		locationDescription: 'Прямо направо по лестнице в синий кит'
	};
	const newSchool = {
		id: 'frontend',
		title: 'Школа разработки интерфейсов',
		studentsNumber: 43
	};
	const newLesson = {
		title: "Адаптивная вёрстка",
		teacherName: "Дмитрий Душкин",
		id: "BJie7ZKPfAx",
		schoolIds: ["frontend"],
		classroomId: "1",
		date: "08.05.2017",
		timeStart: "14:00",
		timeEnd: "16:00"
	};

	/** Пример работы с ошибками при добавлении лекции с несуществующей аудиторией и школой */
	try {
		log('Попытка добавить лекцию с указанием несуществующих идентификаторов аудитории и школы');
		schedule.addLesson(newLesson);
	} catch (err) {
		if (err instanceof _scheduleBundle.ScheduleError) {
			log(`Отловили ошибку с текстом: ${err.message}`);
		} else {
			throw err; // произошла непредусмотренная ошибка!
		}
	}

	/** Пример корректного добавления лекции "с нуля". */

	log('\nДобавим аудиторию');
	schedule.addClassroom(newClassroom);

	log('Добавим школу');
	schedule.addSchool(newSchool);

	log('Теперь существую валидные школа и аудитория, которые можно указать в лекции. Добавим лекциюю.');
	schedule.addLesson(newLesson);
	displayLessons(schedule.getLessons());

	log('Изменим название и преподавателя лекции');
	schedule.updateLesson('BJie7ZKPfAx', { title: 'Резиновая верстка', teacherName: 'Александр Газизов' });
	displayLessons(schedule.getLessons());

	log('Выведем все аудитории');
	log((0, _tablify.tablify)(schedule.getClassrooms()) + '\n');

	log('Изменим название аудитории с id = 1');
	schedule.updateClassroom('1', { title: 'Красный кит' });
	log((0, _tablify.tablify)(schedule.getClassrooms()) + '\n');

	log('Выведем все школы');
	log((0, _tablify.tablify)(schedule.getSchools()));

	log('Изменим школу с id = frontend');
	schedule.updateSchool('frontend', { title: 'Школа разработчиков на ReactJS', studentsNumber: 12 });
	log((0, _tablify.tablify)(schedule.getSchools()));
};

const runExamples = () => {
	log('Добро пожаловать в демонстрацию возможностей библиотеки Ya-mobilization-schedule-api!');
	log('Исходный файл находится в src/example/index.js!\n');
	log('Создадим экземпляр расписания с предзаполненными данными для демонстрации возможностей фильтрации\n');
	const schedule = new _scheduleBundle.Schedule({ mockMode: true });
	runForSchool(schedule);
	runForClassroom(schedule);
	runLesson();

	log('\nНа этом все! Спасибо за внимание!');
};

runExamples();

/***/ }),
/* 37 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 37;

/***/ })
/******/ ]);
});