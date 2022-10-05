// Initialize map
var map = L.map('map').setView([0, 0], 10);

const path = []

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

    console.log('found')
    console.log(e.latlng)
    path.push(e.latlng)
    // Clear polygon layer
    console.log($('.leaflet-overlay-pane').children().eq(0).children().eq(0))
    L.polygon(path).addTo(map)
    // Because locationfound will be fired almost constantly while moving, I could add each new point to a geoJSON object so that a line could be created out of all of the points.
    // At this point, I'm not sure how many points one object could keep track of without causing performance issues, since I've seen geoJSON objects representing lines as complex as state borders, I will assume for now that one skate will not be too much data
    // That being said, I could only add points if they fall outside of a certain distance from the initial point, so that they are added in a more incremental manner.
    // A feature I would like to allow for the user is the ability to edit their path on completion of a skate, because the tracking may not always be accurate. This is definitely possible with geoJSON.


});

map.on('locationerror', (e) => {

    alert(e.message)

});