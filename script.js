$(".date").text(moment().format('LLL'));
$(".card-title1").text(moment().add(1, 'day').format('dddd'))
$(".card-title2").text(moment().add(2, 'day').format('dddd'))
$(".card-title3").text(moment().add(3, 'day').format('dddd'))
$(".card-title4").text(moment().add(4, 'day').format('dddd'))
$(".card-title5").text(moment().add(5, 'day').format('dddd'))

var savedSearch = [];
if(localStorage.getItem("city")){
    savedSearch = localStorage.getItem("city")
    savedSearch = JSON.parse(savedSearch);
}

savedSearch.forEach(function(city){
    var prevSearch = $("<li>").addClass("list-group-item");
    prevSearch.text(city);
    $(".searched").prepend(prevSearch);
});

var arr = [];
localStorage.setItem("city", JSON.stringify(arr))


function displayWeather(city) {

    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f441cfb77f1af8db9f72b34e1d10a300";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".city-search").val("")

        savedSearch.push(city);
        localStorage.setItem("city", JSON.stringify(savedSearch))
        var prevSearch = $("<li>").addClass("list-group-item");
        prevSearch.text(city);
        $(".searched").prepend(prevSearch);
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

        fiveDay(city)
        displayUV();

        function displayUV() {

            var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f441cfb77f1af8db9f72b34e1d10a300&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

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

const tempConverter = (kelTemp)=> {
    var F = ((kelTemp) * (9 / 5)) - 459.67;
    return F.toFixed(2) + "\xB0F";
}

// const tempConverter = function(){
// }

function fiveDay(city){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f441cfb77f1af8db9f72b34e1d10a300`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("fiveDay", response);
        //date, icon, temp, humidity;
        var list = response.list;
        for(let i = 0; i < 5; i++){
            console.log(i)
            list[i];
            var j = i * 8 + 3;
            var div = $(".day" + (i + 1));
            div.children(".temp").text("Temp: " + tempConverter(list[j].main.temp))
            div.children(".humid").text("Humidity: " + (list[j].main.humidity) + "%")
            // div.children("h5").text(list[j].dt_txt)
        }

        // list.forEach(function(element, index) {   
        // });
    })
}

$(".search-btn").click(function (event) {
    event.preventDefault();

    displayWeather($(".city-search").val());

});

$(document).on("click", "li", function (event) {
    event.preventDefault();

    displayWeather($(this).text());

});