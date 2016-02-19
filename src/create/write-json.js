var fs = require('fs'),
    Promise = require('promise'),
    fetch = require('node-fetch');

if (!fetch.Promise) {
    fetch.Promise = Promise;
}

/**
 * Writes generated JSON into file.
 * @param dbName {String} Name of the file to create.
 * @param schema {Object} Populated object of collections.
 * @return {Promise}
 */
function writeJSON(dbName, schema) {

    var baseUrl = 'http://www.filltext.com/?',
        promises = [],
        collection;

    for (collection in schema) {

        var meta = schema[collection].meta,
            fields = meta.fields,
            url;

        url = Object.keys(fields).map(function(key) {
            if (fields[key][0] === '[' && fields[key].slice(-1) === ']') {
                return key + '=' + fields[key];
            }
            return key + '={' + fields[key] + '}';
        }).join('&') + '&rows=' + meta.rows;

        console.log('Url for', collection, url);

        (function(c) {
            promises.push(fetch(baseUrl + url).then(function(response) {
                return response.json();
            })
            .then(function(rows) {
                schema[c] = rows;
            }));
        })(collection);
    }

    return Promise.all(promises).then(function() {
        fs.writeFile(dbName, JSON.stringify(schema, null, 4), function(err) {
            if (err) {
                Promise.reject('Failed to save JSON file: ' + err);
            }
        });
    });
}

module.exports = writeJSON;
