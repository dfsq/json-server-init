var addCollection = require('./add-collection'),
	addAnother = require('./add-another'),
	writeJSON = require('./write-json');

/**
 * Initialize new JSON database.
 */
module.exports = function(dbName) {

	// Populate schema object
	var schema = {};

	(function ask() {
		addCollection(schema)
			.then(addAnother)
			.then(ask, writeJSON.bind(null, dbName))
			.then(function() {
				console.log('Scheme saved to ' + dbName);
			})
			.catch(function(err) {
				console.log('Error creating', dbName, err);
			});
	})();
};