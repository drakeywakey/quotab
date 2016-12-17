document.addEventListener('DOMContentLoaded', function () {
	var author = document.getElementById('author');
	var quote = document.getElementById('quote');
	var request = new XMLHttpRequest();
	var response;
	var url  = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

	request.open('GET', url);

	request.onload = function () {
		response = JSON.parse(request.response);
		quote.textContent = response.quoteText;
		author.textContent = response.quoteAuthor;
	};

	request.send();
});
