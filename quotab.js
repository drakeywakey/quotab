document.addEventListener('DOMContentLoaded', function () {
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
});
