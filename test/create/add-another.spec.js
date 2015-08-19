var proxyquire =  require('proxyquire'),
	expect = require('chai').expect,
	promptMock = require('../mocks/prompt.mock'),
	addAnother = proxyquire('../../src/create/add-another', {
		prompt: promptMock
	});

describe('Add another collection', function() {

	var schema;

	beforeEach(function() {
		schema = {};
	});

	it('should resolve promise with answer "true" if "y" was entered', function() {
		promptMock.__prepareInput({another: 'y'});
		return addAnother(schema).then(function(response) {
            expect(response.answer).to.be.true;
            expect(response.schema).to.be.equal(schema);
		});
	});

	it('should resolve promise with answer "false" if "n" was entered', function() {
		promptMock.__prepareInput({another: 'n'});
		return addAnother(schema).then(function(response) {
            expect(response.answer).to.be.false;
			expect(response.schema).to.be.equal(schema);
		});
	});

});
