const GameModule = require('../GameModule');
const PackReader = require('./PackReader/PackReader');

class PackController extends GameModule {
	contructor(lobby, game, package_)
	{
		super(lobby, game);
		this.package = package_;
	}

	getPackageTemplate() {
		var template_ = new Array();

		for (var i = 0; i < this.package.roundList.length; i++) {

			template_[i] = new Array();

			for (var j = 0; j < this.package.roundList.themeList.length; j++) {

				template_[i][j] = new Array();

				for (var k = 0; k < this.package.roundList.themeList.questionList.length; k++) {

					template_[i][j][k] = null;

				}
			}
		}

		return template_;
	}

	getRandomQuestion(questionCheckList, roundIndex) {
		var countOfUnusedQuestions = 0;
		var themeList = this.package.roundList[roundIndex];

		//counting unused questions
		questionCheckList.forEach( item => item.forEach( item => /*short if-else*/!item ? countOfUnusedQuestions++ : null));

		var index = parseInt( Math.random() * countOfUnusedQuestions );
		var count = 0;

		for (var i = 0; i < questionCheckList.length; i++)
			for (var j = 0; j < questionCheckList[i].length; j++) {
				if (count === index)
					return themeList[i].questionList[j];

				if (!questionCheckList[i][j])
					count++;
			}
	}

	getRoundIndex(roundSrc) {
		return this.package.roundList.indexOf(roundSrc);
	}

	getThemeIndex(themeSrc) {
		return themeSrc.round.themeList.indexOf(themeSrc);
	}

	getQuestionIndex(questionSrc) {
		return questionSrc.theme.questionList.indexOf(questionSrc);
	}

	getRoundLocation(roundSrc) {
		for (var roundIndex = 0, round_ = this.package.roundList[0]; roundIndex < this.package.roundList.length; roundIndex++, round_ = this.package.roundList[roundIndex])
			if (roundSrc === round_)
				return {
					roundIndex
				};

		return null;
	}

	getThemeLocation(themeSrc) {
		for (var roundIndex = 0, round_ = this.package.roundList[0]; roundIndex < this.package.roundList.length; roundIndex++, round_ = this.package.roundList[roundIndex])
			for (var themeIndex = 0, theme_ = round_.themeList[0]; themeIndex < round_.themeList.length; themeIndex++, theme_ = round_.themeList[themeIndex])
				if (themeSrc === theme_)
					return {
						roundIndex,
						themeIndex
					};

		return null;
	}

	getQuestionLocation(questionSrc) {
		for (var roundIndex = 0, round_ = this.package.roundList[0]; roundIndex < this.package.roundList.length; roundIndex++, round_ = this.package.roundList[roundIndex])
			for (var themeIndex = 0, theme_ = round_.themeList[0]; themeIndex < round_.themeList.length; themeIndex++, theme_ = round_.themeList[themeIndex])
				for (var questionIndex = 0, question_ = theme_.questionList[0]; questionIndex < theme_.questionList.length; questionIndex++, question_ = theme_.questionList[questionIndex])
					if (questionSrc === question_)
						return {
							roundIndex,
							themeIndex,
							questionIndex
						};

		return null;
	}

	getItemByIndexes(roundIndex, themeIndex, questionIndex) {
		return this.getItemByLocation({
			roundIndex,
			themeIndex,
			questionIndex
		});
	}

	getItemByLocation(location_) {
		var { roundIndex, themeIndex, questionIndex } = location_;

		if (questionIndex)
			return this.package.roundList[roundIndex].themeList[themeIndex].questionList[questionIndex];

		if (themeIndex)
			return this.package.roundList[roundIndex].themeList[themeIndex];

		if (roundIndex)
			return this.package.roundList[roundIndex];

		return null;
	}
}

module.exports = PackController;