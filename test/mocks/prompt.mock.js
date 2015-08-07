/**
 * Mock prompt module all together.
 */
 module.exports = {

 	start: function() {},

 	get: function(config, callback) {

		var key = Object.keys(config.properties)[0],
 			response = {};

 		response[key] = this.__response;

 		setTimeout(function() {
 			callback(null, response);
 			// Let promises resolve before letting spec know that user "input" finished
 			setTimeout(this.__onEnter.bind(this), 200);
 		}.bind(this), 300);
 	},

 	// Not part of the original API, used to emulate usr input from specs
 	__response: null,

 	__onEnterCallbacks: [],

 	__enterCallback: function(callback) {
 		this.__onEnterCallbacks.push(callback);
 	},

 	__respondWith: function(input) {
 		this.__response = input;
 	},

 	__onEnter: function() {
 		while (this.__onEnterCallbacks) {
 			this.__onEnterCallbacks.shift()();
 		}
 	}
 };