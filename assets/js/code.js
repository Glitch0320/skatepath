// Initialize map
var map = L.map('map').setView([0, 0], 10);

const path = []

const pathOptions = {color: '#234099',
                     weight: 20}

//  Thanks for this function: https://www.geeksforgeeks.org/program-distance-two-points-earth/#:~:text=For%20this%20divide%20the%20values,is%20the%20radius%20of%20Earth.
// JavaScript program to calculate Distance Between
// Two Points on Earth
 
function distance(pairone, pairtwo)
{
    lon1 = pairone.lng
    lon2 = pairtwo.lng
    lat1 = pairone.lat
    lat2 = pairone.lat

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);
    
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // Divide by 1000 to get meters
    return((c * r)/1000);
}

// Add OpenStreetMap
var layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    setView: true,
    maxZoom: 18,
    enableHighAccuracy: true
})

// Locationfound while be fired multiple times while moving because .locate is called with the watch option set to true

// !locationfound: user can move and scale map
// As soon as locationfound: the map is reset to current position due to setView and watch being true
map.on('locationfound', (e) => {
    // If currentpoint is at least a certain distance from lastPoint, add to path

            path.push(e.latlng)
            // Clear polygon layer
            $('.leaflet-overlay-pane').children().eq(0).children().eq(0).empty()
            // Redraw line
            L.polyline(path, pathOptions).addTo(map)
            console.log('point added')
    // At this point, I'm not sure how many points one object could keep track of without causing performance issues, since I've seen geoJSON objects representing lines as complex as state borders, I will assume for now that one skate will not be too much data
    // That being said, I could only add points if they fall outside of a certain distance from the initial point, so that they are added in a more incremental manner.
    // A feature I would like to allow for the user is the ability to edit their path on completion of a skate, because the tracking may not always be accurate. This is definitely possible with geoJSON.

});

map.on('locationerror', (e) => {

    alert(e.message)

});