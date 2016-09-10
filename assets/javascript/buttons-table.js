//Add attribution specified in GIPHY's GitHub page

var apiKey = "dc6zaTOxFJmzC";
var topics = ["Captain Kirk","Spock","Bones McCoy","Captain Janeway","Seven of Nine","Captain Picard","Borg","Worf","Quark","Benjamin Sisko","Garak","Jonathan Archer"];

refreshButtons();
$(document).on('click', ".GIFButton", showTenGifs);

function refreshButtons() {
$("#trekButtons").empty();
$("#textToWrite").val("");
for (i=0;i<topics.length;i++) {
	var topicButton = $("<button>");
	topicButton.attr("class","GIFButton center-block");
	topicButton.attr("data-name", topics[i]);
	topicButton.html("<h3>" + topics[i] + "</h3>");
	$("#trekButtons").append(topicButton);
}

$(".GIFButton").hover(function() {
	$(this).css("background-color","yellow");
}, function() {
	$(this).css("background-color","#dddddd");
}
);

}

$('#addTopic').on('click', function(){
	var newTopic = $('#textToWrite').val().trim();
	if (newTopic != "") {
		topics.push(newTopic);
		refreshButtons();
		return false;
	}
});

function showTenGifs() {
	var character = $(this).data('name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + apiKey + "&limit=10";
	$.ajax({url: queryURL,method: 'GET'}).done(function(theObject) {
		var content = theObject.data;
		for (j=0;j<content.length;j++) {
			$("#cell"+j).empty();
			var animatedImg = content[j].images.original.url;
			var stillImg = content[j].images.original_still.url;
			var rating = content[j].rating;
				if (rating == "") {
					rating = "NONE";
				}
			var item = $("<div>");
			item.attr("class","imageSpace");
			var gifSpace = $("<div>");
			gifSpace.attr("class","animToggle");
			gifSpace.attr("data-still",stillImg).attr("data-anim",animatedImg);
			gifSpace.html("<img src = \"" + stillImg + "\"/>");
			var divBreak = $("<br>");
			var ratingSpace = $("<div><h4>Rating: " + rating + "<h4></div>");
			$(item).append(gifSpace).append(divBreak).append(ratingSpace);
			$("#cell"+j).append(item);
/*
				if (j>=0 && j<=3) {
					$("#row1").append(item);
				} else if (j>=4 && j<=7) {
					$("#row2").append(item);
				} else if (j>=8 && j<=9) {
					$("#row3").append(item);
				}
			$("#cell"+j).append(item);
			Create a table with the divs already assigned id="cell#", then append the item to each in a loop
*/
			}
	});
}

$(document).on('click', ".animToggle", function() {
	$(this).removeClass("animToggle");
	$(this).addClass("stillToggle");
	var animatedGif = $(this).data("anim");
	$(this).html("<img src = \"" + animatedGif + "\"/>");
});

$(document).on('click', ".stillToggle", function() {
	$(this).removeClass("stillToggle");
	$(this).addClass("animToggle");
	var stillGif = $(this).data("still");
	$(this).html("<img src = \"" + stillGif + "\"/>");
});