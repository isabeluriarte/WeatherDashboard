
$(".date").text(moment().format('LLL'))

function displayWeather() {

    var city = $(".city-search").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f441cfb77f1af8db9f72b34e1d10a300";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        localStorage.setItem("city", city)
        // converting temp to F with 2 decimals
        var F = ((response.main.temp) * (9 / 5)) - 459.67;
        var temp = F.toFixed(2) + "\xB0F";
        console.log(temp);

        var humid = response.main.humidity + "%";
        console.log(humid);

        var windSpeed = ((response.wind.speed) * 2.237);
        var wind = windSpeed.toFixed(2) + " MPH";
        console.log(wind);

        var cityTitle = $(".city-name");
        cityTitle.text(city);

        $("#temp").text("Temperature: " + temp);
        $("#humid").text("Humidity: " + humid);
        $("#wind").text("Wind Speed: " + wind);

        var savedSearch = localStorage.getItem("city")
        var prevSearch = $("<li>").addClass("list-group-item");
        prevSearch.text(savedSearch);
        $(".searched").prepend(prevSearch);
        
        

        displayUV();

        function displayUV() {

            var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=f441cfb77f1af8db9f72b34e1d10a300&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        
            $.ajax({
                url: UVqueryURL,
                method: "GET"
            }).then(function (response) {
        
                var uv = response.value
                $("#uv").text("UV Index: " + uv)
                
        
            });
        };
    });
};



$(".search-btn").click(function (event) {
    event.preventDefault();

    displayWeather();



    
});