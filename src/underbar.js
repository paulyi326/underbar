/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];
    
    _.each(collection, function(value) {
      if (test(value)) {
        arr.push(value);
      }
    });
    
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniq = [];
    _.each(array, function(val) {
      if (uniq.indexOf(val) == -1) {
        uniq.push(val);
      }
    });
    return uniq;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    
    var arr = [];
    _.each(collection, function(val) {
      arr.push(iterator(val));
    });
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {


    // if (typeof functionOrKey !== "function") {
    //   functionOrKey = ''[functionOrKey]; // why doesn't functionOrKey = window[functionOrKey] work?
    // }
    // return _.map(collection, function(value) {
    //   return functionOrKey.apply(value, args);
    // });

    return _.map(collection, function(val) {
      if (typeof functionOrKey !== "function") {
        functionOrKey = val[functionOrKey];
      }
      return functionOrKey.apply(val, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var noInitialValue = arguments.length <= 2;
    _.each(collection, function(value) {
      if (noInitialValue) {
        accumulator = value;
        noInitialValue = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity; // for when callback function not provided

    var result = _.reduce(collection, function(allTrue, value) {
      if (!allTrue) {
        return false;
      } 
      return iterator(value);
    }, true);

    return result == true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;

    var result = _.every(collection, function(value) { // result will equal true if every value in collection is false
      return !iterator(value);
    });
    return !result;                                    // then !result is true if at least one value is true

    // var result = _.reduce(collection, function(someTrue, value) {
    //   if (someTrue) {
    //     return true;
    //   }
    //   return iterator(value) || someTrue;
    // }, false);

    // return result != false;

    // var result = _.reduce(collection, function(someTrue, value) {
    //   if (someTrue) {
    //     return true;
    //   }
    //   return iterator(value); // this might return undefined or null w/o the || operator
    // }, false);

    // return result != false; // undefined != false return true, same with null != false
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // for (var i = 1; i < arguments.length; i++) {
    //   var other = arguments[i];
    //   for (var key in other) {
    //     obj[key] = other[key];
    //   }
    // }
    // return obj;

    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        obj[key] = value;
      });
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      });
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
     var memoized = {};

    return function(value) {
      if (!memoized.hasOwnProperty(value)) {
        memoized[value] = func(value);
      }
      return memoized[value];
    };
  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    setTimeout(function() {
      func.apply(this, args.slice(2));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffledArray = array.slice();
    var randomIndex;
    var temp;

    for (var i = shuffledArray.length - 1; i >= 0; i--) {
      // find random element to move to back
      randomIndex = Math.round(Math.random() * i); // i is index of last unshuffled element

      // swap element at randomIndex with last unshuffled element
      temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    
    // if (typeof iterator !== "function") { // why doesn't this work?
    //   iterator = function(obj) {
    //     return obj[iterator];
    //   }
    // }

    if (typeof iterator !== "function") {
      var key = iterator;
      iterator = function(obj) {
        return obj[key];
      };
    }

    var objectValues = {};
    _.each(collection, function(obj) {
      var value = iterator(obj);
      if (!Array.isArray(objectValues[value])) {
        objectValues[value] = [];
      }
      objectValues[value].push(obj);
    });
    var sortedValues = Object.keys(objectValues).sort();
    var result = [];
    _.each(sortedValues, function(value) {
      result.push(objectValues[value]);
    });
    return _.flatten(result);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var maxLength = 0;
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
      var currArray = arguments[i];
      if (currArray.length > maxLength) {
        maxLength = currArray.length;
      }
    }

    for (var i = 0; i < maxLength; i++) {
      var arr = [];
      for (var j = 0; j < arguments.length; j++) {
        arr.push(arguments[j][i]);  
      }
      result.push(arr);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    return _.flattenHelper(nestedArray, []);
  };

  _.flattenHelper = function(element, result) {
    if (!Array.isArray(element)) {
      result.push(element);
    } else {
      for (var i = 0; i < element.length; i++) {
        _.flattenHelper(element[i], result);
      }
    }
    return result;
  }

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    var longestArray = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i].length > longestArray.length) {
        longestArray = arguments[i];
      }
    }

    for (var i = 0; i < longestArray.length; i++) {
      var element = longestArray[i];
      var containedInAll = true;
      for (var j = 0; j < arguments.length; j++) {
        containedInAll = _.contains(arguments[j], element) && containedInAll;
      }
      if (containedInAll) {
        result.push(element);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      var notContained = true;
      for (var j = 1; j < arguments.length; j++) {
        notContained = !_.contains(arguments[j], element) && notContained;
      }
      if (notContained) {
        result.push(element);
      }
    }
    return result;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
