var prompt = require('prompt'),
	Promise = require('promise'),
	DEFAULT_ROWS = 5;

/**
 * Prompt for collection name.
 * @return {Promise}
 */
function getCollection() {

	var config = {
		properties: {
			collection: {
				description: 'Collection name and number of rows, 5 if omited (ex: posts 10): '.magenta,
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
				description:
					message.magenta +
					'   Comma-separated pairs fieldname:fieldtype (ex: id:number, username:username)\n'.grey,
				type: 'string',
				required: true,
				pattern: /(\w+:\w+)/
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
	})
	.then(function(input) {
		return (input.match(/(\w+:\w+)/g) || []).reduce(function(prev, curr) {
			var parts = curr.split(':');
			prev[parts[0]] = parts[1];
			return prev;
		}, {});
	});
}

/**
 * Prompt to enter collection name (and optionaly number of words).
 * @return {Promise}
 */
module.exports = function(schema) {

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
};