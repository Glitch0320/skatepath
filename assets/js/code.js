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
const collection = []
var first = true

// !locationfound: user can move and scale map
// As soon as locationfound: the map is reset to current position due to setView and watch being true
map.on('locationfound', (e) => {

    console.log('found')
    if (first) {
        console.log(e)
        first = false
    }
    // If user is not currently changing the mapstate
    const point = e.latlng
    // console.log(point)
    // Every few points, replace those few points with a line, then replace current line with current line + new line
    collection.push(point)
    console.log(point)
    L.marker(point).addTo(map)
    if (collection.length === 3) {
        console.log(collection)
    }

});

map.on('locationerror', (e) => {

    alert(e.message)

});