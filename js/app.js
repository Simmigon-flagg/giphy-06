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


$(document).on("click", ".topic", api_callBack);

// Calling the renderButtons function to display the intial buttons
renderButtons();


// Generic function for capturing the topic name from the data-attribute
function api_callBack() {

	var query = $(this).attr("data-name");
	// alert(query);
	var apikey = "api_key=ZSOGW84tk3o5bG2qlXuywgLfM6S5mqxV";
	var queryURL = "http://api.giphy.com/v1/gifs/search?" + apikey + "&q=" + query + "&limit=1&offset=0&rating=G&lang=en";

	// Performing an AJAX request with the queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// After data comes back from the request
		.then(function (response) {
			// console.log(queryURL);
			// storing the data from the AJAX request in the results variable
			var results = response.data;
			$.each(results, function (index, value) {
				// console.log(index + ": " + value);
				var topicDIV = $("<div>");
				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + results[index].rating);
				
				// Creating and storing an image tag
				var topicImage = $("<img>");

				// // Setting the src attribute of the image to a property pulled off the result item
				topicImage.attr("src", results[index].images.fixed_height.url);

				// Appending the paragraph and image tag to the topicDIV
				topicDIV.append(p);
			    topicDIV.append(topicImage);

				// Prependng the topicDIV to the HTML page in the "#gifs-appear-here" div
				 $("#view-giphy").prepend(topicDIV);

			});
		});

}
