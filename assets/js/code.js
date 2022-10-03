// Initialize map
var map = L.map('map').setView([0, 0], 10);

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

// Locationfound while be fired multiple times while moving

// !locationfound: user can move and scale map
// As soon as locationfound: the map is reset to current position due to setView and watch being true
map.on('locationfound', (e) => {

    console.log('found');
    // If user is not currently changing the mapstate
    L.marker(e.latlng).addTo(map)

});

map.on('locationerror', (e) => {

    alert(e.message)

});