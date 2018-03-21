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
/***/ (function(module, exports) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var validateForm = function validateForm() {
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

	var handleResponse = function handleResponse(response) {
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

	var removeValidations = function removeValidations() {
	  $('.validation').remove();
	};

	var getAllFoods = function getAllFoods(meals) {
	  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>');
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods').then(function (response) {
	    return handleResponse(response);
	  }).then(function (foods) {
	    return getEachFood(meals, foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getAllFoodsValidation = function getAllFoodsValidation() {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/meals').then(function (response) {
	    return handleResponse(response);
	  }).then(function (meals) {
	    return getAllFoods(meals);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getEachFood = function getEachFood(meals, foods) {
	  var sortedFoods = foods.sort(function (a, b) {
	    return a.id > b.id ? -1 : 1;
	  });
	  var foodsInMeals = [];
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (food) {
	      foodsInMeals.push(food.id);
	    });
	  });
	  sortedFoods.forEach(function (food) {
	    if ($.inArray(food.id, foodsInMeals) === -1) {
	      $('#all-foods').append('<tr id="' + food.id + '">\n        <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n        <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n        <td><button class="delete-btn" aria-label="Delete">\n        Delete\n        </button></td>\n        </tr>');
	    } else {
	      $('#all-foods').append('<tr id="' + food.id + '">\n        <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n        <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n        <td><button class="delete-btn" aria-label="Delete" disabled>\n        Delete\n        </button></td>\n        </tr>');
	    }
	  });
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
	  sortedFoods.forEach(function (food) {
	    $('#all-foods-diary').append('<tr id="' + food.id + '">\n        <td><input type="checkbox"></td>\n        <td class="name" id="food-' + food.id + '">' + food.name + '</td>\n        <td class="calories" id="cal-' + food.id + '">' + food.calories + '</td>\n      </tr>');
	  });
	};

	var removeFood = function removeFood(event) {
	  var tr = event.target.parentNode.parentNode;
	  tr.remove();
	  deleteFood(tr.id);
	};

	var deleteFood = function deleteFood(id) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods/' + id, { method: 'DELETE' }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var createFood = function createFood(event) {
	  event.preventDefault();
	  var name = $('#name').val();
	  var calories = $('#calories').val();

	  if (validateForm(name, calories) != false) {
	    postFood({ name: name, calories: calories });
	  }
	};

	var clearPostForm = function clearPostForm() {
	  $('.form-container')[0].reset();
	};

	var postConfig = function postConfig(body) {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var postFood = function postFood(body) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods', postConfig(body)).then(function (response) {
	    return handleResponse(response);
	  }).then(function () {
	    return removeValidations();
	  }).then(function () {
	    return getAllFoods();
	  }).then(function () {
	    return clearPostForm();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var createInputField = function createInputField(event) {
	  event.preventDefault();
	  var $input = $(event.target);
	  var type = $input.attr("class");
	  $input.html('<input class="' + type + '" type="text" placeholder=' + event.target.innerHTML + '  value="' + event.target.innerHTML + '"aria-required="true">');
	};

	var removeInputField = function removeInputField(event) {
	  var id = event.target.parentNode.parentNode.id;
	  $(event.target.closest("td")).html(event.target.value);
	  updateFood(_defineProperty({}, $(event.target).attr("class"), event.target.value), id);
	};

	var updateFood = function updateFood(body, id) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods/' + id, patchConfig(body)).then(function (response) {
	    return handleResponse(response);
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

	var filterFoods = function filterFoods() {
	  $('.filter').on('keydown', function () {
	    var value = $(this).val().toLowerCase();
	    $('td.name').filter(function () {
	      $(this.parentNode).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	    });
	  });
	};

	var getAllMeals = function getAllMeals() {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/meals').then(function (response) {
	    return handleResponse(response);
	  }).then(function (meals) {
	    return appendMeals(meals);
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
	  dayTotalCalories(dayTotalCal);
	};

	var mealTotalCalories = function mealTotalCalories(tableName, total) {
	  $('#' + tableName).append('<tr>\n  <td>Total Calories</td>\n  <td>' + total + '</td>\n  </tr>');
	};

	var dayTotalCalories = function dayTotalCalories(total) {
	  var type = void 0;
	  if (2000 - total < 0) {
	    type = "negative";
	  } else {
	    type = "positive";
	  }
	  $('#meal-totals').html('');
	  $('#meal-totals').append('<tr>\n  <td>Goal Calories</td>\n  <td>2000</td>\n  </tr>\n  <tr>\n  <td>Calories Consumed</td>\n  <td>' + total + '</td>\n  </tr>\n  <tr>\n  <td>Remaining Calories</td>\n  <td class="' + type + '">' + (2000 - total) + '</td>\n  </tr>');
	};

	var remainingCalories = function remainingCalories(tableName, total) {
	  var type = void 0;
	  var goal = void 0;
	  if (tableName === "breakfast") {
	    goal = 400;
	  } else if (tableName === "lunch") {
	    goal = 600;
	  } else if (tableName === "snack") {
	    goal = 200;
	  } else if (tableName === "dinner") {
	    goal = 800;
	  }
	  if (goal - total < 0) {
	    type = "negative";
	  } else {
	    type = "positive";
	  }
	  $('#' + tableName).append('<tr>\n    <td>Remaining Calories</td>\n    <td class="' + type + '">' + (goal - total) + '</td>\n  </tr>');
	};

	var createFoodInMeal = function createFoodInMeal(event) {
	  event.preventDefault();
	  var mealId = event.target.id.slice(-1);
	  $('#all-foods-diary tr').each(function (index, row) {
	    if (index != 0 && $(row).find(':checkbox:checked').length === 1) {
	      var foodId = parseInt(row.id);
	      postFoodToMeal(mealId, foodId);
	    }
	  });
	  $('input[type=checkbox]').prop('checked', false);
	};

	var postMealConfig = function postMealConfig() {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' }
	  };
	};

	var postFoodToMeal = function postFoodToMeal(mealId, foodId) {
	  fetch('http://quantifiedself-backend.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, postMealConfig()).then(function () {
	    return getAllMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var removeMealFood = function removeMealFood(event) {
	  var $tr = event.target.parentNode.parentNode;
	  var mealId = event.target.parentNode.parentNode.parentNode.parentNode.className.slice(-1);
	  $tr.remove();
	  deleteMealFood($tr.className, mealId);
	};

	var deleteMealFood = function deleteMealFood(foodId, mealId) {
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, { method: 'DELETE' }).then(function () {
	    return getAllMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var count = 0;

	var countIncrement = function countIncrement() {
	  count++;
	  if (count > 2) {
	    count = 0;
	  }
	  getAllFoodsDiary();
	};

	getAllFoodsValidation();
	getAllFoodsDiary();
	filterFoods();
	getAllMeals();

	$('#all-foods').on('focusout', removeInputField);
	$('#all-foods').on('click', 'tr td.name', createInputField);
	$('#all-foods').on('click', 'tr td.calories', createInputField);

	$('#add-food-btn').on('click', createFood);

	$('#all-foods-diary').on('click', '.sort', countIncrement);
	$('#all-meals').on('click', '.delete-mealFood', removeMealFood);
	$('#all-foods').on('click', '.delete-btn', removeFood);

	$('#meal-1').on('click', createFoodInMeal);
	$('#meal-2').on('click', createFoodInMeal);
	$('#meal-3').on('click', createFoodInMeal);
	$('#meal-4').on('click', createFoodInMeal);

/***/ })
/******/ ]);