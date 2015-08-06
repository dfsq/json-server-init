/**
 * Mock prompt module all together.
 */
 module.exports = {

 	start: function() {},

 	get: function(config, callback) {
 		console.log('TEST prompt');
 	},

 	// Not part of the original prompt API, for testing purposes
 	__emulateInput: function(input) {

 	}
 };