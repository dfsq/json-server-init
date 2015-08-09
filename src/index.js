var yargs = require('yargs'),
    updateNotifier = require('update-notifier'),
    process = require('./process'),
    pkg = require('../package.json');

module.exports = function() {

    updateNotifier({pkg: pkg}).notify();

    var argv = yargs
        .usage('$0 [options] <source>')
        .command('create', 'Create new JSON database.')
        .command('collection', 'Add new collection to existent database file.')
        .options({
            name: {
                alias: 'n',
                description: 'Name of the database JSON file to create/use.',
                default: 'db.json'
            }
        })
        .version(pkg.version, 'v', 'Show version number.').alias('version', 'v')
        .help('help').alias('help', 'h').describe('h', 'Show help.')
        .example('$0 create', 'Generate db.json file.')
        .example('$0 create -n dev.json', 'Generate dev.json file.')
        .epilog('Home page and docs: https://github.com/dfsq/json-server-init')
        .demand(1)
        .argv;

    process(argv._[0], argv);
};
