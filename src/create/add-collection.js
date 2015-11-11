var prompt = require('prompt'),
    Promise = require('promise'),
    DEFAULT_ROWS = 5,
    FIELDS_REGEXP = /(\w+:(?:[\w.|\+]|(?:,(?!\s)|(?:\[["\w,\s]+\]))|(?:\[.*?\])|(?:,\s*\w*?\]))+)/g;

/**
 * Prompt for collection name.
 * @return {Promise}
 */
function getCollection() {

    var config = {
        properties: {
            collection: {
                description: 'Collection name and number of rows, 5 if omitted (ex: posts 10): '.magenta,
                type: 'string',
                required: true
            }
        }
    };

    prompt.start();
    prompt.message = ' > ';
    prompt.delimiter = '';

    return new Promise(function(resolve, reject) {
        prompt.get(config, function(err, result) {
            if (err) return reject(err);
            return resolve(result.collection);
        });
    });
}

/**
 * Prompt for collection fields.
 * @return {Promise}
 */
function getFields(collection) {

    var message = 'What fields should "' + collection + '" have?\n',
        config;

    config = {
        properties: {
            fields: {
                description: message.magenta +
                '   Comma-separated fieldname:fieldtype pairs (ex: id:index, username:username)\n'.grey,
                type: 'string',
                required: true,
                pattern: FIELDS_REGEXP
            }
        }
    };

    prompt.start();
    prompt.message = '   >> ';
    prompt.delimiter = '';

    return new Promise(function(resolve, reject) {
        prompt.get(config, function(err, result) {
            if (err) return reject(err);
            return resolve(result.fields);
        });
    }).then(function(input) {
        return (input.match(FIELDS_REGEXP) || []).reduce(function(prev, curr) {
            var parts = curr.split(':');
            prev[parts[0]] = parts[1].replace(/\+/g, '}~{'); // with "+" also support name={fistName}~{lastName} concatenations
            return prev;
        }, {});
    });
}

/**
 * Prompt to enter collection name (and optionaly number of words).
 * @param {Object} schema
 * @return {Promise}
 */
function addCollection(schema) {

    return getCollection().then(function(nameRows) {

        var info = nameRows.trim().split(/\s+/),
            name = info[0],
            rows = info[1] || DEFAULT_ROWS;

        schema[name] = [];

        return getFields(name).then(function(fields) {
            schema[name].meta = {
                fields: fields,
                rows: rows
            };
            return schema;
        });
    });
}

module.exports = addCollection;
