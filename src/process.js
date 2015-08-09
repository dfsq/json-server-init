/**
 * Dispatch argumenst.
 */
module.exports = function(command, args) {

    switch(command) {

        case 'create':
        default:
            require('./create')(args.n);
            break;

        case 'collection':
            require('./collection')(args.n);
            break;
    }

};
