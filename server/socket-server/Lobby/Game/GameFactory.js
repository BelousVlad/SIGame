const BasicFileLoader = require('./GameModules/FileLoader/BasicFileLoader');
const BasicConductor = require('./GameModules/Conductor/BasicConductor');
const BasicQuestionPutter = require('./GameModules/QuestionPutter/BasicQuestionPutter');
const Game = require('./Game');

class GameFactory {

	static createInstance()
	{
		return new GameFactory();
	}

	createGame(config, lobby)
	{
		//TODO процесс сборки игры
		let game = new Game();
		let file_module = new BasicFileLoader(lobby);
		game.setFileLoaderModule(file_module);
		game.conductor = new BasicConductor(lobby, game);
		game.question_putter = new BasicQuestionPutter(lobby, game);

		return game;
	}

}

module.exports = GameFactory;