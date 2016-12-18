document.addEventListener('DOMContentLoaded', function () {
	var author = document.getElementById('author');
	var quote = document.getElementById('quote');
	var request = new XMLHttpRequest();
	var response;
	var url  = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

	request.open('GET', url);

	request.onload = function () {
		try {
			response = request.response;
			responseJson = JSON.parse(response);
			quote.textContent = responseJson.quoteText;
			author.textContent = responseJson.quoteAuthor ? '--' + responseJson.quoteAuthor : '';
		}
		catch (ex) {
			quote.textContent = 'Sorry, looks like I couldn\'t retrieve a new quote';
		}
	};

	request.send();
});
