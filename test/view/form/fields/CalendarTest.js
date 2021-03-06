/* globals $, _ */
/* globals QUnit, test, asyncTest, expect, start, stop, ok, equal, notEqual, deepEqual */

var moment = require('moment');
var Environment = require('test/environment');
var DummyEvent = require('test/DummyEvent');

var Calendar = require('view/form/fields/Calendar');

//use Environment to mock ajax
QUnit.module('Calendar', _.extend(new Environment(), {
  setup: function() {
    Environment.prototype.setup.apply(this, arguments);
  }
}));

function createView(options) {
  return new Calendar(_.extend({year: 2014, month: 0}, options));
}


//       Jan 2014
//  S| M| T| W| T| F| S
// 29|30|31| 1| 2| 3| 4
//  5| 6| 7| 8| 9|10|11
// 12|13|14|15|16|17|18
// 19|20|21|22|23|24|25
// 26|27|28|29|30|31| 1
//  2| 3| 4| 5| 6| 7| 8

test('getFirstDate', function(){
  var view = createView();

  deepEqual(view.getFirstDate(0, 2014), [2013, 11, 29]);
  deepEqual(view.getFirstDate(5, 2014), [2014, 4, 25]);
});

test('getClassesForDate', function(){
  var view = createView();

  //remember months are 0 indexed
  deepEqual(view.getClassesForDate([2013, 11, 29], 0, 0), ['active', 'off', 'shadow-bottom']);
  deepEqual(view.getClassesForDate([2014, 0, 15], 2, 3), ['active']);
  deepEqual(view.getClassesForDate([2014, 1, 1], 4, 6), ['active', 'off', 'shadow-top-left']);

  view.setMinDate(moment([2013,11,31]));
  view.setMaxDate(moment([2014,0,22]));
  view.setValue(moment([2014,0,15]));

  deepEqual(view.getClassesForDate([2013, 11, 30], 0, 1), ['disabled', 'off', 'shadow-bottom']);
  deepEqual(view.getClassesForDate([2013, 11, 31], 0, 2), ['active', 'off', 'shadow-bottom-right']);
  deepEqual(view.getClassesForDate([2014, 0, 15], 2, 3), ['active', 'selected']);
});

test('getCalendarDates', function () {
  var view = createView();
  var calendar = view.getCalendarDates(0, 2014);
  deepEqual(calendar[1][1].date, [2014,0,6]);
});

test('month buttons', function () {
  var view = createView();
  view.setValue(moment([2014,0,15]));
  view.onPrevClick(new DummyEvent('click'));
  deepEqual([view.year, view.month], [2013,11]);

  view.onNextClick(new DummyEvent('click'));
  deepEqual([view.year, view.month], [2014,0]);
});

test('setValue', function() {
  var view = createView();

  view.setValue(moment([2014,0,15]));
  deepEqual([view.year, view.month], [2014,0], 'should set year and month');

  view.setMinDate(moment([2014,0,1]));
  view.setValue(moment([2013,11,15]));
  deepEqual([view.year, view.month], [2014,0], 'should ignore setting value outside limits');
});
