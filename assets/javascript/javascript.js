$(document).ready(function () {

    var userInput;
    ticketMaster();
    // yelp();
    // $(document).on("click", "#searchbutton", yelp);

    function ticketMaster() {

        var Ticketurl = "https://app.ticketmaster.com/discovery/v2/events.json?city=new+haven&radius=25&unit=miles&apikey=YwWmFsE5b1pkRuBdLaOHng4zYQMQjWuZ";
        $.ajax({
            url: Ticketurl,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < 25; i++) {
                // console.log(response);
                console.log(response._embedded.events[i]);
                console.log(response._embedded.events[i]._embedded.venues[0].address.line1);
                console.log(response._embedded.events[i]._embedded.venues[0].name);

                // console.log(response._embedded.events[i].name);
                var name = $("<p>");
                var info = $("<p>");
                var date = $("<p>");
                var time = $("<p>");
                var location = $("<p>");

                name.text(response._embedded.events[i].name);
                info.text(response._embedded.events[i].info);
                date.text(response._embedded.events[i].dates.start.localDate);
                time.text(response._embedded.events[i].dates.start.localTime);
                location.html(response._embedded.events[i]._embedded.venues[0].name + "<br>" + response._embedded.events[i]._embedded.venues[0].address.line1);
                // address.html

                
                console.log(location);



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
            success: function (data) {
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

                    console.log(data.businesses[i].name);

                }
            }
        });
    }

    function weather() {

    }

})