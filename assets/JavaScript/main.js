var artists = ["Drake", "Beyonce", "The Beatles", "Dr. Dre"];

function displayArtistInfo() {

    // Grabbing and storing the data-animal property value from the button
    var artist = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        artist + "&api_key=oy5PdrOTYCpJHN5x15k21C70IBB19b9k&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Creating a div to hold the artist
            var artistDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Displaying the rating
            artistDiv.append(p);

            // Creating and storing an image tag
            var artistImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            artistImage.attr("src", results[i].images.fixed_height.url);

            artistDiv.append(artistImage);

            // Putting the artist before the previous artists
            $("#artists-view").prepend(artistDiv);
        }
    });

}

// Displaying Artists
function renderButtons() {
    // Making sure you can't add ditto buttons
    $("#buttons-view").empty();

    // Loop through the Array
    for (var i = 0; i < artists.length; i++) {

        // Creates buttons for each artist in the Array
        var a = $("<button>");
        // Adds a class to our buttons
        a.addClass("artist-btn btn btn-success");
        // Adds the data
        a.attr("data-name", artists[i]);
        // Adds the text to the button
        a.text(artists[i]);
        // Adds buttons to the button-view div
        $("#buttons-view").append(a);
    }
}

$("#add-artist").on("click", function (event) {
    event.preventDefault();

    var artist = $("#artist-input").val().trim();

    // Adding Artist from text box
    artists.push(artist);

    renderButtons();
});

$(document).on("click", ".artist-btn", displayArtistInfo);

renderButtons();