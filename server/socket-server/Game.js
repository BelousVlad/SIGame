const fs = require('fs'),
	  parseStringToXML = require('xml2js').parseString,
	  Timer = require('../experimental_code.js')

class Question{
	constructor( theme, index ){
		this.theme = theme;
		this.index = index;
	}
}

class Game {
	constructor(lobby) {
		this.lobby = lobby;
		this.packFolder = lobby.packFolder;
		this.rules = lobby.rules || new Object();
		var defaultRules = {
			answerTimeAwait : 2e3 /* 2sec */,
			//
		}
		for ( let i in defaultRules )
			this.rules[i] = typeof this.rules[i] === 'undefined' ? defaultRules[i] : this.rules[i];

		parseStringToXML(fs.readFileSync( this.packFolder + '/content.xml' ), function( err, json ) {
			this.lobby.host.send('ping', json )
			this.package = json.package;
			this.rounds = this.package.rounds[0];
		}.bind(this));

		this.current = {
			round : this.rounds.round[0],
			question : undefined
		}
	}

	checkQuestion( question, client ) {

		question = this.getQuestion( question );
		if ( !question )
			return;
		this.current.question = question;
		question.checked = true;
		let waitingForClients = Object.keys( this.lobby.clients ).length;

		function clientReady() {
			waitingForClients--;
			if ( waitingForClients <= 0 )
				this.displayQuestion();
		}
		clientReady = clientReady.bind(this);

		for ( let i in this.lobby.clients ) {
			this.lobby.clients[i].once( 'question_received', clientReady );
			this.lobby.clients[i].once( 'client_leave', clientReady );
		}

		setTimeout( this.rules.answerTimeAwait /* 5sec */, function() {
			if ( waitingForClients ) {
				this.displayQuestion();
				// 'cant run coz players havnt files';
			}
		})
	}

	selectRound( roundIndex ) {
		this.current.round = roundIndex;
		this.update();
	}

	reloadCurrentRound() {
		this.current.round.themes.forEach( item => {
			item.questions.forEach( item_ => {
				item_.checked = false;
			})
		})
	}

	hasQuestion(question) {
		return !!this.getQuestion( question );
	}

	getQuestion(question) {
		let theme = this.current.round.themes.find( item => {
			return item.$.name === question.theme;
		})
		return theme.questions[ question.index ];
	}

	nextRound() {
		let index = this.rounds.round.indexOf( this.current.round );

		if ( index + 1 >= this.rounds.round.length )
			return

		this.current.round = this.rounds.round[index + 1];
	}

	previousRound() {
		let index = this.rounds.round.indexOf( this.current.round );

		if ( index <= 0 )
			return

		this.current.round = this.rounds.round[index - 1];
	}

	displayQuestion() {
		console.log( this.current.question );
	}
}




class Game1 {

	static defaultState = {
		//
	}

	constructor() {
		this.initalize();

	}

	initilize() {
		this.initState();
		this.initEvents();
		this.timer = new Timer(this);
		this.state = Game1.defaultState;
		this.waitForRoundLoad();
	}

	initActions() {
		this['round_load_end'] = function(from_who, data, /*optional*/, to_who /*receiver*/) {
			//
		}
		this['player_select_question'] = function(from_who, data, /*optional*/, to_who /*receiver*/) {
			//
		}
		//...
	}

	initEvents() {
		this.waitForRoundLoad = function() {
			// MODIFY
			this.state;
			this.timer.addTimer( function(){/* do if each players doesn't unser doNextStage()*/}, this.configuration.timeToWaitRoundLoad )
			funciton collectUserInputs() {
				players = this.lobby.playersCount;
				this.onUserPackLoadEnd = function() {
					players--;
					if (players === 0) {
						this.timer.removeTimer(/*certain id*/);
						this.waitForPlayerQuestion()
					}
				}
			}
		}
		this.waitForPlayerQuestion = function() {
			//MODIFY
			this.state;
			this.t
		}
	}
}

module.exports = Game;

