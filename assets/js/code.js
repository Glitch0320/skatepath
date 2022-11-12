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
        "coordinates": [
            // [
            //     -94.4620212317282,
            //     43.661520238377875
            //   ],
            //   [
            //     -94.46350790397351,
            //     43.65970296741901
            //   ],
            //   [
            //     -94.46392061864728,
            //     43.65826046207823
            //   ],
            //   [
            //     -94.46220654035204,
            //     43.6575526562963
            //   ],
            //   [
            //     -94.45835043979338,
            //     43.6591292368029
            //   ],
            //   [
            //     -94.45963001089919,
            //     43.66128996978054
            //   ],
            //   [
            //     -94.46148546272119,
            //     43.6617034094557
            //   ]
        ],
        "type": "LineString"
    }
}

const accuracies = []
const timestamps = []

const gOptions = {
    style: {
        "color": '#234099',
        "weight": 5,
        "opacity": 0.85
    }
}

// Add geoJson to map
var geoLayer = L.geoJSON().addTo(map)

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    maxZoom: 20,
    enableHighAccuracy: true
})

pathIndex = 0

map.on('locationfound', (e) => {
    console.log('found')
    if (pathIndex === 0) {
        map.setView(e.latlng, 19)
        console.log(e)
        // Add current location, timestamp, and accuracy to path
        path.geometry.coordinates.push([e.longitude, e.latitude])
        accuracies.push(e.accuracy)
        timestamps.push(e.timestamp)

        let start = L.marker(e.latlng).addTo(map)
        // console.log(path)
        pathIndex++

    } else {

        // If this location is at least 20 m from last location,
        // if (e.latlng.distanceTo({ lon: path.geometry.coordinates[pathIndex - 1][0], lat: path.geometry.coordinates[pathIndex - 1][1] }) > 20) {
        // add to geojson and redraw
        path.geometry.coordinates.push([e.longitude, e.latitude])
        accuracies.push(e.accuracy)
        timestamps.push(e.timestamp)

        if (geoLayer) {
            // redraw geoJson
            geoLayer.remove()
            geoLayer.addData(path, gOptions).addTo(map)
        } else {
            geoLayer.addData(path, gOptions).addTo(map)
        }

    }

    pathIndex++

    // }

})

map.on('locationerror', (e) => {

    alert(e.message)

})