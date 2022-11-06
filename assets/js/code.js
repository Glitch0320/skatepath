// For some reason this function isn't being recognized so I will rewrite it here
function coordsToLatLng([lon, lat]) {
    // return latlng object
    return L.latLng(lat, lon)
}

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
    "type": "FeatureCollection",
    "properties": {
        "accuraccies": [],
        "timestamps": []
      },
  "features": []
}

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
var geoLayer = L.geoJSON(path, gOptions).addTo(map)

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    maxZoom: 19,
    enableHighAccuracy: true
})

// path index is a direct count of every point added, while featureIndex is every two points(LineString)
let pathIndex = 0
let featureIndex = 0

map.on('locationfound', (e) => {

    const feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: []
        }
    }

    if (pathIndex === 0) {
        map.setView(e.latlng, 19)
        console.log(e)
    }

    // If new location is past a certain distance from previous one, add location, accuracy, and timestamp to path geoJson: {
//     "type": "FeatureCollection",
//     "properties": {
//         "accuraccies": [],
//         "timestamps": []
//       },
//   "features": []
// }
    
        // if feature.coordinates.length < 2, add [e.lon, e.lat]

        let location = L.marker(e.latlng, {
            // style options
        }).addTo(map)

        let accuracy = L.circle(e.latlng, {
            color: "#2cff0f",
            fillColor:"indigo",
            fillOpacity: .75,
            radius: e.accuracy
        }).addTo(map)

        // Else, add feature to path.features and empty feature.coordinates, redraw

});

map.on('locationerror', (e) => {

    alert(e.message)

});