/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleResponse = undefined;

	var _domIndex = __webpack_require__(2);

	var _domFoods = __webpack_require__(4);

	var _serviceFoods = __webpack_require__(5);

	var _serviceIndex = __webpack_require__(3);

	var handleResponse = exports.handleResponse = function handleResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(error);
	      debugger;
	    }
	    return json;
	  });
	};

	(0, _serviceFoods.getAllFoodsValidation)();
	(0, _serviceIndex.getAllFoodsDiary)();
	(0, _domIndex.filterFoods)();
	(0, _serviceIndex.getAllMeals)();

	$('#all-foods').on('focusout', _domFoods.removeInputField);
	$('#all-foods').on('click', 'tr td.name', _domFoods.createInputField);
	$('#all-foods').on('click', 'tr td.calories', _domFoods.createInputField);

	$('#add-food-btn').on('click', _serviceFoods.createFood);

	$('#all-foods-diary').on('click', '.sort', _serviceIndex.countIncrement);
	$('#all-meals').on('click', '.delete-mealFood', _domIndex.removeMealFood);
	$('#all-foods').on('click', '.delete-btn', _domFoods.removeFood);

	$('#meal-1').on('click', _domIndex.createFoodInMeal);
	$('#meal-2').on('click', _domIndex.createFoodInMeal);
	$('#meal-3').on('click', _domIndex.createFoodInMeal);
	$('#meal-4').on('click', _domIndex.createFoodInMeal);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFoodInMeal = exports.removeMealFood = exports.filterFoods = exports.getEachFoodDiary = exports.appendMeals = undefined;

	var _serviceIndex = __webpack_require__(3);

	var mealCalories = {
	  "breakfast": 400,
	  "lunch": 600,
	  "snack": 200,
	  "dinner": 800
	};

	var remainingCaloriesClassType = function remainingCaloriesClassType(goal, total) {
	  if (goal - total < 0) {
	    return "negative";
	  } else {
	    return "positive";
	  }
	};

	var remainingCalories = function remainingCalories(tableName, total) {
	  var goal = mealCalories[tableName];
	  var type = remainingCaloriesClassType(goal, total);
	  $("#" + tableName).append("<tr>\n    <td>Remaining Calories</td>\n    <td class=\"" + type + "\">" + (goal - total) + "</td>\n  </tr>");
	};

	var dayTotalCalories = function dayTotalCalories(total) {
	  var type = remainingCaloriesClassType(2000, total);
	  $("#meal-totals").html('');
	  $("#meal-totals").append("\n    <tr><th></th><th>Calories</th></tr>\n  <tr>\n  <td>Goal Calories</td>\n  <td>2000</td>\n  </tr>\n  <tr>\n  <td>Calories Consumed</td>\n  <td>" + total + "</td>\n  </tr>\n  <tr>\n  <td>Remaining Calories</td>\n  <td class=\"" + type + "\">" + (2000 - total) + "</td>\n  </tr>");
	};

	var mealTotalCalories = function mealTotalCalories(tableName, total) {
	  $("#" + tableName).append("<tr>\n  <td>Total Calories</td>\n  <td>" + total + "</td>\n  </tr>");
	};

	var appendMealsTableHead = function appendMealsTableHead() {
	  $('#breakfast').html('<h3>Breakfast</h3><tr><th>Name</th><th>Calories</th></tr>');
	  $('#snack').html('<h3>Snacks</h3><tr><th>Name</th><th>Calories</th></tr>');
	  $('#lunch').html('<h3>Lunch</h3><tr><th>Name</th><th>Calories</th></tr>');
	  $('#dinner').html('<h3>Dinner</h3><tr><th>Name</th><th>Calories</th></tr>');
	};

	var appendMeals = exports.appendMeals = function appendMeals(meals) {
	  var dayTotalCal = 0;
	  appendMealsTableHead();
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (food) {
	      $("#" + name).append("<tr class=\"" + food.id + "\">\n      <td class=\"food-" + food.id + "\">" + food.name + "</td>\n      <td class=\"calories\" class=\"cal-" + food.id + "\">" + food.calories + "</td>\n      <td><button class=\"delete-mealFood\" aria-label=\"Delete\">\n        <img src=\"assets/trashhhh.png\" alt=\"delete button\">\n      </button></td>\n      </tr>");
	      mealTotalCal += food.calories;
	    });
	  });
	  sortedFoods.forEach(function (food) {
	    if ($.inArray(food.id, foodsInMeals) === -1) {
	      $('#all-foods').append('<tr id="' + food.id + '">\n        <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n        <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n        <td><button class="delete-btn" aria-label="Delete">\n        Delete\n        </button></td>\n        </tr>');
	    } else {
	      $('#all-foods').append('<tr id="' + food.id + '">\n        <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n        <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n        <td><button class="delete-btn" aria-label="Delete" disabled>\n        Delete\n        </button></td>\n        </tr>');
	    }
	  });
	  return foodsInMeals;
	};

	var getAllFoodsDiary = function getAllFoodsDiary() {
	  $('#all-foods-diary').html('<tr><th>Food</th><th class=sort>Calories</th></tr>');
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods').then(function (response) {
	    return handleResponse(response);
	  }).then(function (foods) {
	    return getEachFoodDiary(foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getEachFoodDiary = function getEachFoodDiary(foods) {
	  var sortedFoods = void 0;
	  if (count === 1) {
	    sortedFoods = foods.sort(function (a, b) {
	      return a.calories < b.calories ? -1 : 1;
	    });
	  } else if (count === 2) {
	    sortedFoods = foods.sort(function (a, b) {
	      return a.calories > b.calories ? -1 : 1;
	    });
	  } else {
	    sortedFoods = foods.sort(function (a, b) {
	      return a.id > b.id ? -1 : 1;
	    });
	  }
	};

	var getEachFoodDiary = exports.getEachFoodDiary = function getEachFoodDiary(count, foods) {
	  var sortedFoods = determineSortedFoods(count, foods);
	  sortedFoods.forEach(function (food) {
	    $('#all-foods-diary').append("<tr id=\"" + food.id + "\">\n        <td class=\"name\" id=\"food-" + food.id + "\">" + food.name + "</td>\n        <td class=\"calories\" id=\"cal-" + food.id + "\">" + food.calories + "</td>\n        <td><input type=\"checkbox\" aria-label=\"check for foods\"></td>\n      </tr>");
	  });
	};

	var filterFoods = exports.filterFoods = function filterFoods() {
	  $('.filter').on('keydown', function () {
	    var value = $(this).val().toLowerCase();
	    $('td.name').filter(function () {
	      $(this.parentNode).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	    });
	  });
	};

	var removeMealFood = exports.removeMealFood = function removeMealFood(event) {
	  var $tr = event.target.parentNode.parentNode;
	  var mealId = event.target.parentNode.parentNode.parentNode.parentNode.className.slice(-1);
	  $tr.remove();
	  (0, _serviceIndex.deleteMealFood)($tr.className, mealId);
	};

	var createFoodInMeal = exports.createFoodInMeal = function createFoodInMeal(event) {
	  event.preventDefault();
	  var mealId = event.target.id.slice(-1);
	  $('#all-foods-diary tr').each(function (index, row) {
	    if (index != 0 && $(row).find(':checkbox:checked').length === 1) {
	      var foodId = parseInt(row.id);
	      (0, _serviceIndex.postFoodToMeal)(mealId, foodId);
	    }
	  });
	  $('input[type=checkbox]').prop('checked', false);
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteMealFood = exports.postFoodToMeal = exports.getAllMeals = exports.countIncrement = exports.getAllFoodsDiary = undefined;

	var _domIndex = __webpack_require__(2);

	var _index = __webpack_require__(1);

	var getAllFoodsDiary = exports.getAllFoodsDiary = function getAllFoodsDiary() {
	  $('#all-foods-diary').html('<tr><th>Food</th><th class=sort>Calories</th></tr>');
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods').then(function (response) {
	    return (0, _index.handleResponse)(response);
	  }).then(function (foods) {
	    return (0, _domIndex.getEachFoodDiary)(count, foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var count = 0;

	var countIncrement = exports.countIncrement = function countIncrement() {
	  count++;
	  if (count > 2) {
	    count = 0;
	  }
	  getAllFoodsDiary();
	};

	var getAllMeals = exports.getAllMeals = function getAllMeals() {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/meals').then(function (response) {
	    return (0, _index.handleResponse)(response);
	  }).then(function (meals) {
	    return (0, _domIndex.appendMeals)(meals);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var postFoodToMeal = exports.postFoodToMeal = function postFoodToMeal(mealId, foodId) {
	  fetch('http://quantifiedself-backend.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, postMealConfig()).then(function () {
	    return getAllMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var postMealConfig = function postMealConfig() {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' }
	  };
	};

	var deleteMealFood = exports.deleteMealFood = function deleteMealFood(foodId, mealId) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, { method: 'DELETE' }).then(function () {
	    return getAllMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeInputField = exports.createInputField = exports.clearPostForm = exports.removeFood = exports.getEachFood = exports.removeValidations = exports.validateForm = undefined;

	var _serviceFoods = __webpack_require__(5);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var validateForm = exports.validateForm = function validateForm() {
	  removeValidations();
	  var name = $('#name').val();
	  var calories = $('#calories').val();
	  if (name === "" && calories === "") {
	    $('.form-container').append('<p class="validation">Please enter a food name</p>');
	    $('.form-container').append('<p class="validation">Please enter a calorie amount</p>');
	    return false;
	  } else if (name === "") {
	    $('.form-container').append('<p class="validation">Please enter a food name</p>');
	    return false;
	  } else if (calories === "") {
	    $('.form-container').append('<p class="validation">Please enter a calorie amount</p>');
	    return false;
	  }
	};

	var removeValidations = exports.removeValidations = function removeValidations() {
	  $('.validation').remove();
	};

	var getFoodsInMeals = function getFoodsInMeals(meals) {
	  var foodsInMeals = [];
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (food) {
	      foodsInMeals.push(food.id);
	    });
	  });
	  return foodsInMeals;
	};

	var sortFoods = function sortFoods(foods) {
	  return foods.sort(function (a, b) {
	    return a.id > b.id ? -1 : 1;
	  });
	};

	var foodAppendWithRegularDelete = function foodAppendWithRegularDelete(food) {
	  $('#all-foods').append('<tr id="' + food.id + '">\n  <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n  <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n  <td><button class="delete-btn" aria-label="Delete">\n  <img src="assets/trashhhh.png" alt="delete button">\n  </button></td>\n  </tr>');
	};

	var foodAppendWithDisabledDelete = function foodAppendWithDisabledDelete(food) {
	  $('#all-foods').append('<tr id="' + food.id + '">\n  <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n  <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n\n  </tr>');
	};

	var getEachFood = exports.getEachFood = function getEachFood(meals, foods) {
	  var sortedFoods = sortFoods(foods);
	  var foodsInMeals = getFoodsInMeals(meals);
	  sortedFoods.forEach(function (food) {
	    if ($.inArray(food.id, foodsInMeals) === -1) {
	      foodAppendWithRegularDelete(food);
	    } else {
	      foodAppendWithDisabledDelete(food);
	    }
	  });
	};

	var removeFood = exports.removeFood = function removeFood(event) {
	  var tr = event.target.parentNode.parentNode;
	  tr.remove();
	  (0, _serviceFoods.deleteFood)(tr.id);
	};

	var clearPostForm = exports.clearPostForm = function clearPostForm() {
	  $('.form-container')[0].reset();
	};

	var createInputField = exports.createInputField = function createInputField(event) {
	  event.preventDefault();
	  var $input = $(event.target);
	  var type = $input.attr("class");
	  $input.html('<input class="' + type + '" type="text" placeholder=' + event.target.innerHTML + '  value="' + event.target.innerHTML + '"aria-required="true">');
	};

	var removeInputField = exports.removeInputField = function removeInputField(event) {
	  var id = event.target.parentNode.parentNode.id;
	  $(event.target.closest("td")).html(event.target.value);
	  (0, _serviceFoods.updateFood)(_defineProperty({}, $(event.target).attr("class"), event.target.value), id);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFood = exports.getAllFoodsValidation = exports.getAllFoods = exports.updateFood = exports.postFood = exports.deleteFood = undefined;

	var _domFoods = __webpack_require__(4);

	var _index = __webpack_require__(1);

	var deleteFood = exports.deleteFood = function deleteFood(id) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods/' + id, { method: 'DELETE' }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var postConfig = function postConfig(body) {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var postFood = exports.postFood = function postFood(body) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods', postConfig(body)).then(function (response) {
	    return (0, _index.handleResponse)(response);
	  }).then(function () {
	    return (0, _domFoods.removeValidations)();
	  }).then(function () {
	    return getAllFoodsValidation();
	  }).then(function () {
	    return (0, _domFoods.clearPostForm)();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var patchConfig = function patchConfig(body) {
	  return {
	    method: 'PATCH',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var updateFood = exports.updateFood = function updateFood(body, id) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods/' + id, patchConfig(body)).then(function (response) {
	    return (0, _index.handleResponse)(response);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getAllFoods = exports.getAllFoods = function getAllFoods(meals) {
	  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>');
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods').then(function (response) {
	    return (0, _index.handleResponse)(response);
	  }).then(function (foods) {
	    return (0, _domFoods.getEachFood)(meals, foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var appendMeals = function appendMeals(meals) {
	  var dayTotalCal = 0;
	  $('#breakfast').html('<caption>Breakfast</caption><tr><th>Name</th><th>Calories</th></tr>');
	  $('#snack').html('<caption>Snacks</caption><tr><th>Name</th><th>Calories</th></tr>');
	  $('#lunch').html('<caption>Lunch</caption><tr><th>Name</th><th>Calories</th></tr>');
	  $('#dinner').html('<caption>Dinner</caption><tr><th>Name</th><th>Calories</th></tr>');
	  meals.forEach(function (meal) {
	    var name = meal.name.toLowerCase();
	    var mealTotalCal = 0;
	    meal["foods"].forEach(function (food) {
	      $('#' + name).append('<tr class="' + food.id + '">\n      <td class="food-' + food.id + '">' + food.name + '</td>\n      <td class="calories" class="cal-' + food.id + '">' + food.calories + '</td>\n      <td><button class="delete-mealFood" aria-label="Delete">\n      Delete\n      </button></td>\n      </tr>');
	      mealTotalCal += food.calories;
	    });
	    dayTotalCal += mealTotalCal;
	    mealTotalCalories(name, mealTotalCal);
	    remainingCalories(name, mealTotalCal);
	  });
	};

	var createFood = exports.createFood = function createFood(event) {
	  event.preventDefault();
	  var name = $('#name').val();
	  var calories = $('#calories').val();

	  if ((0, _domFoods.validateForm)(name, calories) != false) {
	    postFood({ name: name, calories: calories });
	  }
	};

/***/ })
/******/ ]);
