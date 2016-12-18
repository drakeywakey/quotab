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
	var request = new XMLHttpRequest();
	var response;
	var url = 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	var word = document.getElementById('word-of-day');
	var wordDef = document.getElementById('word-def');

	request.open('GET', url);

	request.onload = function () {
		response = JSON.parse(request.response);
		word.textContent = response.word;
		wordDef.textContent = response.definitions[0].text;
	};

	request.send();
}
