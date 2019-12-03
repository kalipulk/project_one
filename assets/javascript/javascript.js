$(document).ready(function() {
    var Ticketurl = "https://app.ticketmaster.com/discovery/v2/events.json?dmaName=NewHaven&apikey=YwWmFsE5b1pkRuBdLaOHng4zYQMQjWuZ";
    var location;
    $.ajax({
            url: Ticketurl,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < 5; i++) {
                console.log(response._embedded.events[i]);
                console.log(response._embedded.events[i].name)
            }
        })
        // var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=newhaven";
        // $.ajax({
        //     url: yelpUrl,
        //     headers: {
        //         'Authorization': 'Bearer 9y46mDdkdsuDjiQ9my2Inu2SyLXxINPltoheoJ-Vd702XhDxOkTUch2anxDKVhrDyaT5FHVhe4te8SW_ZxkdMMIOGRqyuhCfTDnkAnmCdqCAeDezzLHVd0EUY7HiXXYx',
        //     },
        //     method: 'GET',
        //     dataType: 'json',
        //     success: function(data) {
        //         console.log(data);
        //     }
        // });

})