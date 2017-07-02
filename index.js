'use strict';

const Alexa = require('alexa-sdk');

const APP_ID='amzn1.ask.skill.51852cb4-6667-4e60-ad9b-36c8191635d5';

var alexa_score = 0, player_score = 0;

const handlers = {
	'LaunchRequest': function () {
		this.attributes.speechOutput='Welcome to Rock, Spock, Whatever Game. Please say your command';
		this.attributes.repromptSpeech = 'Please say your command';
		ths.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
	},

	'NewSpockGameIntent': function () {
		const itemSlot = this.event.request.intents.slot.Option;
		let itemName;
		if (itemSlot && itemSlot.value) {
			itemName = itemSlot.value.toLowerCase();
		}

		if (itemName == 'Thank you') {
			var dar = "Thanks for playing <break time=\"0.5s\"> Your final score is " +
				+ player_score + " and my final score is: " + alexa_score;
			alexa_score = 0;
			player_score = 0;
			this.emit(':tell', data);
		}
		else {
			var word = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
			var rand = Math.floor(Math.random()*5);
			var alexa_word = word[rand];
			var response = '';
			var rules = {
				rock: {
					lizard: 'Rock crushes lizard',
					scissors: 'Rock crushes scissors'
				},
				paper: {
					rock: 'Paper covers rock',
					spock: 'Paper disproves rock'
				},
				scissors: {
					paper: 'Scissor cuts paper',
					lizard: 'Scissor decapitates lizard'
				},
				lizard: {
					spock: 'Lizard poos on spock',
					paper: 'Lizard eats paper'
				},
				spock: {
					scissors: 'Spock smashes scissors',
					rock: 'Spock vaporizes rock'
				}
			};

			if (itemName == alex_word) {
				response = "Hey! I guess it's a tie!";
			}
			else if (word.indexOf(itemName) == -1) {
				response = itemName + " is not a valid option";
			}
			else {
				response = (alex_word in rules[itemName])
					? (player_score++, riles[itemName][alex_word] + "<break time=\"0.5s\"/> I guess you won this time")
					: (alexa_score++, riles[alex_word][itemName] + "<break time=\"0.5s\"/> looks like I won");
			}

			this.attributes.speechOutput = response;
			this.attributes.repromptSpeech = "Let's play again. Say a command";
			this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
		}
	}
};

exports.handler = function(event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};