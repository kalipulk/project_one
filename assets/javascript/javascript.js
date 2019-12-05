$(document).ready(function() {

    var userInput;
    // ticketMaster();
    // yelp();
    weather();
    // $(document).on("click", "#searchbutton", yelp);

    function ticketMaster() {

        var Ticketurl = "https://app.ticketmaster.com/discovery/v2/events.json?city=new+haven&apikey=YwWmFsE5b1pkRuBdLaOHng4zYQMQjWuZ";
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
        var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=new+haven+06501";
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
                    var url = $("<p>");

                    var yelpDiv = $("<div>");

                    name.text(data.businesses[i].name);
                    address.text(data.businesses[i].location.display_address[0]);
                    phone.text(data.businesses[i].phone);
                    rating.text(data.businesses[i].rating);
                    url.text(data.businesses[i].url);
                    yelpDiv.append(name, address, rating, phone, url);
                    $("#eat").append(yelpDiv);

                    // console.log(data.businesses[i].name);

                }
            }
        });
    }

    function weather() {
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=new+haven&apikey=edc0682fcbc51e20382a66a7e7c78d0e";
        $.ajax({
            url: weatherUrl,
            method: "GET"
        }).then(function(response) {

            var currentTemp = $("<p>");
            var weather = $("<p>");
            var windSpeed = $("<p>");
            var weatherDiv = $("<div>");
            currentTemp.text("Current Tempture " + response.main.temp);
            weather.text("Current Weather " + response.weather[0].main);
            windSpeed.text("Wind Chill " + response.wind.deg);
            weatherDiv.append(currentTemp, weather, windSpeed);
            console.log(weatherDiv);
            $("#weather-box").append(weatherDiv);



        })
    }

})