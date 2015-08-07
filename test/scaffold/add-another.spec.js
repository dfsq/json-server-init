var proxyquire =  require('proxyquire'),
	expect = require('chai').expect,
	sinon = require('sinon'),
	promptMock = require('../mocks/prompt.mock'),
	addAnother = proxyquire('../../src/scaffold/add-another', {
		prompt: promptMock
	});

describe('Add another collection', function() {

	var scheme,
		promise, promiseStatus;

	beforeEach(function() {
		scheme = {};
	});

	it('should resolve promise (proceed to new collection dialog) if "y" was entered', function(done) {

		promptMock.__respondWith('y');
		promptMock.__enterCallback(function() {
			expect(promiseStatus).to.be.true;
			done();
		});

		// TODO: chai-as-promise?
		promise = addAnother(scheme).then(function() {
			promiseStatus = true;
		}, function() {
			promiseStatus = false;
		});
	});
});