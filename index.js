'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.b10d250d-4358-466a-a9b2-4fd5a28db0bb';

var alexa_score = 0, player_score = 0;
const handlers = {
	'LaunchRequest': function () {
		this.attributes.speechOutput='Welcome to Rock, Spock, Whatever Game. Please say your command';
		this.attributes.repromptSpeech = 'bytch? command please?';
		this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
	},
	
	
	'NewSpockGameIntent': function () {
		const itemSlot = this.event.request.intent.slots.Option;
		let itemName;
		if (itemSlot && itemSlot.value) {
			itemName = itemSlot.value.toLowerCase();
		}

		if (itemName == 'thank you') {
			var data = "Quitting is for losers <break time=\"0.5s\"/> Your final score is " + player_score + " and my final score is: " + alexa_score;
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
					spock: 'Lizard poisons spock',
					paper: 'Lizard eats paper'
				},
				spock: {
					scissors: 'Spock smashes scissors',
					rock: 'Spock vaporizes rock'
				}
			};

			if (itemName == alexa_word) {
				response = "Stale mate bra? I guess it's a tie";
			}
			else if (word.indexOf(itemName) == -1) {
				response = itemName + " is not a valid option";
			}
			else {
				response = (alexa_word in rules[itemName])
					? (player_score++, rules[itemName][alexa_word] + "<break time=\"0.5s\"/> Duude. you won")
					: (alexa_score++, rules[alexa_word][itemName] + "<break time=\"0.5s\"/> looks like I won");
			}

			this.attributes.speechOutput = response;
			this.attributes.repromptSpeech = "Say a command";
			this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
		}
	}
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
