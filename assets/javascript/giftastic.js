var topics = ["New York", "Orlando", "Boston", "San Francisco", "Chicago", "Santa Fe", "Detroit", "Miami", "Dallas"];


  

function displayGifs() {
  var city = $(this).attr("data-buttons")
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=17b05d17dc0d4bcdbf4b1156a3cbded9&limit=10";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });
};


function displayButtons() {
    $("#view-buttons").empty();

    for(var i = 0; i < topics.length; i++) {


    var addButton = $("<button>");
    addButton.addClass("cities");
    addButton.attr("data-buttons", topics[i]);
    addButton.text(topics[i]);
    $("#view-buttons").append(addButton);
    }
};

$("#submit-city").on("click", function(event){
    event.preventDefault();
    var formInputValue = $("#city-input").val().trim();
    topics.push(formInputValue);

    displayButtons();
    console.log(topics);
});

displayButtons();   
console.log(topics);

