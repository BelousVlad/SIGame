const path = require('path');
const fs = require('fs');
const config = require( '../../config.js' );
const helper = require(config.helperClassPath);
const ClientManager = require('../../socket-server/ClientManager');
const LobbyManager = require('../../socket-server/LobbyManager');



class MainController{
	html(request, response) {

		let url = (request.url).split('?')[0];
		let extname = path.extname(url);

		let path_ = path.join( config.rootPath , 'public', url);
		if ( extname == '' )
			path_ = path.join(path_, 'main.html');

		helper.getContent(path_)
		.then((data) => {
			response.end(data)
		})
	}

	main(request, response)
	{
		let cookies = helper.parseCookies(request);

		let client = ClientManager.getClient(cookies.key);

		let path_ = config.mainPagePath;

		helper.getContent(path_)
		.then((data) => {
			response.write("main");
			response.end(data)
		})
	}

	name(request, response)
	{
		let path_ = 'technical pages/login.html';

		helper.getContent(path_)
		.then((data) => {
			response.end(data)
		})
	}

	create_lobby(request, response)
	{
		let path_ = 'public/lobby/create_lobby.html';

		helper.getContent(path_)
		.then((data) => {
			response.end(data)
		})
	}
	/* Хуйня
	create_lobby_input(request, response)
	{
		let cookies = helper.parseCookies(request);

		let client = ClientManager.getClient(cookies.key);

		if (client)
		{
			let data = '';
			request.on('data', (chunk) => {
				data += chunk;
			});
			request.on('end', () => {
				let post = helper.parseChunk(data);

				let lobby = ClientManager.create_lobby

			});

		}
	}
	*/
	send( req, res ){
		let url = (req.url).split('?')[0];
		let path_ = path.join( config.rootPath , 'public', url);
		fs.readFile( path_, 'utf-8', ( err, data ) => {
			if (err){
				fs.readFile( config.errorPagePath, 'utf-8', (err, data) => {
					if (err){
						res.end('No way man =(.');
					} else {
						res.end(data);
					}
				})
			} else {
				res.end(data);
			}
		})
	}

	upload_pack ( req, res ) {
		const form = formidable({
			uploadDir : config.packDirPath,
			maxFileSize : 200e6, //  ~200mb
			keepExtensions : true,
			multiple : false,
		});

		form.parse( req, ( err, fields file ) => {
			if ( err )
				return

			LobbyManager.isPlayerIntoLobby( req.data.clientKey ).filePath = file;
		} );
	}

	upload_avatar ( req, res ) {
		//
	}
}

module.exports = new MainController();