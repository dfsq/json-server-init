var addCollection = require('./add-collection'),
    addAnother = require('./add-another'),
    writeJSON = require('./write-json');

/**
 * Initialize new JSON database.
 */
module.exports = function(dbName) {

    // Populate schema object
    var schema = {};

    function ask(s) {
        return addCollection(s)
            .then(addAnother)
            .then(function(response) {
                return response.answer ? ask(response.schema) : writeJSON(dbName, response.schema);
            });
    }

    return ask(schema).then(function() {
        console.log('%s saved.'.green, dbName);
    }, function(err) {
        var message = 'something went wrong..';
        console.log('%s not saved: %s', dbName, (err.message || message).red);
    });
};
