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

	var getAllFoods = function getAllFoods() {
	  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>');
	  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (foods) {
	    return getEachFood(foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getEachFood = function getEachFood(foods) {
	  var sortedFoods = foods.sort(function (a, b) {
	    if (a.id > b.id) {
	      return -1;
	    } else {
	      return 1;
	    }
	  });
	  sortedFoods.forEach(function (food) {
	    $('#all-foods').append('<tr>\n        <td>' + food.name + '</td>\n        <td>' + food.calories + '</td>\n        <td><button id="' + food.id + '" class="delete-btn" aria-label="Delete">\n          Delete\n        </button></td>\n      </tr>');
	  });
	};

	var removeFood = function removeFood(event) {
	  event.target.parentNode.parentNode.remove();
	  deleteFood(event.target.id);
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

	  postFood({ name: name, calories: calories });
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
	    return response.json();
	  }).then(function () {
	    return getAllFoods();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	getAllFoods();

	$('#add-food-btn').on('click', createFood);

	$('#all-foods').on('click', '.delete-btn', removeFood);

/***/ })
/******/ ]);