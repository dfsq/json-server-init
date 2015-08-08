var proxyquire =  require('proxyquire'),
	expect = require("chai").expect,
	promptMock = require('../mocks/prompt.mock'),
	addCollection = proxyquire('../../src/scaffold/add-collection', {
		prompt: promptMock
	});

describe('Add collection and fields', function() {

	var schema;

	beforeEach(function() {
		schema = {};
	});

	it('should ask for collection name and default to 5 rows', function() {

		promptMock.__prepareInput({
			collection: 'testing',
			fields: 'id:index, timestamp:time, status:boolean'
		});

		return addCollection(schema).then(function(response) {

			var expected = {testing: []};
			expected.testing.meta = {fields: {id: 'index', timestamp: 'time', status: 'boolean'}, rows: 5};

			expect(response).to.deep.equal(expected);
		})
	});
});
