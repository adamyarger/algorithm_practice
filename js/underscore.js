import assert from 'assert'

// https://gist.github.com/alexhawkins/18c85450ff8ea9f3781d
// https://eloquentjavascript.net/05_higher_order.html
// implment common high order functions
var _ = {};

/*********IDENTITY**********/
_.identity = function (val) {
  return val;
};

/*********FIRST**********/
_.first = function (array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
};

/*********LAST**********/
_.last = function (array, n) {
  if (n > array.length) {
    return array;
  } else
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
};


/*********EACH**********/
// should work on objects and arrays
_.each = function (collection, fn) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      fn(collection[i], i, collection)
    }
  } else if (collection instanceof Object) {
    for (let key in collection) {
      fn(collection[key], key, collection)
    }
  } else if (collection === null) {
    return collection
  }
}

// _.each([1, 2, 3], (num) => {
//   console.log(num)
// });
// _.each({ 'a': 1, 'b': 2 }, (num) => {
//   console.log(num)
// });

/*********INDEXOF**********/
_.indexOf = function (array, value) {
  const result = -1
  _.each(array, (val, i) => {
    if (val === value) {
      result = i
    }
  })
  return result
}

// console.log(_.indexOf([2, 3, 4], 3))

/*********FILTER**********/
_.filter = function (collection, test) {
  const result = []
  _.each(collection, (el, index) => {
    if (test(el, index)) {
      result.push(el)
    }
  })
  return result
}

// console.log(_.filter([1, 2, 2, 2, 3, 3, 3], item => item === 2))


/*********REJECT**********/
// opposite of filter
_.reject = function (collection, test) {
  const result = []
  _.each(collection, (el, index) => {
    if (!test(el, index)) {
      result.push(el)
    }
  })
  return result
}

// console.log(_.reject([1, 2, 2, 2, 3], (val => val === 2)))

/*********UNIQ**********/
// get rid of duplicates and return the array
// dos keeping order matter?
// how would you handle this is it was sorted with duplicates?
// can you do faster than O(n**2)?
// -- could sort the list then iterate through once and get rid of dups, could do this by popping and pushing to new arary
_.uniq = function (array) {
  // this has the order messed up but its efficient
  const sorted = array.sort()
  const result = []
  while (sorted.length) {
    const val = sorted.pop()
    if (!result.length || (result[result.length - 1] !== val)) {
      result.push(val)
    }
  }
  return result
}

// O(n**2)
// _.uniq = function (array) {
//   return _.filter(array, function (item, index) {
//     if (_.indexOf(array, item) === index) return item;
//   });
// };

// console.log(_.uniq([2, 2, 3, 5, 4, 4]))

/*********MAP**********/
_.map = function (collection, fn) {
  const arr = []
  _.each(collection, (el, index) => {
    arr.push(fn(el, index))
  })
  return arr
}

// console.log(_.map([1, 2, 3], (el, index) => el * 2))

/*********PLUCK**********/
_.pluck = function (collection, target) {
  return _.map(collection, (el) => {
    return el.name
  })
}
// var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
// console.log(_.pluck(stooges, 'name'))
// => ["moe", "larry", "curly"]

// REDUCE (should skip first iteration if no default acculmulator)
_.reduce = function (arr, fn, start) {
  let _start = start

  for (let i = 0; i < arr.length; i++) {
    _start = _start ? fn(_start, arr[i]) : arr[i]
  }

  return _start
}

{
  const foo = _.reduce([1, 2, 3], (acc, val) => {
    return acc + val
  })

  console.log(foo)
}


/*********INVOKE*********/
/*********REDUCE**********/
/*********CONTAINS*********/
/*********EVERY**********/
/********SOME**********/
/*********EXTEND**********/
/*********DEFAULTS**********/
/*********ONCE**********/
/*********MEMOIZE*************/
/*********DELAY*********/
/*********SHUFFLE**********/
/*********SORTBY**********/
/*********ZIP**********/
/*********FLATTEN**********/
/*********UNION**********/
/*********INTERSECTION**********/


//EXTRA
/*********DEBOUNCE**********/
// settimeout is part of the browser api or node.js. its not part of the JS runtime


/*********THROTTLE**********/
/*********PROMISE**********/
