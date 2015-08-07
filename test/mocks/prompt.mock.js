/**
 * Mock prompt module all together.
 */
 module.exports = {

 	start: function() {},

 	get: function(config, callback) {

		var key = Object.keys(config.properties)[0],
 			response = {};

 		response[key] = this.__input[key];

 		setTimeout(function() {
 			callback(null, response);
 		}, 200);
 	},

 	__prepareInput: function(input) {
 		this.__input = input;
 	}

 };