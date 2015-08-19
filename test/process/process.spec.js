var proxyquire =  require('proxyquire'),
	expect = require("chai").expect,
	sinon = require('sinon'),
	mocks = {
		'./create': sinon.spy(),
		'./collection': sinon.spy()
	},
	cli = proxyquire('../../src/process', mocks);

describe('CLI options dispatching', function() {

	it('should proceed to "create" module for create command', function() {
		var stub = mocks['./create'];
		cli('create', {n: 'test.json'});
		expect(stub.calledWith('test.json')).to.be.ok;
	});

	it('should proceed to "collection" module for collection command', function() {
		var stub = mocks['./collection'];
		cli('collection', {n: 'test.json'});
		expect(stub.calledWith('test.json')).to.be.ok;
	});
});
