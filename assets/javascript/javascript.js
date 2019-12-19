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

        }
        if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":checked")) {
            yelp();
            ticketMaster();
        }
        if ($("#foodCheck").is(":not(:checked)") && $("#eventCheck").is(":not(:checked)")) {
            var noChecks = $("<p>");
            noChecks.text("Ummm you gotta tell me what you want to look for. I am not a mind reading app. Please use the checkboxes provided.");
            noChecks.addClass("card");
            $("#big").attr("style", "width:100%");
            $("#e-title").append(noChecks);
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

            var city = $("<div>");
            city.html('<div class="title-section">' + response._embedded.events[0]._embedded.venues[0].city.name + ' Events</div>');
            city.addClass("card");
            $("#e-title").append(city);

            for (var i = 0; i < 5; i++) {

                console.log(response._embedded.events[i].info);
                var name = $("<div>");
                var info = $('<div class="card-address">');
                var date = $("<div>");
                var time = $("<div>");
                var location = $("<div>");
                var price = $("<div>");
                var url = $("<div>");
                var eventDiv = $("<div>");

                name.text(response._embedded.events[i].name);
                name.addClass("title");
                info.text(response._embedded.events[i].info);
                date.html('<i class="far fa-calendar-alt"></i> Event Date: ' + moment(response._embedded.events[i].dates.start.localDate).format("MMM Do YYYY"));
                date.addClass("card-cal")
                time.html('<i class="far fa-clock"></i> Start Time: ' + moment(response._embedded.events[i].dates.start.localTime, "hh:mm").format("hh:mm a"));
                location.html(response._embedded.events[i]._embedded.venues[0].name + "<br>" + '<a href="https://www.google.com/maps/place/' + response._embedded.events[i]._embedded.venues[0].address.line1 + '">' + response._embedded.events[i]._embedded.venues[0].address.line1 + ' <i class="fas fa-directions"></i></a>');
                location.addClass("card-address");
                url.html('<a href="' + response._embedded.events[i].url + '"><i class="fas fa-ticket-alt"></i> Get Tickets</a>');
                url.attr("target", "_blank");
                //url.text("Buy Tickets Here");

                if (response._embedded.events[i].priceRanges) {
                    price.html('<i class="fas fa-long-arrow-alt-down"></i><i class="fas fa-dollar-sign"></i> Min: $' + response._embedded.events[i].priceRanges[0].min + "<br>" + '<i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-dollar-sign"></i> Max: $' + response._embedded.events[i].priceRanges[0].max);

                } else {

                    price.text("I Can't Find Prices. Checkout the Link for More Ticket Info");
                }
                eventDiv.append(name, date, time, info, location, price, url);
                eventDiv.addClass("card");
                if ($("#eventCheck").is(":checked") && $("#foodCheck").is(":not(:checked)")) {
                    $("#events").append(eventDiv);
                    $("#big").attr("style", "width:100%");
                    $("#small").attr("style", "width:0%");
                }
                if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":checked")) {
                    $("#events").append(eventDiv);
                    $("#big").attr("style", "width:70%");
                    $("#small").attr("style", "width:30%");
                }

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

                var city = $("<div>");
                city.html('<div class="title-section">' + data.businesses[0].location.city + " Restaurants</div>");
                city.addClass("card");
                if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":not(:checked)")) {
                    $("#e-title").append(city);
                } else {
                    $("#r-title").append(city);
                }

                for (var i = 0; i < 8; i++) {

                    var yelpDiv = $("<div>");
                    var name = $("<div>");
                    var address = $("<div>");
                    var phone = $("<div>");
                    var rating = $("<div>");
                    var url = $("<div>");

                    var yelpDiv = $("<div>");

                    name.text(data.businesses[i].name);
                    name.addClass("title");
                    address.html('<a href="https://www.google.com/maps/place/' + data.businesses[i].location.display_address[0] + '" target="_blank">' + data.businesses[i].location.display_address[0] + ' <i class="fas fa-directions"></i></a>');
                    address.addClass("card-address");
                    phone.html('<a href="tel:' + data.businesses[i].phone + '"><i class="fas fa-mobile-alt"></i> ' + data.businesses[i].phone + '</a>');
                    phone.addClass("card-phone");
                    rating.html('<i class="fas fa-star"></i> ' + data.businesses[i].rating + " Stars");
                    rating.addClass("card-rating");
                    url.html('<a href="' + data.businesses[i].url + ' "target="_blank" ><i class="fab fa-yelp"></i> Yelp Page</a>');
                    // url.attr("target", "_blank");
                    url.addClass("card-yelp");
                    yelpDiv.append(name, address, rating, phone, url);
                    yelpDiv.addClass("card");
                    if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":not(:checked)")) {
                        $("#events").append(yelpDiv);
                        $("#big").attr("style", "width:100%");
                        $("#small").attr("style", "width:0%");
                    }
                    if ($("#foodCheck").is(":checked") && $("#eventCheck").is(":checked")) {
                        $("#big").attr("style", "width:70%");
                        $("#small").attr("style", "width:30%");
                        $("#food").append(yelpDiv);
                    }


                }
            }
        });
    }

    function weather() {
        var userInput = $("#search").val().trim();
        var location = userInput.replace(/\s+/g, "+");
        var weatherUrl = "https://api.weatherapi.com/v1/current.json?key=98319b038859482288d193548190612&q=" + location;
        $.ajax({
            url: weatherUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var name = $("<div>");
            var currentTemp = $("<div>");
            var weather = $("<div>");
            var feelsLike = $('<div class="weather-menu-title">');
            var windSpeed = $('<div class="weather-menu-title">');
            var humidity = $('<div class="weather-menu-title">');
            var weatherDiv = $("<div>");
            humidity.text("Humidity: " + response.current.humidity + "%");
            windSpeed.text("Wind Speed: " + response.current.gust_mph + " mph");
            name.text(response.location.name);
            currentTemp.text(response.current.temp_f + 'º F');
            feelsLike.text('Feels Like: ' + response.current.feelslike_f + 'º F');
            weather.html('<img src="https:' + response.current.condition.icon + '">');
            weatherDiv.append(name, weather, currentTemp, feelsLike, windSpeed, humidity);
            $("#weather-box").append(weatherDiv);
            $("#weather-city").html(name);
            $("#weather-icon").html(weather);
            $("#weather-temp").html(currentTemp);
            $("#feels-like").html(feelsLike);
            $("#wind-speed").html(windSpeed);
            $("#humididness").html(humidity);
            $("#more-weather").html('<div id="thermo" class="fa thermo fa-lg"><i class="fas fa-thermometer-full"></i></div><i class="fas fa-ellipsis-v fa-lg"></i>')

        })
    }

    $("#open-menu").click(function() {
        $("#pref-selection").slideToggle(1000);
    });

    $("#more-weather").click(function() {
        $("#more-weathers").slideToggle(1000);
    });

    $(".rotate").click(function() {
        $(this).toggleClass("down");
    });
    $("#more-weather").click(function() {
        clearInterval();
        var a;
        a = document.getElementById("thermo");
        a.innerHTML = "&#xf2cb;";
        setTimeout(function() {
            a.innerHTML = "&#xf2ca;";
        }, 1000);
        setTimeout(function() {
            a.innerHTML = "&#xf2c9;";
        }, 2000);
        setTimeout(function() {
            a.innerHTML = "&#xf2c8;";
        }, 3000);
        setTimeout(function() {
            a.innerHTML = "&#xf2c7;";
        }, 4000);
        thermo();
        setInterval(thermo, 5000);
    });
})