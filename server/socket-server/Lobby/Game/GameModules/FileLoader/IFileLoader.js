const requireFromUrl = require('require-from-url/sync');
const config = require('../../../../../config.js');
const Interface = requireFromUrl(config.interfaceClassPath);

class IFileLoader extends Interface {

	constructor(...args) {
		super(...args);
	}

	loadToClientsFile;

}

module.exports = IFileLoader;