var proxyquire =  require('proxyquire'),
	expect = require("chai").expect,
	promptMock = require('../mocks/prompt.mock'),
	addCollection = proxyquire('../../src/create/add-collection', {
		prompt: promptMock
	});

function prepareInput(fields) {
    promptMock.__prepareInput({
        collection: 'testing',
        fields: fields
    });
}

function getExpected(fields) {
    var expected = {testing: []};
    expected.testing.meta = {fields: fields, rows: 5};
    return expected;
}

describe('Add collection and fields', function() {

	it('should ask for collection name and default to 5 rows', function() {
        prepareInput('id:index');
		return addCollection({}).then(function(response) {
            var expected = getExpected({id: 'index'});
			expect(response).to.deep.equal(expected);
		});
	});

    describe('Parse fields input', function() {

        it('should support brackets for options', function() {
            prepareInput('id:index, sex:["Male", "Female"], name:firstName');
            return addCollection({}).then(function(response) {
                var expected = getExpected({id: 'index', sex: '["Male", "Female"]', name: 'firstName'});
                expect(response).to.deep.equal(expected);
            });
        });

    it('should support ~ concatenation sign', function() {
            prepareInput('id:index, name:firstName+lastName, age:number');
            return addCollection({}).then(function(response) {
                var expected = getExpected({id: 'index', name: 'firstName}~{lastName', age: 'number'});
                expect(response).to.deep.equal(expected);
            });
        });
    });
});
