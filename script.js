
function displayWeather() {

var city = $(".city-search").val();
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f441cfb77f1af8db9f72b34e1d10a300";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
 
    console.log(response);
    
});
};

$(".search-btn").click(function(event) {
    event.preventDefault();

    displayWeather()
});