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
		a.addClass("topic top-buffer btn btn-dark col-lg-3");
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
	event.preventDefault();
	var q = $(this).attr("data-name");
	var limit = 1;
	var rating = "G";
	var apikey = "api_key=ZSOGW84tk3o5bG2qlXuywgLfM6S5mqxV";
	var queryURL = "https://api.giphy.com/v1/gifs/search?" + apikey + "&q=" + q + "&limit=" + limit + "&offset=0&rating=" + rating + "&lang=en";
	 console.log(queryURL);
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
				var topicDIV = $("<p>");
				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + results[index].rating);

				var topicImage = $("<img>");
				topicImage.addClass("gif");

				topicImage.attr("src", results[index].images.fixed_height_still.url);
				topicImage.attr("data-still", results[index].images.fixed_height_still.url);
				topicImage.attr("data-animate", results[index].images.fixed_height.url);
				topicImage.attr("data-state", "still");
				topicDIV.append(p);
				topicDIV.append(topicImage);
				$("#view-giphy").prepend(topicDIV);
			});

		});
}

$(document).on("click", ".gif", animate);

function animate() {
	$(".gif").on("click", function () {
		// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
		var state = $(this).attr("data-state");
		// If the clicked image's state is still, update its src attribute to what its data-animate value is.
		// Then, set the image's data-state to animate
		// Else set src to the data-still value
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

}