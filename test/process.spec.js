var proxyquire =  require('proxyquire'),
	expect = require("chai").expect,
	sinon = require('sinon'),
	mocks = {
		'./scaffold': sinon.spy(),
		'./collection': sinon.spy()
	},
	cli = proxyquire('../src/process', mocks);

describe('CLI options dispatching', function() {

	it('should proceed to scaffold module for -s, --scaffold option', function() {
		var stub = mocks['./scaffold'];
		cli({s: 'test.json'});
		expect(stub.calledWith('test.json')).to.be.ok;
	});

	it('should proceed to collection module for -c, --collection option', function() {
		var stub = mocks['./collection'];
		cli({c: 'posts'});
		expect(stub.called).to.be.true;
	});
});