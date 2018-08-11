var topics = ["Ant-Man",
	"Aquaman",
	"Asterix",
	"The Atom",
	"The Avengers",
	"Batgirl",
	"Batman",
	"Batwoman",
	"Black Canary",
	"Black Panther",
	"Captain America",
	"Catwoman",
	"Conan the Barbarian",
	"Daredevil",
	"The Defenders",
	"Doc Savage",
	"Doctor Strange",
	"Elektra",
	"Fantastic Four",
	"Ghost Rider",
	"Green Arrow",
	"Green Lantern",
	"Guardians of the Galaxy",
	"Hawkeye",
	"Hellboy",
	"Incredible Hulk",
	"Iron Fist",
	"Iron Man",
	"Marvelman",
	"Robin",
	"The Rocketeer",
	"The Shadow",
	"Spider-Man",
	"Sub-Mariner",
	"Supergirl",
	"Superman",
	"Teenage Mutant Ninja Turtles",
	"The Wasp",
	"Watchmen",
	"Wolverine",
	"Wonder Woman",
	"X-Men",
	"Zatanna",
	"Zatara"]


// Initial array of topics
// var topics = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];



// Function for displaying topic data
function renderButtons() {

	// Deleting the topics prior to adding new topics
	// (this is necessary otherwise we will have repeat buttons)
	$("#buttons-view").empty();
	// Looping through the array of topics
	$.each(topics, function (index, value) {
		// console.log(index + ": " + value);
		var a = $("<button>");
		// Adding a class of topics to our button
		a.addClass("topic btn btn-dark col-lg-3");
		// Adding a data-attribute
		a.attr("data-name", value);
		// Providing the initial button text
		a.text(value);
		// Adding the button to the addbutton div
		$("#buttons-view").append(a);
	});
}


// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
	// Preventing the buttons default behavior when clicked (which is submitting a form)
	event.preventDefault();
	// This line grabs the input from the textbox
	var topic = $("#topic-input").val().trim();
	var topic = $("#topic-input").val().trim();
	if (topic !== "") {
		//Clear Search bar Topic
		$("#topic-input").val("");

		// Adding the topic from the textbox to our array
		topics.push(topic);
		// Calling renderButtons which handles the processing of our topic array
		renderButtons();
	}
});

// Function for displaying the topic info
// We're adding a click event listener to all elements with the class "topic"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".topics").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".topic", api_callBack);

// Calling the renderButtons function to display the intial buttons
renderButtons();







// Generic function for capturing the topic name from the data-attribute
function api_callBack() {



	var query = $(this).attr("data-name");
	alert(query);
	var apikey = "api_key=ZSOGW84tk3o5bG2qlXuywgLfM6S5mqxV";
	var queryURL = "http://api.giphy.com/v1/gifs/search?" + apikey + "&q=" + query + "&limit=1&offset=0&rating=G&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		results = response.data[0].title;
		console.log(results);

		// for (var i = 0; i < nResponse; i++) {
		// 	var newDiv = $("<div>");
		// 	var newNumber = $("<span>").addClass(".button");
		// 	newP.text(i + 1);

		// }
	});
}

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=$search&begin_date=$bDate&end_date=$eDate&limit=$responses&sort=newest&api_key=950ba3779f474d49aa1a605a55a6e151
