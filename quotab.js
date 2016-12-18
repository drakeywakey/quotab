document.addEventListener('DOMContentLoaded', function () {
	getNewQuote();
	getWordOfTheDay();
});

function getNewQuote() {
	var author = document.getElementById('author');
	var quote = document.getElementById('quote');
	var request = new XMLHttpRequest();
	var response;
	var url  = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

	request.open('GET', url);

	request.onload = function () {
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

	request.send();
}

function getWordOfTheDay() {
	var lastRequestTime = localStorage.getItem('lastWordOfDayRequest');
	var request = new XMLHttpRequest();
	var response;
	// this isn't my api key, but they just left it hanging around on their website so...
	// I should only be calling this once a day anyway.
	var url = 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	var word = document.getElementById('word-of-day');
	var wordDef = document.getElementById('word-def');

	// if we've already pulled today's word of the day, it should be in localStorage -- no need to make the api call
	if (lastRequestTime && (new Date(lastRequestTime).getDay() === new Date().getDay())) {
		word.textContent = localStorage.getItem('wordOfDay');
		wordDef.textContent = localStorage.getItem('wordDef');
	}
	else {
		request.open('GET', url);

		request.onload = function () {
			response = JSON.parse(request.response);

			// Should I only be doing this on a successful response?
			// Should I just keep a single object in localStorage for all this junk?
			// plus I'm reusing response.word and the definition -- clean up to pull those into vars
			localStorage.setItem('lastWordOfDayRequest', new Date());
			localStorage.setItem('wordOfDay', response.word);
			localStorage.setItem('wordDef', response.definitions[0].text);

			word.textContent = response.word;
			wordDef.textContent = response.definitions[0].text;
		};

		request.send();
	}
}
