var proxyquire =  require('proxyquire'),
	expect = require('chai').expect,
	sinon = require('sinon'),
	promptMock = require('../mocks/prompt.mock'),
	addAnother = proxyquire('../../src/scaffold/add-another', {
		prompt: promptMock
	});

describe('Add another collection', function() {

	var scheme;

	beforeEach(function() {
		scheme = {};
	});

	it('should resolve promise (proceed to new collection dialog) if "y" was entered', function() {
		promptMock.__prepareInput({another: 'y'});
		return addAnother(scheme).then(function(response) {
			expect(response).to.be.equal(scheme);
		});
	});

	it('should reject promise if "n" was entered', function() {
		promptMock.__prepareInput({another: 'n'});
		return addAnother(scheme).then(function() {
			throw new Error('unexpected fulfillment');
		}, function(response) {
			expect(response).to.be.equal(scheme);
		});
	});

});
