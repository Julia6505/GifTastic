
var topics = ["New York", "Orlando", "Boston", "San Francisco", "Chicago", "Santa Fe", "Detroit", "Miami", "Dallas", "Seattle", "Memphis", "Las Vegas", "Los Angeles"];

function displayGifs() {
    //variable that grabs search info from form
  var city = $(this).attr("data-buttons");
  //ajax call to giphy api to grab 10 searched images
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=17b05d17dc0d4bcdbf4b1156a3cbded9&limit=10";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var gifDiv = $("<div class='gif-div'>");
        for(var i = 0; i < response.data.length; i++) {
        var rating = response.data[i].rating;
        var ratingP = $("<p id='rating'>").text("Rating: " + rating);
        // console.log(rating);
        var gifImageUrlStill = response.data[i].images.fixed_width_still.url;
        var gifImageUrlAnimated = response.data[i].images.fixed_width.url;      
        //animated and still versions of img necessary to pause and start gifs  
        var gifImage = $("<img class='gif' data-state='still'>").attr({"src": gifImageUrlStill, "data-still": gifImageUrlStill, "data-animate": gifImageUrlAnimated})
        gifDiv.append(ratingP);
        gifDiv.append(gifImage);
        $("#holdGiphys").prepend(gifDiv);
    };
    });
};
//function to pause and start gifs
function toggle() {
    var currentState = ($(this).data("state"));
    console.log(currentState);
    
    if (currentState === "still") {
        console.log('animate');
        $(this).attr("src", $(this).data('animate'));
        $(this).data("state", "moving");
       
    } else {
        console.log('stop it');
        $(this).attr("src", $(this).data('still'));
        $(this).data("state", "still");
        
    }
    };

function displayButtons() {
    //empty buttons so same button doesn't repeat itself
    $("#view-buttons").empty();
    for(var i = 0; i < topics.length; i++) {
    var addButton = $("<button>");
    addButton.addClass("cities");
    addButton.attr("data-buttons", topics[i]);
    addButton.text(topics[i]);
    $("#view-buttons").append(addButton);
    // console.log(addButton.attr("data-buttons", topics[i]));
    }
};

$("#submit-city").on("click", function(event){
    //prevent page from reloading when submit button clicked
    event.preventDefault();
    var formInputValue = $("#city-input").val().trim();
    topics.push(formInputValue);

    displayButtons();
    console.log(topics);
});

//add new button when add button is clicked
displayButtons();   
//show gifs when city buttons are clicked
$(document).on("click", ".cities", displayGifs);
//pause/start gifs when clicked individually 
$(document).on("click", ".gif", toggle);






