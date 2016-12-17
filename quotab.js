document.addEventListener('DOMContentLoaded', function () {
	var quote = document.querySelector('h3');
	var author = document.querySelector('p');
	//container.textContent = 'Well, here we are!';

	var request = new XMLHttpRequest();
	var url  = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
	request.open('GET', url);

	request.onload = function () {
		var response = JSON.parse(request.response);
		quote.textContent = response.quoteText;
		author.textContent = response.quoteAuthor;
	};

	request.send();
});
