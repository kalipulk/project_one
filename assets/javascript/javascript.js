$(document).ready(function() {


    $("#userForm").on("submit", callThemAll);


    function callThemAll() {
        event.preventDefault();
        $("#weather-box").empty();
        $(".large").empty();
        weather();


        if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":not(:checked)")) {
            yelp();

        }
        if ($("#eventCheck").is(":checked") && $("#foodCheck").is(":not(:checked)")) {
            ticketMaster();
            console.log("test");
        }
        if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":checked")) {
            yelp();
            ticketMaster();
        }
        if ($("#foodCheck").is(":not(:checked)") && $("#eventCheck").is(":not(:checked)")) {
            var noChecks = $("<p>");
            noChecks.text("Ummm you gotta tell me what you want to look I am not a mind reader app for use the checkboxes provided");
            noChecks.addClass("card-title");
            $("#food").append(noChecks);
        }

    }

    function ticketMaster() {
        var userInput = $("#search").val().trim();
        var location = userInput.replace(/\s+/g, "+");

        var Ticketurl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + location + "&radius=25&unit=miles&apikey=YwWmFsE5b1pkRuBdLaOHng4zYQMQjWuZ";

        $.ajax({
            url: Ticketurl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response._embedded.events[0]._embedded.venues[0].city.name);
            var city = $("<span>");

            city.text(response._embedded.events[0]._embedded.venues[0].city.name + " Events");
            city.addClass("card-title");
            $("#events").append(city);

            for (var i = 0; i < 5; i++) {
                console.log(response);
                console.log(response._embedded.events[i].url);
                var name = $("<p>");
                var info = $("<p>");
                var date = $("<p>");
                var time = $("<p>");
                var location = $("<p>");
                var price = $("<p>");
                var url = $("<a>");
                var eventDiv = $("<div>");

                name.text(response._embedded.events[i].name);
                name.addClass("title");
                info.text(response._embedded.events[i].info);
                date.text(response._embedded.events[i].dates.start.localDate);
                time.text(response._embedded.events[i].dates.start.localTime);
                location.html(response._embedded.events[i]._embedded.venues[0].name + "<br>" + response._embedded.events[i]._embedded.venues[0].address.line1);
                url.attr("href", response._embedded.events[i].url);
                url.attr("target", "_blank");
                url.text("Buy Tickets Here");
                console.log(response._embedded.events[i].name);
                if (response._embedded.events[i].priceRanges) {
                    price.html("minimum price:$" + response._embedded.events[i].priceRanges[0].min + "<br>" + "maximum price:$" + response._embedded.events[i].priceRanges[0].max);

                } else {

                    price.text("I Cant Find Prices Checkout the Link for More Ticket Info");
                }
                eventDiv.append(name, date, time, info, location, price, url);
                eventDiv.addClass("card");
                $("#events").append(eventDiv);
            }

        })
    }

    function yelp() {
        var userInput = $("#search").val().trim();
        var location = userInput.replace(/\s+/g, "+");

        var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + location;
        $.ajax({
            url: yelpUrl,
            headers: {
                'Authorization': 'Bearer 9y46mDdkdsuDjiQ9my2Inu2SyLXxINPltoheoJ-Vd702XhDxOkTUch2anxDKVhrDyaT5FHVhe4te8SW_ZxkdMMIOGRqyuhCfTDnkAnmCdqCAeDezzLHVd0EUY7HiXXYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {

                var city = $("<span>");
                city.text(data.businesses[0].location.city + " Resturants");
                city.addClass("card-title");
                $("#food").append(city);
                for (var i = 0; i < 5; i++) {

                    var yelpDiv = $("<div>");
                    var name = $("<p>");
                    var address = $("<p>");
                    var phone = $("<p>");
                    var rating = $("<p>");
                    var url = $("<a>");

                    var yelpDiv = $("<div>");

                    name.text(data.businesses[i].name);
                    name.addClass("title");
                    address.text(data.businesses[i].location.display_address[0]);
                    phone.text(data.businesses[i].phone);
                    rating.text(data.businesses[i].rating);

                    url.attr("href", data.businesses[i].url);
                    url.attr("target", "_blank");
                    url.text("Our Yelp Page");
                    yelpDiv.append(name, address, rating, phone, url);
                    yelpDiv.addClass("card");

                    $("#food").append(yelpDiv);

                }
            }
        });
    }

    function weather() {
        var userInput = $("#search").val().trim();
        var location = userInput.replace(/\s+/g, "+");
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