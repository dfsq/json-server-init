var yargs = require('yargs'),
    process = require('./process');

module.exports = function() {

    var argv = yargs
    .usage('$0 [options] <source>')
    .options({
        scaffold: {
            alias: 's',
            description: 'Create JSON database with specified name.'
        },
        collection: {
            alias: 'c',
            description: 'Add new collection to existent scheme file.'
        }
    })
    .help('help').alias('help', 'h').describe('h', 'Show help.')
    .example("$0 -s dev.json", "Generate dev.json file.")
    .epilog('Home page and docs: https://github.com/dfsq/json-server-init')
    .argv;

    if (typeof argv.s === 'boolean') {
        argv.s = 'db.json';
    }

    process(argv);

};