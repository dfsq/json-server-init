var prompt = require('prompt'),
    Promise = require('promise');

/**
 * Prompt to ask if another collection should be added to schema.
 * @return {Promise}
 */
function addAnother(schema) {

    var config = {
        properties: {
            another: {
                description: 'Add another collection? (y/n)'.magenta
            }
        }
    };

    prompt.start();
    prompt.message = ' > ';
    prompt.delimiter = '';

    return new Promise(function(resolve, reject) {
        prompt.get(config, function(err, result) {

            if (err) return reject(err);

            switch (result.another.toLowerCase()) {
                case 'n':
                    return resolve({
                        answer: false,
                        schema: schema
                    });
                case 'y':
                default:
                    return resolve({
                        answer: true,
                        schema: schema
                    });
            }
        });
    });
}

module.exports = addAnother;
