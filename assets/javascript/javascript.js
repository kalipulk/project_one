$(document).ready(function() {

    $(document).on("click", "#searchbutton", callThemAll);


    function callThemAll() {
        event.preventDefault();
        $("#weather-box").empty();
        $("#eat").empty();
        ticketMaster();
        yelp();
        weather();

    }

    function ticketMaster() {
        var userInput = $("#userInput").val().trim();
        var location = userInput.replace(/\s+/g, "+");

        var Ticketurl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + location + "&apikey=YwWmFsE5b1pkRuBdLaOHng4zYQMQjWuZ";
        $.ajax({
            url: Ticketurl,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < 5; i++) {
                // console.log(response);
                // console.log(response._embedded);
                // console.log(response._embedded.events[i].name);
            }
        })
    }

    function yelp() {
        var userInput = $("#userInput").val().trim();
        var location = userInput.replace(/\s+/g, "+");

        var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userInput;
        $.ajax({
            url: yelpUrl,
            headers: {
                'Authorization': 'Bearer 9y46mDdkdsuDjiQ9my2Inu2SyLXxINPltoheoJ-Vd702XhDxOkTUch2anxDKVhrDyaT5FHVhe4te8SW_ZxkdMMIOGRqyuhCfTDnkAnmCdqCAeDezzLHVd0EUY7HiXXYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                for (var i = 0; i < 5; i++) {
                    var yelpDiv = $("<div>");
                    var name = $("<p>");
                    var address = $("<p>");
                    var phone = $("<p>");
                    var rating = $("<p>");
                    var url = $("<a>");
                    var yelpDiv = $("<div>");
                    name.text(data.businesses[i].name);
                    address.text(data.businesses[i].location.display_address[0]);
                    phone.text(data.businesses[i].phone);
                    rating.text(data.businesses[i].rating);
                    url.attr("href", data.businesses[i].url);
                    url.text("Our Yelp Page");
                    yelpDiv.append(name, address, rating, phone, url);
                    $("#eat").append(yelpDiv);

                }
            }
        });
    }

    function weather() {
        var userInput = $("#userInput").val().trim();
        var location = userInput.replace(/\s+/g, "+");
        console.log(location);

        var weatherUrl = "http://api.weatherapi.com/v1/current.json?key=98319b038859482288d193548190612&q=" + location;
        $.ajax({
            url: weatherUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var name = $("<p>");
            var currentTemp = $("<p>");
            var weather = $("<p>");
            var feelsLike = $("<p>");
            var windSpeed = $("<p>");
            var humidity = $("<p>");
            var weatherDiv = $("<div>");
            humidity.text("Humidity: " + response.current.humidity + "%");
            windSpeed.text("Wind Speed: " + response.current.gust_mph + " mph");
            name.text(response.location.name);
            currentTemp.text("Current Tempture: " + response.current.temp_f + " F");
            feelsLike.text("Feel Like: " + response.current.feelslike_f + " F");
            weather.text("Current Weather: " + response.current.condition.text);

            weatherDiv.append(name, weather, currentTemp, feelsLike, windSpeed, humidity);
            $("#weather-box").append(weatherDiv);
        })
    }

})