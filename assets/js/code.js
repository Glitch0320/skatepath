// Initialize map
const mapOptions = {
    // https://leafletjs.com/reference.html#map-option
}

let map = L.map('map').setView([0, 0], 10, mapOptions);

// Tile Layer is a grid of images 256 by 256px
let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    "maxZoom": 18,
    "attribution": '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

const pathOptions = {
    // https://leafletjs.com/reference.html#path
}

// geoJSON object with one LineString
const path = {
    "type": "Feature",
    "geometry": {
      "coordinates": [],
      "type": "LineString"
    }
  }

const accuracies = []
const timestamps = []

const lineOptions = {
    // https://leafletjs.com/reference.html#polyline
}

const gOptions = {
    style: {
    "color": '#234099',
    "weight": 7.5,
    "opacity": 0.85
    }
}

// Add geoJson to map
var geoLayer = L.geoJSON().addTo(map)

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    maxZoom: 19,
    enableHighAccuracy: true
})

pathIndex = 0

map.on('locationfound', (e) => {

    if (pathIndex === 0) {
        map.setView(e.latlng, 19)
        console.log(e)
        // Add current location, timestamp, and accuracy to path
        // path.geometry.coordinates.push([e.longitude, e.latitude])
        // accuracies.push(e.accuracy)
        // timestamps.push(e.timestamp) 

        L.marker(e.latlng).addTo(map)
        // console.log(path)
        pathIndex++

    } else {

        L.marker(e.latlng).addTo(map)
        // console.log(path)
        pathIndex++

        // If next location is at least 32 m (my lucky number and a good distance, although this distance should be determined relative to speed)

    }

});

map.on('locationerror', (e) => {

    alert(e.message)

});