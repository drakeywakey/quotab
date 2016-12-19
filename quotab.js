document.addEventListener('DOMContentLoaded', function () {
	getNewQuote();
	getWordOfTheDay();
});

function getNewQuote() {
	var author = document.getElementById('author');
	var callback;
	var quote = document.getElementById('quote');
	var url  = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

	callback = function (request) {
		try {
			// remove all \ from the string -- I can't imagine the quote will need the \,
			// and their choice of \' messes with the JSON.parse.
			response = JSON.parse(request.response.replace(/[\\]/g, ''));
			quote.textContent = response.quoteText;
			author.textContent = response.quoteAuthor ? '--' + response.quoteAuthor : '';
		}
		catch (ex) {
			quote.textContent = 'Sorry, looks like I couldn\'t retrieve a new quote';
		}
	};

	makeRequest(url, callback);
}

function getWordOfTheDay() {
	var callback;
	var lastRequestTime = localStorage.getItem('lastWordOfDayRequest');
	// this isn't my api key, but they just left it hanging around on their website so...
	// I should only be calling this once a day anyway.
	var url = 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	var word;
	var wordDef;
	var wordElement = document.getElementById('word-of-day');
	var wordDefElement = document.getElementById('word-def');

	// if we've already pulled today's word of the day, it should be in localStorage -- no need to make the api call
	if (lastRequestTime && (new Date(lastRequestTime).getDay() === new Date().getDay())) {
		wordElement.textContent = localStorage.getItem('wordOfDay');
		wordDefElement.textContent = localStorage.getItem('wordDef');
	}
	else {
		callback = function (request) {
			response = JSON.parse(request.response);
			word = response.word;
			wordDef = response.definitions[0].text;

			// Should I just keep a single object in localStorage for all this junk?
			localStorage.setItem('lastWordOfDayRequest', new Date());
			localStorage.setItem('wordOfDay', word);
			localStorage.setItem('wordDef', wordDef);

			word.textContent = word;
			wordDef.textContent = wordDef;
		};

		makeRequest(url, callback);
	}
}

function makeRequest(url, xhrCallback) {
	var request = new XMLHttpRequest();
	var response;

	request.open('GET', url);

	request.onload = xhrCallback.bind(this, request);

	request.send();
}
