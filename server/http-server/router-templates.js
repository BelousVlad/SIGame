const path = require('path')

module.exports =
{
	'mainController/get' : ( req ) => {
		return req.url === '/api/upload/pack' && req.method.toLowerCase() === 'post';
	},
	'mainController/name' : ( req ) => {

        let cookies = helper.parseCookies(req);

        let client = ClientManager.getClient(cookies.key);

        return !(client && client.name);
    },

	'mainController/send' : ( req ) => {
		let url = (req.url).split('?')[0];
		let extname = path.extname(url);
		switch ( extname ) {
			case '.css' : { return true;}
			case '.js' : { return true;}
			case '.ico' : { return true;}
			default : { return false;}
		}

	},

	// 'file/html' : ( req ) => { return true; },
	'mainController/main' : '.*',
};