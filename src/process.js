/**
 * Dispatch argumenst.
 */
module.exports = function(args) {

	// Scaffold option, default
	if (args.s) {
		require('./scaffold')(args.s);
	}
	// Add new collection
	else if (args.c) {
		require('./collection')(args.c);
	}

};