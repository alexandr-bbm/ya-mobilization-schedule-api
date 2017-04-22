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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleError = (function (_super) {
    __extends(ScheduleError, _super);
    function ScheduleError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, ScheduleError.prototype);
        return _this;
    }
    return ScheduleError;
}(Error));
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(30);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(1);
function parseHoursMinutes(time) {
    var parsedTimeStart = time.match(/^(\d{2}):(\d{2})$/);
    if (!parsedTimeStart) {
        throw new errors_1.default(errors_1.ScheduleErrorMessages.parseHoursMinutes(time));
    }
    var unused = parsedTimeStart[0], hours = parsedTimeStart[1], minutes = parsedTimeStart[2];
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
    var unused = parsedDate[0], day = parsedDate[1], month = parsedDate[2], year = parsedDate[3];
    return {
        day: +day,
        month: +month,
        year: +year
    };
}
exports.parseDate = parseDate;
function stringsToDate(date, time) {
    var _a = parseDate(date), day = _a.day, month = _a.month, year = _a.year;
    var _b = parseHoursMinutes(time), hours = _b.hours, minutes = _b.minutes;
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
        max: stringsToDate(inputDateRange.max.date, inputDateRange.max.time || '23:59'),
    };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var schedule_1 = __webpack_require__(15);
var errors_1 = __webpack_require__(1);
module.exports = { Schedule: schedule_1.Schedule, ScheduleError: errors_1.default };


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(3)))

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lessons_1 = __webpack_require__(12);
exports.testClassrooms = [
    {
        id: '1',
        title: 'ауд. Синий кит',
        capacity: 63,
        locationDescription: 'Прямо направо по лестнице в синий кит',
    },
    {
        id: '2',
        title: 'ауд. Серый карп',
        capacity: 44,
        locationDescription: 'Прямо направо по лестнице в Серый карп',
    },
    {
        id: '3',
        title: 'ауд. Красный окунь',
        capacity: 65,
        locationDescription: 'Прямо направо по лестнице в Красный окунь',
    },
    {
        id: '4',
        title: 'ауд. Желтый желтохвостик',
        capacity: 123,
        locationDescription: 'Прямо направо по лестнице в Желтый желтохвостик',
    },
];
exports.testSchools = [
    {
        id: 'frontend',
        title: 'Школа разработки интерфейсов',
        studentsNumber: 43,
    },
    {
        id: 'design',
        title: 'Школа мобильного дизайна',
        studentsNumber: 25,
    },
    {
        id: 'backend',
        title: 'Школа мобильной разработки',
        studentsNumber: 12,
    },
];
exports.mockData = {
    lessons: lessons_1.lessons,
    schools: exports.testSchools,
    classrooms: exports.testClassrooms,
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lessons = [
    {
        "title": "Адаптивная вёрстка",
        "teacherName": "Дмитрий Душкин",
        "id": "BJie7ZKPfAx",
        "schoolIds": ["frontend"],
        "classroomId": "2",
        "date": "08.05.2017",
        "timeStart": "14:00",
        "timeEnd": "16:00"
    },
    {
        "title": "Работа с сенсорным пользовательским вводом",
        "teacherName": "Дмитрий Душкин",
        "id": "rJ3xQWKDz0x",
        "schoolIds": ["frontend"],
        "classroomId": "1",
        "date": "10.05.2017",
        "timeStart": "17:00",
        "timeEnd": "19:00"
    },
    {
        "title": "Мультимедиа: возможности браузера",
        "teacherName": "Максим Васильев",
        "id": "r1aem-YDMRx",
        "schoolIds": ["frontend"],
        "classroomId": "1",
        "date": "10.04.2017",
        "timeStart": "10:00",
        "timeEnd": "12:00"
    },
    {
        "title": "Нативные приложения на веб-технологиях",
        "teacherName": "Сергей Бережной",
        "id": "r10lQbFDzAg",
        "schoolIds": ["frontend"],
        "classroomId": "1",
        "date": "18.05.2017",
        "timeStart": "15:00",
        "timeEnd": "17:00"
    },
    {
        "title": "Клиентская оптимизация: базовые знания и лучшие практики",
        "teacherName": "Андрей Морозов",
        "id": "SkyW7WYDMAx",
        "schoolIds": ["frontend"],
        "classroomId": "1",
        "date": "04.06.2017",
        "timeStart": "13:00",
        "timeEnd": "15:00"
    },
    {
        "title": "Клиентская оптимизация: мобильные устройства и инструменты",
        "teacherName": "Иван Карев",
        "id": "rklZX-YPG0l",
        "schoolIds": ["frontend"],
        "classroomId": "3",
        "date": "25.04.2017",
        "timeStart": "16:00",
        "timeEnd": "18:00"
    },
    {
        "title": "Инфраструктура веб-проектов",
        "teacherName": "Прокопюк Андрей",
        "id": "B1WZmWKPfAx",
        "schoolIds": ["frontend"],
        "classroomId": "2",
        "date": "06.06.2017",
        "timeStart": "10:00",
        "timeEnd": "12:00"
    },
    {
        "title": "Инструменты разработки мобильного фронтенда",
        "teacherName": "Прокопюк Андрей",
        "id": "HyM-X-KvfRe",
        "schoolIds": ["frontend"],
        "classroomId": "1",
        "date": "09.06.2017",
        "timeStart": "14:00",
        "timeEnd": "16:00"
    },
    {
        "title": "Java Blitz (Часть 1)",
        "teacherName": "Эдуард Мацуков",
        "id": "rJmZFDzAl",
        "schoolIds": ["backend"],
        "classroomId": "4",
        "date": "01.05.2017",
        "timeStart": "11:00",
        "timeEnd": "13:00"
    },
    {
        "title": "Git & Workflow",
        "teacherName": "Дмитрий Складнов",
        "id": "r1gXZYwGCg",
        "schoolIds": ["backend"],
        "classroomId": "4",
        "date": "24.05.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Java Blitz (Часть 2)",
        "teacherName": "Эдуард Мацуков",
        "id": "Sy-QWYwGCl",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "15.04.2017",
        "timeStart": "11:00",
        "timeEnd": "13:00"
    },
    {
        "title": "MyFirstApp (Часть 1)",
        "teacherName": "Роман Григорьев",
        "id": "HyfQ-twfAx",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "15.05.2017",
        "timeStart": "15:00",
        "timeEnd": "17:00"
    },
    {
        "title": "MyFirstApp (Часть 2)",
        "teacherName": "Роман Григорьев",
        "id": "SyQmbKwMRe",
        "schoolIds": ["backend"],
        "classroomId": "2",
        "date": "11.04.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "ViewGroup",
        "teacherName": "Алексей Щербинин",
        "id": "r1EQ-YvGCg",
        "schoolIds": ["backend"],
        "classroomId": "1",
        "date": "27.04.2017",
        "timeStart": "13:00",
        "timeEnd": "15:00"
    },
    {
        "title": "Background",
        "teacherName": "Алексей Макаров",
        "id": "ryBXWKwzAe",
        "schoolIds": ["backend"],
        "classroomId": "2",
        "date": "11.05.2017",
        "timeStart": "13:00",
        "timeEnd": "15:00"
    },
    {
        "title": "RecyclerView",
        "teacherName": "Владимир Тагаков",
        "id": "rkLX-FwfCg",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "26.05.2017",
        "timeStart": "10:00",
        "timeEnd": "12:00"
    },
    {
        "title": "Service & Broadcasts",
        "teacherName": "Алексей Макаров",
        "id": "rJDQZYwzRl",
        "schoolIds": ["backend"],
        "classroomId": "1",
        "date": "01.06.2017",
        "timeStart": "11:00",
        "timeEnd": "13:00"
    },
    {
        "title": "Drawing",
        "teacherName": "Алексей Щербинин",
        "id": "By_QZYvGCg",
        "schoolIds": ["backend"],
        "classroomId": "4",
        "date": "03.06.2017",
        "timeStart": "16:00",
        "timeEnd": "18:00"
    },
    {
        "title": "Content provider",
        "teacherName": "Максим Хромцов",
        "id": "rkKmbKwMRl",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "06.05.2017",
        "timeStart": "11:00",
        "timeEnd": "13:00"
    },
    {
        "title": "Fragments (Часть 1)",
        "teacherName": "Денис Загаевский",
        "id": "rJc7-YDzCe",
        "schoolIds": ["backend"],
        "classroomId": "2",
        "date": "05.06.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Fragments (Часть 2)",
        "teacherName": "Денис Загаевский",
        "id": "S1iQZYwG0l",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "13.04.2017",
        "timeStart": "16:00",
        "timeEnd": "18:00"
    },
    {
        "title": "MVP&Co",
        "teacherName": "Дмитрий Попов",
        "id": "Hkh7bYPM0e",
        "schoolIds": ["backend"],
        "classroomId": "2",
        "date": "23.04.2017",
        "timeStart": "17:00",
        "timeEnd": "19:00"
    },
    {
        "title": "Debugging & Polishing",
        "teacherName": "Илья Сергеев",
        "id": "BJp7WFDMAx",
        "schoolIds": ["backend"],
        "classroomId": "3",
        "date": "30.04.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Идея, исследование, концепт (Часть 1)",
        "teacherName": "Антон Тен",
        "id": "B1CXZKPfRg",
        "schoolIds": ["design"],
        "classroomId": "4",
        "date": "28.04.2017",
        "timeStart": "15:00",
        "timeEnd": "17:00"
    },
    {
        "title": "Идея, исследование, концепт (Часть 2)",
        "teacherName": "Антон Тен",
        "id": "B1keXZFDGRx",
        "schoolIds": ["design"],
        "classroomId": "3",
        "date": "17.04.2017",
        "timeStart": "10:00",
        "timeEnd": "12:00"
    },
    {
        "title": "Особенности проектирования мобильных интерфейсов",
        "teacherName": "Васюнин Николай",
        "id": "HkglXbYvMCx",
        "schoolIds": ["design"],
        "classroomId": "3",
        "date": "25.05.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Продукт и платформа",
        "teacherName": "Сергей Калабин",
        "id": "S1ZxQZYwMCl",
        "schoolIds": ["design"],
        "classroomId": "1",
        "date": "04.06.2017",
        "timeStart": "15:00",
        "timeEnd": "17:00"
    },
    {
        "title": "Природа операционных систем",
        "teacherName": "Васюнин Николай",
        "id": "BkGxX-tPf0g",
        "schoolIds": ["design"],
        "classroomId": "1",
        "date": "25.04.2017",
        "timeStart": "14:00",
        "timeEnd": "16:00"
    },
    {
        "title": "Прототипирование как процесс",
        "teacherName": "Сергей Томилов",
        "id": "S1mgQZFPG0x",
        "schoolIds": ["design"],
        "classroomId": "4",
        "date": "22.05.2017",
        "timeStart": "15:00",
        "timeEnd": "17:00"
    },
    {
        "title": "Инструмент под задачи",
        "teacherName": "Сергей Томилов",
        "id": "BJVxm-FDf0g",
        "schoolIds": ["design"],
        "classroomId": "3",
        "date": "29.05.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Анимации",
        "teacherName": "Сергей Томилов",
        "id": "SJBeX-tvMRl",
        "schoolIds": ["design"],
        "classroomId": "2",
        "date": "24.05.2017",
        "timeStart": "18:00",
        "timeEnd": "20:00"
    },
    {
        "title": "Дополнительная лекция. Design Everything",
        "teacherName": "Rijshouwer Krijn",
        "id": "rJ8lQWKDzRl",
        "schoolIds": ["design"],
        "classroomId": "1",
        "date": "22.04.2017",
        "timeStart": "17:00",
        "timeEnd": "19:00"
    },
    {
        "title": "Развите продукта",
        "teacherName": "Андрей Гевак",
        "id": "rJPgXbFDMCg",
        "schoolIds": ["design"],
        "classroomId": "3",
        "date": "09.06.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Исследование интерфейсов",
        "teacherName": "Кондратьев Александр",
        "id": "rJulmbKPGCl",
        "schoolIds": ["design"],
        "classroomId": "1",
        "date": "15.04.2017",
        "timeStart": "12:00",
        "timeEnd": "14:00"
    },
    {
        "title": "Работа в команде",
        "teacherName": "Юрий Подорожный",
        "id": "HyteX-twfCx",
        "schoolIds": ["design"],
        "classroomId": "1",
        "date": "31.05.2017",
        "timeStart": "10:00",
        "timeEnd": "12:00"
    },
    {
        "title": "Дополнительная лекция. Айдентика",
        "teacherName": "Дмитрий Моруз",
        "id": "ryqxQZYDfRe",
        "schoolIds": ["design"],
        "classroomId": "4",
        "date": "18.04.2017",
        "timeStart": "18:00",
        "timeEnd": "20:00"
    }
];


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __webpack_require__(4);
var Classroom = (function () {
    function Classroom(classroom) {
        var id = classroom.id ? classroom.id : shortid.generate();
        Object.assign(this, __assign({}, classroom, { id: id }));
    }
    return Classroom;
}());
exports.Classroom = Classroom;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(1);
var dates_1 = __webpack_require__(5);
var shortid = __webpack_require__(4);
var Lesson = (function () {
    function Lesson(lesson) {
        var title = lesson.title, teacherName = lesson.teacherName, date = lesson.date, timeStart = lesson.timeStart, timeEnd = lesson.timeEnd, classroomId = lesson.classroomId, schoolIds = lesson.schoolIds, id = lesson.id;
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
            timeEnd: timeEnd,
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
        return ((a >= c && a < d)
            || (b > c && b <= d));
    };
    ;
    return Lesson;
}());
exports.Lesson = Lesson;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
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
var Schedule = (function () {
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
            var datePredicate = function (lesson) { return true; };
            if (inputDateRange) {
                var dateRange_1 = dates_1.inputDateRangeToDateRange(inputDateRange);
                if (!dateRange_1.min && !dateRange_1.max) {
                    throw new errors_1.default("dateRange \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u043E\u043B\u044F min \u0438\u043B\u0438 max");
                }
                else if (!dateRange_1.min) {
                    dateRange_1.min = new Date(0);
                }
                else if (!dateRange_1.max) {
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
                    return lesson.dateStart.getTime() > dateRange_1.min.getTime()
                        && lesson.dateEnd.getTime() < dateRange_1.max.getTime();
                };
            }
            var predicate = datePredicate;
            if (typeof externalPredicate === 'function') {
                predicate = function (lesson) { return datePredicate(lesson) && externalPredicate(lesson); };
            }
            var lessons = _this.lessons
                .filter(predicate)
                .sort(function (a, b) { return a.dateStart.getTime() - b.dateStart.getTime(); });
            return _this.lessonsToData(lessons);
        };
        /**
         * Просмотр расписания школы в заданный интервал дат.
         */
        this.getScheduleForSchool = function (schoolId, dateRange) {
            if (schoolId === undefined) {
                throw new errors_1.default("Required parameter schoolId is undefined");
            }
            var school = _this.schools.find(function (school) { return school.id === schoolId; });
            if (!school) {
                throw new errors_1.default("There is no school with id=" + schoolId + " ");
            }
            return _this.getScheduleForDateRange(dateRange, function (lesson) { return lesson.schoolIds.includes(schoolId); });
        };
        /**
         * Просмотр графика лекций в аудитории в заданный интервал дат.
         */
        this.getScheduleForClassroom = function (classroomId, dateRange) {
            if (classroomId === undefined) {
                throw new errors_1.default("\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 classRoomId=" + classroomId);
            }
            var classroom = _this.classrooms.find(function (classroom) { return classroom.id === classroomId; });
            if (!classroom) {
                throw new errors_1.default("\u041D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0441 id=" + classroomId + " ");
            }
            return _this.getScheduleForDateRange(dateRange, function (lesson) { return lesson.classroomId === classroomId; });
        };
        this.getLessons = function () { return _this.lessonsToData(_this.lessons); };
        this.getClassrooms = function () { return _this.classrooms; };
        this.getSchools = function () { return _this.schools; };
        this.addLesson = function (lesson) {
            _this.checkClassroomIdExists(lesson.classroomId);
            lesson.schoolIds.forEach(function (id) { return _this.checkSchoolIdExists(id); });
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
            _this.lessons
                .filter(function (l) { return l.schoolIds.some(function (id) { return newLesson.schoolIds.includes(id); }); })
                .forEach(function (existingLesson) {
                if (lesson_1.Lesson.isOverlap(newLesson, existingLesson)) {
                    throw new errors_1.default(errors_1.ScheduleErrorMessages.oneLessonForSchoolAtTime);
                }
            });
        };
        /** В одной аудитории не может быть одновременно двух разных лекций. */
        this.checkOneLessonInOneClassroomAtTime = function (newLesson) {
            _this.lessons
                .filter(function (l) { return l.classroomId === newLesson.classroomId; })
                .forEach(function (existingLesson) {
                if (lesson_1.Lesson.isOverlap(newLesson, existingLesson)) {
                    throw new errors_1.default(errors_1.ScheduleErrorMessages.oneLessonInOneClassroomAtTime(newLesson.classroomId, existingLesson.id));
                }
            });
        };
        this.getSchoolById = function (id) {
            return _this.schools.find(function (school) { return school.id === id; });
        };
        this.getScheduleData = function () {
            var _a = _this, lessons = _a.lessons, schools = _a.schools, classrooms = _a.classrooms;
            return { lessons: lessons, schools: schools, classrooms: classrooms };
        };
        this.lessonsToData = function (lessons) {
            return lessons.map(function (lesson) {
                var dataLesson = (__assign({}, lesson, { classroom: _this.getClassroomById(lesson.classroomId), schools: lesson.schoolIds.map(_this.getSchoolById) }));
                delete dataLesson.classroomId;
                delete dataLesson.schoolIds;
                return dataLesson;
            });
        };
        if (options && options.data) {
            this.initialize(options.data);
        }
        else if (options && options.mockMode) {
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
        var existingItem = currentItems.find(function (item) { return item.id === id; });
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
        if (items.find(function (l) { return l.id === id; })) {
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
            return this.classrooms.map(function (c) { return c.id; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "schoolsIds", {
        get: function () {
            return this.schools.map(function (c) { return c.id; });
        },
        enumerable: true,
        configurable: true
    });
    Schedule.prototype.getClassroomById = function (id) {
        return this.classrooms.find(function (classroom) { return classroom.id === id; });
    };
    return Schedule;
}());
exports.Schedule = Schedule;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __webpack_require__(4);
var School = (function () {
    function School(school) {
        var id = school.id ? school.id : shortid.generate();
        Object.assign(this, __assign({}, school, { id: id }));
    }
    return School;
}());
exports.School = School;


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(7);


/***/ })
/******/ ]);
});