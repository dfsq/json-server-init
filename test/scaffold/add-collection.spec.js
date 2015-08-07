var proxyquire =  require('proxyquire'),
	expect = require("chai").expect,
	sinon = require('sinon'),
	promptMock = require('../mocks/prompt.mock'),
	addCollection = proxyquire('../../src/scaffold/add-collection', {
		prompt: promptMock
	}),
	input = {
		collection: 'testing',
		fields: 'id:index, timestamp:time, status:boolean'
	};

describe('Add collection and fields', function() {

	var scheme;

	beforeEach(function() {

		scheme = {};

		promptMock.get = function(config, callback) {

			var key = Object.keys(config.properties)[0],
	 			response = {};

	 		response[key] = input[key];

	 		setTimeout(function() {
	 			callback(null, response);
	 		}, 500);
	 	};
	});

	it('should ask for collection name and default to 5 rows', function(done) {

		addCollection(scheme).then(function() {

			var expected = {testing: []};
			expected.testing.meta = {fields: {id: 'index', timestamp: 'time', status: 'boolean'}, rows: 5};

			expect(scheme).to.deep.equal(expected);
			done();
		});
	});
});